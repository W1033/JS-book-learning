(function (scope) {
    const PENDING = 'pending';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';

    class Promise {
        constructor(resolver) {
            if (resolver && typeof resolver !== 'function') {
                throw new Error(`Promise resolver ${resolver} is not a function`)
            }
            this.state = PENDING;
            this.data = undefined;
            this.callbackArr = [];
            if (typeof (resolver) === 'function') {
                this.executeResolve(resolver)
            }
        }

        executeResolve(resolver) {
            const that = this;
            let cb = false;
            // onSuccess 和 onError 只会执行一个
            const onSuccess = function (value) {
                // console.log("value",value);
                // console.log("cb", cb);
                if (cb) { return }
                cb = true;
                that.executeCallback('fulfilled', value)
            };
            const onError = function (value) {
                if (cb) { return }
                cb = true;
                that.executeCallback('rejected', value)
            };
            try {
                resolver(onSuccess, onError)
            } catch (e) {
                // new Promise() 中抛错, 这里不用 that.executeCallback('rejected', e)，有错误的话提前终止不进入 onSuccess/onError
                onError(e)
            }
        }

        // 获取 thenable 对象
        getThen(value) {
            // 2.3.3.1 避免 then 内 get 方法多次的调用，对应特殊测试.html
            const then = value.then;
            if (Object.prototype.toString.call(value) === '[object Object]' &&
                typeof(then) === 'function') {
                const that = this;
                return function () {
                    // console.log(value);
                    // console.log(arguments);
                    then.apply(value, arguments)
                }
            } else {
                return false
            }
        }

        executeCallback(type, value) {
            console.log("executeCallBack value parameter", value);
            const isResolve = type === 'fulfilled';
            let thenable;
            if (isResolve && (Object.prototype.toString.call(value) === '[object Object]') ||
                (typeof (value) === 'function')) {
                try {
                    thenable = this.getThen(value)
                } catch (e) {
                    return this.executeCallback.call(this, 'rejected', e)
                }
            }
            // 如果是 thenable 对象而且是 fulfilled 状态(Promise.reject() 会返回参数值
            if (isResolve && thenable) {
                // 最终会将 thenable 对象里的值个抽出到 this.data 中
                this.executeResolve(thenable)
            } else if (this.state === PENDING) {  // promise 状态一旦改变便不可更改
                this.state = isResolve ? FULFILLED : REJECTED;
                this.data = value;
                this.callbackArr.forEach(fn => fn[type](value)) // ④
            }
            // 直接调用 Promise.resolve() Promise.reject() 用得到
            return this
        }

        executeAsyncCallback(callback, value) {
            const that = this;
            setTimeout(function () {
                let res;
                try {
                    res = callback(value)
                } catch (e) {
                    // 目的：使捕获到的错误进入 Promise.catch() 中
                    that.executeCallback('rejected', e)
                }
                // 2.3.1 如果放回的值与原 promise 相等，则是无穷循环
                if (res === that) {
                    that.executeCallback('rejected', new TypeError('Chaining cycle detected for promise #<Promise>'))
                } else {
                    // 事件循环知识点需巩固：比较巧妙 ③ ⑥
                    that.executeCallback('fulfilled', res)
                }
            }, 4)
        }

        then(onResolved, onRejected) {
            if ((typeof (onResolved) !== 'function' && this.state === FULFILLED) ||
                (typeof (onRejected) !== 'function' && this.state === REJECTED)) {
                // 配合 done() 食用
                return this
            }
            // 创建一个新的 promise 实例，作用一：链式调用；作用二：传进 CallbackItem 中，使其能调用 Promise 的方法
            const promise = new this.constructor();
            // 第一次进入 then，状态是 FULFILLED 或者是 REJECTED ||
            if (this.state !== PENDING) {
                const callback = this.state === FULFILLED ? onResolved : onRejected;
                // 绑定 this 到 promise                    ①
                this.executeAsyncCallback.call(promise, callback, this.data)
            }
            // 从第二次开始以后，进入 then，状态是 PENDING
            else {
                // 这里的 this 也是指向‘上一个’ promise ②
                this.callbackArr.push(new CallbackItem(promise, onResolved, onRejected))
            }
            return promise
        }

        catch(onRejected) {
            // 加上 return，相当于返回 promise
            return this.then(null, onRejected)
        }

        // 非 ES6 标准
        done(onResolved, onRejected) {
            this.then(onResolved, onRejected)
                .catch((reason) => {
                    setTimeout(() => {
                        throw reason
                    }, 0)
                })
        }
    }

    class CallbackItem {
        constructor(promise, onResolved, onRejected) {
            // 相应地，这里存储的 promise 是来自下一个 then 的
            this.promise = promise;
            this.onResolved = typeof (onResolved) === 'function' ? onResolved : (v) => {
                return v
            };
            this.onRejected = typeof (onRejected) === 'function' ? onRejected : (err) => {
                throw err
            }
        }

        fulfilled(value) {
            this.promise.executeAsyncCallback(this.onResolved, value) // ⑤
        }

        rejected(value) {
            this.promise.executeAsyncCallback(this.onRejected, value)
        }
    }

    Promise.resolve = function (value) {
        // 在 Promise.race 中用到，使 Promise 对象：Promise.resolve(1) 和普通值：3 之间公平竞争。
        // 原理：避免下一行进入 setTimeout 回调
        if (value instanceof this) return value;
        return this.prototype.executeCallback.call(new Promise(), 'fulfilled', value)
    };

    Promise.reject = function (value) {
        if (value instanceof this) return value;
        return this.prototype.executeCallback.call(new Promise(), 'rejected', value)
    };

    Promise.all = function (arr) {
        const that = this;
        return new this(function (resolve, reject) {
            let res = [];
            let count = 0;
            let flag = false;
            arr.forEach((value, index) => {
                that.resolve(value).then((onResolved) => {
                    res[index] = onResolved;
                    count++;
                    if (count === arr.length) {
                        flag = true;
                        return resolve(res)
                    }
                }, (err) => {
                    flag = true;
                    return reject(err)
                })
            })
        })
    };

    Promise.race = function (arr) {
        const that = this;
        return new this(function (resolve, reject) {
            let flag = false;
            arr.forEach((value, index) => {
                that.resolve(value).then((onResolved) => {
                    if (!flag) {
                        flag = true;
                        resolve(onResolved)
                    }
                })
            })
        })
    };

    // 测试 Promise: https://github.com/promises-aplus/promises-tests/blob/master/README.md
    Promise.deferred = Promise.defer = function () {
        const dfd = {};
        dfd.promise = new Promise(function (resolve, reject) {
            dfd.resolve = resolve;
            dfd.reject = reject;
        });
        return dfd
    };

    Promise.wrap = function (fn) {
        return function (...args) {
            return new Promise((resolve, reject) => {
                fn.apply(null, args.concat((err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                }))
            })
        }
    };

    try {
        module.exports = Promise
    } catch (e) {
        scope.Promise = Promise
    }
})(this);
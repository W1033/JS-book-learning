
// ## 生词
// - executor [ɪg'zekjʊtə] --n.执行器, 执行者
// - execute ['eksɪkjuːt] --vt.执行，实施，履行
// - Asynchrony (Async) [ei'siŋkrəni] --n.异步
// - synchrony (Sync) ['sɪŋkrənɪ] --n.同步

(function(scope) {
    const PENDING = 'pending';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';

    // - 创建 Promise 类
    class Promise {
        // - 我们把创建构造函数的实例 [new Promise(function(resolve, reject) {})];
        //   传入的匿名函数称为 "执行器 (executor)"
        constructor(executor) {
            // - 确定 executor 是一个函数
            if (executor && typeof executor !== 'function') {
                throw new Error(`Promise resolve ${executor} is noe a function`);
            }
            this.state = PENDING;
            this.data = undefined;
            // - 定义一个保存回调函数的数组 callbacks
            this.callbacks = [];
            if (typeof(executor) === 'function') {
                // - 调用 执行器 (call Executor)
                this.callExecutor(executor);
            }
        }

        // - 定义 "执行器方法" (call Executor)
        callExecutor(executor) {
            const that = this;
            let cb = false;

            // - onSuccess / onError 只会执行一个, 判断的依据是函数内部的 cb = true, 
            //   因为 onSuccess/onError 一旦其中一个执行, cb 就会设置为 true, 这样
            //   另外一个函数就不会在执行. 他们在下面 try...catch 中被调用.
            // - 参数 value: 是在 new Promise(function() {}) 时, 在执行器参数(executor)
            //   的执行体内部, 调用当前 onSuccess() / onError() 函数时出传入的参数
            //   [参考调用示例: "test2.html" -> `resolve("执行任务 1 成功");`] 
            const onSuccess = function(value) {
                // - 如果 cb = true 立马退出
                if (cb) return;
                cb = true;
                // - Tip: 我们从这里可以看出, 虽然 value 是传入进来了, 但是又把当前 
                //   value 传入到 executeCallback() 中, 更多执行参考此函数
                that.executeCallback('fulfilled', value);
            };
            const onError = function(value) {
                if (cb) return;
                cb = true;
                that.executeCallback('rejected', value);
            };

            try {
                // - 运行 executor 执行器函数, 对应调用的形参 (resolve / reject)
                // - Tips: 此时调用 executor 执行器函数, 此函数体内的默认代码(比如: 
                //   console.log()/以及其他代码) 都会执行, 其他执行代码见上面 
                //   onSuccess() / onError();
                executor(onSuccess, onError);
            } catch (e) {
                // - new Promise() 中抛错, 这里不用 this.executeCallback('reject', e)
                //   , 有错误的话提前终止进入 onReject
                onError(e);
            }
        }

        // - 执行回调 execute callback:
        //     + status: fulfilled / rejected
        //     + value: value 参数是在 new Promise(function() {}) 时, 在函数参数
        //       (executor) 的执行体内部, 调用当前 onResolve()/onReject() 时出传入的参数
        // - Tip: executeCallback 是执行同步回调函数，即 new Promise(
        //   (resolve, reject) => {resolve(0)}) 实例内不含有 setTimeout()的情况.
        // - Tip2: 当我们第一次通过 new Promise((resolve, reject) => 
        //   {resolve("执行任务 1 成功");) 这种方式调用 Promise 时, 经过前面几步走到
        //   此处时, value (即: "执行任务 1 成功") 传入走最后的 else if 判断,
        executeCallback(status, value) {
            const isResolve = status = 'fulfilled';
            // - Tip: thenable 保存的是一个具有 .then 方法的对象.
            let thenable;
            // - 如果 value 仍然是 对象/函数
            if (status && Object.prototype.toString.call(value)
                === '[object Object]' || (value instanceof Function)) {
                try {
                    // - 因为 value 仍然是 对象/函数, 所以我们此时调用 getThen()
                    //   方法, 把 value 传入
                    thenable = this.getThen(value);
                } catch (e) {
                    // - 如果此时有错误出现, 就调用 执行回调(executeCallback) 把错误
                    //   输出
                    return this.executeCallback.call(this, 'rejected', e);
                }
            }
            // - 如果 isResolve 存在值, 并且 thenable 存在 (Tip: thenable 指的是一个
            //   具有 .then 方法的对象. Tip2: 对应测试示例中 "对象含有 then 属性的测试").
            if (isResolve && thenable) {
                // - 最终会将  thenable 对象里的值抽出到 this.data 中
                this.callExecutor(thenable);
            }
            // - else if 判断是正常使用 Promise 时执行的代码, 即一般情况下执行的代码
            else if(this.state === PENDING) {
                // - promise 状态一旦改变便不可更该
                // - Tip: this.state, this.data, this.callbacks 都是在
                //   constructor() 方法中定义
                this.state = isResolve ? FULFILLED : REJECTED;
                this.data = value;
                // - Tip: callbacks 数组推入元素在 then 方法中
                this.callbacks.forEach(function(fn) {
                    return fn[status](value);
                });
            }
            // - 返回 this, 直接调用 Promise.resolve() / Promise.reject() 时用得到
            return this;
        }

        // - 获取具有 then 方法的对象.
        getThen(value) {
            // - 避免 then 内 get 方法多次的调用 (查看下面具有 then 方法的测试用例)
            const then = value.then;
            // - then 代表的可以是对象, 也可以是方法
            if (Object.prototype.toString.call(value) === '[object Object]'
                && typeof(then) === 'function') {
                return function() {
                    then.apply(value, arguments);
                }
            } else {
                return false;
            }
        }

        // - 执行异步回调, 在 then() 方法中被调用: 如这种方式调用: new Promise(
        //   (resolve, reject) => {setTimeout(() => {resolve(0)}, 500)})
        executeAsyncCallback(callback, value) {
            const that = this;
            setTimeout(() => {
                let res;
                try {
                    res = callback(value);
                } catch (e) {
                    // - 目的: 使捕获到的错误进入 Promise.catch() 中
                    that.executeCallback('rejected', e);
                }

                // - 如果放回的值与原 promise 相等, 则是无穷循环
                if (res === that) {
                    that.executeCallback('rejected', new TypeError(
                        'Chaining cycle detected for promise #<Promise>'));
                } else {
                    // - 事件循环知识点 需巩固: 比较巧妙
                    // - Tip: 从这里可以看出异步回调函数内部最终还是调用了
                    //   executeCallback 同步方法
                    that.executeCallback('fulfilled', res);
                }
            }, 4)
        }

        // - then 方法:
        // - Tip: 提示一点 then() 方法可以同时接受 onResolved 和 onRejected 2 个函数,
        //   在 then 内部会根据 onResolved / onRejected 来确定执行哪一个函数, 但是一般
        //   我们不会传入 onRejected 的函数, 更多的是我们使用 promise1.then().catch()
        //   这种方式, 把 onRejected 放入到 catch() 中
        then (onResolved, onRejected) {
            // - 如果 onResolved / onRejected 不是函数的话, 直接返回 this
            if ((typeof (onResolved) !== 'function' && this.state === FULFILLED)
                || (typeof(onRejected) !== 'function' && this.state === REJECTED)) {
                // - 配合 done() 使用
                return this;
            }
            // - 创建一个新的 promise 实例:
            //     + 作用一: 链式调用
            //     + 作用二: 传入 CallbackItem 中使其能调用 Promise 的方法
            const promise = new this.constructor();
            // - 第一次进入 then, 状态是 FULFILLED 或者 REJECTED
            if (this.state !== PENDING) {
                const callback = this.state === FULFILLED ? onResolved: onRejected;
                // - Tip: this.data 在上面 executeCallback 中已经被赋值
                // - 绑定 this 到 promise   (1)
                this.executeAsyncCallback.call(promise, callback, this.data);
            }
            // - 从第二次开始以后, 进入 then 状态是 PENDING
            else {
                // - 这里的 this 也是指向 "上一个" promise   (2)
                // - Tip: 比如: "示例 test2.html" 中 pms1().then().then() 第二个
                //   then 运行时, 内部的 this 指向是上面 const promise = 
                //   new this.constructor() 创建的 promise 
                this.callbacks.push(
                    new CallbackItem(promise, onResolved, onRejected)
                );
            }
            return promise;
        }

        // - catch() 方法
        catch(onRejected) {
            return this.then(null, onRejected);
        }

        // - 非 ES6 标准
        done(onResolved, onRejected) {
            this.then(onResolved, onRejected)
                .catch((reason) => {
                    setTimeout(() => {
                        throw reason;
                    }, 0)
                })
        }
    }

    class CallbackItem {
        // - promise 实例来自上面 then 方法传入
        constructor(promise, onResolved, onRejected) {
            this.promise = promise;
            this.onResolved = typeof(onResolved) === 'function'
                ? onResolved : (v) => {return v;};
            this.onRejected = typeof(onRejected) === 'function'
                ? onRejected : (err) => {throw err;}
        }
        fulfilled(value) {
            this.promise.executeAsyncCallback(this.onResolved, value);
        }
        rejected(value) {
            this.promise.executeAsyncCallback(this.onRejected, value);
        }
    }


    // - Promise 类上添加的静态方法(类方法)
    Promise.resolve = function(value) {
        // - 在 Promise.all()/Promise.race() 中用到, 使 Promise 对象
        //   (Promise.resolve(1)) 和 普通值 (e.g.: 3) 之间公平竞争
        // - 原理: 避免下一行进入 setTimeout 回调
        if (value instanceof this)  return value;
        return this.prototype.executeCallback.call(new Promise(), 'fulfilled', value);
    };
    Promise.reject = function(value) {
        if (value instanceof this) return value;
        return this.prototype.executeCallback.call(new Promise(), 'rejected', value);
    };
    Promise.all = function(arr) {
        const that = this;
        // - Tip: new this() 虽然理解就是 new Promise() 但是这种写法还是第一次遇到.
        return new this(function(resolve, reject) {
            let res = [];   // - 应该是一个保存已经成功 resolve 的一个数组
            let count = 0;
            let flag = false;
            arr.forEach((item, index) => {
                // - Tip: 这里不好理解
                that.resolve(item).then((onResolved) => {
                    res[index] = onResolved;
                    count++;
                    if (count === arr.length) {
                        flag = true;
                        return resolve(res);
                    }
                }, (err) => {
                    flag = true;
                    return reject(err);
                })
            })
        })
    };
    Promise.race = function(arr) {
        const that = this;
        return new this(function (resolve, reject) {
            let flag = false;
            arr.forEach((item, index) => {
                that.resolve(item).then((onResolved) => {
                    if (!flag) {
                        flag = true;
                        resolve(onResolved);
                    }
                })
            })
        })
    };

    // - 测试 Promise:
    //   https://github.com/promises-aplus/promises-tests/blob/master/README.md
    Promise.deferred = Promise.defer = function() {
        const dfd = {};
        dfd.promise = new Promise(function(resolve, reject) {
            dfd.resolve = resolve;
            dfd.reject = reject;
        });
        return dfd;
    };

    Promise.wrap = function(fn) {
        return function(...args) {
            return new Promise((resolve, reject) => {
                fn.apply(null, args.concat((err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                }));
            })
        }
    };

    try {
        module.exports = Promise;
    } catch(e) {
        scope.Promise = Promise;
    }
})(this);
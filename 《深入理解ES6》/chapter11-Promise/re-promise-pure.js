
// ## 生词
// - executor [ɪg'zekjʊtə] --n.执行器, 执行者
// - execute ['eksɪkjuːt] --vt.执行，实施，履行
// - Asynchrony (Async) [ei'siŋkrəni] --n.异步
// - synchrony (Sync) ['sɪŋkrənɪ] --n.同步

(function(scope) {
    const PENDING = 'pending';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';

    class Promise {
        constructor(executor) {
            if (executor && typeof executor !== 'function') {
                throw new Error(`Promise resolve ${executor} is noe a function`);
            }
            this.state = PENDING;
            this.data = undefined;
            this.callbacks = [];
            if (typeof(executor) === 'function') {
                this.callExecutor(executor);
            }
        }

        callExecutor(executor) {
            const that = this;
            let cb = false;
            const onSuccess = function(value) {
                if (cb) return;
                cb = true;
                that.executeCallback('fulfilled', value);
            };
            const onError = function(value) {
                if (cb) return;
                cb = true;
                that.executeCallback('rejected', value);
            };

            try {
                executor(onSuccess, onError);
            } catch (e) {
                onError(e);
            }
        }

        executeCallback(status, value) {
            const isResolve = status = 'fulfilled';
            let thenable;
            if (status && Object.prototype.toString.call(value)
                === '[object Object]' || (value instanceof Function)) {
                try {
                    thenable = this.getThen(value);
                } catch (e) {
                    return this.executeCallback.call(this, 'rejected', e);
                }
            }
            if (isResolve && thenable) {
                this.callExecutor(thenable);
            }
            else if(this.state === PENDING) {
                this.state = isResolve ? FULFILLED : REJECTED;
                this.data = value;
                this.callbacks.forEach(function(fn) {
                    return fn[status](value);
                });
            }
            return this;
        }

        getThen(value) {
            const then = value.then;
            if (Object.prototype.toString.call(value) === '[object Object]'
                && typeof(then) === 'function') {
                return function() {
                    then.apply(value, arguments);
                }
            } else {
                return false;
            }
        }

        executeAsyncCallback(callback, value) {
            const that = this;
            setTimeout(() => {
                let res;
                try {
                    res = callback(value);
                } catch (e) {
                    that.executeCallback('rejected', e);
                }

                if (res === that) {
                    that.executeCallback('rejected', new TypeError(
                        'Chaining cycle detected for promise #<Promise>'));
                } else {
                    that.executeCallback('fulfilled', res);
                }
            }, 4)
        }

        then (onResolved, onRejected) {
            if ((typeof (onResolved) !== 'function' && this.state === FULFILLED)
                || (typeof(onRejected) !== 'function' && this.state === REJECTED)) {
                return this;
            }
            const promise = new this.constructor();
            if (this.state !== PENDING) {
                const callback = this.state === FULFILLED ? onResolved: onRejected;
                this.executeAsyncCallback.call(promise, callback, this.data);
            }
            else {
                this.callbacks.push(
                    new CallbackItem(promise, onResolved, onRejected)
                );
            }
            return promise;
        }

        catch(onRejected) {
            return this.then(null, onRejected);
        }

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


    Promise.resolve = function(value) {
        if (value instanceof this)  return value;
        return this.prototype.executeCallback.call(new Promise(), 'fulfilled', value);
    };
    Promise.reject = function(value) {
        if (value instanceof this) return value;
        return this.prototype.executeCallback.call(new Promise(), 'rejected', value);
    };
    Promise.all = function(arr) {
        const that = this;
        return new this(function(resolve, reject) {
            let res = []; 
            let count = 0;
            let flag = false;
            arr.forEach((item, index) => {
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
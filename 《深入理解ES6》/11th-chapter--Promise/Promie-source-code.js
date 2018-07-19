// js 异步之 Promise 源码分析 ( https://zhuanlan.zhihu.com/p/29313141 )

function _Promise(fn) {
    if (typeof this !== "object") throw new TypeError("Promises must be constructed via new");
    if (typeof fn !== "function") throw new TypeError("not a function");
    let state = null; // 状态，null：pending，true：fulfilled，false：rejected
    let value = null; // 当前promise的状态事件处理函数（onFulfilled或onRejected）的入参
    let deferreds = []; // 当前promise的状态事件处理函数和promise链表中下一个promise的状态转换发起函数
    let self = this;
    // 唯一的公开方法
    this.then = function (onFulfilled, onRejected) {
        return new self.constructor(function (resolve, reject) {
            handle(new Handler(onFulfilled, onRejected, resolve, reject));
        });
    };

    // 保存和执行deferreds数组中的元素
    function handle(deferred) {
        if (state === null) {
            deferreds.push(deferred);
            return;
        }
        let cb = state ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
            (state ? deferred.resolve : deferred.reject)(value);
            return;
        }
        let ret;
        try {
            // 执行当前promise的状态转换事件处理函数
            ret = cb(value);
        } catch (e) {
            // 修改promise链表中下一个promise对象的状态为rejected
            deferred.reject(e);
            return;
        }
        // 修改promise链表中下一个promise对象的状态为fulfilled
        deferred.resolve(ret);
    }

    // promise的状态转换发起函数，触发promise的状态从pending->fulfilled
    function resolve(newValue) {
        try {
            if (newValue === self) throw new TypeError("A promise cannot be resolved with itself.");
            if (newValue && (typeof newValue === "object" || typeof newValue === "function")) {
                let then = newValue.then;
                if (typeof then === "function") {
                    // 将控制权移交thenable和promise对象，由它们来设置当前pormise的状态和状态转换事件处理函数的实参
                    doResolve(then.bind(newValue), resolve, reject);
                    return;
                }
            }
            state = true;
            value = newValue;
            finale();
        } catch (e) {
            reject(e);
        }
    }

    // promise的状态转换发起函数，触发promise的状态从pending->rejected
    function reject(newValue) {
        state = false;
        value = newValue;
        finale();
    }

    // 向链表的下一个promise移动
    function finale() {
        for (let i = 0, len = deferreds.length; i < len; i++) handle(deferreds[i]);
        deferreds = null;
    }

    // 执行构造函数的工厂方法，由工厂方法触发promise的状态转换
    doResolve(fn, resolve, reject);

    // 对状态转换事件处理函数进行封装后，再传给执行函数
    function doResolve(fn, onFulfilled, onRejected) {
        // done作为开关以防止fn内同时调用resolve和reject方法
        let done = false;
        try {
            fn(function (value) {
                if (done) return;
                done = true;
                onFulfilled(value);
            }, function (reason) {
                if (done) return;
                done = true;
                onRejected(reason);
            });
        } catch (ex) {
            if (done) return;
            done = true;
            onRejected(ex);
        }
    }

    // 构造promise的链表逻辑结构
    function Handler(onFulfilled, onRejected, resolve, reject) {
        this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null; // 当前promise的状态转换事件处理函数
        this.onRejected = typeof onRejected === "function" ? onRejected : null; // 当前promise的状态转换事件处理函数
        this.resolve = resolve; // 设置链表中下一个promise的状态为fulfilled
        this.reject = reject; // 设置链表中下一个promise的状态为rejected
    }

    function all(arr) {
        let args = Array.prototype.slice.call(arr);
        return new Promise(function (resolve, reject) {
            if (args.length === 0) return resolve([]);
            let remaining = args.length;

            function res(i, val) {
                try {
                    if (val && (typeof val === "object" || typeof val === "function")) {
                        let then = val.then;
                        if (typeof then === "function") {
                            then.call(val, function (val) {
                                // 对于thenable和promise对象则订阅onFulfilled事件获取处理结果值
                                res(i, val);
                            }, reject);
                            return;
                        }
                    }
                    args[i] = val;
                    // 检测是否所有入参都已返回值
                    if (--remaining === 0) {
                        resolve(args);
                    }
                } catch (ex) {
                    reject(ex);
                }
            }

            for (let i = 0; i < args.length; i++) {
                res(i, args[i]);
            }
        });
    }

    function race(values) {
        return new Promise(function (resolve, reject) {
            let over = 0;
            for (let i = 0, len = values.length; i < len && !over; ++i) {
                let val = values[i];
                if (val && typeof val.then === 'function') {
                    val.then(function (res) {
                        !over++ && resolve(res);
                    }, reject);
                }
                else {
                    !over++ && resolve(val);
                }
            }
        });
    }
}
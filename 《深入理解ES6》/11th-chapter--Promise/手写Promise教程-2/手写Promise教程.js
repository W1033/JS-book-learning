// Promises/A+ 规范: https://promisesaplus.com/

class Promise {
    // executor /ɪg'zekjʊtə/ n.执行者
    constructor(executor) {
        // 初始化 state 为等待态
        this.state = "pending";
        // 成功的值
        this.value = undefined;
        // 失败的原因
        this.reason = undefined;

        /*
        *   但是当 resolve 在 setTimeout 内执行【见示例: 掘金-手写一个符合规范的Promise\符合规范的Promise.html】
        * then 时 state 还是 pending 等待状态，我们需要在 then 调用时，当成功和失败存到各自的数组中，
        * 一旦 reject 或者 resolve, 就调用他们。
        *   类似于发布订阅模式，先将 then 里的 2 个函数存储起来，由于一个 Promise 可以有多个 then,
        *   所以存在同一个数组内。
        * */
        // 多个then 的情况
        // let p = new Promise();
        // p.then();
        // p.then();

        // 成功存放的数组
        this.onResolvedCallbacks = [];
        // 失败存放的数组
        this.onRejectedCallbacks = [];


        let resolve = (value) => {
            if (this.state === "pending") {
                // resolve 调用后, state 转化为成功态
                this.state = "fulfilled";
                // 存储成功的值
                this.value = value;
                // 一旦 resolve 执行，调用成功数组的函数
                this.onResolvedCallbacks.forEach(
                    function(fn) {
                        fn();
                    }
                );
            }
        };

        let reject = (reason) => {
            // state 改变， reject 调用就会失败
            if (this.state === "pending") {
                // reject 调用后， state 转化为失败态
                this.state = "rejected";
                // 存储失败的原因
                this.reason = reason;
                // 一旦 reject 执行，调用失败数组的函数
                this.onRejectedCallbacks.forEach(
                    function(fn) {
                        fn();
                    }
                )
            }
        };

        // 如果 executor 执行报错，直接执行 reject
        try {
           executor(resolve, reject);
        } catch(err) {
            reject(err);
        }
    }


    /** # then 方法: Promise+ 规定: Promise 有一个叫做 then 的方法， 里面有2个参数:
     *  onFulfilled, onRejected，成功有成功的值，失败有失败的原因
     *  1. 当构造函数中的 state 状态为 fulfilled 时， 则执行 onFulfilled， 传入 this.value.
     *     当状态 state 属性为 rejected, 则执行 onRejected， 传入 this.reason.
     *  2. onFulfilled, onRejected 如果他们时函数，则必须分别在 fulfilled, rejected 后被调用，
     *     value 或 reason 依次作为他们的第一个参数
     **/
    then(onFulfilled, onRejected) {
        // 状态为 fulfilled, 执行 onFulfilled, 传入成功的值
        if (this.state === "fulfilled") {
           onFulfilled(this.value);
        }
        // 状态为 rejected, 执行 onRejected, 传入失败的原因
        if (this.state === "rejected") {
            onRejected(this.reason);
        }

        // 当状态 state 为 pending 时
        if (this.state === "pending") {
            // onFulfilled 传入到成功数组
            this.onResolvedCallbacks.push(
                function () {
                    onFulfilled(this.value);
                }
            );

            // onRejected 传入到失败数组
            this.onResolvedCallbacks.push(
                function() {
                    onRejected(this.reason)
                }
            )
        }
    }


}
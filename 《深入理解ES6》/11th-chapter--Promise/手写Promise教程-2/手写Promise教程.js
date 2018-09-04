// Promises/A+ 规范: https://promisesaplus.com/
// [BAT前端经典面试问题：史上最详细的手写Promise教程](https://juejin.im/post/5b2f02cd5188252b937548ab)
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
        *    但是当 resolve 在 setTimeout 内执行【见示例: 掘金-符合规范的Promise-基本版不带链式调用\符合规范的Promise-1-base.html】
        * then 时 state 还是 pending 等待状态，我们需要在 then 调用时，当成功和失败存到各自的数组中，
        * 一旦 reject 或者 resolve, 就调用他们。
        *    类似于发布订阅模式，先将 then 里的 2 个函数存储起来，由于一个 Promise 可以有多个 then,所以存在同一个数组内。
        * */
        // 多个then 的情况
        // let p = new Promise();
        // p.then();
        // p.then();

        // 成功存放的数组
        this.onResolvedCallbacks = [];
        // 失败存放的数组
        this.onRejectedCallbacks = [];

        // 注: 在 resolve() 和 reject() 中根据判断条件 (this.state = "pending") 可以看出，
        // 即使2个函数在调用 new Promise(() => {resolve(0), reject(1)}) 都传入，也只会执行其中一个。
        let resolve = (value) => {
            if (this.state === "pending") {
                // resolve 调用后, state 转化为成功态
                this.state = "fulfilled";
                // 存储成功的值
                this.value = value;
                // 一旦 resolve 执行，调用成功数组的函数
                // forEach() 对数组中的每一项运行给定函数
                this.onResolvedCallbacks.forEach( (fn) => { fn();} );
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
                this.onRejectedCallbacks.forEach( (fn) => { fn();} )
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

    /** # 2. 解决链式回调:
     * 我们常常用到 new Promise().then().then() 这种链式调用，用来解决回调地狱
     *   (1). 为了达成链式， 我们默认在第一个 then 里返回一个 promise. [秘籍](https://promisesaplus.com/)
     * 规定了一种方法，就是在 then 里面返回一个新的 promise, 称为 promise2
     *      + 将这个 promise2 返回的值传递到下一个 then 中
     *      + 如果返回一个普通的值，则将普通的值传递给下一个 then 中
     *   (2). 当我们在第一个 then 中 return 了一个参数 (参数未知，需判断)。这个 return 出来的新的 promise 就是
     * onFulfilled() 或 onRejected() 的值。
     *    秘籍规定 onFulfilled() 或 onRejected() 的值，即第一个 then 返回的值，叫做 X, 判断 X 的函数叫做
     * resolvePromise
     */

    /** # 4. 解决其他问题:
     * (1) A+ 规定 onFulfilled, onRejected 都是可选参数， 如果他们不是函数，必须被忽略
     *   + onFulfilled 返回一个普通的值，成功时直接等于 (value) => { return value; }
     *   + onRejected 返回一个普通的值， 失败是如果直接等于 value => value, 则会跑到下一个 then 中的 onFulfilled
     *     中, 所以直接扔出一个错误 reason => throw err  2. A+ 规定 onFulfilled 或 onRejected 不能同步被调用，必须
     *     异步调用。 我们就用 setTimeout 解决异步问题
     *   + 如果 onFulfilled 或 onRejected 报错，则直接返回 reject()
     */

    then(onFulfilled, onRejected) {
        // onFulfilled 如果不是函数， 就忽略 onFulfilled 直接返回 value
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => { return value };
        // onRejected 如果不是函数，就忽略 onRejected 直接扔出错误
        onRejected = typeof onRejected === "function" ? onRejected : (err) => { throw err };

        /** # 2. 解决链式回调: ~~start */
        // 声明返回的 promise2
        let promise2 = new Promise(
            (resolve, reject) => {
                // 状态为 fulfilled, 执行 onFulfilled, 传入成功的值
                if (this.state === "fulfilled") {
                    // 异步
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            // resolvePromise 函数，处理自己 return 的 promise 和默认的 promise2 的关系
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                }

                // 状态为 rejected, 执行 onRejected, 传入失败的原因
                if (this.state === "rejected") {
                    // 异步
                    setTimeout(() => {
                        // 如果报错
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                }

                // 当状态 state 为 pending 时
                if (this.state === "pending") {
                    // onFulfilled 传入到成功数组
                    if (onFulfilled !== undefined) {
                        this.onResolvedCallbacks.push(() => {
                            // 异步
                            setTimeout(() => {
                                try {
                                    let x = onFulfilled(this.value);
                                    resolvePromise(promise2, x, resolve, reject);
                                } catch (e) {
                                    reject(e);
                                }
                            }, 0)
                        });
                    }

                    // onRejected 传入到失败数组
                    if (onRejected !== undefined) {
                        this.onRejectedCallbacks.push(() => {
                            // 异步
                            setTimeout(() => {
                                try {
                                    let x = onRejected(this.reason);
                                    resolvePromise(promise2, x, resolve, reject);
                                } catch (e) {
                                    reject(e);
                                }
                            }, 0)
                        })
                    }
                }
            }
        );

        // 返回 promise2, 完成链式
        return promise2;
        /** # 2. 解决链式回调: ~~end */
    }

    /** # 5. catch() 方法: 错误捕获 */
    catch(fn) {
        return this.then(null, fn)
    }
}


/** # 3. 完成 resolvePromise 函数:
 *   秘籍里规定了一段话，让不同的 promise 代码互相套用， 叫做 resolvePromise
 *    + 如果 x === promise2, 则是会造成循环引用。 例如下面这段代码:
 *
 *    ``` base
 *      let p = new Promise ((resolve, reject) => { resolve(0) });
 *      let p2 = p.then(
 *          (data) => {
 *              // 循环引用，自己等待自己完成，一辈子完不成
 *              return p2;
 *      });
 *    ```
 *   (1.) 判断 x:
 *      + Otherwise, if x is an object or function, Let then be x.then (如果 x 是一个对象或函数，那么设为 x.then)
 *      + x 不能是 null
 *      + x 是普通值直接 resolve(x)
 *      + x 是对象或者函数 (包括 promise), 则 let then = x.then
 *      + (2.) 当 x 是对象或者函数 (默认 promise)
 *          - 声明了 then
 *          - 如果取 then 报错，则走 reject()
 *          - 如果 then 是个函数，则用 call 执行 then, 第一个参数是 this, 后面是成功的回调和失败的回调
 *          - 如果成功的回调还是 promise, 就递归继续解析 (3.) 成功和失败只能调用一个所以设定一个 called 来防止多次调用
 */
function resolvePromise(promise2, x, resolve, reject) {
    // 循环引用报错
    if (x === promise2) {
        // reject 报错: 监测到 promise 的链接周期
        return reject(new TypeError("Chaining cycle detected for promise."));
    }
    // 防止多次调用
    let called;
    // x 不是 null 且 x 是对象或者函数
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
        try {
            // A+ 规定，声明 then = x 的 then 方法
            let then = x.then;
            // 如果 then 是函数，就默认是 promise 了
            if (typeof  then === "function") {
                // 就让 then 执行第一个参数是 this 后面是成功的回调和失败的回调
                then.call(
                    x,
                    (y) => {
                        // 成功的和失败的只能调用一个
                        if (called) return;
                        called = true;
                        // resolve 的结果依旧是 promise 那就继续解析
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    (err) => {
                        // 成功和失败的只能调用一个
                        if (called) return;
                        called = true;
                        // 失败了也就失败了
                        reject(err);
                    }
                )
            } else {
                // 直接成功即可
                resolve(x);
            }
        } catch(e) {
            // 也属于失败
            if (called) return;
            called = true;
            // 取 then 出错了那就不要在继续执行了
            reject(e);
        }
    } else {
        resolve(x);
    }
}


/** # 6. resolve() 方法: 返回一个状态为 RESOLVED 的 promise 对象 */
Promise.resolve = function(val) {
    return new Promise((resolve, reject) => {
        resolve(val);
    })
};

/** # 7. reject() 方法: 返回一个状态为 REJECTED 的 promise 对象 */
Promise.reject = function(val) {
    return new Promise((resolve, reject) => {
        reject(val);
    })
};

/** # 8. race(arr) 方法: 提供竞争机制，返回最早发生状态改变的元素 */
// 原文章内写的并不对，所以代码只写到这里
//


/** # 9. all(arr) 方法(获取所有的 promise, 都执行 then, 把结果放到数组，一起返回)。
 * 当数组内所有元素状态都发生改变后，按照顺序返回结果数组 */
// 原文章内写的并不对，所以代码只写到这里



/*
 * let p = new Promise (
 *     // function 函数传入到 Promise 对象中就是 executor 函数
 *     function (resolve, reject) {
 *         setTimeout(function () {
 *             resolve(1);
 *         }, 500)
 *     }
 * );
 * p.then(
 *     function (data) { console.log(data)},
 *     // data => console.log(data)
 * )
 */



let p = new Promise (
    // function 函数传入到 Promise 对象中就是 executor 函数
    function (resolve, reject) { resolve(0) }
);
let p2 = p.then(
    // function (data) { console.log(data)}
    (data) => {
        // 循环引用，自己等待自己完成，一辈子完不成
        return p2;
    }
);
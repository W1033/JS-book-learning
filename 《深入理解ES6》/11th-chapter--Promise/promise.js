/*Crated in 2017/12/20.*/

// Promise 不够中立:   https://juejin.im/post/5abfdfb5f265da237a4d2708
// 賀師俊: 為什麼 "提示不夠中立" 不夠中立   https://zhuanlan.zhihu.com/p/35082528


// https://www.zhihu.com/question/35905242/answer/65974599


/*
 * 为什么 V8 引擎那么快？
 * https://blog.csdn.net/horkychen/article/details/7761199?utm_source=tuicool
 * */

/**
 *  第 11 章 Promise 与异步编程 (注: console.dir(Promise) 打印可看到 Promise 就是一个构造函数)
 *  1. 异步编程的背景知识
 *    + 事件模型
 *    + 回调模式
 *  2. Promise 的基础知识
 *    + Promise 的生命周期
 *    + 创建未未完成的 Promise
 *    + 创建已处理的 Promise
 *    + 执行器错误
 *  3. 全局的 Promise 拒绝处理
 *    + Node.js 环境的拒绝处理
 *    + 浏览器环境的拒绝处理
 *  4. 串联 Promise
 *    + 捕获错误
 *    + Promise 链的返回值
 *    + 在 Promise 链中返回 Promise
 *  5. 响应多个 Promise
 *    + Promise.all() 方法
 *    + Promise.race() 方法  race /reɪs/ n.种族，竞赛，属，种
 *  6. 自 Promise 继承
 *  7. 基于Promise 的异步任务执行
 *   小结
 * */


/** 1. 异步编程的背景知识 --> 事件模型 */

/** 1. 异步编程的背景知识 --> 回调模式 */
// 详细信息见: 同级目录 nodejs-example/promise-use-example.js

const fs = require("fs");

/*let path = "../nodejs-example/bb.txt";
let data = Buffer.from([60, 230, 150, 135, 228, 187, 182, 229, 134, 133, 229, 174, 185, 62]);
// w: 打开文件用于写入，覆盖之前的内容。 a: 打开文件追加内容
let options = {encoding: "utf8", flag: "a",};
let callback = (err) => {
    if (err) throw err ;
    // 这里需用同步的读取文件 (readFileSync) , 因为不确定异步写入 (writeFile)什么时候执行完毕
    console.log(fs.readFileSync(path, "utf8"));
};
fs.writeFile(path, data, options, callback);*/


/** 为什么要使用 Promise?
 *  : 通过上面的示例可以看到 如果我们需要在 fs.readFileSync 内在调用别的方法就要接着在内部写嵌套，
 *  这样就导致代码结构混乱也不易于维护。
 *  书上的说法是: 例如，并行执行2个异步操作，当2个操作都结束时通知你: 或者同时进行2个异步操作，只取
 *  优先完成的操作结果。 在这些情况下，你需要跟踪多个回调函数并清理这些操作，而 Promise 就能很好地
 *  改进这样的情况。
 * */


/** 2. Promise 的基础知识 --> Promise 的生命周期 */

/** 2. Promise 的基础知识 --> 创建未完成的 Promise  */
function fnReadFile(filename) {
    /* 此示例中， Node.js 原生的 fs.readFile() 异步调用被包装在一个 Promise 中。执行器要么传递
     * 错误对象给 reject() 函数， 要么传递文件内容给 resolve() 函数。 */
    // 要记住执行器会在 readFile() 被调用时立即运行。
    return new Promise(function (resolve, reject) {
        // 触发异步操作
        fs.readFile(filename, {encoding: "utf8"}, function (err, contents) {
            // 检查错误
            if (err) {
                reject(err);
                return;
            }
            // 读取成功: 调用 resolve() 后触发一个异步调用，传入 then() 和 catch() 方法的
            // 函数会被添加到任务队列中并异步执行。
            resolve(contents);
        })
    })
}

let promise = fnReadFile("nodejs-example/bb.txt");
// 同时监听完成和拒绝
promise.then(
    // 完成
    function (contents) {
        console.log(contents);
        console.log("contents内容输出完毕");
    },

    // 拒绝
    function (err) {
        console.log(err.message)
    }
);

/** 2. Promise 的基础知识 --> 创建已处理的 Promise  */
/* P245: - (1) 使用 Promise.resolve(): Promise.resolve() 方法只接受一个参数并返回
 * 一个完成的 Promise, 也就是说不会有任务编排的过程，而且需要向 Promise 添加一至多个完
 * 成处理程序来获取值。例如: */
let oPro = Promise.resolve(42);
// 由于该 Promise 永远不会存在拒绝状态，因而该 Promise 的拒绝处理程序永远不会被调用。
oPro.then((value) => {
    console.log(value);
});

/* - (2) 使用 Promise.reject()  */

/* 非 Promise 的 Thenable 对象 */

/** 2. Promise 的基础知识 --> 执行器错误 */
/* P247: 如果执行器内部抛出一个错误，则 Promise 的拒绝处理程序就会被调用。 */


/** 3. 全局的 Promise 拒绝处理 */

/** 3. 全局的 Promise 拒绝处理 --> Node.js 环境的拒绝处理 */
// process /'prəʊses/ n.程序、进程、 vt.处理、加工
/* P248: 在 Node.js 中，处理 Promise 拒绝时会触发 process 对象上的2个事件:
 *  - (1) unhandledRejection (未处理的拒绝) 在一个事件循环中, 当 Promise 被拒绝，
 *  并且没有提供拒绝处理程序时，触发该事件。
 *  - (2) rejectionHandled (拒绝处理) 在一个事件循环中，当 Promise 被拒绝时，若
 *  拒绝处理程序被调用，触发该事件。
 * */

// P250: 下面是一个简单的未处理拒绝跟踪器:
let possiblyUnhandledRejections = new Map();
// 如果一个拒绝没被处理，则将它添加到 Map 集合中
process.on("unhandleRejection", function (reason, promise) {
    // set() 方法向 Map 集合中添加项: 每当 unhandledRejection 被触发，Promise
    // 及其拒绝原因就会被添加到此 Map 中。
    possiblyUnhandledRejections.set(promise, reason);
});
// 每当 rejectionHandled 被触发，已被处理的 Promise 就会从这个 Map 中被移除。
process.on("rejectionHandled", function (promise) {
    possiblyUnhandledRejections.delete(promise);
});

setInterval(function () {
    possiblyUnhandledRejections.forEach(function (reason, promise) {
        console.log(reason.message ? reason.message : reason);
        // 做些什么来处理这拒绝
        handleRejection(promise, reason);
    });
    possiblyUnhandledRejections.clear();

}, 60000);


/** 3. 全局的 Promise 拒绝处理 --> 浏览器环境的拒绝处理 */







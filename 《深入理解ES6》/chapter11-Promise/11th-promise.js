
(function() {
    function pms1() {
        return new Promise((resolve, reject) => {
            // console.log("executor function body");

            // resolve("执行任务 1 成功");

            // - 下面添加 setTimeout() 超时调用, 不管时间设置为多少, 都会等待时间
            //   执行完后,按顺序输出结果, 因为 then() 也是添加到
            setTimeout(() => {
                resolve("执行任务 1 成功");
            }, 2000)
        });
    }

    // 第 1 个回调: 执行任务 1 成功
    // 第 2 个回调: 执行任务 2 成功
    // 第 3 个回调: 执行任务 3 成功
    pms1().then((data) => {
        console.log(`第 1 个回调: ${data}`);
        return '执行任务 2 成功';
    }).then((data) => {
        console.log(`第 2 个回调: ${data}`);
        return '执行任务 3 成功';
    }).then((data) => {
        console.log(`第 3 个回调: ${data}`);
        console.log("---------");
    });
})();


(function() {
    // 输出顺序为: 3, 4, 6, 8, 7, 5, 9 call resolve(): run resolve, 2, 1
    setImmediate(() => { console.log(1) }, 0);
    setTimeout(() => { console.log(2) }, 0);
    new Promise((resolve) => {
        console.log(3);
        resolve("run resolve");
        console.log(4);
    }).then((data) => {
        console.log(5);
        console.log(`9 call resolve(): ${data}`);
    });
    console.log(6);
    process.nextTick(() => { console.log(7); });
    console.log(8);
})();




/** 3. 全局的 Promise 拒绝处理 --> Node.js 环境的拒绝处理 */
// process /'prəʊses/ n.程序、进程、 vt.处理、加工
/* P248: 在 Node.js 中，处理 Promise 拒绝时会触发 process 对象上的2个事件:
 *  - (1) unhandledRejection (未处理的拒绝) 在一个事件循环中, 当 Promise 被拒绝，
 *  并且没有提供拒绝处理程序时，触发该事件。
 *  - (2) rejectionHandled (拒绝处理) 在一个事件循环中，当 Promise 被拒绝时，若
 *  拒绝处理程序被调用，触发该事件。
 * */

// P250: 下面是一个简单的未处理拒绝跟踪器:
// let possiblyUnhandledRejections = new Map();
// // 如果一个拒绝没被处理，则将它添加到 Map 集合中
// process.on("unhandleRejection", function (reason, promise) {
//     // set() 方法向 Map 集合中添加项: 每当 unhandledRejection 被触发，Promise
//     // 及其拒绝原因就会被添加到此 Map 中。
//     possiblyUnhandledRejections.set(promise, reason);
// });
// // 每当 rejectionHandled 被触发，已被处理的 Promise 就会从这个 Map 中被移除。
// process.on("rejectionHandled", function (promise) {
//     possiblyUnhandledRejections.delete(promise);
// });
//
// setInterval(function () {
//     possiblyUnhandledRejections.forEach(function (reason, promise) {
//         console.log(reason.message ? reason.message : reason);
//         // 做些什么来处理这拒绝
//         handleRejection(promise, reason);
//     });
//     possiblyUnhandledRejections.clear();
//
// }, 60000);








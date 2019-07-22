// 3.1.1 未来值 --> 2.Promise 值

/*
 * - (1)、Promise.all([...]) 接受一个 promise 数组并返回一个新的 promise
 *   这个新 promise 等待数组中的所有 promise 完成。
 * - (2)、这个 promise 决议之后，我们取得收到的 x 和 y 值并加在一起
 * - (3)、values 是来自于之前决议的 promise 的消息数组。(tip: 详细示例见:《深入理解ES6》
 *   \11th-chapter--Promise\20180903-Promise-github-完整版
 *   \repromise-master\test\test4.html)
 */
function add(xPromise, yPromise) {

    console.log("xPromise: ", xPromise);

    // (1)
    return Promise.all([xPromise, yPromise])
        // (2)
        .then(function(values) {
        // (3)
        return values[0] + values[1]
    })
}


function fetchX() {
    return new Promise(function (resolve, reject) {
        resolve(200)
    })
}
function fetchY() {
    return new Promise(function (resolve, reject) {
        resolve(4)
    })
}

// fetchX() 和 fetchY() 返回相应值的 promise，可能已经就绪，也可能以后就绪
// add(fetchX(), fetchY()).then(function(sum) {
//     console.log("sum: ", sum);  // sum:  204
// });
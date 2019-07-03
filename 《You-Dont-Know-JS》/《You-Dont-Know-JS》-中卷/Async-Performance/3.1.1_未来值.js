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


// function fetchX() {
//     return new Promise(function (resolve, reject) {
//         resolve(200)
//     })
// }
// function fetchY() {
//     return new Promise(function (resolve, reject) {
//         resolve(4)
//     })
// }
//
// // fetchX() 和 fetchY() 返回相应值的 promise，可能已经就绪，也可能以后就绪
// add(fetchX(), fetchY()).then(function(sum) {
//     console.log("sum: ", sum);  // sum:  204
// });

const a = {};
const b = {key: 'b'};
const c = {key: 'c'};
a[b] = 123;
a[c] = 456;
console.log(a[b]);




Function.prototype.bind = function() {
    // 保存原函数
    let self = this;
    // 需要绑定的 this 上下文
    let context = [].shift.call(arguments);
    // 剩余的参数转成数组
    let args = [].slice.call(arguments);
    return function() {
        // 执行新的函数的时候，会把之前传入的 context 当作新参数体内的 this
        // 并且组合两次分别传入的参数，作为新函数的参数
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)))
    }
};

const person = { name: "Lydia" };

function sayHi(age) {
    console.log(`${this.name} is ${age}`);
}

// sayHi.call(person, 21);
sayHi.bind(person, 21);

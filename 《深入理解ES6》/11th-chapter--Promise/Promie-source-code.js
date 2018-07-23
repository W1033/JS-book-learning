// [js 异步之 Promise 源码分析] (https://juejin.im/entry/599968f6518825244630f809)
// https://download.csdn.net/download/tydqcjj/10036125

// 最簡單的異步執行
let basicAsync = (callback) => {
    setTimeout(()=> { callback(1) }, 1000)
};
basicAsync(function(data) { console.log(data) });   // 1s 后輸出1



// 添加代码执行错误时给出提示
let maybeAfterOneSecond = function(callback, errorback) {
    setTimeout(function() {
        // 进行判断情况，是执行成功的回调，还是执行错误的回调
        if (Math.random() < .5) {
            callback("输出1");
        } else {
           errorback(new Error("Can't provide one."))
        }
    }, 1000);
};
maybeAfterOneSecond(
    function(data) { console.log(data); },
    function(err) { console.log(err); }
);



// ~~~~~~~~~~~~~~~~~~~~ Promise ~~~~~~~~~~~~~~~~~~~~

/** 二、Promise 基本雏形设计 */

/*
 *   1.上面的 maybeAfterOneSecond 同时提供回调和错误处理，但是这种写法实在太定制了，并不好。
 *   所以考虑到大多数的情况，代替最简单的返回值和抛出异常，我们更希望函数通常会返回一个对象用来
 *   标识最后执行成功或者失败的结果，而这个返回的对象是 promise。从名字上理解，promise 表示
 *   承诺，那么最终这个 promise (承诺) 是要被 resolve (履行，执行)掉的。
 *
 *   接下来我们开始迭代设计 promise. 我们先设计一个具有 then 方法的 promise 模型，通过 then
 *   方法，我们能注册回调函数并延迟执行。
 */
let maybeAfterOneSecondBack = function() {
    let callback;
    setTimeout(function() {
        callback("maybeAfterOneSecondBack 一秒后的输出");
    }, 1000);
    return {
        // 此函数返回一个 then 方法，下面调用时传入一个回调函数进来
        then: function(_callback) {
            // 把传入的回调函数的指针(此处不包含参数)赋值给内部定义的 callback;
            callback = _callback;
        }
    }
};
maybeAfterOneSecondBack().then(callback1);
function callback1(data) {
    console.log(data);
}



/*  2. 正常情况下我们希望可以接受任意数量的回调，且不管是否超时，仍然可以继续注册回调。为了实现
 *  这些，我们将创建一个包含2个功能的 promise 对象。
 *
 *  我们暂时设计了一个 defer 对象，他的返回值一个包含2个部分的对象 (这个对象就是 promise):
 *  一个用来注册观察者 (就是 "then" 方法添加回调);
 *  一个用来通知所有的观察者执行代码 (就是 resolve 去执行之前添加的所有回调)。
 *
 *  当 promise 没有被 resolve 之前，所有回调函数都会存储在一个 "pending" 的数组中。
 *  当 promise 被 resolve 之后，立即执行之前存储的所有回调函数，当回调函数全部执行完毕之后，我们
 *  将根据 "pending" 来区分状态。
 */
let defer = function() {
    let pending = [], value;
    return {
        resolve: function(_value) {
            value = _value;
            for (let i = 0; i < pending.length; i++) {
                // pending数组: [ 0: callback2(data) ]
                /*  (pending[i])(value)
                 * 相当于下面的匿名函数自执行(Immediately-invoked function expression):
                 *  (function callback2(data) {
                 *    console.log(data);
                 *  })(value);
                 */
                (pending[i])(value);
            }
            pending = undefined;
        },
        then: function(_callback) {
            if (pending) {
                // 如果 pending 数组存在，就把传入的回调函数推入其中
                pending.push(_callback);
                console.log("输出 pending 数组为:", pending);
            } else {
                _callback();
            }
        }
    }
};
let oneOneSecondLater = () => {
    // 首先调用 defer() 函数，此函数返回一个对象
    let result = defer();
    setTimeout(() => {
        // 1s 后调用返回对象下的 resolve() 方法，并传入一个参数 1
        result.resolve(1);
    }, 1000);
    return result;
};
// 首先调用 defer()函数返回对象下的 then() 方法，并传入一个名为 callback2 的回调函数
oneOneSecondLater().then(callback2);
function callback2(data) {
    console.log(data);
}

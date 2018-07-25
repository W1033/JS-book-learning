// [js 异步之 Promise 源码分析] (https://juejin.im/entry/599968f6518825244630f809)
// https://download.csdn.net/download/tydqcjj/10036125

// 最簡單的異步執行
let basicAsync = function(callback) {
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
/*let defer = function() {
    let pending = [], value;
    return {
        resolve: function(_value) {
            value = _value;
            for (let i = 0; i < pending.length; i++) {
                // pending数组: [ 0: callback2(data) ]
                /!*  (pending[i])(value)
                 * 相当于下面的匿名函数自执行(Immediately-invoked function expression):
                 *  (function callback2(data) {
                 *    console.log(data);
                 *  })(value);
                 *!/
                // 所以下面的 callback2 回调函数是在这里调用的
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
}*/



/* 3. 到此时，我们已经可以做到:
 *  (1.) 可以任意时间添加任意多的回调。
 *  (2.) 可以认为决定什么时候 resolve。
 *  (3.) 当 promise 被 resolve 之后，还可以添加回调，只不过此时立即就执行了。
 *  但是还有一些问题，比如:
 *   (1.) defer 可以被 resolve 执行多次，我们并没有给出一个错误的提示。而且事实上为了避免恶意或者
 *   无意的不断去 resolve, 我们仅允许第一次调用可以通知回调并执行。
 *   (2.) 添加回调只能通过 defer.then 添加，不能链式调用 defer.then(callback).then(callback)。
 *   接下来我们先修正第一个问题:
 */

/** 三、 promise 职责分离:
 *  在实现链式回调之前，为了后期结构，我们希望对我们的 promise 进行职责区分，一个注册观察者，一个执行
 *  观察者。 根据最少授权原则，我们希望如果授权给某人一个 promise, 这里只允许他增加观察者； 如果授权
 *  给某人 resolver, 他应该仅仅能决定什么时候给出解决方案。因为大量实验表明任何不可避免的越权行为会
 *  导致后续的改动变得很难维护。(其实就是希望把添加回调的 then 功能移植到 promise 中， 从 defer.then
 *  转变为 defer.promise.then, 保证功能的纯粹性)
 * */

/*let defer = function() {
    let pending = [], value;
    return {
        resolve: function(_value) {
            // 3. 解决 resolve 执行多次
            if (pending) {
                value = _value;
                for (let i = 0; i < pending.length; i++) {
                    (pending[i])(value)
                }
                pending = undefined;
            } else {
                throw new Error("A promise can only be resolved once.")
            }
        },
        // 三、 promise 职责分离
        promise: {
            then: function(_callback) {
                if (pending) {
                    // 如果 pending 数组存在，就把传入的回调函数推入其中
                    pending.push(_callback);
                } else {
                    _callback();
                }
            }
        }
    }
};
let oneOneSecondLater = () => {
    let result = defer();
    setTimeout(() => {
        result.resolve(1);
    }, 1000);
    return result;
};
oneOneSecondLater().then(callback2);
function callback2(data) {
    console.log(data);
}*/


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 例子: 写一个相加的函数，接受2个回调函数返回的数字相加。----start
let twoNumPlus = function(callback) {
    let a, b;
    let consider = function() {
        if (a === undefined || b === undefined) { return; }
        callback(a + b);
    };

    oneNum(function(_a) {
        a = _a;
        consider();
    });
    oneOtherNum(function(_b) {
        b = _b;
        consider();
    });
};

function oneNum(oneCallback) {
    oneCallback(1);
}

function oneOtherNum(oneOtherCallback) {
    oneOtherCallback(2)
}

twoNumPlus(function(c) {
    console.log(c);
});
// 例子: 写一个相加的函数，接受2个回调函数返回的数字相加。----over

// 我们希望用更少的代码去实现上面的需求，比如就像下面这样:
/*let a = oneNum();
let b = oneOtherNum();
let c = a.then(function(a) {
    return b.then(function(b) {
        return a + b;
    })
});*/
/* 这个例子其实想表达的就是实现 callback 返回值得传递，如 callback1 的返回值传给
 * callback2, 将 callback2 的返回值传给 callback3. 为了实现上面例子的效果，我们
 * 需要实现以下几点:
 *  - 每个 then 方法胡必须返回一个 promise
 *  - 每个 promise 被 resolve 后，返回的必然是一个新的 promise 或者是一个执行过的值
 *  - 返回的 promise 最终可以带着回调的值被 resolve 掉 (这句话有点难翻译，感觉就是
 *  promise.resolve(_value));
 */

// 我们实现一个函数可以将获得的值传给下一个回调使用
/*let ref = function(value) {
    return {
        then: function(callback){
            callback(value);
        }
    }
}*/

// 不过考虑到有时候返回的值不仅仅是一个值，而且还可能是一个 promise 函数，所以要加一个判断
/*let ref = function(value) {
    // 这样在使用中就不需要考虑传入的值是一个普通值还是一个 promise 了。
    // 注: 检查 value 存在 并且 value 下有 then 方法(当 value 是函数时才会有 then 方法);
    if (value && typeof value.then === "function") {
        return value;
    }
    return {
        then: function(callback) {
            callback(value);
        }
    }
}*/

// 接下来，为了能使 then 方法也能返回一个 promise, 我们来改造下 then 方法；我们强制将
// callback 的返回值传入下一个 promise 并立即返回。 这个例子存储了回调的值，并在下一个回调
// 中执行了。但是上面第三点没有实现，因为返回值可能是一个 promise, 那么我们继续改进一下方法:
/*let ref = function(value) {
    if (value && typeof value.then === "function") {
        return value;
    }
    return {
        then: function(callback) {
            // 通过这一步增强之后，基本上就可以做到获得上一个回调值并不断链式调用下去了。
            return ref(callback(value));
        }
    }
};*/


/*
 *    接下来我们考虑一种比较复杂的情况，就是 defer 中存储的回调会在未来某个时间调用。于是
 * 我们需要在 defer 里面将回调进行一次封装，我们将回调中执行完后通过 then 方法去驱动下一个
 * promise 并传递一个返回值。
 *    此外，resolve 方法应该能处理本身是一个 promise 的情况，resolve 可以将值传递给 promise,
 * 因为不管是 ref 还是 defer 都是可以返回一个 then 方法。 如果 promise 是 ref 类型的，将会
 * 通过 then(callback) 立即执行回调。如果 promise 是 defer 类型的，callback 暂时被存储起来，
 * 依靠下一个 then(callback) 调用才能执行；所以变成了 callback 可以监听一个新的 promise 以便
 * 能获取完全执行后的 value.
 *    根据以上要求你，得到了下面最终版的 promise:
 */

let isPromise = function(value) {
    return value && typeof value.then === "function";
};

let ref = function(value) {
    if (value && typeof value.then === "function") {
        return value;
    }
    return {
        then: function(callback) {
            return ref(callback(value));
        }
    }
};

let defer = function() {
    let pending = [], value;
    return {
        resolve: function(_value) {
            if (pending) {
                // values wrapped in a promise
                value = ref(_value);
                for (let i = 0, ii= pending.length; i < ii; i++) {
                    let callback = pending[i];
                    // then called instead
                    value.then(callback);
                }
            }
        },

        promise: {
            then: function(_callback) {
                let result = defer();
                // callback is wrapped so that its return value is captured
                // and used to resolve the promise that "then" returns
                let callback = function(value) {
                    result.resolve(_callback(value));
                };
                if (pending) {
                    pending.push(callback);
                } else {
                    value.then(callback);
                }
                return result.promise;
            }
        }
    };
};

let run = defer();
run.promise.then(function(value) {
    console.log(value);    // 6
    return 2;
}).then(function(value) {
    console.log(value);    // 2
});
run.resolve(6);


/** Created on 2018/3/9. */

/*--------------------------------------------------------*/
// 1. 下面的对象字面量创建对象 = new Object();
var a1 = {name: "a Object"};


// <button id="btnId"></button>
// $("#btnId").click(function () {
//     // this 输出为: <button id="btnId"></button>
//     console.log(this);
// });


function test() {
    console.log(this);
}

// 因为 test 挂载在 window 上
// test();      // 输出: window

// 一般都是把构造函数通过 new 调用，此处的写法不严谨，但是jq本身也不是第一个字母大写，所以不能说此处为错误
new test();     // 输出: test {}


test.call(a1);   // 输出: {name: "a Object"}
/*--------------------------------------------------------*/

/** 把类数组转换为数组 : 在 batchTransfer.jsp 中使用示例
 *
 *   对 arguments 对象使用 Array.prototype.slice() 方法可以将其转换为数组。
 *   而采用同样的方法，也可以将 NodeList 对象转换为数组:
 *   //在 IE8 及之前版本中无效
 *   var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);
 *   ------《js 高程》
 */
var classArr = {};
console.log(Array.prototype.slice.call(classArr));


/** 3. 判断一个对象是否为数组 */
function isArray(arg) {
    if (arg && typeof arg === "object") {
        return Object.prototype.toString.call(arg) === "[object Array]";
    }
    return false;
}


/** 数组的 splice() 方法: js高程 5.2.6 */
var myArr = [1, 2, 3, 4, 5];
// splice(): 參數1: 要删除的第一项的位置  參數2: 删除的项数
// 从索引为 1 開始刪除 3 项，删除后把 5,2,1 插入
myArr.splice(1, 3, 5, 2, 1);         // 输出: [1, 5, 2, 1, 5]
console.log(myArr);

/*--------------------------------------------------------*/



/*--------------------------------------------------------*/

/** 详细使用见: 4th-扩展对象的功能性.js */
// 许多 js 库中都有类似的 mixin 方法:
// receiver /rɪ'siːvə/ n.接收器  supplier /səˈplaɪə/ n.提供者
// Object.assign(receiver, supplier)
function EventTarget() { /**/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function (parameter) {
        console.log(parameter);
    },
    on: function () { /**/}
};
const myObj = {};
Object.assign(myObj, EventTarget.prototype);


/* [20180915] --> 前端面试指南.pdf  */
/** 浅拷贝: 浅拷贝即只能解决第一层拷贝的问题，如果对象的属性，还是一个对象的话，就不能解决了。 */
/** 浅拷贝: 第一种方法 --> 通过 Object.assign 来解决 */
let aa = { age: 1, };
let bb = Object.assign({}, aa);
aa.age = 2;
console.log("bb.age", bb.age);  // 1
console.log("aa.age", aa.age);  // 2

/** 浅拷贝: 第二种方法 --> 通过展开运算符 (...) 来解决 */
let aaa = { age: 60 };
// 此处展开运算符 ... 表示代表 aaa 对象内的所有属性和方法
let bbb = {...aaa};
aaa.age = 20;
console.log("bbb.age", bbb.age);    // 60
console.log("aaa.age", aaa.age);    // 20



/**
 * 深拷贝: 通过 JSON.parse(JSON.stringify(object))来解决.
 * JSON.parse(): 将 JSON 数据解析为 js 对象。
 * JSON.stringify(): 将对象序列化为 JSON 字符串
 * */
let aaaa = {
    age: 22,
    jobs: {
        first: "FE"
    }
};
let bbbb = JSON.parse(JSON.stringify(aaaa));
aaaa.jobs.first = "native";
console.log("bbbb.jobs.first", bbbb.jobs.first);    // FE
console.log("aaaa.jobs.first", aaaa.jobs.first);    // native
/**
 * # 但是这个方法也有局限性:
 *   1. 会忽略 undefined
 *   2. 不能序列化函数
 *   3. 不能解决循环用的对象
 * 如果数据中含有以上 3 种情况，可以使用 lodash 的深拷贝函数。
 *  */

/*--------------------------------------------------------*/

/* [20180915]-add: */
/**
 * debounce /di'bauns/  n. 防抖动
 * throttle /'θrɒt(ə)l/ n. 节流
 * 1. 函数防抖 (debounce): 在频繁触发的情况下，只在触发的最后一次调用一次，
 * 2. 函数节流 (throttle): 是在高频触发的情况下，为了防止函数的频繁调用，将其限制在一段时间内
 *    只会调用一次。
 *
 *  underscore debounce 源码
 */

// (1) accumulate /ə'kjuːmjʊleɪt/  vt & vi. 积累，累积
// (2) explicit  /ɪk'splɪsɪt/  adj. 明确的, 明晰的
// (3) similar   /'sɪmɪlə/     adj. 类似, 相似
// (4) parameter /pə'ræmɪtə/   n. 参数


/* Some functions take a variable number of arguments, or a few expected arguments
 * at he begging and then a variable number of values to operate on. This helper
 * accumulates(1) all remaining arguments past the function's arguments length (or an
 * explicit(2) `startIndex`), into an array that becomes the last arguments. Similar(3)
 * to ES6's "rest parameter(4)".
 * 一些函数采用可变数量的参数，或者在开头使用一些预期的参数，然后使用可变数量的值来操作。这个帮助器将
 * 超出函数参数长度的所有剩余参数 (或显示的 `startIndex`) 累积到一个成为最后一个参数的数组中。与
 * ES6 的 "不定参数" 类似。 ES6-不定参数-见: 《深入理解ES6》\3rd chapter--函数\3rd-function.js
 */
let restArguments = function(func, startIndex) {
    startIndex = startIndex == null ? func.length -1 : +startIndex;
    return function() {
        var length = Math.max(arguments.length - startIndex, 0),
            rest = Array(length),
            index = 0;
        for (var i = 0; i< length; i++) {
            rest[index] = arguments[index + startIndex];
        }
        switch (startIndex) {
            case 0: return func.call(this, rest);
            case 1: return func.call(this, arguments[0], rest);
            case 2: return func.call(this, arguments[0], arguments[1], rest);
        }
        var args = Array(startIndex + 1);
        for (index = 0; index < startIndex; index++) {
            args[index] = arguments[index];
        }
        args[startIndex] = rest;
        return func.apply(this, args);
    }
};

// Delays a function for the given number of milliseconds, and then calls it
// with the arguments supplied.
// 将函数延迟给定的毫秒数，然后使用提供的参数调用它。
let _delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
        return func.apply(null, args);
    }, wait)
});

let _debounce = function(func, wait, immediate) {
    var timeout, result;
    var later = function(context, args) {
        timeout = null;
        if (args) {
            result = func.apply(context, args);
        }
    };
    var debounced = restArguments(function(args) {
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(this, args);
            }
        } else {
            timeout = _delay(later, wait, this, args );
        }
        return result;
    });
    debounced.cancel = function() {
       clearTimeout(timeout);
       timeout = null;
    };
    return debounced;
};


/*--------------------------------------------------------*/


/*--------------------------------------------------------*/
/*--------------------------------------------------------*/



/*--------------------------------------------------------*/
/*--------------------------------------------------------*/



/* Create date: 2018-07-04 */

/** ## 什么是迭代器(iterator)?:
 *   迭代器是被设计专用于迭代的对象，带有特定接口。所有的迭代对象都拥有 next() 方法，会返回一个结果对象。
 *  该结果对象有2个属性: (1)对象下一个值的 value. (2)一个布尔类型的 done, 其值为 true 时表示没有更多
 *  值可提供使用。迭代器持有一个指向集合位置的内部指针，每当调用了 next() 方法，迭代器就会返回相应的下一个值。 **/

// ES5 - 创建迭代器:  createIterator-es5.html
function es5CreateIterator(items) {
    let i = 0;
    return {
        next: function () {
            let done = (i >= items.length);
            let value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            }
        }
    }
}

let es5Iterator = es5CreateIterator([1, 2, 3]);

console.log(es5Iterator.next());   // {done: false, value: 1}
console.log(es5Iterator.next());   // {done: false, value: 2}
console.log(es5Iterator.next());   // {done: false, value: 3}
console.log(es5Iterator.next());   // {done: true, value: undefined}


/** ## 什么是生成器(generator)?:
 *   生成器是能返回一个迭代器的函数。生成器函数由放在 function 关键字之
 * 后的一个星号 (*) 来表示，并能使用新的 yield 关键字。将星号紧跟在 function 关键字之后，或是在
 * 中间留出空格，都是没问题的，如下下例: **/

// 生成器
function* createIterator(items) {
    for (let i = 0; i < items.length; i++) {
        // yield 关键字也是 ES6 新增
        yield items[i];
    }

    // yield 关键字只能用在生成器内部，用于其他任意位置都是语法错误，即使在生成器内部的函数中也不行，如下例:
    /*
    * function *createIterator (items) {
    *    items.forEach(function (item) {
    *       // 语法错误
    *       yield item + 1;
    *    })
    * }
    * */
}

let iterator = createIterator([1, 2, 3]);

console.log(iterator.next());   // {done: false, value: 1}
console.log(iterator.next());   // {done: false, value: 2}
console.log(iterator.next());   // {done: false, value: 3}
console.log(iterator.next());   // {done: true, value: undefined}


/** 什么是生成器? --> 生成器函数表达式 **/
let createIterator2 = function* (items) {
    // 代码同上
};
// 调用同上


/** 什么是生成器? --> 生成器对象方法: **/
let o = {
    createIterator: function* (items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i]
        }
    }
};
let secondIterator = o.createIterator([1, 2, 3]);


/** ## 可迭代对象与 for-of 循环:
 *     与迭代器紧密相关的是，可迭代对象 (iterable) 是包含 Symbol.iterator 属性的对象。这个
 *  Symbol.iterator 知名符号定义了为指定对象返回迭代器的函数。在 ES6 中，所有的集合对象 (数组，
 *  Set 与 Map) 以及字符串都是可迭代对象，因此他们都被指定了默认的迭代器。 可迭代对象别设计用于
 *  与 ES 新增的 for-of 循环配合使用。  **/
let values = [1, 2, 3];
// for-of 循环每执行一次都会调用可迭代对象的 next() 方法，并将迭代器返回的结果对象的 value
// 属性存储在一个变量中，循环将持续执行这一过程直到返回对象的 done 属性的值为 true.
for (let num of values) {
    console.log(num);
}

/** 可迭代对象与 for-of 循环 --> 访问默认迭代器 **/
let nums = [1, 2, 3];
// 可以使用 symbol.iterator 来访问对象上的默认迭代器，就像这样, 此代码获取了 nums 数组的默认迭代器，
// 并用它来迭代数组中的项。这个过程与使用 for-of 循环时在后台发生的过程一致。
let thirdIterator = nums[Symbol.iterator]();
console.log(thirdIterator.next());  // { value: 1, done: false }
console.log(thirdIterator.next());  // { value: 2, done: false }

// 既然 Symbol.iterator 指定了默认迭代器，你就可以使用它来检测一个对象是否能进行迭代，正如下例:
function isIterable(object) {
    return typeof object[Symbol.iterator] === "function";
}

console.log(isIterable([1, 2, 3]));     // true
console.log(isIterable("Hello"));       // true
console.log(isIterable(new Map()));     // true
console.log(isIterable(new Set()));     // true
console.log(isIterable(new WeakMap())); // false
console.log(isIterable(new WeakSet())); // false

/** 可迭代对象与 for-of 循环 --> 创建可迭代对象 **/
// 开发者自定义对象默认情况下不是可迭代对象，但你可以创建一个包含生成器的 Symbol.iterator 属性,
// 让他成为可迭代对象:
let collection = {
    items: [],
    * [Symbol.iterator]() {
        for (let item of this.items) {
            yield item;
        }
    }
};
collection.item.push(1);
collection.item.push(2);
collection.item.push(3);
for (let x of collection) {
    console.log(x);
}


/** ## 内置的迭代器 **/

/** 内置的迭代器 --> 集合的迭代器: **/
// ES6 具有 3 种集合对象类型: 数组、Map 与 Set. 这三种类型都有如下的迭代器，有助于搜索他们的内容:

// + entries() 迭代器: 返回一个包含键值对的迭代器
let colors = ["red", "green", "blue"];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();

data.set("title", "Understanding ES6");
data.set("format", "ebook");

for (let entry of colors.entries()) {
    console.log(entry);
}

for (let entry of tracking.entries()) {
    console.log(entry);
}
for (let entry of data.entries()) {
    console.log(entry);
}

// + values() 迭代器: 返回一个包含集合中的值得迭代器
for (let value of colors.values()) {
    console.log(value);
}
for (let value of tracking.values()) {
    console.log(value);
}
for (let value of data.values()) {
    console.log(value);
}

// + keys() 迭代器:  返回一个包含集合中的键的迭代器


// 解构与 for-of 循环
let author = new Map();
data.set("title", "Understanding ES6");
data.set("format", "ebook");
// 与使用 data.entries() 相同
for (let [key, value] of data) {
    console.log(key + "=" + value);
}

/** 内置的迭代器 --> 字符串的迭代器 **/
// ES5标准化了字符串的方括号表示法，用于访问其中的字符(即: 使用 text[0] 来获取第一个字符，以此类推)。
// 不过方括号标识发工作在码元而非字符上，因此它不能被用于正确访问双字节的字符，如此例演示:
let message = "A    B";
for (let i = 0; i < message.length; i++) {
    console.log(message[i]);
}

// 此为日语不是中文"吉"字
let text = '𠮷𠮷𠮷';
for (let i = 0; i < text.length; i++) {
    console.log(text[i]);
}

// 由于双字节字符被当做2个分离的码元来对待，此处的输出在 A 与 B 之间就有 4 个空行。 ES6 旨在为 Unicode
// 提供完全支持(相见第二章markdown)，字符串的默认迭代器就是解决字符串迭代问题的一种尝试。这样一来，借助
// 字符串默认迭代器就能处理字符而不是码元。 把上面的循环改为 for-of 得到合理的输出
for (let c of text) {
    console.log(c);
}

/** 内置的迭代器 --> NodeList 的迭代器 **/
let divs = document.getElementsByTagName("div");
for (let div of divs) {
    console.log(div.id);
}


/** ## 扩展运算符(...)与非数组的可迭代对象 **/
// 你可以不限次数地在数组字面两种使用扩展运算符，而且可以在任意位置用扩展运算符将了迭代对象的多个项
// 插入到数组，这些项在新数组中将会出现在扩展运算符对应的位置:
let smallNumbers = [1, 2, 3],
    bigNumbers = [100, 101, 102],
    allNumbers = [0, ...smallNumbers, ...bigNumbers];
console.log(allNumbers);


/** ## 迭代器高级功能 **/

/** 迭代器高级功能 --> 传递参数给迭代器 **/
// 你可以通过 next() 方法向迭代器传递参数。 当一个参数被传递给 next() 方法时，该参数就会成为生成器
// 内部 yield 语句的值。 这种能力对于更多高级功能(例如异步编程)来说是非常重要的。下面是个基本范例:
function* createIte() {
    let first = yield 1;
    let second = yield first + 2; // 4 + 2
    yield second + 3;   // 5 + 3
}

let ite = createIte();
// 对于 next() 的首次调用是一个特殊情况，传给它的任意参数都会被忽略。由于传递给 next() 的参数会成为 yield
// 语句的值，该 yield 语句指的是上次生成器中断执行处的语句; 而 next() 方法第一次被调用时，生成器函数才
// 刚刚开始执行，没有所谓的 "上一次中断处的 yield 语句" 可供赋值。因此在第一次调用 next() 时，不存在任何
// 向其传递参数的理由。
console.log(ite.next(2));   // { value: 1, done: false }
console.log(ite.next(4));   // { value: 6, done: false }
console.log(ite.next(5));   // { value: 8, done: false }
// 生成器内只有 yield first 和 yield second 现在传第三个参数 8 但函数内找不到对应 yield 语句
// 所以 value = undefined
console.log(ite.next(8));   // { value: undefined, done: true }
console.log(ite.next());    // { value: undefined, done: true }


/** 迭代器高级功能 --> 在迭代器器中抛出错误 **/
/** 迭代器高级功能 --> 生成器的 Return 语句 **/
function* createReturnIte() {
    yield 1;
    // 注意: 在扩展云算符与 for-of 循环会忽略 return 语句所指定的任意值。
    return 42;
}

let returnIte = createReturnIte();
console.log(returnIte.next());
console.log(returnIte.next());
console.log(returnIte.next());


/** 迭代器高级功能 --> 生成器委托 **/
// 在某些情况下，将2个迭代器的值合并在一起会更有用。生成器可以用星号 (*) 配合 yield 这以特殊形式来委托
// 其他的迭代器。正如生成器的定义，星号出现在何处是不重要的，只要落在 yield 关键字与生成器函数之间即可。
function* createNumberIterator() {
    yield 1;
    yield 2;
    // 此处的 3 当前生成器函数外是怎么也访问不到的
    return 3;
}

function* createRepeatingIterator(count) {
    for (let i = 0; i < count; i++) {
        yield "repeat";
    }
}

function* createCombinedIterator() {
    let result = yield* createNumberIterator();
    yield* createRepeatingIterator(result);
}

let combinedIte = createCombinedIterator();
console.log(combinedIte.next());
console.log(combinedIte.next());
console.log(combinedIte.next());
console.log(combinedIte.next());
console.log(combinedIte.next());
console.log(combinedIte.next());


/** ## 异步任务运行 **/
/** 异步任务运行 --> 一个简单的任务运行器 **/
// 由于 yield 能停止运行，并在重新开始运行前等待 next() 方法被调用，你就可以在没有回调函数的情况下
// 实现异步调用。首先，你需要一个能够调用生成器并启动迭代器的函数，就像这样:
function run(taskDef) {
    // 创建迭代器，让他在别处可用
    let task = taskDef();

    // 启动任务
    let result = task.next();

    // 递归使函数来保持对 next() 的调用
    function step() {
        // 如果还有更多要做的
        if (!result.done) {
            if (typeof result.value === "function") {
                result.value(function (err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }
                    result = task.next(data);
                    step();
                })
            } else {
                result = task.next(result.value);
                step();
            }
        }
    }

    // 开始处理过程
    step();
}

let fs = require("fs");
// 这个 readFile() 方法接受单个参数，即文件名，并返回一个能执行回调函数的函数。次回调函数会被直接传递给
// fs.readFile() 方法， 后者会在操作完成后执行回调。
function readFile(filename) {
    return function (callback) {
        fs.readFile(filename, callback);
    }
}

// 使用 yield 来运行这个任务
run(function* () {
    let contents = yield readFile("config.json");
    doSomethingWith(contents);
    console.log("Done");
});


/** 异步任务运行 --> 带数据的任务运行 **/
/** 异步任务运行 --> 异步任务运行器 **/

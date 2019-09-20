/**
 * 要取得对象上所有可枚举的实例属性，可以使用 ES5 的 Object.keys() 方法。这个方法接受一个
 * 对象作为参数，返回一个包含所有可枚举属性的字符串数组。
 */

/** ~~~~~~ 示例 1: ~~~~~~ */
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job
}

Person.prototype.sayName = function () {
    console.log(this.name);
};

let p1 = new Person("Rob", 36, 'Software Engineer');

let keys = Object.keys(Person.prototype);
console.log("keys:",keys);          // ['sayName']

let p1keys = Object.keys(p1);
console.log(p1keys);        // [ 'name', 'age', 'job' ]


/** ~~~~~~ 示例 3: ~~~~~~ */
let introduction = {
    name: 'W',
    age: 30,
    job: 'Software Engineer',
    doing: true
};
console.log(Object.keys( introduction));  // [ 'name', 'age', 'job', 'doing' ]

/**
 * - 如果想得到所有实例属性，无论它是否可枚举，可以使用
 *   Object.getOwnPropertyNames() 【取得自身属性名】方法:
 */
let keys2 = Object.getOwnPropertyNames(Person.prototype);
// 注意结果包含了不可枚举的 constructor 属性
console.log("keys2:", keys2);    // keys2: [ 'constructor', 'sayName' ]





/** ~~~~~~ 示例 2: ~~~~~~ */

/* - assign [ə'saɪn] ~~~v.分配，指定, 派，调派
 * - receiver /rɪ'siːvə/ ~~~n.接收者
 * - supplier /səˈplaɪə/ ~~~n.提供者*/

// - 混合(Mixin)是 js 中实现对象组合的一种模式。在一个 mixin 方法中，一个对象
//   接受来自另一个对象的属性和方法。许多 js 库中都有类似的 mixin 方法:
function mixin(receiver, supplier) {
    // (1)、
    Object.keys(supplier).forEach(function (key) {
        receiver[key] = supplier[key];
    })
}

function EventTarget() { }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function (parameter) {
        console.log(parameter);
    },
    on: function () { /**/
    }
};
const myObj = {};
// (2)、
mixin(myObj, EventTarget.prototype);
/* - (1)、
 *   + Object.keys() 方法取得对象上所有可枚举的实例属性。这个方法接受一个对象作为参数，
 *      返回一个包含所有可枚举属性的字符串数组。
 * - (2)、
 *   + mixin() 函数遍历 supplier 的自有属性赋并复制到 receiver 中(此处的复制只是浅复制，
 *      当属性值为对象时只复制对象的引用)。这样一来，receiver 不通过继承就可以获得新属性，
 *      请参考这段代码:
 */
// myObj 接受 EventTarget.prototype 对象的所有行为从而使 myObj 可以通过 emit() 方法
// 发布事件或通过 on() 方法订阅事件。
myObj.emit("somethingChanged");     // somethingChanged


// - ES6 新增方法: Object.assign():
//  + 上面的 mixin() 调用可以直接替换为 -- ES6 的 Object.assign().
//    即使这样 Object.assign() 仍然是潜拷贝。
Object.assign(myObj, EventTarget.prototype);
myObj.emit("somethingChange again");


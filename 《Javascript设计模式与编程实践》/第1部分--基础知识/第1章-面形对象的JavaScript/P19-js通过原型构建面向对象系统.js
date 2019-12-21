// 先来看如何用 new 运算符从构造器中得到一个对象:
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
};

let person = new Person('kell');
console.log(person.name);
console.log(person.getName());
console.log(Object.getPrototypeOf(person) === Person.prototype);
console.log('\n' +  '//' + ('*'.repeat(66)) + '\n');


/**
 * - OK, 在 JavaScript 中没有类的概念，这句话我们已经重复过很多次了。但上面命名明明调用了
 *    new Person() 吗？
 * - A: 在这里 Person 并不是类，而是构造函数，JavaScript 的函数既可以作为普通函数被调用，
 *   也可以作为构造函数被调用。 当使用 new 运算符调用函数时，此时的函数就是一个构造器。用 new
 *   运算符来创建对象的过程，实际上也只是先克隆 Object.prototype 对象，再进行一些其他额外
 *   操作的过程。 具体工程见下面 ObjectFactory 函数。
 */


const ObjectFactory = function () {

    /** javascript 中的根对象是 Object.prototype 对象。*/

    // (A)
    const obj = new Object();   // (0)
    let Constructor = Array.prototype.shift.call(arguments);    // (1)
    obj.__proto__ = Constructor.prototype;  // (3)
    let ret = Constructor.apply(obj, arguments);    // (4)

    // 确保构造器总是返回一个对象: (ret 如果是对象默认返回 ret)
    return typeof ret === "object" ? ret : obj;
};

let a = ObjectFactory(Person, "seven");

console.log(a);     // Person { name: 'seven' }
console.log(a.name);
console.log(a.getName());
console.log(Object.getPrototypeOf(a) === Person.prototype);

/*
 * - A: 在 《JavaScript 高级程序设计》内的 6.2.2 构造函数模式中，对于使用 new 操作符，调用
 *      创建构造函数的实例时，是这样解说的:
 *      + P145: 要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上
 *        会经历以下 4 个步骤:
 *          - (1) 创建一个新对象。 (tip: 即上面的 const obj = new Object)
 *          - (2) 将构造函数的作用域赋值给新对象 (因此 this 就指向了这个新对象)
 *          - (3) 执行构造函数中的代码 (为这个新对象添加属性。tip: 对应上面的(4))
 *          - (4) 返回新对象。
 */

/*
 * - (0)、从 Object.prototype 上克隆一个空对象。
 *      + 用 new 运算符来创建对象的过程，实际上也只是先克隆Object.prototype 对象，
 *        再进行一些其他额外操作。
 * - (1)、取得外部传入的构造器，此例是 Person [取得类数组的第一项，赋值给Constructor变量]
 *      + 取得 arguments 类数组的第一项: Array.prototype.shift.call(arguments);
 * - (3)、把创建的 obj 对象，指向正确的原型。(此时如果不指定默认的原型是 Object.prototype)
 *      + Io 语言或者 js 语言中的原型链查找机制，每个对象至少要先记住它自己的原型。就 js
 *        真正的实现来说，其实并不能说对象有原型，而只能说对象的构造器有原型。对于 "对象把
 *        请求委托给它自己的原型"这句话，更好的说法是对象把请求委托给它的构造器(构造函数)的原型。
 * - (4)、借用外部传入的构造器给 obj 设置属性。
 *      + 这句是重点: 在第二章的 <2.2 call和apply> 方法中有详细的讲解: ES3给 Function
 *        的原型定义了2个方法: Function.prototype.call 和 Function.prototype.apply。
 *        在实际开发中，特别是在一些函数式风格的代码编写中，call 和 apply 方法尤其有用。
 *        在 js 版本的设计模式中，这两个方法的应用也非常广泛，能熟练运用这2个方法，是我们
 *        真正成为一名 js 程序员的重要一步。
 *      + apply 和 call 的主要作用:
 *          - 1> 改变 this 指向
 *          - 2> 实现内置的 Function.prototype.bind
 *          - 3> 借用其他对象的方法
 */

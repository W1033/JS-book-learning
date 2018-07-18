/* Created on 2018/4/8 */

/**
 *  0. 将 arguments (类数组对象)转换为数组:  Array.prototype.slice(arguments)
 *  1. 把 NodeList 对象转换为数组(比如一组li):  Array.prototype.slice.call(lis);
 *  2. 取得 arguments 类数组的第一项: Array.prototype.shift.call(arguments);
 **/


function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
};

const ObjectFactory = function () {

    /** javascript 中的根对象是 Object.prototype 对象。*/
        // 从 Object.prototype 上克隆一个空对象。 用 new 运算符来创建对象的过程，实际上也只是先克隆
        // Object.prototype 对象，再进行一些其他额外操作。
    const obj = new Object();

    // 取得外部传入的构造器，此例是 Person [取得类数组的第一项，赋值给Constructor变量]
    let Constructor = Array.prototype.shift.call(arguments);

    // 把创建的 obj 对象，指向正确的原型。(此时如果不指定默认的原型是 Object.prototype)
    /** Io 语言或者 js 语言中的原型链查找机制，每个对象至少要先记住它自己的原型。 就 js 真正的实现来说，
     * 其实并不能说对象有原型，而只能说对象的构造器有原型。对于 "对象把请求委托给它自己的原型"这句话，更好
     * 的说法是对象把请求委托给它的构造器(构造函数)的原型。 */
    obj.__proto__ = Constructor.prototype;

    // 借用外部传入的构造器给 obj 设置属性
    /**
     *  这句是重点: 在第二章的 **2.2 call和apply** 方法中有详细的讲解: ES3给 Function 的原型定义了2个方法:
     *  Function.prototype.call 和 Function.prototype.apply。 在实际开发中，特别是在一些函数式风格的代码
     *  编写中，call 和 apply 方法尤其有用。 在 js 版本的设计模式中，这两个方法的应用也非常广泛，能熟练运用这
     *  2个方法，是我们真正成为一名 js 程序员的重要一步。
     *  apply 和 call 的主要作用:
     *  (1) 改变 this 指向
     *  (2) 实现内置的 Function.prototype.bind
     *  (3) 借用其他对象的方法
     **/
    let ret = Constructor.apply(obj, arguments);

    // 确保构造器总是返回一个对象: (此处 ret 如果是是对象默认返回 ret,)
    return typeof ret === "object" ? ret : obj;
};

let a = ObjectFactory(Person, "seven");

console.log(a);     // Person { name: 'seven' }
console.log(a.name);
console.log(a.getName());
console.log(Object.getPrototypeOf(a) === Person.prototype);
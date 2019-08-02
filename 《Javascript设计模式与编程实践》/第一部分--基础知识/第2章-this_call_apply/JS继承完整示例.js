/** ~~~~~~~~~ 《JavaScript设计模式与编程实践》- 继承 ~~~~~~~~~ */
// 很明显这个示例只写了继承属性
const A = function (name) {
    this.name = name;
};

const B = function () {
    // B 构造器借用 A 构造器的 name 属性
    A.apply(this, arguments);
};

B.prototype.getName = function () {
    return this.name;
};

const b = new B("Seven");
console.log(b.getName());   // Seven


/* P34 Array.prototype.push 实际上是一个属性复制的过程，把参数按照下标依次添加到被
 * push 的对象上面，顺便修改了这个对象的 length 属性。至于被修的对象是谁，到底是数组还是
 * 类数组对象，这一点并不重要。
 */
let a = {};
[].push.call(a, "first");
[].push.call(a, "this is second item");

// a:  { '0': 'first', length: 1 }
console.log("a: ", a);

console.log("a.length: ", a.length);
console.log("a[0]: ", a[0]);




/** ~~~~~~~~~ js高程- 6.3.3 组合继承 ~~~~~~~~~ */

function Father(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

Father.prototype.sayName = function () {
    console.log(this.name);
};

function Son(name, age) {
    // 继承 Father 的属性
    Father.call(this, name);
    this.age = age;
}

// Son 继承 Father 的方法
Son.prototype = new Father();
Son.prototype.constructor = Son;
Son.prototype.sayAge = function () {
    console.log(this.age);
};

console.log('~~~~~~~~~' + '\n');

const instance1 = new Son("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors);
instance1.sayName();
instance1.sayAge();

console.log('');

const instance2 = new Son("Greg", 27);
console.log(instance2.colors);
instance2.sayName();
instance2.sayAge();

console.log('~~~~~~~~~' + '\n');


/** ~~~~~~~~~ 《深入理解 ES6》- ES5 继承示例  ~~~~~~~~~ */
// ES6 之前，实现继承与自定义类型是一个不小的工作。严格意义上的继承需要多个步骤实现。示例:
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle.prototype.getArea = function () {
    return this.length * this.width;
};
function Square(length) {
    console.log("What is the Square this ?: ", this);   // Square {}
    Rectangle.call(this, length, length);
}

Square.prototype = Object.create(Rectangle.prototype, {
    constructor: {
        // 这种写法等于: Square.prototype.constructor = Square
        value: Square,
        enumerable: true,
        writable: true,
        configurable: true
    }
});
let square = new Square(3, 4);
console.log(square.getArea());              // 9
console.log(square instanceof Square);      // true
console.log(square instanceof Rectangle);   // true


/** ~~~~~~~~~ 《深入理解 ES6》- ES6 继承  ~~~~~~~~~ */
class Rectangle2 {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }
}

// Square2 类通过 extends 关键字继承 Rectangle2 类
class Square2 extends Rectangle2 {
    constructor(length) {
        // 与 Rectangle.call(this, length, length) 相同
        super(length, length);
    }
}
let square2 = new Square2(3);
console.log(square2.getArea());
console.log(square2 instanceof Square2);
console.log(square2 instanceof Rectangle2);

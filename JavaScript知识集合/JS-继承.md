# JavaScript 继承的几种方式: 


## (0) - Added: Node.js 中继承的写法
- 《Node.js开发指南》- 4.3.3 继承 `EventEmitter` 
    + 大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 `fs`、`net`、
      `http` 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。
    + 为什么要这样做呢? 原因有 2 点。 
        - (1) 具有某个实体功能的对象实现事件符合语义，事件的监听和发射应该是一个对象的
          方法.
        - (2) 其次 JS 的对象机制是基于原型的，支持部分多重继承，继承 EventEmitter 
          不会打乱对象原有的继承关系。(即: 子类没有的方法会继承父类的同名方法) 
- Node.js 中实现继承是通过 ES6 中添加的 `Object.setPrototypeOf()` 方法来实现的,此
  方法在: `《深入理解ES6》/chapter04_扩展对象的功能性/chapter04-扩展对象的功能性.md`
  和 `《深入理解ES6》/A_Other-Change.md` 中都有讲到方法,但这两处讲的都是给通过给
  `Object.create(obj)` 方法创建的对象更改原型, 示例代码见各自文档.
- Node.js 代码如下: 
  ```js
    // - events 模块
    let EventEmitter = require('events');
    // - util 核心模块
    let util = require('util');

    // - 使用 events
    function Bell() {
        EventEmitter.call(this);
    }

    // - 继承原型
    // - Node.js 的 util.js 文件中是使用:
    //   `Object.setPropertyOf(ctor.prototype, superCtor.prototype);` 来实现的,
    //   也等于下面这中写法: `ctor.prototype.__proto__ = superCtor.prototype;`
    util.inherits(Bell, EventEmitter);

    let bell = new Bell();
    function studentInClassroom(roomNumber, book) {
        console.log(`学生带着 ${book} 进 ${roomNumber} 教室`);
    }
    function teachInClassroom(roomNumber, book) {
        console.log(`老师带着 ${book} 进 ${roomNumber} 教室`);
    }
    function jiaTeachInClassroom(roomNumber, book) {
        console.log(`贾老师带着 ${book} 进 ${roomNumber} 教室`);
    }

    bell.on('铃响', studentInClassroom);
    bell.on('铃响', teachInClassroom);
    bell.once('铃响', jiaTeachInClassroom);

    // - 第一个参数是事件类型，第二个及以后的函数参数会传递给监听函数
    bell.emit('铃响', '301', '书');
    console.log('========= ========= =========');
    bell.emit('铃响', '301', '书');

  ```


## 继承 -  只继承属性
- ```js
    const A = function (name) {
        this.name = name;
    };

    const B = function () {
        // - B 构造器借用 A 构造器的 name 属性
        // - 继承父构造函数的属性
        A.apply(this, arguments);
    };

    B.prototype.getName = function () {
        return this.name;
    };

    const b = new B("Seven");
    console.log(b.getName());   // Seven
  ```


## js 高程 - 6.3.3 组合继承
- ```js
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

    const instance1 = new Son("Nicholas", 29);
    instance1.colors.push("black");
    console.log(instance1.colors);
    instance1.sayName();
    instance1.sayAge();
  ```


## js 高程 - 6.3.6 寄生组合式继承
- ```js
    // Douglas Crockford
    function object(o) {
        function F(){}
        F.prototype = o;
        return new F();
    }
    function inheritPrototype(subType, superType) {
        // - 创建超类型原型的一个副本
        // let prototype = object(superType.prototype);

        // - Note: 这里可以使用 ES5 提供的 Object.create() 方法代替上面的
        //   Douglas Crockford 自定义的 object() 方法
        // - 《JS高程》-- 6.3.4-原型式继承: ES5 通过新增 Object.create(): 方法
        //   规范化了原型式继承。这个方法接收 2 个参数: 
        //     + (1) 用作新对象原型的对象;
        //     + (2) 一个(可选的)为新对象定义额外属性的对象。在传入一个参数的情况下 
        //       Object.create() 与 object() 方法的行为相同。
        let prototype = Object.create(superType.prototype);

        // - 为创建的副本添加 constructor 属性，指向子构造函数，
        //   弥补因重写原型而失去的默认 constructor 属性。
        prototype.constructor = subType;
        // - 将创建的 superType 对象的实例赋值给子类型的原型
        subType.prototype = prototype;
    }

    function SuperType(name) {
        this.name = name;
        this.colors = ['red', 'blue', 'green'];
    }
    SuperType.prototype.sayName = function() {
        console.log(this.name);
    };
    function SubType(name, age) {
        // - 子类中还是要调用父类来继承属性
        SuperType.call(this, name);
        this.age = age;
    }
    inheritPrototype(SubType, SuperType);
    SubType.prototype.sayAge = function() {
        console.log(this.age);
    };
    let sub = new SubType('Jone', 30);
    sub.colors.push('yellow');
    console.log(sub.colors);
    sub.sayAge();
  ```


## 《深入理解 ES6》- ES5
- ```js
    // - ES6 之前，实现继承与自定义类型是一个不小的工作。严格意义上的继承需要多个
    //   步骤实现。示例:
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
    // - Object.create() 解释见上面
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
  ```


## 《深入理解 ES6》- 中 ES6 继承
- ```javascript
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
  ```


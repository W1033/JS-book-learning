# JavaScript 继承的几种方式: 


## (1) 只继承属性
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
        let prototype = Object.create(superType.prototype);

        // - 为创建的副本添加 constructor 属性，指向子构造函数，
        //   弥补因重写原型而失去的默认 constructor 属性。
        prototype.constructor = subType;
        // 将创建的 superType 对象的实例赋值给子类型的原型
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

    // - Note: 《JS高程》--6.3.4-原型式继承-P170：ES5 通过新增 Object.create(): 
    //   方法规范化了原型式继承。这个方法接收 2 个参数: 
    //      + (1) 用作新对象原型的对象;
    //      + (2) 一个(可选的)为新对象定义额外属性的对象。在传入一个参数的情况下 
    //        Object.create() 与 Object() 方法的行为相同。
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


# 《深入理解 ES6》- ES6 继承
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


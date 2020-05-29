# 第 9 章 -- JavaScript 中的类



## Catalog
- 9.1 ES5 中的仿类结构
- 9.2 类的声明
    + 9.2.1 基本的类声明
    + 9.2.2 为何要使用类的语法
- 9.3 类表达式
    + 9.3.1 基本的类表达式
    + 9.3.2 命名类表达式 / 具名类表达式
- 9.4 作为一等公民的类
- 9.5 访问器属性
- 9.6 可计算成员名  / 需计算的成员名
- 9.7 生成器方法
- 9.8 静态成员
- 9.9 使用派生类进行继承
    + 9.9.1 屏蔽类方法
    + 9.9.2 继承静态成员
    + 9.9.3 从表达式中派生类
    + 9.9.4 继承内置对象
    + 9.9.5 Symbol.species 属性
- 9.10 在类构造器中使用 new.target
- 9.11 总结




## New Words
- **derive [dɪ'raɪv]  --vt&vi.得到, 源于**
    + derive knowledge from books. 从书中获得知识. 
    + The word derives from French. 这个词来自法语.  




## Content
- **NOTICE:** JavaScript 从本质上来说并没有类的概念,
  它是使用原型模式来搭建整个面向对象系统的, 如果你对这个概念还不是很清晰,
  请先看一下 《JavaScript设计模式与开发实践》的第一章.
  
  (如果没有书本和电子书,也可以看一下我这篇笔记:
  `../../《Javascript设计模式与开发实践》/第1部分--基础知识/Chapter01-面向对象的javascript.md`)

### 9.1 ES5 中的仿类结构
- ES5 中的近类结构为 -- 自定义类型: 首先创建一个构造函数,
  然后定义另外一个方法赋值给构造函数的原型。代码如下:
    + (1) 创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式;
    + (2) 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。
  
  ```js
    // (1)
    function PersonType(name) {
        this.name = name;
    }
    // (2)
    PersonType.prototype.sayName = function () {
        console.log(this.name);  // Nicholas
    };

    let person = new PersonType("Nicholas");
    person.sayName();
    console.log(person instanceof PersonType);  // true
    console.log(person instanceof Object);      // true
  ```

### 9.2 类的声明
#### 9.2.1 基本的类声明
- 要声明一个类，首先编写 `class` 关键字，紧跟着的是类的名字，
  其他部分的语法类似于对象字面量的简写形式，但是 **不需要在类的各元素之间使用逗号分隔** 。
  
  每个类都有一个名为 `[[Construct]]` 的内部方法，通过关键字 `new`
  调用那些不含 `[[Construct]]` 的方法会导致程序抛出错误。
  
  类声明仅仅是基于已有自定义类型声明的语法糖.
  ```js
    class PersonClass {

        // - 等价于 PersonType 构造函数
        constructor(name) {         // {1}
            this.name = name;
        }

        // - 等价于 PersonType.prototype.sayName
        sayName() {
            console.log(this.name);
        }
    }

    let people = new PersonClass("Nicholas");
    person.sayName();                                   // "Nicholas"

    console.log(person instanceof PersonClass);         // true
    console.log(person instanceof Object);              // true

    console.log(typeof PersonClass);                    // "function"
    console.log(typeof PersonClass.prototype.sayName);  // "function"
  ```
  `行 {1}`: 这个 `PersonClass` 类声明的行为非常类似于上个例子中的
  `PersonType`. 类声明允许你在其中使用特殊的 `constructor`
   方法名来直接定义一个构造器(构造函数),
   而不需要先定义一个函数再把它当做构造器使用.
   
   由于类的方法使用简洁语法, 于是不再需要使用 `function` 关键字.
   除了 `constructor` 外没有其他保留的方法名，所以可以尽情添加方法.
   
   `自有属性(Own properties)` 是实例中的属性`(1)`，不会出现在原型上，
   且只能在类的构造函数或方法中创建，此例中的 `name` 就是一个自有属性。
   这里建议你在构造函数中创建所有的自有属性，
   从而只通过一处就可以控制类中的所有自有属性。
    + `(1)` 不知道有没有小伙伴和我一样对这种在构造函数中定义的属性称为
      **实例属性** 有过疑惑? 这个问题在很长的一段时间内我都没有弄明白,
      直到今天我再次看《JavaScript设计模式与开发实践》的第一章,
      在重新做完第一章的笔记后才弄明白为什么. 详细解释见:
      `《JavaScript设计模式与开发实践》` -- 
      `1.4.5 JavaScript 中的原型继承` --
      `(2) 要得到一个对象, 不是通过实例化类, 而是找到一个对象作为原型并克隆它.`
      
      补充一句, 就是实际上, 我们创建一个构造函数的实例(对象),
      表面上看是和当前被调用的构造函数有联系的, 但是在 JS
      内部的真正实现原理中并不是我们表面上看到那样.
#### 9.2.2 为何要使用类的语法
- 尽管类与自定义类型之间有相似性, 但仍然要记住一些重要的区别: 
    + (1) 类声明不会被提升, 这与函数定义不同. 类声明的行为与 `let` 相似,
      因此在程序的执行到达声明处之前, 类会存在于暂时性死区内.
    + (2) 类声明中的所有代码会自动运行在严格模式下, 并且也无法退出严格模式.
    + (3) 类的所有方法都是不可枚举的, 这是对于自定义类型的显著变化,
      后者必须用 `Object.defineProperty()` 才能将方法改变为不可枚举。
    + (4) 类的所有方法内部都没有 `[[Construct]]`, 因此使用 `new`
      来调用它们会抛出错误。
    + (5) 调用类构造器时不使用 `new`, 会抛出错误.
    + (6) 试图在类的方法内部重写类名, 会抛出错误.
  
  这样看来, 上例中的 `PersonClass` 声明实际上就等价于以下未使用类语法的代码:
  ```js
    // - 等价于 PersonClass
    let PersonType2 = (function(){
        'use strict';
        const PersonType2 = function(name) {
            // - 确认函数调用时使用了 new
            if (typeof new.target === 'undefined') {
                throw new Error('Constructor must be called with new.');
            }
            this.name = name;
        }
        Object.defineProperty(PersonType2.prototype, 'sayName', {
            value: function() {
                // - 确认函数调用时没有使用 new
                if (typeof new.target !== 'undefined') {
                    throw new Error('Method cannot be called with new.');
                }
                console.log(this.name)
            },
            enumerable: false,
            writable: true,
            configurable: true,
        });
        return PersonType2;
    }());
  ```
  首先要注意这里有两个 `PersonType2` 声明: 一个在外部作用域的 `let` 声明,
  一个在 `IIFE(自执行匿名函数，也叫"立即调用函数表达式)` 内部的 `const` 声明.
  这就是为何类的方法不能对类名进行重写、而类外部的代码则被允许.
  构造器函数检查了 `new.target`, 以保证被调用时使用了 `new`,
  否则就抛出错误. 接下来，`sayName()` 方法被定义为不可枚举,
  并且此方法也检查了 new.target ， 它则要保证在被调用时没有使用 `new`.
  最后一步是将构造器函数返回出去.

  此例说明了尽管不使用新语法也能实现类的任何特性,
  但类语法显著简化了所有功能的代码.

### 9.3 类表达式
#### 9.3.1 基本的类表达式
- 类表达式: 类和函数都有两种存在形式: `声明形式` 和 `表达式形式`.
    + (1) `声明形式` 的函数和类都由相应的关键字(分别为 `function` 和 `class`)
      进行定义, 随后紧跟一个标识符; 
    + (2) `表达式形式` 的函数和类与之类似，只是不需要在关键字后添加标识符.
      类表达式的设计初衷是为了声明相应变量或传入函数作为参数。
  ```js
    let PersonClass2 = class {
        constructor(name) {
            this.name = name;
        }
        sayName() {
            console.log(this.name);
        }
    };
  ```
- 《JS高程》命名函数表达式: `7th chapter - 7.1 递归`: 用命名函数表达式实现递归.
  可以在严格模式和非严格模式下都行得通。
  ```js
    var factorial = (function f(num) {
        if (num <= 1) {
            return 1;
        } else {
            return num * f(num - 1);
        }
    });
    console.log(factorial(4));      // 24
  ```

#### 9.3.2 命名类表达式 / 具名类表达式
- 命名类表达式: 其实类和函数一样都可以定义命名表达式，声明时，在关键字 `class`
  后添加一个标识符即可定义为命名类表达式。在 JS 引擎中，类表达式的实现与类声明稍有不同.
  对于类声明来说，通过 `let` 定义的外部绑定与通过 `const` 定义的内部绑定具有相同名称;
  而命名类表达式通过 `const` 定义名称，从而 PersonClass33 只能在类的内部使用
  ```js
    let PersonCla3 = class PersonClass33 {
        // 等價于 PersonType 構造函數
        constructor(name) {
            this.name = name;
        }
        // 等價于 PersonType.prototype.sayName
        sayName() {
            console.log(this.name);
        }
    };
    console.log(typeof PersonCla3);      // function
    console.log(typeof PersonClass33);   // undefined
  ```

### 9.4 作为一等公民的类
- 在程序中，一等公民是指一个可以传入函數，可以从函數返回，並且可以賦值給变量的值.
- Javascript 函數是一等公民(也被稱作頭等函數)，這也正是 Javascript 中的一個独特之处。
  ECMAScript 6 延續了這個傳統，將類也設計為一等公民，允許通過多種方式使用類的特性。
  ```js
    function createObject(classDef) {

        // - 匿名类表达式 class { sayHi() { console.log("Hi!"); } } 
        //   当做参数传入到 createObject() 中.

        // - 上面的類表達式就等於:
        //   function classDef() {}
        //   classDef.prototype.sayHi = function() {
        //       console.log("Hi!");
        //   }
        console.log(classDef);  // class { sayHi() {console.log("Hi!"); } }
        
        // - 此時就直接創建 classDef() 構造函數的實例 (更準確的說法是:
        //   通過關鍵字 new 實例化這個類并返回實例) 將其存儲在變量 obj 中。
        return new classDef();
    }

    let obj = createObject(class {
        sayHi() {
            console.log("Hi!");
        }
    });
    obj.sayHi();
  ```

- 类表达式另外一種使用方式: 通过 "立即调用类构造函数可以创建单例(Singleton)".
  用 `new` 調用類表達式，緊接著通過一對小括號調用這個表達式.
  ```js
    let anotherPerson = new class {
        constructor(name) {
            this.name = name;
        }

        sayName() {
            console.log(this.name);
        }
    }("Nicholas");  
  ```
  类表达式后面的圆括号表示要调用前面的函数，并且还允许传入参数。
  
  立即调用类表达式的原理:
    + (1) 创建匿名类表达式.
    + (2) 立即调用这个类表达式还允许传入参数 `anotherPerson.sayName()`;


### 9.5 访问器属性
- 尽管应该在类构造函数(`constructor`) 中创建自己的属性,
  但类也支持直接在原型上定义访问器属性。创建 `getter `时，需要在关键字 `get`
  后紧跟一个空格和相应的标识符; 创建 `setter` 同理. 如下例:
  ```js
    class CustomHTMLElement {
        constructor(element) {
            this.element = element;
        }

        get html() {
            return this.element.innerHTML;
        }
        
        set html(value) {
            this.element.innerHTML = value;
        }
    }

    let descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, "html");
    console.log("get" in descriptor);   // true
    console.log("set" in descriptor);   // true
    console.log(descriptor.enumerable); // false
  ```
- 下面的示例: 直接等价于上个范例
  ```js
    let CustomHTMLEle = (function () {
        "use strict";
        const CustomHTMLEle = function (ele) {
            // 确认函数被调用时使用了 new
            if (typeof new.target === "undefined") {
                throw new Error("Constructor must be called with new.");
            }
            this.element = ele;
        };

        Object.defineProperty(CustomHTMLEle.prototype, "html", {
            // 与其他方法一样，创建时声明该属性不可枚举
            enumerable: false,
            configurable: true,
            get: function () {
                return this.element.innerHTML;
            },
            set: function () {
                this.element.innerHTML = value;
            }
        });
        return CustomHTMLElement;
    });
  ```

### 9.6 可计算成员名  / 需计算的成员名
- 示例代码:
  ```js
    let methodName = "sayName";

    class ComputedPersonClass {
        constructor(name) {
            this.name = name;
        }

        [methodName]() {
            console.log(this.name);
        }
    }

    let me = new ComputedPersonClass("Nicholas");
    me.sayName();
  ```


### 9.7 生成器方法



### 9.8 静态成员
- 直接在构造器上添加额外方法来模拟静态成员，这在 ES5 及更早版本中是另一个通用的模式.
  例如下 ES5 写法:
  ```js
    function PersonType3(name) {
        this.name = name;
    }

    // 静态方法
    PersonType3.create = function (name) {
        return new PersonType3(name);
    };
    // 实例方法
    PersonType3.prototype.sayName = function () {
        console.log(this.name);
    };
    let mountain = PersonType3.create("Nicholas");
  ```
- 下面的示例: 等价于上面的范例
  ```js
    class PersonClassN {
        // 等价于 PersonType 构造器
        constructor(name) {
            this.name = name;
        }

        // 等价于 PersonType.prototype.sayName
        sayName() {
            console.log(this.name);
        }
        
        // 等价于 PersonType.create
        static create(name) {
            return new PersonClassN(name);
        }
    }

    let personSea = PersonClassN.create("Nicholas");
  ```

### 9.9 使用派生类进行继承
- ES6 之前，实现继承与自定义类型是一个不小的工作。严格意义上的继承需要多个步骤实现.
  请看以下示例:
  ```js
    function Rectangle(length, width) {
        this.length = length;
        this.width = width;
    }
    Rectangle.prototype.getArea = function () {
        return this.length * this.width;
    };
    function Square(length) {
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
    let square = new Square(3);
    console.log(square.getArea());              // 9
    console.log(square instanceof Square);      // true
    console.log(square instanceof Rectangle);   // true
  ```
- 下面的示例: 等价于上面的范例
  ```js
    class Rectangle2 {
        constructor(length, width) {
            this.length = length;
            this.width = width;
        }
        getArea() {
            return this.length * this.width;
        }
    }

    // - Square2 类通过 extends 关键字继承 Rectangle2 类，在 Square2
    //   构造函数中通过 super() 调用 Rectangle2 构造函数并传入相应参数.
    //   继承自其他类的类被称为派生类 (derived classes)
    class Square2 extends Rectangle2 {
        constructor(length) {
            // 与 Rectangle.call(this, length, length) 相同
            super(length, length);
        }
    }

    let square2 = new Square2(3);
    console.log(square2.getArea());                 // 9
    console.log(square2 instanceof Square2);        // true
    console.log(square2 instanceof Rectangle2);     // true
  ```

#### 9.9.1 屏蔽类方法
#### 9.9.2 继承静态成员
#### 9.9.3 从表达式中派生类
- ES6 最强大的一面或许是从表达式导出类的功能了。只要表达式可以被解析为一个函数并且具有
  `[[Constructor]]` 属性和原型，那么就可以用 `extends` 进行派生. 举个例子:
  ```js
    function Rec(length, width) {
        this.length = length;
        this.width = width;
    }
    Rec.prototype.getArea = function () {
        return this.length * this.width;
    };
    class Squ extends Rec {
        constructor(length, width) {
            super(length, width);
        }
    }

    let R = new Rec(4, 6);
    console.log("R.getArea(): ", R.getArea()); // 24
    console.log("R instanceof Rec: ", R instanceof Rec); // true
    let S = new Squ(2, 6);
    console.log("S.getArea(): ", S.getArea());  // 12
  ```

#### 9.9.4 继承内置对象
- 创建 Mixin (混合)
  ```js
    let SerializeMixin = {
        serialize() {
            console.log("serialize() this: ", this);    // Circle {}
            return JSON.stringify(this);    //
        }
    };
    let AreaMixin = {
        getArea() {
            return this.length * this.width;
        }
    };
    // 4th: 不定参数(...keys): 该参数为一个数组，包含着自它之后传入的所有参数，
    // 通过这个数组名即可逐一访问里面的参数
    function mixin(...mixins) {
        let base = function() {};
        console.log("base: ", base);

        // - base 如果是一个构造函数，那么 base.prototype = {} 这是正常写法,
        //   所以 base.prototype 是一个对象
        console.log("base.prototype: ", base.prototype);
        
        // - 4th: Object.assign() 实现对象组合的新方法:
        Object.assign(base.prototype, ...mixins);
        
        console.log("base2: ", base);
        return base;
    }
    class Circle extends mixin(SerializeMixin, AreaMixin) {
        constructor(length) {
            super();
            this.length = length;
            // this.width = width;
        }
    }
  ```
  此示例使用 `mixin` 函数代替传统的继承方法，它可以接受任意数量的 `mixin`
  对象作为参数，首先创建一个函数 `base`, 再将每一个 `mixin` 对象的属性赋值给
  `base` 的原型，最后 `mixin` 函数返回这个 `base` 函数，所以 `Square`
  类就可以基于这个返回的函数用 `extends` 进行扩展.

  △ 请记住，由于使用了 extends 因此在构造函数中需要调用 `super()`.
  ```js
    let w = new Circle();
    console.log("w.serialize(): ", w.serialize());
    console.log("w.getArea(): ", w.getArea());
  ```

- ES6 中的类继承则与之相反，先由基类 (Array) 创建 this 的值，然后派生类的构造函数
  (MyArray) 再修改这个值。以下示例是一个基于类生成特殊数组的实践:
  ```js
    class MyArray extends Array {
        // blank 空白
    }

    let colorsArr = new MyArray();
    colorsArr[0] = "red";
    console.log("colorsArr[0]: ", colorsArr[0]);
    /*colorsArr.length = 0;*/
    console.log(colorsArr[0]);
  ```

#### 9.9.5 Symbol.species 属性


### 9.10 在类构造器中使用 new.target


### 9.11 总结




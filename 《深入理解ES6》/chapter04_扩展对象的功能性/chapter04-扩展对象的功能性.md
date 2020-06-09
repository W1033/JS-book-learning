# 第 4 章 -- 扩展对象的功能性

## 本章目录 (Catalog)
1. 对象类别
2. 对象字面量语法扩展
    + 属性初始值的简写
    + 对象方法的简写语法
    + 可计算属性名 (Computed Property Name)
3. 新增方法
    + `Object.is()` 方法
    + `Object.assign()` 方法
4. 重复的对象字面量属性
5. 自有属性枚举顺序
6. 增强对象原型
    + 改变对象的原型
    + 简化原型访问的 `Super` 引用
7. 正式的方法定义
8. 小结



## 生词 (New Words)
- Object.getOwnPropertyNames(): 取得自身(own)属性名
- **prototype ['prəʊtətaɪp] --n.原型; 样机; 样板**
- Object.getPrototypeOf(): 取得原型
- Object.setPrototypeOf(): 设置原型
- Object.getOwnPropertyDescriptor(): 取得自身属性描述符


## 本章内容 (Content)
- ES6 通过多种方式来加强对象的使用, 通过简单的语法扩展, 提供更多操作对象及与对象交互的方法.
### 1. 对象类别
- ES6 规范清晰定义了每一个类别的对象. 总而言之, 理解这些属于对理解这门语言来说非常重要, 
  对象的类别如下:
    + **普通 (Ordinary) 对象**: 具有 js 对象所有的默认内部行为.
    + **特异 (Exotic) 对象**: 具有某些与默认行为不符的内部行为.
    + **标准 (Standard) 对象**: ES6 规范中定义的对象, 例如: Array, Date 等.
      标准对象可以是普通对象, 也可以是特异对.
    + **内建对象**: 脚本开始执行时存在于 js 执行环境中的对象, 所有标准对象都是内建对象.
### 2. 对象字面量语法扩展
#### 2.1 属性初始值的简写
- ES5 中对象字面量只是简单的键值对集合, 例如:
  ```javascript
    function createPerson(name, age) {
        return {
            name: name,
            age: age
        }
    }
  ```
  ES6 中, 通过使用属性初始化的简写语法, 可以消除这种属性名称和局部变量之间的重复书写.
  比如改写上面的 createPerson() 方法如下:
  ```javascript
    function createPerson(name, age) {
        return {
            name, 
            age
        }
    }
  ```
  当对象字面量只有一个属性的名称时, js 引擎会在可访问作用域中查找其同名变量;
  如果找到, 则该变量的值被赋给对象字面量里的同名属性. 在本例中, 对象字面量属性
  name 被赋予了局部变量 name 的值.
#### 2.2 对象方法的简写语法
- ES6 改进了对象字面量定义方法的语法. 示例如下:
  ```javascript
    var person = {
        name: "Nicholas",
        sayName() {
            console.log(this.name);
        }
    }
  ```
#### 2.3 可计算属性名 (Computed Property Name)
- ES5 及早期版本的对象中, 如果想要通过计算得到属性名, 就需要用方括号代替点记法. 示例:
  ```javascript
    var person = {};
    var lastName = "last name";
    person["first name"] = "Nicholas";
    person[lastName] = "Zakas";
    console.log(person["first name"]);  // "Nicholas"
    console.log(person[lastName]);  // "Zakas"
  ```
  此外, 在对象字面量中, 可以直接使用字符串字面量作为属性名称, 就像这样:
  ```javascript
    let person = {
        "first name": "Nicholas",
    };
    console.log(person["first name"]);  // "Nicholas"
  ```
- 在 ES6 中, 可在对象字面量中使用**可计算属性名称**, 其语法与引用对象实例的可计算属性
    名称相同, 也是使用方括号. 举个例子: 
    ```javascript
    let lastName = "last name";
    let person = {
        "first name": "Nicholas",
        [lastName]: "Zakas",
    }
    ```
### 3. 新增方法
- ECMAScript 其中一个设计目标是: 不在创建新的全局函数, 也不在 `Object.prototype`
  上创建新的方法. 而在 ES6 中, 为了使某些任务更易完成, 在全局 Object
  对象上引入了一些新方法.
#### 3.1 `Object.is()` 方法
- ECMAScript 6 引入了 `Object.is()` 方法来弥补全等运算符的不准确运算。
  这个方法接受两个参数, 如果这两个参数类型相同且具有相同的值, 则返回true.
  请看下面这些示例:
  ```javascript
    console.log(+0 == -0); // true
    console.log(+0 === -0); // true
    console.log(Object.is(+0, -0)); // false
    console.log(NaN == NaN); // false
    console.log(NaN === NaN); // false
    console.log(Object.is(NaN, NaN)); // true
    console.log(5 == 5); // true
    console.log(5 == "5"); // true
    console.log(5 === 5); // true
    console.log(5 === "5"); // false
    console.log(Object.is(5, 5)); // true
    console.log(Object.is(5, "5")); // false
  ```
  在许多情况下， Object.is() 的结果与 `===` 运算符是相同的， 仅有的例外是:
  它会认为 `+0` 与 `-0` 不相等，而且 `NaN` 等于 `NaN`.
  不过仍然没必要停止使用全等运算符， 选择 Object.is() 还是选择
  `== (相等)` 或 `=== (全等)` ， 取决于代码的实际情况。  
#### 3.2 `Object.assign()` 方法
- 混合/混入 (`Mixin`) 是 js 中实现**对象组合**最流行的一种模式.
  在一个 mixin 方法中,一个对象接收来自另一个对象的属性和方法, 许多 js
  库中都有类似的 `mixin` 方法:
  ```js
    function mixin(receiver, supplier) {
        Object.keys(supplier).forEach(function(key) {
            receiver[key] = supplier[key];
        });
        return receiver;
    }
  ```
  `mixin()` 函数遍历 supplier 的自有属性并复制到 receiver 中
  (此处的复制行为是浅复制, 当属性值为对象时只复制对象的引用). 这样一来,
  receiver 不通过继承就可以获得新属性, 请参考这段代码:
  ```js
    function EventTarget() { // ... };
    EventTarget.prototype = {
        constructor: EventTarget,
        emit() {},
        on() {}
    };
    let myObject = {};
    mixin(myObject, EventTarget.prototype);
    myObject.emit("somethingChanged");
  ```
  这段代码中, myObject 接受 EventTarget.prototype 对象的所有行为, 从而使
  myObject 可以分别通过 emit() 方法发布事件或通过 on() 方法订阅事件.
- 这种混合模式非常流行，因而 ECMAScript6 添加了 `Object.assign()`
  方法来实现相同的功能，这个方法接受一个接收对象和任意数量的源对象，
  最终返回接收对象。mixin()方法使用 赋值操作符(assignment operator)
  `=` 来复制相关属性，却不能复制访问器属性到接收对象中，因此最终添加的方法弃用
  mixin 而改用 assign 作为方法名。
  
  任何使用 mixin() 方法的地方都可以直接使用 `Object.assign()` 方法来替换,
  把上面的示例改为 `Object.assign()` 方法:
  ```javascript
    function EventTarget() { // ... };
    EventTarget.prototype = {
        constructor: EventTarget,
        emit: function() { // ... },
        on: function() { // ... }
    }
    var myObject = {};
    Object.assign(myObject, EventTarget.prototype);
    myObject.emit("somethingChanged");
  ```
  `Object.assign()` 方法可以接受任意数量的源对象,
  并按指定的顺序将属性复制到接收对象中. 所以如果多个源对象具有同名属性,
  则排位靠后的源对象会覆盖排位靠前的, 就像这段代码这样:
  ```javascript
    var receiver = {};
    Object.assign(receiver, {;
        {"js", name;: "file.js"},
        {"css"}
    })
    console.log(receiver.type); // "css"
    console.log(receiver.name); // "file.js"
  ```
- **Note: 访问器属性**
  请记住 `Object.assign(`) 方法不能将提供者的访问器属性复制到接受对象中.
  由于 `Object.assign()` 方法执行了赋值操作,
  因此提供者的访问器属性会变成接受对象中的一个数据属性. 举个例子:
  ```javascript
    var receiver = {};
    var supplier = {
        get name() {
            return "file.js"
        }
    };
    Object.assign(receiver, supplier);
    var descriptor = Object.getOwnPropertyDescriptor(receiver, "name");
    console.log(descriptor.value);  // "file.js"
    console.log(descriptor.get);    // undefined
  ```
  在这段代码中，supplier 有一个名为 name 的访问器属性。当调用 Object.assign()
  方法时返回字符串 "file.js", 因此 receiver 接收这个字符串后将其存为数据属性
  receiver.name.
### 4. 重复的对象字面量属性
### 5. 自有属性枚举顺序
### 6. 增强对象原型
- 原型是 JavaScript 继承的基础, 在早期版本中, JavaScript 严重限制了原型的使用.
  于是 ECMAScript 6 针对原型进行了改进.
- **改变对象的原型**
    + 正常情况下, 无论通过构造函数还是 `Object.create()` 方法创建对象, 其原型是在对象
      被创建时指定的. 对象原型在实例化之后保持不变, 直到 ES5 都是 JavaScript 编程最重
      要的设定之一, 虽然在 ES5 中添加了 `Object.getPrototypeOf()`(取得原型: 这个
      方法返回 `[[Prototype]]` 的值) 方法返回任意指定对象的原型, 但仍缺少对象在实例化
      后改变原型的标准方法.
    + 所以在 ES6 中添加了 `Object.setPrototypeOf()` 方法来改变这一现状, 通过这个方法
      可以改变任意指定对象的原型, 它接受 2 个参数:
        - (1) 将要被改变原型的对象    
        - (2) 替代第一个参数原型的对象.
      <br/>举个例子: 
      ```javascript
        let person = {
            getGreeting() {
                return "Hello";
            }
        };

        let dog =  {
            getGreeting() {
                return "Woof";
            }
        };
        // - 以 person 对象为原型
        let friend = Object.create(person);
        console.log(friend.getGreeting());  // "Hello"
        console.log(Object.getPrototypeOf(friend) === person);  // true
        console.log(Object.__proto__ === person);

        // - 将原型设置为 dog
        Object.setPrototypeOf(friend, dog);
        console.log(friend.getGreeting());  // "Woof"
        console.log(Object.getPrototypeOf(friend) === dog); // true
      ```
    + 对象原型的真实值被存储在内部专用属性 `[[Prototype]]` 中, 调用 
      Object.getPrototypeOf() 方法返回储存在其中的值, 调用 Object.setPrototypeOf()
      方法改变其中的值. 然而, 这不是操作 `[[Prototype]]` 值的唯一方法.
- **简化原型访问的 `Super` 引用**
    + ES6 引入了 `Super` 引用的特性, 使用它可以更快捷第访问对象原型. 举个例子, 如果你想
      重写对象实例的方法, 与需要调用与它同名的原型方法, 则在 ES5 中可以这样实现:
      ```javascript
        let person = {
            getGreeting() {
                return "Hello"
            }
        };
        let dog = {
            getGreeting() {
                return "Woof"
            }
        };
        let friend = {
            getGreeting() {
                return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
            }
        };

        // - 将原型设置为 person
        Object.setPrototypeOf(friend, person);
        console.log(friend.getGreeting());  // Hello, hi!
        console.log(Object.getPrototypeOf(friend) === person);  // true

        // - 将原型设置为 dog
        Object.setPrototypeOf(friend, dog);
        console.log(friend.getGreeting());  // "Woof, hi!"
        console.log(Object.getPrototypeOf(friend) === dog); // true
      ```
    + 在这个示例中，friend 对象的 getGreeting() 方法调用了同名的原型方法。
      object.getPrototypeOf() 方法可以确保调用正确的原型，并向输出字符串叠加另一个
      字符串; 后面的 `.call(this)` 可以确保正确设置原型方法中的this值。
    + 要准确记得如何使用 object.getPrototype0f() 方法和 `.call(this)` 方法来调用
      原型上的方法实在有些复杂，所以 ECMAScript 6 引入了 `super` 关键字。简单来说，
      Super 引用相当于指向对象原型的指针，实际上也就是 object. getPrototypeOf(this)
      的值。于是，可以这样简化上面的getGreeting()方法:
      ```javascript
        let friend = {
            // - Note: 必须要在 **简写方法的对象中使用 Super 引用**
            getGreeting() {
                return super.getGreeting() + ", hi";
                // - 上面一行等于上一个示例中的
                // return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
            }
        }
      ```
      <br/>
    + **Super 引用在多重继承的情况下非常有用**, 因为在这种情况下, 使用 
      Object.getPrototypeOf() 方法将会出现问题. 举个例子:
      ```javascript
        // - 注释(1): 原型模式的关键实现，是语言本身是否提供了 clone 方法。ES5提供了
        //   Object.create 方法，可以用来克隆对象. 代码如下: 
        //   Object.create("要克隆的对象", "新对象定义额外属性的对象(可选,一般不写)").
        // - 《js高程》P170 --> ECMAScript 5 通过新增 Object.create() 方法规范化了
        //   原型式继承。这个方法接收两个参数：第 1 个参数用作新对象原型的对象. 第 2 个参数
        //   是一个为新对象定义额外属性的对象(可选)
        //   在传入一个参数的情况下，Object.create() 与 object() 方法的行为相同。

        let person= {
            getGreeting() {
                return "Hello";
            }
        };
        // - 以 person 对象为原型
        let friend = {
            getGreeting() {
                // return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";

                // - Super 引用不是动态变化的，它总是指向正确的对象。在这个示例中, 无论有
                //   多少次其他方法继承了 getGreeting 方法, super.getGreeting() 始终
                //   指向 person.getGreeting() 方法
                return super.getGreeting() + ", hi!";
            }
        };
        // - 把 friend 的原型设置为 person
        Object.setPrototypeOf(friend, person);

        // - 克隆一个 relative 对象，原型是 friend
        let relative = Object.create(friend);   // (1)

        console.log(person.getGreeting());
        console.log(friend.getGreeting());
        console.log(relative.getGreeting());
      ```
    + this 是 relative, relative 的原型是 friend 对象，当执行 relative 的 
      getGreeting 方法时，会调用 friend 的 getGreeting() 方法，而此时的 this 值为
      relative, Object.getPrototypeOf(this) 又会返回 friend 对象。所以就会进入递归
      调用直到触发栈溢出报错。       
### 7. 正式的方法定义
- 在 ES6 以前从未正式定义 "方法" 的概念, 方法仅仅是一个具有功能而非数据的对象属性. 而在 ES6
  中正式将方法定义为一个函数, 它会有一个内部的 `[[HomeObject]]` 属性来容纳这个方法从属的
  对象. 请思考一下这段代码:
  ```javascript
    let person = {
        // - 是方法
        getGreeting() {
            return "Hello";
        };
        // - 不是方法
        function shareGreeting() {
            return "Hi";
        }
    }
  ```
  这个示例中定义了 person 对象, 他有一个 getGreeting() 方法, 由于直接把函数赋值给了 
  person 对象, 因而 getGreeting() 方法的 `[[HomeObject]]` 属性值为 person. 而创建
  shareGreeting() 函数时, 由于未将其赋值给一个对象, 因而该方法并没有明确定义
  [[HomeObject]] 属性. 在大多数情况下这点小差别无关紧要, 但是当使用 Super 引用时就变得
  非常重要了.
  Super 的所有引用都通过 [[HomeObject]] 属性来确定后续的运行过程. 第一步是在 
  [[HomeObject]] 属性上调用 Object.getPrototypeOf() 方法来检索原型的引用; 然后搜寻
  原型找到同名函数; 最后, 设置 this 绑定并且调用相应的方法. 看下面这个示例:
  ```javascript
    let person = {
        getGreeting() {
            return "Hello";
        }
    };
  ```

### 8. 小结
- 对象是JavaScript编程的核心，ECMAScript 6为对象提供了许多简单易用且更加灵活的新特性。
- ECMAScript 6在对象字面量的基础上做出了以下几个变更: 简化属性定义语法，使将当前作用域中
  的同名变量赋值给对象的语法变得更加简洁;添加可计算属性名特性，允许为对象指定非字面量属性
  名称;添加对象方法的简写语法，在对象字面量中定义方法时可以省略冒号和 function 关键字; 
  ECMAScript 6 弱化了严格模式下对象字面量重复属性名称的校验，即使在同一个对象字面量中定义
  两个同名属性也不会抛出错误。
- object.assign() 方法可以一次性更改对象中的多个属性，如果使用混入 (Mixin) 模式这将非常
  有用; object.is() 方法对于所有值进行严格等价判断,当将其用于处理特殊 js 值问题时比 
  `===` 操作符更加安全。
- 在 ECMAScript6 中同样清晰定义了自有属性的枚举顺序:当枚举属性时，数值键在先，字符串键在后;
  数值键总是按照升序排列，字符串键按照插入的顺序排列。
- 通过 ECMAScript6 的 object.setPrototype0f() 方法，我们可以在对象被创建后修改它的原型。
- 最后，可以使用 super 关键字调用对象原型上的方法，此时的 this 绑定会被自动设置为当前作用域
  的 this 值。


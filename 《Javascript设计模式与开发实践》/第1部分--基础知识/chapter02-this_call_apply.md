# 第 2 章 -- this, call 和 apply


## 本章内容 (Content)
### 2.1 this
> 跟别的语言大相径庭的是, JavaScript 的 this 总指向一个对象, 而具体指向哪个对象是在运行时
  基于函数的执行环境动态绑定的, 而非函数被声明时的环境.

#### 2.1.1 this 的指向:  this 的指向大致可以分为以下 4 种:
- **(1) 作为对象的方法调用**
    + 当函数作为对象的方法调用时，this 指向该对象:
      ```javascript
        var obj = {
            a: 1,
            getA: function() {
                alert(this === obj);    // output: true
                alert(this.a);      // output: 1
            }
        };
        obj.getA();
      ```
- **(2) 作为普通函数调用**
    + 当函数不作为对象的属性被调用是，也就是我们常说的普通函数方式，此时的 this 总是指向
      全局对象，在浏览器的 js 里，这个全局对象是 `window` 对象:
      ```javascript
        (function() {
            window.name = 'globalName';
            let getName = function() {
                return this.name;
            };
            console.log(getName()); // output: globalName

            // 或者

            let myObj = {
                name: 'sven',
                getName: function() {
                    return this.name;
                }
            };
            // 注: 这里并没有直接调用方法，而是应用了方法的指针
            let name = myObj.getName;
            console.log(name());  // output: globalName

            // 还有普通函数内的函数内部 this 指向

            window.id = 'window';
            document.getElementById('div1').onclick = function () {
                console.log(this.id); // 输出：'div1'
                var callback = function () {
                    alert(this.id); // 输出：'window'
                };
                callback();
            };

            document.getElementById('div1').onclick = function () {
                var that = this; // 保存div 的引用
                var callback = function () {
                    alert(that.id); // 输出：'div1'
                };
                callback();
            };

            // 在 ES5 的 strict 模式下，这种情况下的 this 已经被规定为不会指向全局对象，
            // 而是 undefined:
            function func() {
                "use strict";
                console.log(this);  // output: undefined
            }
        })();
      ```
- **(3) 构造器调用**
    + js 中没有类，但是可以从构造器(构造函数)中创建对象，同时也提供了 new 运算符，使得
        构造器看起来更像一个类。构造器函数(为了和普通函数相区分，构造函数的第一个字符大写)
        和普通函数一样，他们的区别在于被调用的方式。当用 new 运算符调用函数时，该函数总会
        返回一个对象，通常情况下，**构造函数里的 this 指向的是构造函数的实例**。代码如下:
        ```javascript
            function MyClass() {
                this.name = "seven";
                // - 当前 this 指向为构造函数的实例，通过 this.__proto__ 也可以看出来。
                // Output: MyClass {name: "seven", age: 30}
                console.log("this: ", this);

                // - Note: 根据(`JS的原型图.png`)来看, 构造函数的实例(new MyClass) 
                //   的 __proto__ 属性应该指向 MyClass.prototype (构造函数的原型), 
                //   但是构造函数的原型中的 constructor(构造器属性) 又指向构造函数本身,
                //   所以此处输出为 MyClass 构造函数.
                //   (20191105 added: 此处为自己理解, 不知道到底对错.)
                
                // Output: 
                // {constructor: f}
                //    constructor: f MyClass()
                //    __proto__: Object
                console.log("this.__proto__: ", this.__proto__);
            }
            let obj = new MyClass();
            console.log(obj.name);
            obj.age = 30;

            // MyClass {name: "seven", age: 30}
            console.log("obj: ", obj);
            
            // - 同构造函数内 this.__proto__ 输出一致.
            console.log("obj.__proto__:", obj.__proto__);

            // ------

            // - 使用 new 调用构造函数时，还要注意一个问题，如果构造函数显式地返回了一个 
            //   object 类型的对象，那么此次运算. 结果最终会返回这个对象，而不是我们上面
            //   说的 this:
            let MyClass2 = function () {
                this.name = "seven";
                return {
                    name: "Anna"
                }
            };
            var obj2 = new MyClass2();
            console.log(obj2.name); // output: Anna

            // - 如果构造函数不显式地返回任何数据，或者式返回一个非对象类型的数据，就不会
            //   造成上述问题:
            let MyClass3 = function () {
                this.name = "seven";
                return "Anna";
            };
            var obj3 = new MyClass3();
            console.log(obj3.name); // output: Anna
        ```
- **(4) Function.prototype.call 或 Function.prototype.apply 调用**
    + 跟普通的函数调用相比，用 Function.prototype.call 或 
        Function.prototype.apply 可以动态地改变传入函数的 this:
        ```javascript
            var obj1 = {
                name: "sven",
                getName: function() {
                    return this.name;
                }
            };
            var obj2 = { name: "Kell" };
            console.log( obj1.getName() );  // output: sven
            console.log( obj1.getName.call(obj2) ); // output: Kell
        ```
#### 2.1.2 丢失的 this
- ```javascript
    // - 这是一个经常遇到的问题，我们先看下面的代码：
    var obj = {
        myName: 'sven',
        getName: function () {
            return this.myName;
        }
    };
    // - 当调用 obj.getName 时, getName 方法是作为 obj 对象的的属性被调用的, 根据 
    //   2.1.1 节提到的规律, 此时的 this 指向 obj 对象, 所以 obj.getName()输出 'sven'
    console.log(obj.getName()); // 输出：'sven'

    // - 当用另外一个变量 getName2 来应用 obj.getName, 并且调用 getName2 时, 根据
    //   2.1.1-(2) 节提到的规律, 此时是普通函数调用方式, this 是指向全局 window 的,
    //   所以程序的执行结果是 undefined
    var getName2 = obj.getName;
    console.log(getName2()); // 输出：undefined

    // - 我们再看另外一个例子: 
    // - 我们可以尝试利用apply 把document 当作this 传入getId 函数，帮助“修正”this：
    document.getElementById = (function (func) {
        return function () {
            return func.apply(document, arguments);
        }
    })(document.getElementById);

    var getId = document.getElementById;
    var div = getId('div1');
    alert(div.id); // 输出： div1
  ```

### 2.2 call 和 apply
- ECMAScript 3 给 Function 的原型定义了 2 个 方法，他们是 Function.prototype.call
  和 Function.prototype.apply. 在实际开发中，特别是在一些函数式风格的代码编写中，apply
  和 call 尤为有用。 在 JavaScript 版本的设计模式中，这 2 个方法的应用也非常广泛，能
  熟练运用这两个方法，是我们真正成为一名 JavaScript 程序员的重要一步。
#### 2.2.1 `call` 和 `apply` 的区别  
- `apply` 接收 2 个参数:
    + 第 1 个参数指定了函数体内 `this` 对象的指向;
    + 第 2 个参数为一个带下表的集合，这个集合可以为 "数组" 或 "类数组"， apply 方法把
      这个集合中的元素作为参数传递给被调用的函数。
- `call` 方法是包装在 apply 上面的语法糖，所以 apply 比 call 更常用。call 接收的
  第一个参数也是代表函数体内的 this 指向，但从第 2 个参数开始往后，每个参数被依次传入函数。
- 实际上 js 的参数在内部就是用一个数组来表示的。从这个意义上说，apply 比 call 的使用率
  更高，我们不必关心具体有多少参数被传入函数，只要用 apply 一股脑地推过去就可以了。
- ```javascript
    let func = function(a, b, c) {
        console.log([a, b, c]);
        // - 当使用 apply/call 的时候，如果我们传入的第一个参数为 null,函数体内的 
        //   this 会指向默认的宿主对象，在浏览器中则是 window.
        console.log(this === window); // true
    };
    func.apply(null, [1, 2, 3]);

    let callFunc = function(a,b, c) {
        "use strict";
        // - 但如果在严格模式下, 函数体内的 this 还是 null。
        console.log(this === null); // true
        console.log([a, b, c]);
    };
    callFunc.call(null, 4, 5, 6);
  ```
#### 2.2.2  apply 和 call 的用途
- (1) 改变 `this` 指向
    + ```javascript
        let obj1 = {
            name: 'seven'
        };
        let obj2 = {
            name: 'anne'
        };
        window.name = 'window';
        let getName = function() {
            console.log(this.name)
        };
        getName();  // window
        getName.call(obj1); // seven
        getName.call(obj2); // anne
      ```
      纠正 div 节点上 onclick 事件中的 this 指向被改变的问题。
      ```html
        <div class="box">
        <input type="button" id="btn" value="测试按钮">
        </div>
        <script>
            document.getElementById('btn').onclick = function() {
                // console.log(this.id); // output: btn
                let func = function() {
                    console.log(this);   
                };
                
                // - 如果这样直接调用，输出结果为: Window
                // func();  

                // - 纠正 func 函数中 this 指向 window 的问题
                // - Output: <input type="button" id="btn" value="测试按钮">
                func.call(this);
            }
        </script>
      ```
- (2) Function.prototype.bind
    + 大部分高级浏览器都实现了内置的 `Function.prototype.bind`, 用来指定函数内部的 
      this 指向，即使没有原生的 Function.prototype.bind 实现，我们来模拟一个也不是难事
      ，代码如下:
      ```javascript 
        Function.prototype.bind = function(context) {
            // - 保存原函数
            let self = this;
            // - 返回一个新的函数
            return function() {
                // - 执行新的函数时，会把之前传入的 context 当作新函数体内的 this
                return self.apply(context, arguments)
            }
        }
        let obj = {
            name: "sven"
        };
        let func = function() {
            // - 输出  'sven'
            console.log(this.name);
        }.bind(myObj);
        func();
      ```
      我们通过 Function.prototype.bind 来“包装” func 函数，并且传入一个对象 context
      当作参数，这个 context 对象就是我们想修正的 this 对象。 <br/>
      在 Function.prototype.bind 的内部实现中，我们先把 func 函数的引用保存起来，然后
      返回一个新的函数。当我们在将来执行 func 函数时，实际上先执行的是这个刚刚返回的新函数。
      在新函数内部，self.apply(context, arguments) 这句代码才是执行原来的 func 函数，
      并且指定 context 对象为 func 函数体内的 this. <br/>
      这是一个简化版的 Function.prototype.bind 实现，通常我们还会把它实现得稍微复杂一
      点，使得可以往 func 函数中预先填入一些参数: <br/>
      ```javascript
        Function.prototype.bind = function() {
            // - 保存原函数
            let self = this;
            // - 需要绑定的 this 上下文
            let context = [].shift.call(arguments);
            // - 剩余的参数转成数组
            let args = [].slice.call(arguments);
            return function() {
                // - 执行新的函数的时候，会把之前传入的 context 当作新参数体内的 this
                //   并且组合两次分别传入的参数，作为新函数的参数
                return self.apply(context, [].concat.call(args, [].slice.call(arguments)))
            }
        };
        let obj = {name: "sven"};
        let func = function(a, b, c, d){
            // 输出 sven
            console.log(this.name);
            // Output: [1, 2, 3, 4]
            console.log([a, b, c, d])
        }.bind(obj, 1, 2);
        func(3, 4);
      ```
- (3) 借用其他对象的方法
    + 借用方法的第 (1) 种场景是“借用构造函数”，通过这种技术，可以实现一些类似继承的效果：
      ```javascript
        var A = function( name ){
            this.name = name;
        };
        var B = function(){
            // - 当前构造函数(B) 继承构造函数 A 的属性
            // - 利用 apply 指定 A 构造函数内的 this 值为 B 构造函数的实例, 
            //   name 形参为构造函数 B 的实例传入的 "seven"
            A.apply( this, arguments );
        };
        B.prototype.getName = function(){
            return this.name;
        };
        var b = new B( 'sven' );
        console.log( b.getName() ); // 输出： 'sven'
      ```
    + 借用方法的第 (2) 种运用场景跟我们的关系更加密切: 函数的参数列表 `arguments` 是一个
      类数组对象，虽然它也有“下标”，但它并非真正的数组，所以也不能像数组一样，进行排序操作
      或者往集合里添加一个新的元素。这种情况下，我们常常会借用 Array.prototype 对象上的
      方法。比如想往 arguments 中添加一个新的元素，通常会借用 `Array.prototype.push`:
      ```javascript
        (function() {
            Array.prototype.push.call(arguments, 3);
            console.log(arguments); // 1, 2, 3
        })(1, 2);
      ```
      在操作 arguments 的时候，我们经常非常频繁地找 Array.prototype 对象借用方法. <br/>
      想把 arguments 转成真正的数组的时候，可以借用 `Array.prototype.slice` 方法；想
      截去 arguments 列表中的头一个元素时，又可以借用 `Array.prototype.shift` 方法。
      那么这种机制的内部实现原理是什么呢？我们不妨翻开 V8 的引擎源码，以 
      `Array.prototype.push` 为例，看看 V8 引擎中的具体实现：
      ```javascript
        function ArrayPush() {
            // - 被 push 的对象的 length
            var n = TO_UINT32(this.length);
            // - push 的参数个数
            var m =; %_ArgumentsLength();
            for (var i = 0; i < m; i++) {
                // - 复制元素 (1)
                this[i + n] =; %_Arguments(i);
            }
            // - 修正 length 属性的值 (2)
            this.length = n + m;
            return this.length;
        }
      ```
      通过这段代码可以看到 `Array.prototype.push` 实际上是一个属性复制的过程，把参数
      按照下标依次添加到被 push 的对象上面，顺便修改了这个对象的 length 属性。至于被修
      的对象是谁，到底是数组还是类数组对象，这一点并不重要。 <br/>
      由此可以推断, 我们可以把 "任意" 对象传入到 Array.prototype.push: 
      ```javascript
        let a = {};
        [].push.call(a, "first");
        [].push.call(a, "this is second item");
        // a:  { '0': 'first', '1': 'this is second item', length: 2 }
        console.log("a: ", a);

        console.log("a.length: ", a.length);
        console.log("a[0]: ", a[0]);
      ```
      前面我们之所以把“任意”两字加了双引号，是因为可以借用 Array.prototype.push 方法的
      对象还要满足以下两个条件，从 ArrayPush 函数的 (1) 处和 (2) 处也可以猜到，这个对象
      至少还要满足：
        -  对象本身要可以存取属性；
        -  对象的 length 属性可读写。 <br/>
      对于第一个条件，对象本身存取属性并没有问题，但如果借用 Array.prototype.push 方法
      的不是一个 object 类型的数据，而是一个 number 类型的数据呢? 我们无法在 number 
      身上存取其他数据，那么从下面的测试代码可以发现，一个 number 类型的数据不可能借用到
      Array.prototype.push 方法：
      ```javascript
        var a = 1;
        Array.prototype.push.call( a, 'first' );
        alert ( a.length ); // 输出： undefined
        alert ( a[ 0 ] ); // 输出： undefined
      ```
      对于第二个条件，函数的 length 属性就是一个只读的属性，表示形参的个数，我们尝试把
      一个函数当作 this 传入 Array.prototype.push：
      ```javascript
        var func = function(){};
        Array.prototype.push.call( func, 'first' );
        alert ( func.length );
        // 报错： cannot assign to read only property ‘length’ of function(){}
      ```
#### 2.1 this
- 2.1.1 this 的指向: 除去不常用的 with 和 eval 的情况，具体到实际应用中，this 的指向大致可以分为以下 4 种:
    + 1.作为对象的方法调用
        - 当函数作为对象的方法调用时，this 指向该对象:
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
    + 2.作为普通函数调用
        - 当函数不作为对象的属性被调用是，也就是我们常说的普通函数方式，此时的 this 总是指向全局对象，在浏览器的
        js 里，这个全局对象是 window 对象:
        ```javascript
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
            var getName = myObj.getName;
            console.log(getName());  // output: globalName


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

            // 在 ES5 的 strict 模式下，这种情况下的 this 已经被规定为不会指向全局对象，而是 undifined:
            function func() {
                "use strict";
                console.log(this);  // output: undefined
            }

        ```

    + 3.构造器调用
        - js 中没有类，但是可以从构造器(构造函数)中创建对象，同时也提供了 new 运算符，使得构造器看起来更像一个类。
        构造器函数(为了和普通函数相区分，构造函数的第一个字符大写)和普通函数一样，他们的区别在于被调用的方式。当用
        new 运算符调用函数时，该函数总会返回一个对象，通常情况下，**构造函数里的 this 就指向返回的这个对象**。代码如下:
        ```javascript
            let MyClass = function() {
                this.name = "seven";
            };
            var obj = new MyClass();
            console.log(obj.name);  // output: seven

            // 使用 new 构造函数时，还要注意一个问题，如果构造函数显式地返回了一个 object 类型的对象，那么此次运算
            // 结果最终会返回这个对象，而不是我们上面说的 this:
            let MyClass2 = function () {
                this.name = "seven";
                return {
                    name: "Anna"
                }
            };
            var obj2 = new MyClass2();
            console.log(obj2.name); // output: Anna


            // 如果构造函数不显式地返回任何数据，或者式返回一个非对象类型的数据，就不会造成上述问题:
            let MyClass3 = function () {
                this.name = "seven";
                return "Anna";
            };
            var obj3 = new MyClass3();
            console.log(obj3.name); // output: Anna

        ```

    + 4.Function.prototype.call 或 Function.prototype.apply 调用
        - 跟普通的函数调用相比，用 Function.prototype.call 或 Function.prototype.apply 可以
        动态地改变传入函数的 this:
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

- 2.1.2 丢失的 this
    ```javascript
        //这是一个经常遇到的问题，我们先看下面的代码：
        var obj = {
            myName: 'sven',
            getName: function () {
                return this.myName;
            }
        };

        console.log(obj.getName()); // 输出：'sven'

        // 根据 2.1.2 节提到的规律，此时的普通函数调用方式，this 是指向全局 window 的，所以结果是 undefined
        var getName2 = obj.getName;
        console.log(getName2()); // 输出：undefined


        //我们可以尝试利用apply 把document 当作this 传入getId 函数，帮助“修正”this：
        document.getElementById = (function (func) {
            return function () {
                return func.apply(document, arguments);
            }
        })(document.getElementById);

        var getId = document.getElementById;
        var div = getId('div1');
        alert(div.id); // 输出： div1

    ```


#### 2.2 call和apply
   ES3给 Function 的原型定义了2个方法:Function.prototype.call 和 Function.prototype.apply。在实际开发中，
   特别是在一些函数式风格的代码编写中，call 和 apply 方法尤其有用。 在 js 版本的设计模式中，这两个方法的应用也
   非常广泛，能熟练运用这2个方法，是我们真正成为一名 js 程序员的重要一步。
   - apply 和 call 的主要作用:
        + (1) 改变 this 指向
        + (2) 实现内置的 Function.prototype.bind
        + (3) 借用其他对象的方法
            - 借用方法第一种场景是 "借用构造函数"，通过这种技术，可以实现一些类似继承的效果:
            ```javascript
                var A = function(name) {
                    this.name = name;
                };
                var B = function() {
                    A.apply(this, arguments);
                };

                B.prototype.getName = function() {
                    return this.name;
                };
                var b = new B("sven");
                console.log(b.getName());   // output: sven
            ```

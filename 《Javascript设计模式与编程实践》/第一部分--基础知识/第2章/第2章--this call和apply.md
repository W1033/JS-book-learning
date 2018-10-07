#### 2.1 this
- 2.1.1 this 的指向: 除去不常用的 with 和 eval 的情况，具体到实际应用中，this 的指向大致可以分为以下 4 种:
    + 1.作为对象的方法调用
        - 当函数作为对象的方法调用时，this 指向该对象:
        ```
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
    + 3.构造器调用
    + 4.Function.prototype.call 或 Function.prototype.apply 调用


#### 2.2 call和apply
   ES3给 Function 的原型定义了2个方法:Function.prototype.call 和 Function.prototype.apply。在实际开发中，
   特别是在一些函数式风格的代码编写中，call 和 apply 方法尤其有用。 在 js 版本的设计模式中，这两个方法的应用也
   非常广泛，能熟练运用这2个方法，是我们真正成为一名 js 程序员的重要一步。
   - apply 和 call 的主要作用:
        + (1) 改变 this 指向
        + (2) 实现内置的 Function.prototype.bind
        + (3) 借用其他对象的方法

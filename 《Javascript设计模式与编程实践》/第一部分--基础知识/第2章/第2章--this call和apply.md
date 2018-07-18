
#### 2.2 call和apply 
   ES3给 Function 的原型定义了2个方法:Function.prototype.call 和 Function.prototype.apply。在实际开发中，
   特别是在一些函数式风格的代码编写中，call 和 apply 方法尤其有用。 在 js 版本的设计模式中，这两个方法的应用也
   非常广泛，能熟练运用这2个方法，是我们真正成为一名 js 程序员的重要一步。
   - apply 和 call 的主要作用:
        + (1) 改变 this 指向
        + (2) 实现内置的 Function.prototype.bind
        + (3) 借用其他对象的方法
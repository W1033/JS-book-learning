
/** AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括
 *    "日志统计、安全控制、异常处理"等。 把这些功能抽离出来之后，再通过 "动态织入"的方式掺入业务逻辑模块中。
 *    在 Java 语言中，可以通过反射和动态代理机制来实现 AOP 技术。 而在 js  这种动态语言中， AOP 的实现更加简单，这是 js 与生俱来的能力。
 *    通常，在 js 中实现 AOP，都是把一个函数 "动态织入" 到另外一个函数之中，具体的实现技术有很多，本节通过扩展
 *    Function.prototype 来做到这一点。 代码如下:
 **/
Function.prototype.before = function (beforefn) {
    // 保存 before 原函数的引用
    const _self = this;
    // 返回包含了原函数和新函数的 "代理" 函数
    return function () {
        // 执行新函数，修正 this.
        beforefn.apply(this, arguments);
        // 执行原函数
        return _self.apply(this, arguments);
    }
};

Function.prototype.after = function (afterfn) {
    const _self = this;
    return function () {
        // 首先执行原函数，
        let ret = _self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};
let func = function () {
    console.log(2);
};
func = func.before(function () {
    console.log(1);
}).after(function () {
    console.log(3);
})
func();

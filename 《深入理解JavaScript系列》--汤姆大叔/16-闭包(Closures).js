
/**
 * ### 深入理解 JS 系列（16）： 闭包（Closures）
 * > 文章链接：https://www.cnblogs.com/TomXu/archive/2012/01/31/2330252.html
 * - 众所周知，在函数式语言中（ECMAScript 也支持这种风格），函数既是数据。就比方说，
 *   函数可以赋值给变量，也可以当做参数传递给其他函数，还可以从函数里返回等等。这类函数有
 *   特殊的名字和结构。
 */

// 用命名函数表达式实现递归. Tip: 这种写法实现了尾调函数优化
let factorial = (function f(num) {
    if (num <=1) {
        return 1;
    } else {
        return num * f(num -1);
    }
});
console.log(factorial(5));


let x = 10;
function foo() {
    console.log("x:", x);
}
(function(funArg) {
    let x = 20;

    // 变量 x 在（lexical）上下文中静态保存的，在该函数创建的时候就保存了
    funArg();
})(foo);
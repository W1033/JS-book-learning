/**
 * ## 2.2 call 和 apply
 *   ECMAScript 3 给 Function 的原型定义了 2 个 方法，他们是 Function.prototype.call
 *    和 Function.prototype.apply. 在实际开发中，特别是在一些函数式风格的代码编写中，apply
 *    和 call 尤为有用。 在 JavaScript 版本的设计模式中，这 2 个方法的应用也非常广泛，能
 *    熟练运用这两个方法，是我们真正成为一名 JavaScript 程序员的重要一步。
 */

/** > 2.2.1  apply 和 call 的区别 */
// - apply 接收 2 个参数，第一个参数制定了函数体内 this 对象的指向， 第二个参数为一个带下表
// 的集合，这个集合可以为 "数组" 或 "类数组"， apply 方法把这个集合中的元素作为参数传递给被
// 调用的函数。

// - call 方法是包装在 apply 上面的语法糖，所以 apply 比 call 更常用。( call 接收的第一个
// 参数也是代表函数体内的 this 指向，但从第二个参数开始往后，每个参数被依次传入函数。)

// - 实际上 js 的参数在内部就是用一个数组来表示的。从这个意义上说，apply 比 call 的使用率更高，
// 我们不必关心具体有多少参数被传入函数，只要用 apply 一股脑地推过去就可以了。

let func = function(a, b, c) {
    console.log([a, b, c]);

    // 当使用 apply/call 的时候，如果我们传入的第一个参数为 null,
    // 函数体内的 this 会指向默认的宿主对象，在浏览器中则是 window.
    // console.log(this === window); // true
}
// func.apply(null, [1, 2, 3])

let callFunc = function(a,b, c) {
    "use strict";
    // 但如果在严格模式下, 函数体内的 this 还是 null。
    console.log(this === null); // true
    console.log([a, b, c]);
}
// callFunc.call(null, 4, 5, 6);

/**
 *  > 2.2.2  apply 和 call 的用途
 *   - 1、改变 this 指向
 *   - 2、Function.prototype.bind
 *   - 3、借用其他对象的方法
 */

/** - 1、改变 this 指向 */
let obj1 = {
    name: 'seven'
};
let obj2 = {
    name: 'anne'
};
// window.name = 'window';
let getName = function() {
    console.log(this.name)
}
// getName();  // window
// getName.call(obj1); // seven
// getName.call(obj2); // anne

// 纠正 div 节点上 onclick 事件中的 this 指向被改变的问题。
/*document.getElementById('div1').onclick = function() {
    console.log(this.id); // output: div1
    let func = function() {
        console.log(this.id);
    };
    // func();  // 如果这样直接调用，输出结果为: undefined
    // 纠正 func 函数中 this 指向 window 的问题
    func.all(this);
}*/


/** 2、Function.prototype.bind */
// 大部分高级浏览器都实现了内置的 Function.prototype.bind, 用来指定函数内部的 this 指向，
// 即使没有原生的 Function.prototype.bind 实现，我们来模拟一个也不是难事，代码如下:
// (tips: 这个是简化版的 Function.prototype.bind 实现，完整版见同级目录文件。)
/*Function.prototype.bind = function(context) {
    // 保存原函数
    let self = this;
    // 返回一个新的函数
    return function() {
        // 执行新的函数时，会把之前传入的 context 当作新函数体内的 this
        return self.apply(context, arguments)
    }
}
let myObj = {
    name: "Seven"
};
let bindFunc = function() {
    console.log(this.name);
}.bind(myObj);
// 当前 bindFunc() 调用时上面的 bind() 方法已经执行完毕，bind() 方法把内部的 return 匿名函数
// 放到全局环境中，匿名函数在 bind() 方法内形成闭包，根据作用域链语法，匿名函数始终可以访问到
// bind() 的作用域。
bindFunc();*/

/** Function.prototype.bind 完整版 */
// 在 Function.prototype.bind 的内部实现中，我们先把 func 函数的引用保存起来，然后返回一个
// 新的函数。当我们在将来执行 func 函数时，实际上先执行的是这个刚刚返回的新函数。在新函数内部，
// self.apply(context, arguments) 这句代码才是执行原来的 func 函数，并且指定 context
// 对象为 func 函数体内的 this.
Function.prototype.bind = function() {
    // 保存原函数
    let self = this;
    // 需要绑定的 this 上下文
    let context = [].shift.call(arguments);
    // 剩余的参数转成数组
    let args = [].slice.call(arguments);
    return function() {
        // 执行新的函数的时候，会把之前传入的 context 当作新参数体内的 this
        // 并且组合两次分别传入的参数，作为新函数的参数
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)))
    }
}
let theObj = { name: 'Seven' };
let theFunc = function(a, b, c, d){
    // 输出 Seven
    console.log(this.name)
    console.log([a, b, c, d])
}.bind(theObj, 1, 2);

theFunc(3, 4);




/** - 3、借用其他对象的方法 */
let max = Math.max.apply(null, [11, 22, 33, 44, 34, 24, 46])
// console.log(max);   // 46

(function(){
    Array.prototype.push.call(arguments, 3);
        console.log(arguments);
})(111, 222)

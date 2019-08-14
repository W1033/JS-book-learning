/** ## 11. 执行上下文 Execution Contexts */
// - execution [ˌeksɪ'kjuːʃ(ə)n/] ---n.执行，实行
// - stack [stæk] --n.堆,堆叠。 --v.堆积

/**
 * - (1) 执行上下文 -- 定义:
 *   + 每次当控制器转到 ECMAScript 可执行代码的时候，即会进入一个执行上下文
 *     (Execution Context)。 执行上下文(简称：EC) 是 ECMA-262 标准里的一个抽象概念，
 *     用于同 可执行代码(executable code) 概念进行区分。
 *   + 标准规范没有从技术实现的角度定义 EC 的准确类型和结构，这应该是具体实现 ECMAScript
 *     引擎时要考虑的问题。
 *   + 活动的执行上下文组(active execution context group)在逻辑上组成一个堆栈。
 *     堆栈底部永远都是全局上下文(global context), 而顶部就是当前(活动)的上下文。
 *     堆栈在 执行上下文(EC)类型进入和退出上下文的时候被修改(推入或弹出)
 *
 * - (2) 可执行代码类型:
 *   + 可执行代码的类型这个概念与执行上下文的抽象概念是有关系的。在某些时刻，可执行代码与执行
 *     上下文完全有可能是等价的。
 *     - 例如，我们可以定义执行上下文堆栈是一个数组:
 *      `ECStack = []`
 *   + 每次进入 function (即使 function 被递归调用或者作为构造函数) 的时候或者内置的 eval
 *     函数工作的时候，这个堆栈都会被压入。
 *
 * - (3) 全局代码:
 *   + 这种类型的代码是在 "程序" 级处理的。例如: 加载外部的 js 文件或者本地`<script></script>`
 *     标签内的代码。 全局对象不包含任何 function 体内的代码。
 *   + 在初始化（程序启动）阶段，ECStack 是这样的
 *     ```
 *         ECStack = [
 *             globalContext
 *         ]
 *     ```
 *
 * - (4) 函数代码：
 *   + 当进入 function 函数代码 (所有类型的 functions) 的时候， ECStack 被压入新元素。
 *     需要注意的是，具体的函数代码不包括内部函数(inner functions) 代码。如下所示，我们使
 *     函数自己调用自己的方式递归一次：
 */
(function foo(bar) {
    if (bar) {
        return;
    }
    foo(true);
})();

// - 上面的代码 ECStack 以如下方式被改变:

// - 第一次调用 foo 的激活调用
// ECStack = [
//     <foo> functionContext
//     globalContext
// ];

// - foo 的递归激活调用
// ECStack = [
//     <foo> functionContext -recursively （递归）
//     <foo> functionContext
//     globalContext
// ]

/**
 * - 每次return的时候，都会退出当前执行上下文的，相应地 ECStack 就会弹出，栈指针会自动移动
 *   位置，这是一个典型的堆栈实现方式。一个抛出的异常如果没被截获的话也有可能从一个或多个
 *   执行上下文退出。相关代码执行完以后，ECStack 只会包含全局上下文(global context)，一直
 *   到整个应用程序结束。
 */


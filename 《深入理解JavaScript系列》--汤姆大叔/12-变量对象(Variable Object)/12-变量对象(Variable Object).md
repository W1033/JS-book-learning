# 12 -- 变量对象 Variable Object

## 目录 (Catalog)
> [原文](https://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html)
- 12.1 介绍
- 12.2 数据声明
- 12.3 不同执行上下文中的变量对象
    + 12.3.1 全局执行上下文中的变量对象
    + 12.3.2 函数上下文中的变量对象
- 12.4 处理上下文代码的 2 个阶段
    + 12.4.1 进入执行上下文 
    + 12.4.2 代码执行
- 12.5 关于变量
- 12.6 特殊实现 `__parent__` 属性
- 12.7 总结



## 生词 (New Words)


## 内容 (Content)
### 12.1 介绍
- JavaScript编程的时候总避免不了声明函数和变量，以成功构建我们的系统，但是解释器是
  如何并且在什么地方去查找这些函数和变量呢？我们引用这些对象的时候究竟发生了什么？
- 大多数ECMAScript程序员应该都知道 变量 与 执行上下文(讲解见上一节) 有密切关系:
  ```js
    // - 全局上下文中的变量
    let aa = 10; 

    (function() {
        // - 函数(function)上下文中的局部变量
        let bb = 20; 
    })();

    console.log("aa: ", aa);  // 10
    // console.log("bb: ", bb);  // 全局变量 'bb' 没声明
  ```

### 12.2 数据声明

### 12.3 不同执行上下文中的变量对象
#### 12.3.1 全局执行上下文中的变量对象
#### 12.3.2 函数上下文中的变量对象

### 12.4 处理上下文代码的 2 个阶段
#### 12.4.1 进入执行上下文 
#### 12.4.2 代码执行

### 12.5 关于变量

### 12.6 特殊实现 `__parent__` 属性

### 12.7 总结



```js
    // - ECMAScript 规范指出独立作用域只能通过 '函数(function)' 代码类型的执行上下文
    //  （Context）创建。也就是说，相对于于 C/C++ 来说，ECMAScript 里的 for 循环
    //   并不能创建一个局部的上下文。
    for (var k in {a:1, b: 2}) {
        // k: a
        // k: b
        console.log("k:", k);
    }
    console.log("Outer k:", k); // Outer k: b

    // - 而从 ES6 开始，引入了关键字 let 和 const。这些关键字也是用来定义
    //   变量/常量 的，可以用来替代 var 关键字。但这两个关键字跟 var 不同，它们支持
    //   语句块(Block Statements) 内声明本地作用域。 例如:
    if (true) {
        var name="var 变量";
        let like = "let 变量，属于当前语句块内的块级作用域";
        const skill = "const 常量，也是 if 语句的块级作用域";
    }
    console.log("name: ", name);
    console.log("like: ", like);
    console.log("skill: ", skill);



    /**
     * > 数据声明：
     * - 如果变量与 **执行上下文(activeExecutionContext)**相关，那变量自己应该知道
     *   它的数据存储在哪里，并且知道如何访问。这种机制称为变量对象(variable object).
     *
     * - 变量对象（缩写：VO）是一个与执行上下文相关的特殊对象，它存储着在上下文中声明
     *   的以下内容：
     *      + 变量 (var, 变量声明);
     *      + 函数声明 (FunctionDeclaration, 缩写为FD)
     *      + 函数的形参
     */

    // 举例来说，我们可以用普通的 ECMAScript 对象来表示一个变量对象：
    // VO = {};
    // 就像我们所说的，VO 就是执行上下文的属性（property）:
    activeExecutionContext = {
        VO: {
            // 上下文数据 (var, FD, function arguments);
        }
    };
    // 只有全局上下文的变量对象允许通过 VO 的属性名称来间接访问（因为在全局上下文里，
    // 全局对象自身就是变量对象，稍后会详细介绍），在其它上下文中是不能直接访问 VO 对象
    // 的，因为它只是内部机制的一个实现。

    // 当我们声明一个变量或者一个函数的时候，和我们创建 VO 新属性的时候一样没有别的
    // 区别（即：有名称及对应的值）。例如:
    (function() {
        var a = 10;
        function test(x) {
            var b = 20;
        }
        test(30);
    })();
    /**
     * - 对应的变量对象是：
     *
     * // + 全局上下文的变量对象
     * VO(globalContext) = {
     *     a: 10,
     *     test: <reference to function>
     * };
     *
     * // + test 函数上下文的变量对象
     * VO(test functionContext) = {
     *     x: 30,
     *     b: 20
     * }
     *
     * 在具体实现层面（以及规范中）变量对象只是一个抽象概念。（从本质上说，在具体
     * 执行上下中，VO 名称是不一样的，并且初始结构也不一样。）
     */


    /**
     * > **不同执行上下文中的变量对象**
     * - (1)、全局上下文中的变量对象：
     *      + 全局对象（Global object）是在进入任何执行上下文之前就已经创建了的
     *        对象；这个对象只存在一份，它的属性在程序中任何地方都可以访问，全局对象
     *        的生命周期终止于程序退出那一刻。
     *      + 全局对象初始创建阶段将 Math、String、Date、parseInt 作为自身属性，
     *        等属性初始化，同样也可以有额外创建的其它对象作为属性（其可以指向到全局对象
     *        自身）。例如，在DOM中，全局对象的 window 属性就可以引用全局对象自身
     *        (当然，并不是所有的具体实现都是这样)：
     *        ```javascript
     *            global = {
     *                Math: <...>,
     *                String: <...>,
     *                ...
     *                ...
     *                window: global    // 引用自身
     *            }
     *        ```
     *      + 当访问全局对象的属性时通常会忽略掉前缀，这是因为全局对象是不能通过名称直接
     *        访问的。不过我们依然可以通过全局上下文的 this 来访问全局对象，同样也可以
     *        递归引用自身。例如 DOM 中的 window。综上所述，代码可以简写为：
     *        --> 见下面的: demo_01
     *
     * - (2)、函数上下文中的变量对象
     *      + 在函数执行上下文中，VO 是不能直接访问的，此时由活动对象
     *       （activation object, 缩写为 AO）扮演 VO 的角色。
     *
     */


    // demo_01
    String(10); // 就是 global.String(10);
    // 带有前缀
    window.a = 10;  // === global.window.a = 10 或 === global.a = 10
    this.b = 20;    // global.b = 20;
    console.log("this.b:", this.b);
    console.log("this.b: ", this); // Window


    console.log("~~~~~~~~~~");
    (function() {
        // - Tip: 要明白一个观念是，函数和变量都可以作用域提升，提升作用域是引擎开始
        //   解析当前执行上下文时首要做的工作，但是函数的作用域提升要高于变量
        console.log("First x:", x); // 输出 f x() {}, 因为函数作用域提升

        var x = 10;
        console.log("Second x: ", x);

        x = 20;

        function x() {}

        console.log("Third x:", x);
    })();


    console.log("~~~~~~~~~");
    (function() {
        var y;
        console.log("First y:", y);
        y = 10;
        console.log("Second y: ", y);
        y = 20;
        console.log("Third y:", y);
    })();


    console.log("~~~~~~~~~");
    (function() {
        // 因为 a 在下面声明，根据变量作用域提升，所以这里输出的结果是定义（defined）了，
        // 但是未初始化（undefined）。[Tips: 把定义说成 defined， 而 undefined 
        // 却说成 '未初始化' 不说成'未定义'；是的，就是这么奇怪，这个问题在 
        // 《You-dont-know-js》中也被作者吐槽过，但这是 js 遗留的老问题了，所以不做
        // 讨论，记得就行了。]
        console.log("a", a);    // undefined

        b = 12;
        console.log("b", b);    // 代码执行阶段创建

        var a = 20;
        console.log("Second a : ", a);
    })();
```




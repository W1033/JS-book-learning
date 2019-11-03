# 第 3 章 -- 函数

## 目录 Table of Content
1. 函数形参的默认值
	+ 在 ES5 中模拟默认参数
	+ ES6 中的默认参数值
	+ 默认参数值对 arguments 对象的影响
	+ 默认参数表达式
	+ 默认参数的临时死区
1. 处理无命名参数
	+ ES5 中的无命名参数
	+ 不定参数
1. 增强的 Function 构造函数
1. 展开运算符
1. name 属性
    + 如何选择合适的名称
	+ name 属性的特殊情况
1. 明确函数的多重用途
	+ 在 ES5 中判断函数被调用的方法
	+ 元属性 (Metaproperty) new.target
1. 块级函数
	+ 块级函数的使用场景
	+ 非严格模式下的块级函数
1. 箭头函数
	+ 箭头函数语法
	+ 创建立即执行函数表达式
	+ 箭头函数没有 this 绑定
	+ 箭头函数和数组
	+ 箭头函数没有 arguments 绑定
	+ 箭头函数的辨识方法
1. 尾调用优化
	+ ES6 中的尾调用优化
	+ 如何利用尾调用优化
1. 小结

---

## 生词
- parametric [ˌpærə'metrik]  adj.参数的
- parameter  [pə'ræmɪtə]     n. 参数
- statement  ['steɪtm(ə)nt]  n. 声明, 陈述
- expression [ɪk'spreʃ(ə)n]  n. 表达， 表现

---

## 本章内容 (Content)
### 函数形参的默认值
- 在 ES5 中模拟默认参数
```javascript
	function makeRequest(url, timeout, callback) {
	// - 添加 typeof 判断是排除传入 timeout 值为 0 时 js 认为 0 不是
    //   合法的值, 仍然把 2000 赋值给 timeout 的情况.
	timeout = (typeof timeout !== "undefined") ? timeout: 2000;
	callback = (typeof callback !== "undefined") ? callback: function() {};
	
	// 函数的其他代码
	}
```
- ES6 中的默认参数值
	+ (0) ES6 默认参数值示例: 
	  ```javascript
	    // - ES6 默认参数值示例: 只有第一个参数 url 是必须的, 其他 2 个参数都有默认值
	    // - Tip: 由于书上的示例无法运行, 所以从 internet 上找到示例.
        function  num(x = 1, y = 2, z = 3) {
            console.log(x, y, z);
        }
        num(6, 7);  // output: 6 7 3
      ```
    + (1) 使用 undefined 传参: 如果想让某个参数使用默认值,我们可以使用 undefined 进行
        赋值, 例如
      ```javascript 
        num(6, undefined, 7);   // 6 2 7
      ```
    + (2) 使用 null 代替默认值
      ```javascript 
        num(9, null, 12);   // 6 null 12
	  ```
	+ (3) 参数运算: 
	  ```javascript
        function sum(x = 1, y = 2, z = x + y) {
            console.log(x, y, z);
        }
        sum(6, 7);
	  ```
- 默认参数值对 arguments 对象的影响

- 默认参数表达式
```javascript
	function() {}
```
- 默认参数的临时死区
```javascript
	function() {}
```

### 处理无命名参数
- ES5 中的无命名参数
    + ```javascript
        let book = {
        title: "Understanding ECMAScript 6",
        author: "Nicholas C. Zakas",
        year: 2016
        };
        function pick(obj) {
        // Javascript设计模式与编程实践\第一部分--基础知识\第1章\P14-Object.create.js
        let result = Object.create(null);   // 克隆一个空对象

        // start at the second parameter
        for (let i = 1, len = arguments.length; i < len; i++) {
            result[arguments[i]] = obj[arguments[i]];
        }

        return result;
        }

        let bookData = pick(book, "author", "year");
        console.log(bookData.author);
        console.log(bookData.year);
      ```
- ES6 不定参数(Rest parameters):
    + 在函数的命名参数前添加三个点 (...) 就表明这是一个不定参数，该参数为一个数组，包含着自它
      之后传入的所有参数，通过这个数组名即可逐一访问里面的参数。e.g. 重写上面的 pick() 函数:
      ```javascript
        function pick2(obj, ...keys) {
        let result = Object.create(null);
        for (let i = 0, len = keys.length; i < len; i++) {
            result[keys[i]] = obj[keys[i]]
        }
        return result;
        }

        let bookData2 = pick2(book, "author", "year");
        // bookData2.author: Nicholas C. Zakas
        console.log("bookData2.author: " + bookData2.author); 
        
        // 不定参数的使用示例
        let func = function(a, b, ...args) {
            console.log(args);
        };
        func(1, 2, 3, 4, 5, 6); // [3, 4, 5, 6]
      ```

### 增强的 Function 构造函数

### 展开运算符
- ```javascript
    // ES5 中返回最大值
    let values = [25, 50, 75, 100];
    console.log(Math.max.apply(Math, values));  // 100

    // ES6 利用展开运算符实现返回最大值
    console.log(Math.max(...values));       // 100

    // ES6 展开运算符示例2
    let values2 = [-25, -70, -50, -100];
    console.log(Math.max(...values2, 0));   // 0

    // 展开运算符使用示例3
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    console.log("x", x);
    console.log("y", x);
    // console.log("...z", ...z);
  ```

### name 属性
- 如何选择合适的名称
    + ES6 程序中所有的函数的 name 属性都有一个合适的值.如下面函数声明和函数表达式定义的
      函数, 都打印了各自的 name 属性:
      ```javascript
        function doSomething() {}
        var doAnotherThing = function() {};
        console.log(doSomething.name);  // "doSomething"
        console.log(doAnotherThing.name); // "doAnotherThing"
      ```
 - name 属性的特殊情况
    + ES6 中为所有的函数新增了 name 属性。 函数声明/函数表达式。 例如: 
      ```javascript
        let doSomething = function doSomethingElse() {};
        const person = {
            // - getter 函数，名称为"get firstName", setter 函数的名称有前缀 "set"
            get firstName() {
                return "Nicholas";
            },
            sayName: function () {
                console.log(this.name);
            }
        };
        console.log(doSomething.name);      // doSomething
        console.log(person.sayName.name);   // sayName

        // - 这里和书上有出入，这是发现的第二处修改了
        // - getOwnPropertyDescriptor 取得自身属性描述符
        const descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
        console.log(descriptor.get.name);   // get firstName

        // P53: 通过 bind() 函数创建的函数，其名称将带有 "bound" 前缀; 通过 Function 
        // 构造函数创建的函数，其名称
        // 将是 "anonymous"(/ə'nɒnɪməs/ adj.匿名)。 示例如下:
        const doSome = function () {
            // 空函数
        };
        console.log(doSomething.bind().name);   // bound doSomethingElse
        console.log((new Function()).name);     // anonymous
    ```

### 明确函数的多重用途
- 在 ES5 中判断函数被调用的方法
    + 在ES5中如果想确定一个函数是否通过 new 关键字被调用(或者说，判断该函数是否作为
      构造函数被调用),最流行的方式是使用 `instanceof` (instance 实例), 例如:
      ```javascript
        function Person(name) {
            if (this instanceof Person) {
            this.name = name;
            } else {
            throw new Error("必须通过new关键字来调用Person.");
            }
        }

        // (2.) 还有一种在库中常见的写法是:  add-20180428
        function SendVerCode() {
            if (typeof this === "undefined" || Object.getPrototypeOf(this) 
            !== SendVerCode.prototype) {
            return new SendVerCode();
            }
        }
    ```
- 元属性 (Metaproperty) `new.target`
    + P55: 元属性 new.target: 检测一个函数是否通过 new 关键字来调用。
      ```javascript
        function Person2(name) {
            if (typeof new.target !== "undefined") {
            console.log(this.name = name);
            } else {
            console.log("必须通过 new 关键字来调用 Person.");
            }
        }

        let person2 = new Person2("Nicholas"); // Nicholas
        // - 必须通过 new 关键字来调用 Person.
        let anotherPerson = Person2.call(person, "Michael"); 
      ```

### 块级函数
- 块级函数的使用场景
- 非严格模式下的块级函数

### 箭头函数
- 箭头函数语法
    + 箭头函数: 所谓箭头函数，目的其实就是为了实现函数式的 lambda 表达式的，它本身就是为了
      函数式而添加进去的新概念，所谓“方便写”只是附带的特性。然而，函数式和面向对象两种编程语言
      范式是冲突的，冲突的点在于数据组织的方式不一致。面向对象是利用 “对象” 来集合一组数据和
      方法，而函数式是通过函数来集合一组数据，并且他的方法是和数据分开的。所以在函数式里面不会
      存在 this 这种上下文概念。
    + 一个箭头函数表达式的语法比一个"函数表达式"更短，并且不绑定自己的 `this`, `arguments`
      , `super` 或 `new.target`。这些函数表达式最适合用于非方法函数，并且不能用作构造函数。
    +  箭头函数的特性:
        - (1) 默认绑定外层 this
            + ```javascript
                (function () {
                    // - 示例 1
                    const obj = {
                        a: function () {
                            console.log(this)
                            window.setTimeout(() => {
                            console.log(this)
                            }, 1000)
                        }
                    };
                    // // 第一个 this 是 obj 对象，第二个 this 还是 obj 对象
                    obj.a.call(obj); 
                })();
                (function () {
                    // - 示例 2
                    const obj = {
                        a: function () {
                            console.log(this)
                        },
                        b: {
                            c: function () {
                                console.log(this)
                            }
                        }
                    };
                    obj.a();  // 打出的是obj对象, 相当于obj.a.call(obj)
                    obj.b.c(); //打出的是obj.b对象, 相当于obj.b.c.call(obj.b)
                })();
              ```
        - (2) 不能用 call 方法修改里面的 this
        - (3) 没有 super、arguments 和 new.target 绑定。
        - (4) 不能通过 new 关键字调用
        - (5) 没有原型
        - (6) 不支持 arguments 对象
        - (7) 不支持重复的命名参数
- 创建立即执行函数表达式
    + ```javascript
        let people = ((name) => {
            return {
                getName: function () {
                    return name;
                }
            }
        })("Nicholas");
        console.log(people.getName());
      ```
- 箭头函数没有 this 绑定
- 箭头函数和数组
    + ```javascript
        let numsArr = [1, 6, 4, 8, 2, -1, -20];
        let result = numsArr.sort((a, b) => a - b);
        console.log(numsArr);   // [ -20, -1, 1, 2, 4, 6, 8 ]
      ```
- 箭头函数没有 arguments 绑定
    + ```javascript
        // P66 - 箭头函数没有 arguments 绑定: 始终可以访问外围函数的 arguments 对象。
        function createArrowFunReturningFirstArg() {
            return () => arguments[0];
        }
      ```
- 箭头函数的辨识方法

### 尾调用优化
- ES6 中的尾调用优化
- 如何利用尾调用优化
     + ```javascript
        // P69 - 如何利用尾调优化 factorial /fæk'tɔːrɪəl/ n.阶乘
        function factorial(n, p = 1) {
            if (n <= 1) {
                return p;
            } else {
            let result = n * p;
                // 优化后
                return factorial(n - 1, result)
            }
        }
        ```

### 小结



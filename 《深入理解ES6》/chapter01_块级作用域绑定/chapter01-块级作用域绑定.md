# 第 1 章 -- 块级作用域绑定

## 目录 (Catalog)
1. `var` 声明及变量提升 (Hoisting) 机制
2. 块级声明
     + 2.1 let 声明
     + 2.2 禁止重复声明
     + 2.3 const 声明
     + 临时死区 (Temporal Dead Zone) 
3. 循环中的作用域绑定
    + 3.1 循环中的函数
    + 3.2 循环中的 let 声明
    + 3.3 循环中的 const 声明
4. 全局作用域绑定
5. 块级绑定最佳实践的进化
6. 小结

---

## 生词 
- **constant ['kɒnst(ə)nt] --n.常数，常量  --adj.不变的，恒定的**
- **distortion [dɪ'stɔːʃ(ə)n] --n.失真; 畸变; 扭曲**
    + --> He discovered that the distortion of space and time.
      他发现时空扭曲.



## 内容 (Content)
### 1. `var` 声明及变量提升 (Hoisting) 机制
- 在函数作用域或全局作用域中通过关键字 `var` 声明的变量, 无论实际上式在哪里声明的, 都会被
  当成在当前作用域顶部声明的变量, 这就是我们常说的 提升(Hoisting) 机制. 下面以一个函数
  为例来说明:
  ```javascript
    function getValue(condition) {
        if (condition) {
            var value = 'blue';
             // - 其他代码
            return value;
        } else {
            // - 此处访问变量 value, 其值为 undefined
            return null;
        }
        // - 此处可访问变量 value, 值仍然为 undefined
    } 
    // - 如果你不太熟悉 JavaScript，或许会认为只有 condition 为 true 时变量 value 
    //   才会被创建。实际上，value 总是会被创建。 在预编译阶段, js 引擎会将上面的 
    //   getValue 函数修改为下面这样;
    function getValue(condition) {
        // - 变量 value 的声明被提升到函数顶部.
        // - Tip: 实际上在 js 中定义的函数和变量都会出现作用域提升, 函数的作用域提升权限
        //   比变量还要高.
        var value;
        if (condition) {
            value = 'blue';
            return value;
        } else {
            return null;
        }
    } 
  ```
### 2. 块级声明
- 块级声明用于声明在指定块的作用域之外无法访问的变量. 块级作用域(亦被称为 词法作用域) 存在于:
    + 函数内部
    + 块中 (字符`{` 和 `}` 之间的区域) <br/>
  很多类 C 语言都有块级作用域, 而 ES6 引入块级作用域就是为了让 js 更灵活更普适.
- **2.1 let 声明**
    + 用 `let` 代替 `var` 来声明变量, 就可以把变量的作用域限制在当前代码块中 (稍微我们
      将在 `临时死区 (Temporal Distrotion Zone)` 一节中讨论另外几处细微的语法差异).
      由于 let 不会出现作用域提升, 因此开发者通常将 let 声明语句放在封闭代码块的顶部,
      以便整个代码块都可以访问. 示例:
      ```javascript
        function getValue(condition) {
            if (condition) {
                let value = 'blue';
                return value;
            } else {
                // - 变量 value 在此处不存在
                return null;
            }
            // - 变量 value 在此处不存在
        } 
      ```
      现在这个 getValue 函数的运行结果更像类 C 语言, 变量 value 改由关键字 let 进行声明
      后, 不再被提升到函数顶部, 执行离开 if 块, value 立刻被销毁. 如果 condition 的值
      为 false, 就永远不会声明并初始化 value.
- **2.2 禁止重复声明**
    + 假设作用域中已经存在某个标识符, 此时再使用 let 关键字声明它就会抛出错误, 举例来说:
      ```js

      ```
- **2.3 const 声明**
- **2.4 临时死区 (Temporal Dead Zone)**
    + 与 var 不同, let 和 const 声明的变量不会被提升到作用域顶部, 如果在声明之前访问这些
      变量, 即是是相对安全的 typeof 操作符也会触发引用错误, 请看下面代码: 
      ```javascript
        if (condition) {
            console.log(typeof value); // ReferenceError!
            let value = "blue";
        }
      ```
    + 由于 console.log(typeof value) 语句会抛出错误，因此用 let 定义并初始化变量 
      value 的语句不会执行。此时的 value 还位于 JavaScript 社区所谓的 "临时死区"
      (temporal dead zone) 或 TDZ 中。虽然 ECMAScript 标准并没有明确提到 TDZ, 但
      人们却常用它来描述 let 和 const 的不提升效果。本节讲解 TDZ 导致的声明位置的微妙差异
      ，虽然我们提到的是 let, 但其实换成 const 也一样。
    + JavaScript 引擎在扫描代码发现变量声明时，要么将它们提升至作用域顶部(遇到 var 声明)，
      要么将声明放到 TDZ 中( let 和 const 声明)。访问 TDZ 中的变量会触发运行时错误。只
      有执行过变量声明语句后，变量才会从 TDZ 中移出，然后方可正常访问。
    + 在声明前访问由 let 定义的变量就是这样。由前面示例可见，即便是相对不易出错的 typeof 
      操作符也无法阻挡引擎抛出错误。但在 let 声明的作用域外对该变量使用 typeof 则不会报错，具体示例如下:
      ```javascript
        console. log(typeof value); // "undefined"
        if (condition) {
            let value = "blue";
        }
      ```
      typeof 是在声明变量 value 的代码块外执行的，此时 value 并不在TDZ中。这也就意味着
      不存在 value 这个绑定，typeof 操作最终返回"undefined"。TDZ 只是块级绑定的特色之一
      ，而在循环中使用块级绑定也是一个特色。

### 3. 循环中的作用域绑定
- 开发者可能最希望实现 for 循环的块级作用域了, 通过配合 let 关键字, 如下:
  ```javascript
    for (let i=0; i< 10; i++) {
        process(items[i]);
    }
    // - i 在这里 不能访问, 抛出一个错误
    console.log(i);
  ```
- **3.1 循环中的函数**
    + 长久以来, var 声明让开发者在循环中创建函数变得异常困难, 因为变量到了循环之外仍能访问,
      请看这段代码: 
      ```javascript
        var funcs = [];
        for (var i = 0; i < 10; i++) {
            func.push(function() {
                console.log(i);
            });
        }
        // - Tip: 通俗说就是, for 执行完 funcs 中保存了 10 个匿名函数, 匿名函数引用
        //   同一个 i, 此时 i 已经是 10 了.
        funcs.forEach(function(item) {
            item();  // 输出: 10 次数字 10 
        })
      ```
      你预期的结果可能是输出数字 0-9, 但它却一连串输出 10 次数字 10, 这是因为循环里的每次
      迭代同时共享着变量 i, 循环内部创建的函数全部保留了对相同变量的引用. 循环结束时变量 i
      的值是为 10, 所以每次 console.log(i); 时就会输出数字 10. 
    + 为了解决这个问题, 开发者在循环中使用立即调用函数表达式 (IIFE), 以强制生成计数器变量的
      副本, 就像这样:
      ```javascript
        let funcs = [];
        let a = 0;
        for (; a < 10; a++) {
            // (function(){})() 自执行匿名函数，也叫"立即调用函数表达式(IIFE)"。
            // 还有一种写法为: (function(){}());
            funcs.push(function (value) {
                return function () {
                    console.log("funcs 數組當前輸出值: " + value);
                }
            }(a))
        }
        funcs.forEach(function (item) {
            item();
        });
      ```
      在循环内部, IIFE 表达式为接受的每一个变量 i 都创建了一个副本并存储为变量 value, 
      这个变量就是响应迭代创建的函数所使用的值, 因此调用每个函数都会像从 0 到 9 循环一样
      得到期望的值. ES6 中的 let 和 const 提供的会计绑定让我们无需再这么折腾.
- **3.2 循环中的 let 声明**
    + ```javascript
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push(function () {
                console.log("循环中的let声明: " + i);
            })
        }
        arr.forEach(function (item) {
            item();
        });
      ```
    + let 和 const 的行为很多时候与 var 一致。 然而，它们在循环中的行为却不一样。
      在 for-in and for-of 循环中，let 和 const 都会每次迭代时创建新绑定，从而使循环
      体内创建的函数可以访问到相应迭代的值，而非最后一次迭代后的值(像使用 var 那样)。
      let and for 循环中同样如此，但在 for 循环中使用 const 声明则可能会引发错误。
      ```javascript
        let arr2 = [];
        const obj = {
            a: true,
            b: true,
            c: true
        };
        for (let key in obj) {
            arr2.push(function () {
                console.log("循环输出key: " + key);
                console.log("循环输出value: " + obj[key]);
            })
        }
        console.log(arr2);
        arr2.forEach(function (item) {
            item();     // 输出: a, b, c
        });

        // ------

        (function() {
            // - Tip: 此示例只是简单的把数据合成到对象推入到数组中的写法, 和上面的示例无关
            let arr = [];
            const obj = {
                a: true,
                b: true,
                c: true
            };
            for (let key in obj) {
                let generate = {};
                generate[key] = obj[key];
                arr.push(generate);
            }
            console.log(arr);
        })();
      ```
- **3.3 循环中的 const 声明**

### 4. 全局作用域绑定
- 如果你在全局作用域中使用 let 或 const, 会在全局作用域下创建一个新的绑定, 但该绑定不会添加
  为全局对象的属性, 换句话说, 用 let 或 const 不能覆盖全局变量, 而只能遮蔽它. 示例如下:
  ```javascript
    // 在浏览器中运行
    let RegExp = "Hello!";
    console.log(RegExp); // "Hello!"
    console.log(window.RegExp === RegExp); // false
    
    const ncz = "Hi!";
    console.log(ncz); // "Hi!"
    console.log("ncz" in window); // false
  ```

### 5. 块级绑定最佳实践的进化

### 6. 小结
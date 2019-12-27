# 第 11 章 -- Promise 与异步编程



## 本章目录 (Catalog)
1. 异步编程的背景知识
    + 事件模型
    + 回调模式
2. Promise 的基础知识
    + Promise 的生命周期
    + 创建未完成的 Promise
    + 创建已处理的 Promise
        - 使用 `Promise.resolve()`;
        - 使用 `Promise.reject()`;
        - 非 Promise 的 Thenable 对象
    + 执行器错误
3. 全局的 Promise 拒绝处理
    + Node.js 环境的拒绝处理
    + 浏览器环境的拒绝处理
4. 串联 Promise
    + 捕获错误
    + Promise 链的返回值
    + 在 Promise 链中返回 Promise
5. 响应多个 Promise
    + `Promise.all()` 方法
    + `Promise.race()` 方法 
6. 自 Promise 继承
7. 基于Promise 的异步任务执行
8. 小结



## 生词 (New Words)
- race /reɪs/ n.种族，竞赛，属，种




## 本章内容 (Content)
- Promise 可有实现其他语言中类似 Future 和 Deferred 一样的功能, 是另一种异步编程的选择.
  它既可以像事件和回调函数一样指定稍后执行的代码, 也可以明确指示代码是否成功执行. 基于这些
  成功或失败的状态, 为了让代码更容易理解和调试, 你可以链式地编写 Promise.
#### 1. 异步编程的背景知识
- JavaScript 引擎是基于单线程 (Single-threaded) 时间循环的概念构建的, 同一时刻只允许一个
  代码块在执行, 与之相反的是像 Java 和 C++ 一样的语言, 他们允许多个不同的代码块同时执行.
  对于基于线程的软件而言, 当多个代码块同时访问并改变状态时, 程序很难维护并保证状态不会出错.
- JavaScript 引擎同一时刻只能执行一个代码块, 所以需要跟踪即将运行的代码, 那些代码被放在一个
  任务队列(job queue) 中, 每当一段代码准备执行时     , 都会被添加到任务队列. 每当 JavaScript
  引擎中的一段代码结束执行, 事件循环(event loop) 会执行队列中的下一个任务, 它是 js 引擎中
  的一段程序, 负责监控代码执行并管理任务队列. 请记住, 队列中的任务会从第一个一直执行到最后一个.
- **事件模型**
- **回调模式**
#### 2. Promise 的基础知识
- Promise 相当于异步操作结果的占位符, 他不会去订阅一个事件, 也不会传递一个回调函数给
  目标函数, 而是让函数返回一个 Promise, 就像这样:
  ```js
    // - readFile 承诺在未来的某个时刻完成
    let promise = readFile('example.txt');
    // - 在这段代码中, readFile()不会立即开始读取文件, 函数会先返回一个表示异步读取操作的
    //   Promise 对象, 未来对这个对象的操作完全取决于 Promise 的生命周期.
  ```
- **Promise 的生命周期**
    + 每个 Promise 都会经历一个短暂的生命周期: 
        - 首先是处于 "进行中 (pending)" 的状态, 此时操作尚未完成, 所以它也是 
          "未处理 (unsettled)"的;
        - 一旦异步操作执行结束, Promise 则变成 "已处理 (settled)" 的状态. 在之前的
          示例中, 当 readFile() 函数返回 Promise 时它变成 pending 状态, 操作结束后,
          Promise 可能进入一下 2 种状态中的其中一个:
            + (1) `Fulfilled`: Promise 异步操作的成功完成.
            + (2) `Rejected` 由于程序错误或一些其他原因, Promise 异步操作未能成功完成.
        - 内部属性 [[PromiseState]] 被用来表示 Promise 的 3 中状态: `pending`, 
          `fulfilled`, `rejected`. 这个属性不暴露在 Promise 对象上, 所以不能以编程的
          方式检测 Proimise 的状态, 只有当 Promise 的状态改变时, 通过 then() 方法
          采取特定的行动.
        - 所有的 Promise 都有 `then()` 方法, 它接受 2 个参数:
            + (1) 是当 Promise 的状态变为 fulfilled 时要调用的函数, 与异步操作相关的
              附加数据都会传递给这个完成函数 (fulfilled function);
            + (2) 是当 Promise 的状态变为 rejected 时要调用的函数, 其与完成时调用的
              函数类似, 所有与失败状态相关的附加数据都会传递给这个拒绝函数
              (rejection function).
            + 更详细的代码实现见同级目录的 `re-promise.md` 文档.
        - NOTE: 如果一个对象实现了上述的 then() 方法, 那这个对象我们称之为 thenable 对象
          , 所有的 Promise 都是 thenable 对象, 但并非所有 thenable 对象都是 Promise.
        - then() 的两个参数都是可选的，所以可以按照任意组合的方式来监听 Promise, 执行完成
          或被拒绝都会被响应。例如，试想以下这组 then() 函数的调用:
          ```js
            let promise = readFile("example.txt");
            promise.then(function(contents) {
                // fulfillment
                console.log(contents);
            }, function(err) {
                // rejection
                console.error(err.message);
            });
            promise.then(function(contents) {
                // fulfillment
                console.log(contents);
            });
            promise.then(null, function(err) {
                // rejection
                console.error(err.message);
            });
          ```
        - 上面这3次 then() 调用操作的是同一个 Promise.
            + 第 1 个同时监听了执行完成和执行被拒;
            + 第 2 个只监听了执行完成，错误时不报告;
            + 第 3 个只监听执行被拒，成功时不报告。
        - Promise 还有一个 catch() 方法，相当于只给其传入拒绝处理程序的then()方法。例如，
          下面这个 catch() 方法和 then() 方法实现的功能是等价的:
          ```js
            promise.catch(function(err) {
                // rejection
                console.error(err.message);
            });
            // 等效于:
            promise.then(null, function(err) {
                // rejection
                console.error(err.message);
            });
          ```

- **创建未完成的 Promise**
- **创建已处理的 Promise**
    + 使用 `Promise.resolve()`;
    + 使用 `Promise.reject()`;
    + 非 Promise 的 Thenable 对象
- **执行器错误**
    + 如果执行器内部抛出一个错误，则 Promise 的拒绝处理程序就会被调用。
      ```js
        let promise = new Promise((resolve, reject) => {
            throw new Error('Explosion!');

            // - 上面的 trow new Error() 等价于
            // try {
            //     throw new Error('Explosion!');
            // } catch(ex) {
            //     reject(ex);
            // }
        })
        promise.catch((error) => {
            console.log(error.message); // 'Explosion!'
        })
      ```
#### 3. 全局的 Promise 拒绝处理
- **Node.js 环境的拒绝处理**
- **浏览器环境的拒绝处理**
#### 4. 串联 Promise
- **捕获错误**
- **Promise 链的返回值**
- **在 Promise 链中返回 Promise**
#### 5. 响应多个 Promise
- **`Promise.all()` 方法**
- **`Promise.race()` 方法**
#### 6. 自 Promise 继承
#### 7. 基于Promise 的异步任务执行
#### 8. 小结
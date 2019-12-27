# 什么是 Promise
- Promise 是抽象异步处理对象以及对其进行各种操作的组件。Promise 并不是是从 JavaScript
  中发祥的概念。
- Promise 最初被提出是在 E语言 中，它是基于 并列/并行处理设计的一种编程语言。  
- Node.js 规定在 JavaScript 的回调函数的第一个参数为 Error 对象，这是它的一个惯例。

## 1.2 Promise 简介
- **Promise 构造函数(Constructor)**
    + Promise 类似于 `XMLHttpRequest`, 从构造函数 Promise 来创建一个新 promise 
      对象作为接口。
    + 要创建一个 Promise 构造函数的实例(对象)，可以使用 new 来调用 Promise 的构造器
      进行实例化。如下
    + ```javascript
        let promise = new Promise((resolve, reject) => {
            // 异步处理
            // 处理结束后、调用 resolve 或 reject
        });
    ```
- **Instance Method 实例方法:**
    + 通过 new 生成的 promise 对象为了设置其值在 resolve(成功) / reject(失败) 时调用
      的回调函数可以使用 promise.then() 实例方法。
    + ```javascript
        promise.then(onFulfilled, onRejected);
      ```
    + resolve(成功)时： onFulfilled 会被调用  
    + reject(失败)时：onRejected 会被调用
    + onFulfilled、onRejected 两个都为可选参数。
    + `promise.then()` 内成功和失败都可以使用。另外在只想对异常进行处理时可以采用 
      `promise.then(undefined, onRejected);`这种方式，只指定reject 时的回调函数即可。
      不过这种情况下 `promise.catch(onRejected);` 应该是个更好的选择。
      
- **Static Method 静态方法(类方法)**
    + Promise 构造函数还拥有一些静态方法。 
    + 主要包括 Promise.all()、Promise.resolve() 等在内，主要都是一些对 Promise 进行
      操作的辅助方法。

### 1.2.1 Promise workflow —— Promise 工作流程
- 我们来看一个示例:
- ```javascript
    // asynchronous [ei'siŋkrənəs] (Spell: asyn-chro-nous) ---adj.异步的
    function asyncFunction() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Asynchronous Hello world!')
            }, 16)
        })
    }
    asyncFunction().then((value) => {
        console.log(value);
    }).catch((error) => {
        console.log(error);
    })
  ```
- asyncFunction 这个函数会返回 promise 对象， 对于这个 promise 对象，我们调用它的 then
  方法来设置 resolve 后的回调函数， catch 方法来设置发生错误时的回调函数。
- 该 promise 对象 (即: asyncFunction() 内返回的构造函数的实例) 会在 setTimeout 之后的
  16ms 时被 resolve， 这是 then 的回调函数会被调用， 并输出 Asynchronous Hello world!
- 在这种情况下 catch 的回调函数并不会被执行（因为 promise 返回了 resolve）， 不过如果运行
  环境没有提供 setTimeout 函数的话，那么上面代码在执行中就会产生异常，在 catch 中设置的
  回调函数就会被执行。  
- 当然，像 promise.then(onFulfilled, onRejected) 的方法声明一样， 如果不使用 catch 
  方法只使用 then 方法的话，如下所示的代码也能完成相同的工作。
- ```javascript
    asyncFunction.then((value) => {
        console.log(value);
    }, (error) => {
        console.log(error);
    })
  ```




- 而 Promise 则是把类似的异步处理对象和处理规则进行规范化，并按照采用统一的借口来编写，而
  采用规范方法之外的写法都会出错。下面是使用了 Promise 进行异步处理的一个例子:
```javascript
    
```
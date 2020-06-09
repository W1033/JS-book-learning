# 第 3 章 - 闭包和高阶函数

## 本章目录 (Catalog)
- 3.1 闭包 (closure)
    + 3.1.1 变量的作用域
    + 3.1.2 变量的生存周期
    + 3.1.3 闭包的更多作用
        - (1).封装变量
        - (2).延续局部变量的寿命
    + 3.1.4 闭包和面向对象设计
    + 3.1.5 用闭包实现命令模式
    + 3.1.6 闭包与内存管理

- 3.2 高阶函数
    + 高阶函数是指至少满足下列条件之一的函数：`(1) 函数可以作为参数被传递. `
      `(2) 函数可以作为返回值输出. `
    + 3.2.1 函数作为参数传递
        - 1.回调函数
        - 2.`Array.prototype.sort`: 接受一个函数当作参数, 这个函数里面封装了数组元素的
          排序规则. 
    + 3.2.2 函数作为返回值输出
        - 1.判断数据的类型
        - 2.getSingle
    + 3.2.3 高阶函数实现 AOP
    + 3.2.4 高阶函数的其他应用
        - (1) `函数柯里化(currying)`
        - (2) `uncurrying`
        - (3) `函数节流`
        - (4) 分时函数
        - (5) 惰性加载函数
#### 3.3 小结



## 本章内容 (Content)

#### 3.1 闭包 (closure)
- 3.1.1 变量的作用域
- 3.1.2 变量的生存周期
- 3.1.3 闭包的更多作用
    + 1.封装变量
        - ```js
            let cache = {};
            let num = 0;
            // - (1-0)、数组 join()方法：只接收一个参数, 即用作分隔符的字符串, 然后返回
            //   包含所有数组项的字符串. 
            // - (1-1)、把参数转换成一个字符串: 比如现在 args = "3,6,9"
            let multiply = function () {
                // - (1-0)、(1-1)
                let args = Array.prototype.join.call(arguments, ",");
                // - (2)、当第二次调用时 cache 下面已经保存了 {"3,6,9": 162}
                if (cache[args]) {
                    return cache[args];
                }

                console.log(num++);
                console.log("cache: ", cache);

                let a = 1;
                for (let i = 0, l = arguments.length; i < l; i++) {
                    a = a * arguments[i];
                }
                return cache[args] = a;
            };

            console.log(multiply(3, 6, 9)); // 162
            console.log(multiply(3, 6, 9)); // - 重复调用就会走上面的 cache 不会再重新算一遍. 
            console.log(multiply(2, 4, 5)); //

            console.log(multiply(3, 6, 9)); // 162
          ```
    + 2.延续局部变量的寿命
- 3.1.4 闭包和面向对象设计
    + 过程与数据的结合是形容面向对象中的 "对象" 时经常使用的表达. 对象以方法的形式包含了
      过程, 而闭包则是在过程中以环境的形式包含了数据. 通常用面向对象思想能实现的功能, 用
      闭包也能实现. 反之亦然. 在 js 语言的祖先 Scheme 语言中, 甚至都没有提供面向对象的
      原生设计, 但可以使用闭包来实现一个完整的面向对象系统. 下面来看看这段跟闭包相关的代码：
      ```js
        let extent = function() {
            let value = 0;
            return {
                call: function() {
                    value++;
                    console.log(value);
                }
            }
        };
        extent.call();  // 1
        extent.call();  // 2

        extent.call();  // 3

        // ~~~~~~ 如果换成面向对象的写法, 就是: ~~~~~~

        let scope = {
            value: 0,
            call: function() {
                this.value++;
                console.log(this.value);
            }
        };
        scope.call();
        scope.call();
        scope.call();

        let prize = Math.floor(Math.random() * 12);
        console.log("prize",prize)
      ```
- 3.1.5 用闭包实现命令模式
    + 详见:`./01-html-files/3.1.5-用闭包实现命令模式.html`
- 3.1.6 闭包与内存管理
    + 局部变量本来应该在函数退出的时候被解除引用, 但如果局部变量被封闭在闭包形成的环境中, 
      那么这个局部变量就会一直生存下去. 从这个意义上看, 闭包的确会使一些数据无法被及时销毁. 
      使用闭包的一部分原因是我们选择主动把一些变量封闭在闭包中, 因为可能在以后还需要使用这
      些变量, 把这些变量放在闭包中和放在全局作用域, 对内存方面的影响是一致的, 这里并不能说
      成是内存泄露. 如果在将来需要回收这些变量, 我们可以手动把这些变量设置为 null. 
    + 跟闭包和内训泄露有关系的地方是, 使用闭包的同时比较容易形成循环引用, 如果闭包的作用域链
      中保存着一些 DOM 节点, 这时候就有可能造成内存泄露. 但这本身并非闭包的问题, 也并非 JS
      的问题. ......
    + 同样, 如果要解决循环引用带来的内存泄露问题, 我们只需要把循环应用中的变量设置为 null 
      即可. 将变量设置为 null 意味着切断变量与它此前引用的值之间的连接. 当垃圾收集器下次
      运行时, 就会删除这些值并回收它们占用的内存. 


#### 3.2 高阶函数
- 高阶函数是指至少满足下列条件之一的函数：`(1) 函数可以作为参数被传递. `
  `(2) 函数可以作为返回值输出. `
- 3.2.1 函数作为参数传递
    + 把函数当做参数传递, 这代表我们可以抽离出一部分容易变化的业务逻辑, 把这部分业务逻辑放在
      函数参数中, 这样一来可以分离业务代码中变化与不变的部分. 其中一个重要应用场景就是常见的
      回调函数. 
    + 1.回调函数: 
        - ```js
            // -示例1: Ajax 回调函数
            let getUserInfo = function(userId, callback) {
                $.get('http://xxx.com/getUserInfo?' + userId, function(data) {
                    if (typeof callback === 'function') {
                        callback(data);
                    }
                })
            };
            // getUserInfo(13157, function(data) {
            //     console.log(data.userName);
            // });

            // ------

            // - 示例2: 在页面中创建 100 个 div 节点, 然后把这些 div 节点都设置为隐藏. 
            // - Tip: 此示例内部有 DOM 操作, 只能在 HTML 中执行. 
            (function() {
                let appendDiv = function(callback) {
                    for (let i=0; i < 100; i++) {
                        let div = document.createElement('div');
                        div.innerHTML = i;
                        document.body.appendChild(div);
                        if (typeof callback === "function") {
                            callback(div);
                        }
                    }
                };
                // - 我们把 div.style.display = 'none' 抽出来, 用回调函数的形式传入 
                //   appendDiv 方法：
                appendDiv(function(node) {
                    node.style.display = 'none';
                });
            })();

            // ------

            // - 示例3: 把函数作为参数传递
            // - Tip: (来自汤姆大叔的博客--《深入理解JavaScript系列》 (16): 
            //   闭包 (Closures)讲解 把匿名函数传入到 exampleFunc 和把一个匿名函数
            //   赋值给变量 funArg 是一个道理. 
            (function() {
                function exampleFunc(funArg) {
                    funArg();
                }
                exampleFunc(function() {
                    console.log("我是被当做参数传递的函数");
                });
            })();
          ```
    + 2.`Array.prototype.sort()`
        - Array.prototype.sort() 接受一个函数当参数, 这个函数里面封装了数组元素的顺序规则.
        - ```js
            let arr = [1, 3, 13, 5, 4, 6, 2, 9];

            // - 从小到大排列
            arr.sort(function(a, b) {return a - b;});
            // arr: [1, 2, 3, 4, 5, 6, 9, 13]
            console.log("arr: ", arr);

            // - 从大到小排列
            arr.sort(function(a, b) {return b - a;});
            // arr2: [13, 9, 6, 5, 4, 3, 2, 1]
            console.log("arr2: ", arr2);
          ```
- 3.2.2 函数作为返回值输出
    + (1) 判断数据的类型
        - `Object.prototype.toString.call(obj)`: 通过获取 Object 原型上的 
          toString方法, 让方法中的 this 变为需要检测的数据类型, 并且让方法执行. 
          ```js
            const obj = {name: "WANG"};
            const str = "250";
            const bool = true;
            const arr = [20, 30];
            console.log(Object.prototype.toString.call(obj));     // [object Object]
            console.log(Object.prototype.toString.call(str));     // [object String]
            console.log(Object.prototype.toString.call(bool));    // [object Boolean]
            console.log(Object.prototype.toString.call(arr));     // [object Array]

            // 简单封装
            let getType = function(obj) {
                return Object.prototype.toString.call(obj)
            };

            // getType(str): [object String]
            console.log("getType(str):", getType(str));

            // - Added-20200309: 在 01-Vue.js 的源码中, 有更多关于
            //   `Object.prototype.toString.call()` 的使用示例.
          ```
    + (2) `getSingle`
        - 下面是一个单例模式的例子, 在第 3 部分设计模式的学习中, 我们将进行更深入的讲解, 
          这里暂且只了解其代码实现:
          ```js
            var getSingle = function(fn) {
                var ret;
                return function() {
                    return fn || (ret = fn.apply(this, arguments));
                }
            }
          ```
        - 这个高阶函数的例子, 既把函数当做参数传递, 又让函数执行后返回了另外一个函数. 我们
          可以看看 getSingle 函数的效果: 
          ```js
            var getScript = getSingle(function() {
                return document.createElement("script");
            });
            var script1 = getScript();
            var script2 = getScript();
            console.log(script1 === script2);   // true
          ```
- 3.2.3 高阶函数实现 AOP
    + AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来, 这些跟业务
      逻辑无关的功能通常包括 "日志统计、安全控制、异常处理"等.  把这些功能抽离出来之后, 再
      通过"动态织入" 的方式掺入业务逻辑模块中. 
    + 在 Java 语言中, 可以通过反射和动态代理机制来实现 AOP 技术.  而在 js 这种动态语言中
      , AOP 的实现更加简单, 这是 js 与生俱来的能力. 
    + 通常, 在 js 中实现 AOP, 都是把一个函数 "动态织入" 到另外一个函数之中, 具体的
      实现技术有很多, 本节通过扩展 `Function.prototype` 来做到这一点.  实现代码:
      ```js
       Function.prototype.before = function(beforefn) { // {1}
            let _self = this;                           // {2}
            return function() {                         // {3} - 匿名函数标记为 r1 
                beforefn.apply(this, arguments);        // {4}
                return _self.apply(this, arguments);    // {5} - 标记为 r2
            }
        };
        Function.prototype.after = function(afterfn) {  // {6}
            let _self = this;                           // {7}
            return function() {                         // {8} - 标记为 r3
                let ret = _self.apply(this, arguments); // {9}
                afterfn.apply(this, arguments);         // {10}
                return ret;                             // {11} - 标记为 r4
            }
        };
        let func = function() {                         // {12} - 标记为 f2
            console.log(2);                             // {13}
        };
        func = func.before(                             // {14}
            function() {                                // {15} - 标记为 f1
                console.log(1)                          
            }   
        );      
        func = func.after(                              // {16}
            function() {                                // {17} - 标记为 f3
                console.log(3)                          // {18}
            }   
        );
        func();                                         // {19}
      ```
    + 上面代码执行注解: 见仓库:
      `JS-book-learning/《深入理解JavaScript系列》--汤姆大叔/11-执行上下文/11-执行上下文(环境).md`
    + 这种使用 AOP 的方式来给函数添加职责, 也是 JavaScrip t语言中一种非常特别和巧妙的
      `装饰者模式`实现. 这种装饰者模式在实际开发中非常有用, 我们将在第 15 章进行详细讲解.  
- 3.2.4 高阶函数的其他应用
    + (1) `函数柯里化  (function currying)`
        - currying 又称部分求值. 一个 currying 的函数首先会接受一些参数,
          接受了这些参数之后, 该函数并不会立即求值, 而是继续返回另外一个函数,
          刚才传入的参数在函数形成的闭包中被保存起来. 待到函数被真正需要求值的时候,
          之前传入的所有参数都会被一次性用于求值. 
    + (2) `uncurrying`
    + (3) `函数节流`
      ```js
        // fn: 需要被延迟执行的函数引用. wait: 延迟调用的时间
        function throttle(fn, wait) {
            // 定时器 (超时调用id)
            let timer;
            // 是否是第一次调用
            let firstTime = true;
            return function() {
                let args = arguments;
                let context = this;
                // 如果是第一次调用不需要延迟执行
                if (firstTime) {
                    fn.apply(context, args);
                    return firstTime = false;
                }

                // 如果定时器还在, 说明前一次延迟执行还没有完成
                if (timer) return;

                // 延迟一段时间执行
                timer = setTimeout(function() {
                    // 首先清楚超时调用内 id
                    clearTimeout(timer);
                    timer = null;
                    fn.apply(context, args);
                }, wait || 500)
            };
        }
        let i = 0;
        window.addEventListener("resize", throttle(function() {
            console.log("i++: ", i++);
        }, 500), false)
      ```
    + (4) `分时函数`
    + (5) `惰性加载函数`

#### 3.3 小结

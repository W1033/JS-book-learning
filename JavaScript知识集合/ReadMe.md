# JavaScript 知识集合 -- ReadMe


## 目录(Catalog)
1. `setTimeout()` 第三个参数:
2. `svg-autocrop`
3. "引用类型" 和 "类" 的区别?
4. 字符串(String) 和 数组(Array) 的 `indexOf()` 和 `includes()` 方法
5. `requestAnimationFrame` 介绍
6. 不用原生的 `Number()` 和 `parseInt()`，用 JS 实现 String 到 Number
7. `MutationObserver` 是什么?
8. `Array.prototype.find()` 方法


## 生词(New Words)



## 内容(Content)
### 1.`setTimeout()` 第三个参数:
- `setTimeout(function, delay, parameter1, parameter2)` 第 3 个参数及以后的参数
  都可以作为 function 函数的参数. 举个例子:
  ```javascript
    function a(x, y) {
        console.log(x, y);
    }
    setTimeout(a, 1000, 2, 3);
  ```

### 2. `svg-autocrop`一个 NPM 模块, 用于自动裁剪和缩小 SVG.  


### 3. "引用类型" 和 "类" 的区别?
- 引用类型(Reference type): 引用类型是由 类型的实际值引用 (类似于指针)
  表示的数据类型. 如果为某个变量分配一个引用类型, 则该变量将引用(或 "指向") 原始值. 
  不创建任何副本. 引用类型包括: `类`, `接口`, `委托` 和 `装箱值类型`.

### 4. 字符串(String) 和 数组(Array) 的 `indexOf()` 和 `includes()` 方法
- `indexOf()` 和 `includes()` 都是用来判断 String / Array 中是否包含子项,
  但不同点是:
    + (1) `indexOf` 返回的是子项在字符串/数组中的索引; `includes` 返回的是布尔值
      ```js
        let arr = [1, 2, 3, 4, 5, 10];
        let num = 4;
        // - 输出数字 4 在 arr 中的索引, 即索引 3.
        console.log(arr.indexOf(num));  // 3
        console.log(arr.includes(num)); // true
      ```
    + (2) 两个方法都支持第 2 个参数, 而且第二个参数都支持负数形式
    + (3) `indexOf()` 不能判断稀疏数组, 但 `includes()` 可以

- 什么是稀疏数组 和 密集数组?
    + 一般来说 js 中的数组是稀疏的,也就是说, 数组中的元素之间可以由空隙, 因为
      一个数组其实就是一个键值映射. 
      ```js
        // > 创建稀疏数组 - 方式 (1)
        let a = new Array(3);
        // - 上面数组长度为 3 但是目前值(各项)还为空, includes 会认为空的项是 
        //   undefined, 而 indexOf 不会
        // - Chrome output --> a:  Array(3)
        // - Firefox output --> a: Array(3) [ undefined, undefined, undefined ]
        console.log("a: ", a);
        console.log(a.indexOf(undefined));  // -1
        console.log(a.includes(undefined));  // true

        // - 当遍历 a 时, 由于并没有元素, javascript 会跳过这些缝隙:
        console.log("a.length:", a.length);
        a.forEach(function(item, index){
            console.log(11);
            console.log(index + ": " + item);
        });
        a.map((item, index) => {
            return index;
        });

        // > 创建稀疏数组 - 方法 (2)
        let arr = [];
        arr[0] = 0;
        arr[100] = 100;

        // - 如果数组中有 NaN, 你有正好需要判断数组是否存在 NaN, 这时使用 indexOf 
        //   无法判断, 只能使用 includes
        var ary1 = [NaN];
        console.log(ary1.indexOf(NaN)); // -1
        console.log(ary1.includes(NaN)) // true
      ```

### 5. `requestAnimationFrame` 介绍
- 与 `setTimeout` 相比, `requestAnimationFrame`
  最大的优势是由系统来决定回调函数的执行时机. 具体一点讲,
  如果屏幕刷新率是 60Hz, 那么回调函数就每 16.7ms 被执行一次, 如果刷新率是 75Hz,
  那么这个时间间隔就变成了 1000 / 75 = 13.3ms, 换句话说就是,
  `requestAnimationFrame` 的步伐跟着系统的刷新步伐走.
  它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次, 这样就不会引起丢帧现象,
  也不会导致动画出现卡顿的问题. 
  
  这个API的调用很简单, 如下所示: 递归调用
  ```js
    var progress = 0;
    // - 回调函数
    function render() {
        // - 更新元素的样式属性
        // ...
        progress += 1; 
        if (progress < 100) {
            // - 在动画没有结束前, 递归渲染
            window.requestAnimationFrame(render);
        }
    }
    //第一帧渲染
    window.requestAnimationFrame(render);
  ```
- 除此之外, requestAnimationFrame还有以下两个优势: 
    + (1) CPU 节能: 使用 setTimeout 实现的动画, 当页面被隐藏或最小化时,
      setTimeout 仍然在后台执行动画任务, 由于此时页面处于不可见或不可用状态,
      刷新动画是没有意义的, 完全是浪费 CPU 资源. 而 requestAnimationFrame
      则完全不同, 当页面处理未激活的状态下, 该页面的屏幕刷新任务也会被系统暂停,
      因此跟着系统步伐走的 requestAnimationFrame 也会停止渲染,
      当页面被激活时, 动画就从上次停留的地方继续执行, 有效节省了 CPU 开销. 
    + (2) 函数节流: 在高频率事件(resize, scroll等)中,
      为了防止在一个刷新间隔内发生多次函数执行, 使用 requestAnimationFrame
      可保证每个刷新间隔内, 函数只被执行一次, 这样既能保证流畅性,
      也能更好的节省函数执行的开销. 一个刷新间隔内函数执行多次时没有意义的,
      因为显示器每 16.7ms 刷新一次, 多次绘制并不会在屏幕上体现出来. 

### 6. 不用原生的 `Number()` 和 `parseInt()`，用 JS 实现 String 到 Number
- tip: 这个问题来自 `winter` 老师的提问, 下面是他自己给出的答案
  ```js
    function atoi(a) {
        let chars = a.split('').map(
            // - `charCodeAt(num)`: 返回给定位置的字符编码.
            e => e.charCodeAt(0) - '0'.charCodeAt(0);
        );
        let n = 0;
        for (var char of chars) {
            n *= 10;
            n += char;
        }
        return n;
    }
    atoi('1001')
  ```

### 7. `MutationObserver` 是什么?
- 它是 HTML5 中的新特性, 作用是监听一个 DOM 变动, 当 DOM 对象树发生任何变动时,
  `Mutation Observer` 会得到通知. `MutationObserver` 是旧的 DOM3
  事件规范 Mutation Events 特性的一个替换.
  
  **在 DOM 事件触发的时候, 会触发 Mutation Observer 中传入的 callback.**

  DOM 监听是不会立刻开始的, 必须调用 `observer()` 方法才能监听.

  MutationObserver 可以用来实现 micro-task (它属于 micro-task,
  优先级小于Promise, 一般是 Promise 不支持时才会这样做.


### 8. `Array.prototype.find()`  方法
- `Array.prototype.find()` 方法返回数组中满足方法内部函数的第一个元素的值.
  否则返回 `undefined`.
  ```js
    const ary = [5, 12, 8, 130, 44];
    const found = ary.find(ele => ele > 10);
    console.log(found);     // 12
  ```
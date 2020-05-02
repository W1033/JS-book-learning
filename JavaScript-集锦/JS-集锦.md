# JavaScript 集锦


## 目录(Catalog)
1. `setTimeout()` 第三个参数:
2. `svg-autocrop`
3. "引用类型" 和 "类" 的区别?
4. 字符串(String) 和 数组(Array) 的 `indexOf()` 和 `includes()` 方法


## 生词(New Words)



## 内容(Content)
### `setTimeout()` 第三个参数:
- `setTimeout(function, delay, parameter1, parameter2)` 第 3 个参数及以后的参数
  都可以作为 function 函数的参数. 举个例子:
  ```javascript
    function a(x, y) {
        console.log(x, y);
    }
    setTimeout(a, 1000, 2, 3);
  ```

### `svg-autocrop`一个 NPM 模块，用于自动裁剪和缩小 SVG。 


### "引用类型" 和 "类" 的区别?
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
                
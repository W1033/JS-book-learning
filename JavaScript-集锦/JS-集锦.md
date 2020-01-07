# JavaScript 集锦

> SetTimeout() 第三个参数:
- `setTimeout(function, delay, parameter1, parameter2)` 第 3 个参数及以后的参数
  都可以作为 function 函数的参数. 举个例子:
  ```javascript
    function a(x, y) {
        console.log(x, y);
    }
    setTimeout(a, 1000, 2, 3);
  ```


> `svg-autocrop`一个 NPM 模块，用于自动裁剪和缩小 SVG。 


>  "引用类型" 和 "类" 的区别?
- 引用类型(Reference type): 引用类型是由 类型的实际值引用 (类似于指针) 表示的
  数据类型. 如果为某个变量分配一个引用类型, 则该变量将引用(或 "指向") 原始值. 
  不创建任何副本. 引用类型包括: `类`, `接口`, `委托` 和 `装箱值类型`.

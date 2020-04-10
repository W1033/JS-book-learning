# JS-book-learning
《js高级程序设计》
《深入理解ES6》
《js设计模式与编程实践》


- 学编程有没有必要做笔记? A: 十分肯定, 一定要做!
  (tip: 编程书看第一遍时可以拿笔在书上划重点, 但一定不要做笔记.)

## Table Of Contents




## New Words



## Content



### 1. HTTP
> 最常见的 URL 组成部分分析:
- `http://www.joes-hardware.com/inventory-check.cgi?item=12731&color=blue`
    + `http:` -- 方案(scheme)
    + `www.joes-hardware.com:80` -- 主机(host) 和 端(port)，此处端口省略
    + `inventory-check.cgi` -- 路径(path)
    + `item=12731&color=blue` -- 查询(query)



### 2. Javascript 常见语法

> `childNodes` 和 `children` 的区别: 
- childNodes 包括元素节点和文本节点，而 children 只包括元素节点。


> js中的根对象是 `Object.prototype` 对象:
- Object.prototype 对象是一个空的对象，我们在 JS 中遇到的每个对象，实际上都是从
  Object.prototype 对象克隆而来的，Object.prototype 对象就是他们的原型。


> ES5 和 ES6 中关于 Object 上的一些方法: 
- ES5 - `Object.keys()` 方法取得对象上所有可枚举的实例属性。 这个方法接受一个对象作为
  参数，返回一个包含所有可枚举属性的字符串数组。
    + 示例: 《js高级程序设计》\js高程学习笔记\js高程---Object.keys().js
- ES5 - `Object.getOwnPropertyNames()`: 【取得自身的属性名】。 js高程 - Chapter 6
- ES5 - `Object.getPrototypeOf()` 方法返回任意指定对象的原型。对象原型的真实值被存储在
  内部专用属性 `[[Prototype]]` 中，调用 getPrototypeOf() 方法返回存储在其中的值。
- ES6 - `Object.is()`: [P76] 弥补全等运算符的不准确运算。比如之前 +0等于-0, 
  NaN不等于NaN
- ES6 - `Object.assign()` 分配
- ES6 - `Object.setPrototypeOf()` 方法可以改变任意指定对象的原型。接受2个参数: 
    + (1).被改变原型的对象 
    + (2).替代第一个参数原型的对象。
    + 示例:《深入理解ES6》\chapter04_扩展对象的功能性\chapter04-扩展对象的功能性.md


> 在浏览器中获取 "当前页面的可视高度" 和 "文档的总高度" 的方法总结:
1. jq方法:
   ```javascript
    // jq获取当前可视窗口的高度和宽度:
    $(window).height();  
    $(window).width();

    // jq获取文档高度和宽度
    $(document).height();  
    $(document).height();
   ```
2. js方法:
   ```javascript
    // js获取当前页面可视窗口的高度和宽度(前提 `<!DOCTYPE html>` 是这种写法，以前古老
    // 的写法除外) IE,FF,Chrome 统一是:
    document.body.clientHeight;
    // IE9+, FF, Chrome 确定浏览器窗口大小(可视窗口大小)有两个新属性:
    window.innerHeight;  window.innerWidth;
    // 获取文档的高度和宽度兼容IE8的写法是:
    Math.max(document.documentElement.clientHeight, document.body.scrollHeight, 
                document.documentElement.scrollHeight);
   ```


> `typeof` 和 `instanceof` 操作符的区别: 
- 确定一个值是哪种基本类型使用 typeof 操作符，是哪种引用类型使用 instanceof 操作符。
    + ```javascript
         typeof 123;   // "number"
         typeof false;   // "boolean"

         let o = {};
         let a = [];
         if (o instanceof Object) {}
         if (a instanceof Array) {}
      ```


> `Object.prototype.toString.call()` 检测数据类型:       
- Object.prototype.toString.call(ele): 通过获取 Object 原型上的 toString 方法，让方法
  中的 this 变为需要检测的数据类型，并且让方法执行。
  ```javascript
        const obj = {name: "WANG"};
        const str = "250";
        const bool = true;
        const arr = [20, 30];
        console.log(Object.prototype.toString.call(obj));     // [object Object]
        console.log(Object.prototype.toString.call(str));     // [object String]
        console.log(Object.prototype.toString.call(bool));    // [object Boolean]
        console.log(Object.prototype.toString.call(arr));     // [object Array]
  ```


> 关于 js 中 this 指向的讲解: 
- `《Javascript设计模式与编程实践》/第一部分--基础知识/第2章-this_call_apply/第2章--this.md`
- 要分清楚 this 和 作用域 Scope 之间的区别， this 是当前对象的指向问题，Scope 是作用域
  (全局作用域 和 本地作用域) 的问题，Scope 讲解见:
    + `《深入理解JavaScript系列》--汤姆大叔/12-1_理解JavaScript的Scope.md`
    + `《深入理解JavaScript系列》--汤姆大叔/12-变量对象(Variable Object).html`
    + `深入理解JavaScript系列》--汤姆大叔/13-this/13-this.html`


> cloneNode() 方法
- cloneNode() 方法不会复制添加到 DOM 节点中的 JavaScript 属性，例如事件处理程序等。
  这个方法只复制特性、（在明确指定的情况下也复制）子节点，其他一切都不会复制。


> mouseover和mouseenter的区别：(js高级 13.4.3节) <br/>
- mouseenter ：在鼠标光标从元素外部首次移动到元素范围之内时触发。这个事件不冒泡，而且在
   光标移动到后代元素上不会触发。
- mousemove ：当鼠标指针在元素内部移动时重复地触发。


> JSON 对象有两个方法: `stringify()` 和 `parse()` <br/>
- JSON.stringify(): 把JavaScript对象序列化为 JSON 字符串
  ```javascript
    let book = {
        title: 'Professional JavaScript',
        authors: ['Nicholas C. Zakas'],
        edition: 3,
        year: 2011
    }
    // {"title":"Professional JavaScript","authors":["Nicholas C. Zakas"],
    //  "edition":3,"year":2011}
    let jsonText = JSON.stringify(book);
  ```
- JSON.parse(): 把 JSON 字符串解析为原生 JavaScript 值。


> "标准的"对象和函数 <br/>
- (1.) 一个 Javascript 对象就是键和值之间的映射。键是一个字符串(或者 Symbol),
    值可以是任意类型的值。 这使得对象非常符合 哈希表。
- (2.) 函数是一个附带可被调用功能的常规对象。(觉得这个解说很好)

> 日期格式化
- ```javascript
    function getTime(time) {
        if (time !== "" || time !== undefined) {
            var data, year, month, day, hour, minute, second;
            data =  new Date(time);
            year =  data.getFullYear();
            month = data.getMonth() + 1;
            // month = month < 10 ? '0' + month : month;
            day =   data.getDate();
            // hour =  data.getHours();
            // minute = data.getMinutes();
            // second = data.getSeconds();
            return  year + "-" + month + "-" + day;
        }
    }
  ```


> `Array.prototype`
- 1、将 arguments (类数组对象)转换为数组, 或者把 NodeList 对象转换为数组(比如一组li):
    + `Array.prototype.slice.call(arguments);`
- 2、取得 arguments 类数组的第一项:
    + `Array.prototype.shift.call(arguments);`
- 3、取得 arguments 类数组除去第一项剩余的项:
    + `Array.prototype.slice.call(arguments, 1);`
    + (传入参数 1 表示被返回的数组包含从第二个参数开始的所有参数)


> `localStorage` 对象
- ```javascript
     // 使用方法存储数据
     localStorage.setItem("name", "Nicholas");
     // 使用属性存储数据
     localStorage.book = "Professional JavaScript";

     // 使用方法读取数据
     let name = localStorage.getItem("name");
     // 使用属性读取数据
     let book = localStorage.book;
  ```


>  客户区坐标位置 (`clientX` 和 `clientY`)
- 鼠标事件都是在浏览器视口中特定位置上发生的。这个位置信息保存在事件对象的 clientX 和 
    clientY 属性中。所有浏览器都支持这两个属性，他们的值标是事件发生时鼠标指针在视口中的
    水平和垂直坐标. `event.clientX` , `event.clientY`
- ![clientX and clientY](./images/clientX%20and%20clientY.png)

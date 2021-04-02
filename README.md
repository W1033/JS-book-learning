#  JS-book-learning

**Hint:** 学习 JavaScript 书籍和文档的笔记；最近一年应该会暂停更新， 如果有需要请 fork.

**Tip:**  JS数据结构和算法的笔记在 `DataStructure-Algorithm-Learning` 仓库中，Vue 学习的笔记在 `Vue-learning` 内。


> 学编程有没有必要做笔记?
>
>>  A : 十分肯定, 一定要做!
      (tip: 编程书看第一遍时，可以拿笔在书上划重点， 但一定不要做笔记。)


## Repository Directory(当前仓库目录)

- 《深入理解ES6》
- 《深入理解JavaScript系列》--汤姆大叔
- 《JavaScript高级程序设计》
- 《JavaScript设计模式与开发实践》
- 《Web性能权威指南》
- 浏览器组成和执行原理
- JavaScript知识集合
    + 01-函数节流和防抖
    + 02-深拷贝-浅拷贝
    + Github_fe-interview_仓库笔记
    + JavaScript-集锦
    + Javascript掘金小册
    + 重学前端-winter 
    + JS-原型图讲解.md
    + JS-继承.md
    + 浏览器的进程和线程.md
    + 详解_执行栈-任务队列-事件循环.md
    





# README.md

## 当前 ReadMe 文档的 TOC(目录)
1. JavaScript 常见基础语法
    + 1.1 `childNodes` 和 `children` 的区别: 
    + 1.2 JS 中的根对象: `Object.prototype` 对象
    + 1.3 ES5 和 ES6 中关于 Object 上的一些方法: 
    + 1.4 在浏览器中获取 "当前页面的可视高度" 和 "文档的总高度" 的方法总结:
    + 1.5 `typeof` 和 `instanceof` 操作符的区别: 
    + 1.6 `Object.prototype.toString.call()` 检测数据类型:       
    + 1.7 关于 js 中 this 指向的讲解: 
    + 1.8 `cloneNode()` 方法
    + 1.9 `mouseover` 和 `mouseenter`的区别 -- (JS高程 13.4.3节)
    + 1.10 JSON 对象有两个方法: `JSON.stringify()` 和 `JSON.parse()`
    + 1.11 "标准的"对象和函数 
    + 1.12 日期格式化
    + 1.13 `Array.prototype`
    + 1.14 `localStorage` 对象
    + 1.15 客户区坐标位置 (`clientX` 和 `clientY`)
    + 1.16 `Object.keys()` 方法使用示例
    + 1.17 ES6 新增方法 `Object.assign()`
    + 1.18 `cookie`
    + 


## New Words
- **assign [ə'saɪn] --v.分配, 指定, 派, 调派**
    + She has been assigned to a new job. 她被派去担任新职务了.
- **receiver [rɪ'siːvə] --n.接收者**
- **supplier [səˈplaɪə] --n.提供者**
- **inheritance [ɪn'hɛrɪtəns] --n.继承; 遗产.**
    + by inheritance. 由继承
    + an inheritance of $50,000. 五万美元的遗产.
    + He spent all his inheritance in a year.
      他一年就花光了所获得的全部遗产.
- **expire [ɪk'spaɪə] vi.到期, 期满, 断气**
    + expire date 过期日期




## Content

### 1. JavaScript 常见基础语法
#### 1.1 `childNodes` 和 `children` 的区别: 
- `childNodes` 包括元素节点和文本节点, 而 `children` 只包括元素节点. 

#### 1.2 JS 中的根对象: `Object.prototype` 对象
- `Object.prototype` 对象是一个空的对象, 我们在 JS 中遇到的每个对象,
  实际上都是从 `Object.prototype` 对象克隆而来的,
  Object.prototype` 对象就是他们的原型. 

#### 1.3 ES5 和 ES6 中关于 Object 上的一些方法: 
- ES5 - `Object.keys()` 方法取得对象上所有可枚举的实例属性.  这个方法接受一个对象作为
  参数, 返回一个包含所有可枚举属性的字符串数组. 
    + 示例: 见下面的 `#### 1.16 Object.keys() 方法使用示例`
- ES5 - `Object.getOwnPropertyNames()`: 【取得自身的属性名】.  js高程 - Chapter 6
- ES5 - `Object.getPrototypeOf()` 方法返回任意指定对象的原型. 对象原型的真实值被存储在
  内部专用属性 `[[Prototype]]` 中, 调用 getPrototypeOf() 方法返回存储在其中的值. 
- ES6 - `Object.is()`: [P76] 弥补全等运算符的不准确运算. 比如之前 +0等于-0, 
  NaN不等于NaN
- ES6 - `Object.assign()` 分配
- ES6 - `Object.setPrototypeOf()` 方法可以改变任意指定对象的原型. 接受2个参数: 
    + (1).被改变原型的对象 
    + (2).替代第一个参数原型的对象. 
    + 示例:《深入理解ES6》\chapter04_扩展对象的功能性\chapter04-扩展对象的功能性.md

#### 1.4 在浏览器中获取 "当前页面的可视高度" 和 "文档的总高度" 的方法总结:
- Added: 视口: 浏览器窗口中当前网页的可见区域. 它不包括浏览器的地址栏, 工具栏, 状态栏.
  -- 《深入解析CSS》-- 2.4
- ```js
    // - 确定浏览器中页面视口(viewport)大小
    // - HTML5 新增的.
    var pageViewportWidth = window.innerWidth;
    var pageViewportHeight = window.innerHeight;
    // - 下面为兼容写法:(`<!DOCTYPE html>` 是这种写法,以前古老的写法除外)
    if (typeof pageWidth != "number") {
        pageViewportWidth = document.documentElement.clientWidth;
        pageViewportHeight = document.documentElement.clientHeight;
    }
    
    // - 获取文档的高度和宽度
    let docScrollHeight = Math.max(
        document.documentElement.clientHeight, document.documentElement.offsetHeight, 
            document.documentElement.scrollHeight
    );
    ```

#### 1.5 `typeof` 和 `instanceof` 操作符的区别: 
- 确定一个值是哪种基本类型使用 typeof 操作符, 是哪种引用类型使用 instanceof 操作符. 
  ```js
    typeof 123;   // "number"
    typeof false;   // "boolean"

    let o = {};
    let a = [];
    if (o instanceof Object) {}
    if (a instanceof Array) {}
  ```

#### 1.6 `Object.prototype.toString.call()` 检测数据类型: 
- `Object.prototype.toString.call(ele)`: 通过获取 `Object` 原型上
  的 `toString` 方法, 让方法中的 `this` 变为需要检测的数据类型, 并且让方法执行. 
  ```js
    const obj = {name: "WANG"};
    const str = "250";
    const bool = true;
    const arr = [20, 30];
    console.log(Object.prototype.toString.call(obj));     // [object Object]
    console.log(Object.prototype.toString.call(str));     // [object String]
    console.log(Object.prototype.toString.call(bool));    // [object Boolean]
    console.log(Object.prototype.toString.call(arr));     // [object Array]
  ```

#### 1.7 关于 js 中 `this` 指向的讲解: 
- `《Javascript设计模式与开发实践》/第一部分--基础知识/第2章-this_call_apply/第2章--this.md`
- 要分清楚 this 和 作用域 Scope 之间的区别, this 是当前对象的指向问题, Scope 是作用域
  (全局作用域 和 本地作用域) 的问题, Scope 讲解见:
    + `《深入理解JavaScript系列》--汤姆大叔/12-1_理解JavaScript的Scope.md`
    + `《深入理解JavaScript系列》--汤姆大叔/12-变量对象(Variable Object).html`
    + `《深入理解JavaScript系列》--汤姆大叔/13-this/13-this.html`

#### 1.8 `cloneNode()` 方法
- cloneNode() 方法不会复制添加到 DOM 节点中的 JavaScript 属性, 例如事件处理程序等. 
  这个方法只复制特性、（在明确指定的情况下也复制）子节点, 其他一切都不会复制. 


#### 1.9 `mouseover` 和 `mouseenter`的区别 -- (JS高程 13.4.3节)
- `mouseenter` ：在鼠标光标从元素外部首次移动到元素范围之内时触发. 这个事件不冒泡, 而且在
   光标移动到后代元素上不会触发. 
- `mousemove` ：当鼠标指针在元素内部移动时重复地触发. 


#### 1.10 JSON 对象有两个方法: `JSON.stringify()` 和 `JSON.parse()`
##### `JSON.stringify()`: 把 JS 对象序列化为 JSON 字符串
- ```js
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
- 如果在使用 `JSON.parse()` 转换一个字符串时在浏览器中报这个错误: 

  <i style="color: red">
    Uncaught SyntaxError(未捕获的语法错误): Unexpected token o in JSON at
    position 1 (JSON 位置 1 处的令牌 o)
  </i>

  表明,当前数据已经是对象了, 不需要再次转换. 这个错误实际上是 `[object Object]` 内的 `o`

  > ? 待做笔记: [深入理解JSON.stringify()](https://juejin.im/post/5e8c9153f265da48094d90f2)

###### `JSON.parse()`: 把 JSON 字符串解析为原生 JS 值. 


#### 1.11 "标准的"对象和函数 
- (1.) 一个 Javascript 对象就是键和值之间的映射. 键是一个字符串(或者 Symbol),
    值可以是任意类型的值.  这使得对象非常符合 哈希表. 
- (2.) 函数是一个附带可被调用功能的常规对象. (觉得这个解说很好)

#### 1.12 日期格式化
- ```js
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

#### 1.13 `Array.prototype`
- 1、将 arguments (类数组对象)转换为数组, 或者把 NodeList 对象转换为数组(比如一组li):
    + `Array.prototype.slice.call(arguments);`
- 2、取得 arguments 类数组的第一项:
    + `Array.prototype.shift.call(arguments);`
- 3、取得 arguments 类数组除去第一项剩余的项:
    + `Array.prototype.slice.call(arguments, 1);`
    + (传入参数 1 表示被返回的数组包含从第二个参数开始的所有参数)

#### 1.14 `localStorage` 对象
- ```js
    // - 此兼容函数来自 JS高程, 不过 2020 年了应该已经用不到了.
    function getLocalStorage() {
        if (typeof localStorage == "object") {
            return localStorage;
        } else if (typeof globalStorage == "object") {
            return globalStorage[location.host];
        } else {
            throw new Error("Local storage not available.");
        }
    }

    // - 使用方法存储数据
    localStorage.setItem("name", "Nicholas");
    // - 使用属性存储数据
    localStorage.book = "Professional JavaScript";

    // - 使用方法读取数据
    let name = localStorage.getItem("name");
    // - 使用属性读取数据
    let book = localStorage.book;

    // - 移除属性
    localStorage.removeItem("name");
  ```

#### 1.15 客户区坐标位置 (`clientX` 和 `clientY`)
- 鼠标事件都是在浏览器视口中特定位置上发生的. 这个位置信息保存在事件对象的
  `clientX` 和 `clientY` 属性中. 所有浏览器都支持这两个属性,
  他们的值标是事件发生时鼠标指针在视口中的水平和垂直坐标:
  `event.clientX` , `event.clientY`.

#### 1.16 `Object.keys()` 方法使用示例
- `Object.keys()` 方法**取得对象上所有可枚举的实例属性**.
  这个方法**接受一个对象**作为参数, 返回一个包含**所有可枚举属性**的字符串**数组**.
- 示例 (1)
  ```js
    function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job
    }
    Person.prototype.sayName = function () {
        console.log(this.name);
    };
    let keys = Object.keys(Person.prototype);
    console.log("keys:", keys);      // ['sayName']

    // - 如果想得到所有实例属性, 无论它是否可枚举, 可以使用
    //   `Object.getOwnPropertyNames()` (取得自身属性名) 方法:
    let keys2 = Object.getOwnPropertyNames(Person.prototype);
    // - 注意结果包含了不可枚举的 constructor 属性
    console.log("keys2:", keys2);    // keys2: [ 'constructor', 'sayName' ]

    let p1 = new Person("Rob", 36, 'Software Engineer');
    console.log(Object.keys(p1));   // [ 'name', 'age', 'job' ]
  ```
- 示例 (2)
   ```js
    let introduction = {
        name: 'W',
        age: 30,
        job: 'Software Engineer',
        doing: true
    };
    // [ 'name', 'age', 'job', 'doing' ]
    console.log(Object.keys( introduction));  
  ```
- 示例 (3)
  ```js
    // - 混合(Mixin) 是 js 中实现对象组合的一种模式. 在一个 mixin 方法中, 一个对象
    //   接受来自另一个对象的属性和方法. 许多 js 库中都有类似的 mixin 方法:
    function mixin(receiver, supplier) {
        Object.keys(supplier).forEach(function (key) {
            receiver[key] = supplier[key];
        })
    }

    function EventTarget() { }
    EventTarget.prototype = {
        constructor: EventTarget,
        emit: function (parameter) {
            console.log(parameter);
        },
        on: function () {
            // ...
        }
    };

    const inheritance = {};
    // - mixin() 函数遍历 supplier 的自有属性赋并复制到 receiver 中
    //   (此处的复制只是浅复制, 当属性值为对象时只复制对象的引用). 这样一来,
    //   receiver 不通过继承就可以获得新属性.
    mixin(inheritance, EventTarget.prototype);

    // - inheritance 接受 EventTarget.prototype 对象的所有行为从而使
    //   inheritance 可以通过 emit() 方法发布事件或通过 on() 方法订阅事件. 
    inheritance.emit("somethingChanged");     // somethingChanged

    // - ES6 新增方法: Object.assign():
    //  + 上面的 mixin() 调用可以直接替换为 -- ES6 的 Object.assign().
    //    即使这样 Object.assign() 仍然是潜拷贝. 
    Object.assign(inheritance, EventTarget.prototype);
    inheritance.emit("somethingChange again");
  ```

#### 1.17 ES6 新增方法 `Object.assign()`
- `Object.assign()` 方法可以接受任意数量的源对象,
  并按指定的顺序将属性复制到接收对象中.
- 更详细讲解见:
  `./《深入理解ES6》/chapter04_扩展对象的功能性/chapter04-扩展对象的功能性.md`
  中的 ` **### 3. 新增方法 --> Object.assign() 方法**
- 示例: 
  ```js
    // - 简化了上面 1.16 的示例 (3)
    function EventTarget() { }
    EventTarget.prototype = {
        constructor: EventTarget,
        emit: function (parameter) {
            console.log(parameter);
        },
        on: function () {
            // ...
        }
    };
    const inheritance = {};
    Object.assign(inheritance, EventTarget.prototype);
    inheritance.emit("somethingChange again");
  ```

#### 1.18 `cookie`
- 详细讲解见:
  `./《JavaScript高级程序设计》/Chapter23-离线应用与客户端存储/chapter23-离线应用与客户端存储.md`
  ```js
    let CookieUtil = {
    // - 读取 cookie
    get: function (name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd;
        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(
                document.cookie.substring(
                    cookieStart + cookieName.length,
                    cookieEnd
                )
            );
        }
        return cookieValue;
    },
    // - 写入 cookie
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    // - 删除 cookie
    unset: function (name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }

    // - 调用示例
    
    // - 设置 cookie
    CookieUtil.set("name", "Nicholas");
    CookieUtil.set("book", "Professional JavaScript");
    // - 读取 cookie 的值
    alert(CookieUtil.get("name")); //"Nicholas"
    alert(CookieUtil.get("book")); //"Professional JavaScript"
    // - 删除 cookie
    CookieUtil.unset("name");
    CookieUtil.unset("book");
  ```



- 从代码层面禁用谷歌自动填充功能: 写一个高度为0的额外的输入框，并设置autocomplete='new-password'属性，就可以解决问题了.



<div><p>下面的表将所有运算符按照优先级的不同从高（20）到低（1）排列。</p>

<table class="fullwidth-table">
 <tbody>
  <tr>
   <th>优先级</th>
   <th>运算类型</th>
   <th>关联性</th>
   <th>运算符</th>
  </tr>
  <tr>
   <td>21</td>
   <td><a href="/zh-CN/docs/Web/JavaScript/Reference/Operators/Grouping"><code>圆括号</code></a></td>
   <td>n/a（不相关）</td>
   <td><code>( … )</code></td>
  </tr>
  <tr>
   <td rowspan="5">20</td>
   <td><a href="/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors#点符号表示法"><code>成员访问</code></a></td>
   <td>从左到右</td>
   <td><code>… . …</code></td>
  </tr>
  <tr>
   <td><a href="/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors#括号表示法"><code>需计算的成员访问</code></a></td>
   <td>从左到右</td>
   <td><code>… [ … ]</code></td>
  </tr>
  <tr>
   <td><a href="/zh-CN/docs/Web/JavaScript/Reference/Operators/new"><code>new</code></a> (带参数列表)</td>
   <td>n/a</td>
   <td><code>new … ( … )</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions">函数调用</a></td>
   <td>从左到右</td>
   <td><code>… (&nbsp;<var>…&nbsp;</var>)</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining">可选链（Optional chaining）</a></td>
   <td>从左到右</td>
   <td><code>?.</code></td>
  </tr>
  <tr>
   <td rowspan="1">19</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new">new</a>&nbsp;(无参数列表)</td>
   <td>从右到左</td>
   <td><code>new …</code></td>
  </tr>
  <tr>
   <td rowspan="2">18</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Increment">后置递增</a>(运算符在后)</td>
   <td colspan="1" rowspan="2">n/a<br>
    &nbsp;</td>
   <td><code>… ++</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Decrement">后置递减</a>(运算符在后)</td>
   <td><code>… --</code></td>
  </tr>
  <tr>
   <td colspan="1" rowspan="10">17</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_NOT">逻辑非</a></td>
   <td colspan="1" rowspan="10">从右到左</td>
   <td><code>! …</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT">按位非</a></td>
   <td><code>~ …</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_plus">一元加法</a></td>
   <td><code>+ …</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_negation">一元减法</a></td>
   <td><code>- …</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Increment">前置递增</a></td>
   <td><code>++ …</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Decrement">前置递减</a></td>
   <td><code>-- …</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a></td>
   <td><code>typeof …</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void">void</a></td>
   <td><code>void …</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete">delete</a></td>
   <td><code>delete …</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await">await</a></td>
   <td><code>await …</code></td>
  </tr>
  <tr>
   <td>16</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Exponentiation">幂</a></td>
   <td>从右到左</td>
   <td><code>…&nbsp;**&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="3">15</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Multiplication">乘法</a></td>
   <td colspan="1" rowspan="3">从左到右<br>
    &nbsp;</td>
   <td><code>… *&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Division">除法</a></td>
   <td><code>… /&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder">取模</a></td>
   <td><code>… %&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="2">14</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Addition">加法</a></td>
   <td colspan="1" rowspan="2">从左到右<br>
    &nbsp;</td>
   <td><code>… +&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Subtraction">减法</a></td>
   <td><code>… -&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="3">13</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators">按位左移</a></td>
   <td colspan="1" rowspan="3">从左到右</td>
   <td><code>… &lt;&lt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators">按位右移</a></td>
   <td><code>… &gt;&gt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators">无符号右移</a></td>
   <td><code>… &gt;&gt;&gt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="6">12</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Less_than_operator">小于</a></td>
   <td colspan="1" rowspan="6">从左到右</td>
   <td><code>… &lt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Less_than__or_equal_operator">小于等于</a></td>
   <td><code>… &lt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Greater_than_operator">大于</a></td>
   <td><code>… &gt;&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Greater_than_or_equal_operator">大于等于</a></td>
   <td><code>… &gt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in">in</a></td>
   <td><code>… in&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof">instanceof</a></td>
   <td><code>… instanceof&nbsp;…</code></td>
  </tr>
  <tr>
   <td rowspan="4">11</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality">等号</a></td>
   <td colspan="1" rowspan="4">从左到右<br>
    &nbsp;</td>
   <td><code>… ==&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Inequality">非等号</a></td>
   <td><code>… !=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity">全等号</a></td>
   <td><code>… ===&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Nonidentity">非全等号</a></td>
   <td><code>… !==&nbsp;…</code></td>
  </tr>
  <tr>
   <td>10</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_AND">按位与</a></td>
   <td>从左到右</td>
   <td><code>… &amp;&nbsp;…</code></td>
  </tr>
  <tr>
   <td>9</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_XOR">按位异或</a></td>
   <td>从左到右</td>
   <td><code>… ^&nbsp;…</code></td>
  </tr>
  <tr>
   <td>8</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_OR">按位或</a></td>
   <td>从左到右</td>
   <td><code>… |&nbsp;…</code></td>
  </tr>
  <tr>
   <td>7</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_AND">逻辑与</a></td>
   <td>从左到右</td>
   <td><code>… &amp;&amp;&nbsp;…</code></td>
  </tr>
  <tr>
   <td>6</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_OR">逻辑或</a></td>
   <td>从左到右</td>
   <td><code>… ||&nbsp;…</code></td>
  </tr>
  <tr>
   <td>5</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator">空值合并</a></td>
   <td>从左到右</td>
   <td><code>… ?? …</code></td>
  </tr>
  <tr>
   <td>4</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator">条件运算符</a></td>
   <td>从右到左</td>
   <td><code>… ? … : …</code></td>
  </tr>
  <tr>
   <td rowspan="16">3</td>
   <td rowspan="16"><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators">赋值</a></td>
   <td rowspan="16">从右到左</td>
   <td><code>… =&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… +=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… -=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… **=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… *=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… /=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… %=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &lt;&lt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &gt;&gt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &gt;&gt;&gt;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &amp;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… ^=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… |=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… &amp;&amp;=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… ||=&nbsp;…</code></td>
  </tr>
  <tr>
   <td><code>… ??=&nbsp;…</code></td>
  </tr>
  <tr>
   <td colspan="1" rowspan="2">2</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield">yield</a></td>
   <td colspan="1" rowspan="2">从右到左</td>
   <td><code>yield&nbsp;…</code></td>
  </tr>
  <tr>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*">yield*</a></td>
   <td><code>yield*&nbsp;…</code></td>
  </tr>
  <tr>
   <td>1</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator">展开运算符</a></td>
   <td>n/a</td>
   <td><code>...</code>&nbsp;…</td>
  </tr>
  <tr>
   <td>0</td>
   <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comma_Operator">逗号</a></td>
   <td>从左到右</td>
   <td><code>… ,&nbsp;…</code></td>
  </tr>
 </tbody>
</table></div>


# 第 11 章 -- DOM 扩展


## Table Of Contents
- 11.1 选择符 API
    + 11.1.1 `querySelector()` 方法
    + 11.1.2 `querySelectorAll()` 方法
    + 11.1.3 `matchesSelector()` 方法
- 11.2 元素遍历
- 11.3 HTML5
    + 11.3.1 与类相关的扩充
    + 11.3.2 焦点管理
    + 11.3.3 HTMLDocument 的变化
    + 11.3.4 字符集属性
    + 11.3.5 自定义数据属性
    + 11.3.6 插入标记
    + 11.3.7 `scrollIntoView` 方法
- 11.4 专有扩展
    + 11.4.1  文档模式
    + 11.4.2 `children` 属性
    + 11.4.3 `contains()` 方法
    + 11.4.4 插入文本
    + 11.4.5 滚动
- 11.5 小结


## New Words
- **query ['kwɪərɪ] v.询问  --n.疑问, 问题**
    + query string 请求参数
    + if you have any queries relative to payment, please contact us.
        如果您又与付款有关的疑问, 请与我们联系. 
- **selector [sə'lɛktɚ] --n.选择器; 选择符; 挑战者**


## Content
### 11.1 选择符 API
##### 11.1.1 `querySelector() (查询(传入的)选择符)` 方法
- `querySelector()` 方法接收一个 CSS 选择符, 返回与该模式匹配的第一个元素, 
  如果没有找到匹配的元素, 返回 null. 请看下面的例子:
  ```js
    // - 取得 body 元素
    const body = document.querySelector('body');
    // - 取得 ID 为 'myDiv' 的元素
    let myDiv = document.querySelector('#myDiv');
    // - 取得类为 'selected' 的第一个元素
    let selected = document.querySelector('.selected');
    // - 取得类为 'myImg' 的第一个图像元素
    let myImg = document.querySelector('img.myImg');
  ```
##### 11.1.2 `querySelectorAll() (查询(传入的)全部选择符)` 方法
- `querySelectorAll()` 方法接收的参数与 `querySelector()` 方法一样, 
  都是一个 CSS 选择符, 但返回的是所有匹配的元素而不仅仅是一个元素. 
  这个方法返回的是一个 NodeList 的实例. 
  
  具体来说, 返回的值实际上是带有所有属性和方法的 NodeList, 
  而其底层实现则类似于一组元素的快照, 而非不断对文档进行搜索的动态查询. 
  这样实现可以避免使用 NodeList 对象通常会引起的大多数性能问题. 

  只要传给 querySelectorAll() 方法的 CSS 选择符有效, 该方法都会返回一个
  NodeList 对象, 而不管找到多少匹配的元素. 如果没有找到匹配的元素, 
  NodeList 就是空的. 
  
  与 querySelector() 类似, 能够调用 querySelectorAll()
  方法的类型包括 Document、DocumentFragment 和 Element. 
  下面是几个例子. 
  ```js
    // - 取得某 <div> 中的所有 <em> 元素(类似于 getElementsByTagName("em"))
    var ems = document.getElementById("myDiv").querySelectorAll("em");
    // - 取得类为 "selected" 的所有元素
    var selecteds = document.querySelectorAll(".selected");
    // - 取得所有 <p> 元素中的所有 <strong> 元素
    var strongs = document.querySelectorAll("p strong");
  ```
##### 11.1.3 `matchesSelector() (匹配选择器)` 方法

### 11.2 元素遍历

### 11.3 HTML5
- 对于传统 HTML 而言, HTML5 是一个叛逆. 所有之前的版本对 JavaScript
  接口的描述都不过三言两语, 主要篇幅都用于定义标记, 与 JavaScript
  相关的内容一概交由 DOM 规范去定义. 
  
  而 HTML5 规范则围绕如何使用新增标记定义了大量 JavaScript API. 
  其中一些 API 与 DOM 重叠, 定义了浏览器应该支持的 DOM 扩展. 
##### 11.3.1 与类相关的扩充
- HTML4 在 Web 开发领域得到广泛采用后导致了一个很大的变化, 即 class
  属性用得越来越多, 一方面可以通过它为元素添加样式, 另一方面还可以用它表示元素的语义. 
  于是, 自然就有很多 JavaScript代码会来操作 CSS 类, 
  比如动态修改类或者搜索文档中具有给定类或给定的一组类的元素, 等等. 
  为了让开发人员适应并增加对 class 属性的新认识,  HTML5 新增了很多 API, 
  致力于简化 CSS 类的用法. 
- (1) **`getElementsByClassName()` 方法**
  
  HTML5 添加的 `getElementsByClassName()` 方法是最受人欢迎的一个方法, 
  可以通过 document 对象及所有 HTML 元素调用该方法. 这个方法最早出现在 
  JavaScript 库中, 是通过既有的 DOM 功能实现的, 而原生的实现具有极大的性能优势. 

  `getElementsByClassName()` 方法接收一个参数, 即一个包含一或多个类名的字符串, 
  返回带有指定类的所有元素的 NodeList. 传入多个类名时, 类名的先后顺序不重要. 
  来看下面的例子. 
  ```js
    // - 取得所有类中包含 "username" 和 "current" 的元素, 类名的先后顺序无所谓
    var allCurrentUsernames = document.getElementsByClassName("username current");

    // - 取得 ID 为 "myDiv" 的元素中带有类名 "selected" 的所有元素
    var selected = document.getElementById("myDiv").getElementsByClassName("selected");
  ```
- (2) **`classList` 属性**
  
  在操作类名时, 需要通过 className 属性添加、删除和替换类名. 因为 className
  中是一个字符串, 所以即使只修改字符串一部分, 也必须每次都设置整个字符串的值. 
  比如, 以下面的 HTML 代码为例. 
  ```js
    <div class="bd user disabled">...</div>
  ```
  这个 `<div>` 元素一共有三个类名. 要从中删除一个类名, 需要把这三个类名拆开, 
  删除不想要的那个, 然后再把其他类名拼成一个新字符串. 请看下面的例子. 
  ```js
    // - 删除 'user' 类

    // - 首先, 取得类名字符串并拆分成数组.
    // - string.split(): 把字符串转换成数组
    let getClassNames = document.querySelector('div.bd').className.split(/\s+/);
    // - 找到要删除的类名
    let pso = -1, i, len;
    for (i = 0, len = getClassNames.length; i < len; i++) {
        if (className[i] === 'user') {
            pos = i;
            break;
        }
    }
    // - 删除类型
    getClassNames.splice(i, i);
    // - 把剩下的类名拼接成字符串重新设置.
    // - Array.join(): 把数组转换成字符串
    getClassNames.className = getClassNames.join(/\s/);
  ```

  HTML5 新增了一种操作类名的方式, 可以让操作更简单也更安全, 
  那就是为所有元素添加 `classList (class 列表)` 属性. 这个 `classList`
  属性是新集合类型 `DOMTokenList` 的实例. 与其他 DOM 集合类似, `DOMTokenList`
  有一个表示自己包含多少元素的 `length` 属性, 而要取得每个元素可以使用 `item()`
  方法, 也可以使用方括号语法. 此外, 这个新类型还定义如下方法:
    + (1) `add(value)`: 将给定的字符串添加到 classList 中. 如果值已经存在,
      便不再添加.
    + (2) `contains(value)`: 表示 class 列表中是否存在给定的值,
      如果存在就返回 `true`, 否则返回 false.
    + (3) `remove(value)`: 从 class 列表中删除给定的字符串.
    + (4) `toggle(value)`: 如果列表中已经存在给定的值, 删除它;
      如果列表中没有给定的值, 添加它.
  
  这样, 上面那么多行代码用下面一行代码就可以代替了:
  ```js
    getClassNames.classList.remove('user');
  ```
  以上代码能够确保其他类名不受此次修改的影响. 
  其他方法也能极大地减少类似基本操作的复杂性; 如下面的例子所示:
  ```js
    // - 删除 'disabled' 类
    div.classList.remove('disabled');

    // - 添加 'current' 类
    div.classList.add('current');

    // - 切换 'user' 类
    div.classList.toggle('user');

    // - 确定元素中是否包含既有的类
    if (div.classList.contains('bd') && !div.classList.contains('disabled')) {
        // ...
    }

    // - 迭代类名
    for (let i = 0, i < div.classList.length; i < len; i++) {
        doSomething(div.classList[i]);
    }
  ```
  有了 classList 属性, 除非你需要全部删除所有类名, 或者完全重写元素的 class 属性, 
  否则也就用不到 className 属性了. 
  
  支持 classList 属性的浏览器: 目前 IE10 是部分支持, 低于 IE 10 不支持; Firefox,
  Chrome, Safari 都支持. 
##### 11.3.2 焦点管理
##### 11.3.3 HTMLDocument 的变化
##### 11.3.4 字符集属性
##### 11.3.5 自定义数据属性
- HTML5 规定可以为元素添加非标准的属性, 但要添加前缀 `data-`,
  目的是为元素提供与渲染无关的信息, 或者提供语义信息. 这些属性可以任意添加、
  随便命名, 只要以 `data-` 开头即可. 来看一个例子. 
  ```html
    <div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
  ```
  添加了自定义属性之后, 可以通过元素的 `dataset` 属性来访问自定义属性的值.
  `dataset` 属性的值是 DOMStringMap 的一个实例, 也就是一个名值对儿的映射.
  在这个映射中, 每个 `data-name` 形式的属性都会有一个对应的属性,
  只不过属性名没有 `data-前缀` (比如, 自定义属性是 data-myname,
  那映射中对应的属性就是 myname). 还是看一个例子吧. 
  ```js
    // - 本例中使用的方法仅用于演示
    var div = document.getElementById("myDiv");
    // - 取得自定义属性的值
    var appId = div.dataset.appId;
    var myName = div.dataset.myname;
    // - 设置值
    div.dataset.appId = 23456;
    div.dataset.myname = "Michael";
    // - 有没有 "myname" 值呢？
    if (div.dataset.myname){
        alert("Hello, " + div.dataset.myname);
    }
  ```
  如果需要给元素添加一些不可见的数据以便进行其他处理, 那就要用到自定义数据属性.
  在跟踪链接或混搭应用中, 通过自定义数据属性能方便地知道点击来自页面中的哪个部分.
##### 11.3.6 插入标记
##### 11.3.7 `scrollIntoView` 方法

### 11.4 专有扩展
##### 11.4.1  文档模式
##### 11.4.2 `children` 属性
##### 11.4.3 `contains()` 方法
##### 11.4.4 插入文本
##### 11.4.5 滚动

### 11.5 小结
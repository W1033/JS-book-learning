# 第 8 章 -- BOM


## Catalog
- 8.1 window 对象
    + 8.1.1 全局作用域
    + 8.1.2 窗口关系及框架
    + 8.1.3 窗口位置
    + 8.1.4 窗口大小
    + 8.1.5 导航和打开窗口
    + 8.1.6 间歇调用和超时调用
    + 8.1.7 系统对话框
- 8.2 location 对象
    + 8.2.1 查询字符串参数
    + 8.2.2 位置操作
- 8.3 navigator 对象
    + 8.3.1 检测插件
    + 8.3.2 注册处理程序
- 8.4 screen 对象
- 8.5 history 对象
- 8.6 小结




## New Words





## Content
### 8.1 window 对象
#### 8.1.1 全局作用域
- 由于 window 对象同时扮演着 ECMAScript 中 Global 对象的角色,
  因此所有在全局作用域中声明的变量、函数都会变成 window 对象的属性和方法.
#### 8.1.2 窗口关系及框架
#### 8.1.3 窗口位置
#### 8.1.4 窗口大小
- 跨浏览器确定一个窗口的大小不是一件简单的事. IE9+、Firefox、Safari 和 Chrome
  均为此提供了 4 个属性: `innerWidth`, `innerHeight`, `outerWidth`,
  `outerHeight`. 在 IE9+、 Safari 和 Firefox 中, `outerWidth` 和
  `outerHeight` 返回浏览器窗口本身的尺寸(无论是从最外层的 window
  对象还是从某个框架访问). 在 Chrome 中 `outerWidth`、 `outerHeight`
  与 `innerWidth`、`innerHeight` 返回相同的值, 即 `视口(viewport)`
  大小而非浏览器窗口大小.
    + **Note:** `视口(viewport)` 即当前页面的可视区域. 不包含滚动条的部分.
      例如: 在 Mac pro (15.6 寸) 的 Chrome 中打开页面后用 js 获取
      `window.innerWidth` 和 `window.innerHeight` 就是 1146 * 766.
      即使页面宽度设置为 `width: 2000px`, 可视宽度也是 `1146px`.
  
  在 IE、 Firefox、 Safari、 Opera 和 Chrome 中,  
  `document.documentElement.clientWidth` 和
  `document.documentElement.clientHeight` 中保存了页面视口的信息.
  在 IE6 中......(忽略).
  
  虽然最终无法确定浏览器窗口本身的大小, 但却可以取得页面视口的大小, 如下所示:
  ```js
    var pageViewportWidth = window.innerWidth;
    var pageViewportHeight = window.innerHeight;
    // - 现在的浏览器已经不需要再写兼容了
    if (typeof pageWidth != "number") {
        pageViewportWidth = document.documentElement.clientWidth;
        pageViewportHeight = document.documentElement.clientHeight;
    }
  ```
#### 8.1.5 导航和打开窗口
#### 8.1.6 间歇调用和超时调用
- JavaScript 是单线程语言,
  但它允许通过设置超时值和间歇时间值来调度代码在特定的时刻执行.
  前者是在指定的时间过后执行代码, 而后者则是每隔指定的时间就执行一次代码, 
  超时调用需要使用 window 对象的 `setTimeout()` 方法, 它接受两个参数:
  要执行的代码和以毫秒表示的时间(即在执行代码前需要等待多少毫秒).
  其中, 第一个参数可以是一个包含 JavaScript 代码的字符串(就和在
  `eval()` 函数中使用的字符串一样), 也可以是一个函数, 例如, 下面对
  `setTimeout()` 的两次调用都会在一秒钟后显示一个警告框, 
  ```js
    // - 不建议传递字符串！
    setTimeout("alert('Hello world!') ", 1000);
    // - 推荐的调用方式
    setTimeout(function() {
        alert("Hello world!");
    }, 1000);
  ```
  虽然这两种调用方式都没有问题, 但由于传递字符串可能导致性能损失,
  因此不建议以字符串作为第一个参数, 
  
  第二个参数是一个表示等待多长时间的毫秒数, 但经过该时间后指定的代码不一定会执行, 
  JavaScript 是一个单线程序的解释器, 因此一定时间内只能执行一段代码.
  为了控制要执行的代码, 就有一个 JavaScript 任务队列.
  这些任务会按照将它们添加到队列的顺序执行,  `setTimeout()` 的第二个参数告诉
  JavaScript 再过多长时间把当前任务添加到队列中, 如果队列是空的,
  那么添加的代码会立即执行；如果队列不是空的, 那么它就要等前面的代码执行完了以后再执行.

  调用 `setTimeout()` 之后, 该方法会返回一个数值 ID, 表示超时调用.
  这个超时调用 ID 是计划执行代码的唯一标识符, 可以通过它来取消超时调用.
  要取消尚未执行的超时调用计划, 可以调用 `clearTimeout()` 方法并将相应的超时调用
  ID 作为参数传递给它, 如下所示.
  ```js
    // - 设置超时调用
    var timeoutId = setTimeout(function() {
        alert("Hello world!");
    }, 1000);
    // - 注意: 把它取消
    clearTimeout(timeoutId);
  ```
  只要是在指定的时间尚未过去之前调用 `clearTimeout()`, 就可以完全取消超时调用.
  前面的代码在设置超时调用之后马上又调用了 `clearTimeout()`,
  结果就跟什么也没有发生一样.

  **Notice:** 超时调用的代码都是在全局作用域中执行的, 因此函数中 this
  的值在非严格模式下指向 window 对象, 在严格模式下是 undefined, 
#### 8.1.7 系统对话框


### 8.2 location 对象
- location 对象是最有用的 BOM 对象之一, 它提供了与当前窗口中加载的文档有关的信息,
  还提供了一些导航功能. 事实上, location 对象是很特别的一个对象, 因为它既是
  window 对象的属性, 也是 document 对象的属性; 换句话说, `window.location`
  和 `document.location` 引用的是同一个对象. 
  
  location 对象的用处不只表现在它保存着当前文档的信息, 还表现在它将 URL
  解析为独立的片段, 让开发人员可以通过不同的属性访问这些片段. 下表列出了 location
  对象的所有属性 (注: 省略了每个属性前面的 location 前缀).
  
  | 属性名 | 例子 | 说明 |
  |:---|:---|:---|
  | `hash` | "#contents" | 返回 URL 中的 `hash`(`#` 号后跟零或多个字符), 如果 URL 不包含散列, 则返回空字符串.|
  | `host` | "www.wrox.com:80" | 返回服务器名称和端口号(如果有) |
  | `hostname(域名)` | "www.wrox.com" | 返回不带端口号的服务器名称 |
  | `href` | "http:/www.wrox.com" | 返回当前加载页面的完整 URL. 而 location 对象的 `toString()` 方法也返回这个值. |
  | `pathname` | "/WileyCDA/" | 返回 URL 中的目录和 (或) 文件名 |
  | `port` | "8080" | 返回 URL 中指定的端口号. 如果 URL 中不包含端口号, 则这个属性返回空字符串 |
  | `protocol` | "http:" | 返回页面使用的协议. 通常是 http: 或 https: |
  | `search` |  "?q=javascript&num=10" | 返回 URL 的查询字符串. 这个字符串以问好开头 |

#### 8.2.1 查询字符串参数
- 虽然通过上面的属性可以访问到 location 对象的大多数信息, 但其中访问 URL
  包含的查询字符串的属性并不方便. 尽管 `location.search` 返回从问号到 URL
  末尾的所有内容, 但却没有办法逐个访问其中的每个查询字符串参数. 为此, 
  可以像下面这样创建一个函数, 用以解析查询字符串, 然后返回包含所有参数的一个对象:
  ```js
    function getQueryStrArgs() {
        // - query string 取得查询字符串并去掉开头的问号 
        let qs = (location.search.length > 0
            ? location.search.substring(1) : "");
        // - 保存数据的对象
        let args = {};

        // - 保存每一项
        // - 字符串对象的 split() 方法, 根据指定的分隔符, 把字符串分割为数组.
        let items = qs.length ? qs.split("&") : [];
        let item = null;
        let name = null;
        let value = null;

        // - 在 for 循环中使用
        let i = 0,
            len = items.length;
        for (; i < len; i++) {
            item = items[i].splice("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            // - 然后把 name 当做 key, value 当做值, 推入到 args 中
            if (name.length) {
                args[name] = value;
            }
        }
        // - 最后返回 args
        return args
    }
  ```
  这个函数的第一步是先去掉查询字符串开头的问号. 当然, 前提是 `location.search`
  中必须要包含一或多个字符. 然后, 所有参数将被保存在 args 对象中, 
  该对象以字面量形式创建. 接下来, 根据和号( &)来分割查询字符串, 并返回
  name=value 格式的字符串数组. 下面的 for 循环会迭代这个数组, 
  然后再根据等于号分割每一项, 从而返回第一项为参数名, 第二项为参数值的数组.
  再使用 `decodeURIComponent()` 分别解码 name 和 value
  (因为查询字符串应该是被编码过的). 最后, 将 name 作为 args 对象的属性, 
  将 value 作为相应属性的值. 下面给出了使用这个函数的示例. 
  ```js
    // - 假设查询字符串是 ?q=javascript&num=10
    let args = getQueryStrArgs();
    console.log(args['q'])      // "javascript"
    console.log(args["num"])    // "10"
  ```
#### 8.2.2 位置操作
- 使用 location 对象可以通过很多方式来改变浏览器当前的显示信息. 首先,
  也是最常用的方式, 就是使用 `assign()` 方法并为其传递一个 URL, 如下所示. 
  ```js
    location.assign("http://www.wrox.com");
  ```
  这样, 就可以立即打开新 URL 并在浏览器的历史记录中生成一条记录. 如果是将 
  `location.href` 或 `window.location` 设置为一个 URL 值, 也会以该值调用
  `assign()` 方法. 例如, 下列两行代码与显式调用 `assign()` 方法的效果完全一样. 
  ```js
    window.location = "http://www.wrox.com";
    location.href = "http://www.wrox.com";
  ```
  在这些改变浏览器位置的方法中, 最常用的是设置 `location.href` 属性. 
  
  另外, 修改 location 对象的其他属性也可以改变当前加载的页面.
  下面的例子展示了通过将 `hash`、`search`、`hostname`、 `pathname` 和 `port`
  属性设置为新值来改变 URL. 
  ```js
    // - 假设初始 URL 为 http://www.worx.com/WileyCDA/

    // - 将 URL 修改为 "http://www.wrox.com/WileyCDA/#section1"
    location.hash = "#section1";

    // - 将 URL 修改为 "http://www.wrox.com/WileyCDA/?q=javascript"
    location.search = "?q=javascript";

    // - 将 URL 修改为 "http://www.yahoo.com/WileyCDA/"
    location.hostname = "www.yahoo.com";

    // - 将 URL 修改为 "http://www.yahoo.com/mydir/"
    location.pathname = "mydir";

    // - 将 URL 修改为 "http://www.yahoo.com:8080/WileyCDA"
    location.port = 8080;
  ```
  每次修改 location 的属性(`hash` 除外), 页面都会以新 URL 重新加载.

- 当通过上述任何一种方式修改 URL 之后, 浏览器的历史记录中就会生成一条新记录,
  因此用户通过单击 "后退" 按钮都会导航到前一个页面. 要禁用这种行为, 可以使用
  `replace()` 方法. 这个方法只接受一个参数, 即要导航到的 URL;
  结果虽然会导致浏览器位置改变, 但不会在历史记录中生成新记录. 在调用 `replace()`
  方法之后, 用户不能回到前一个页面.
- 与位置有关的最后一个方法是 `reload()`, 作用是重新加载当前显示的页面.
  如果调用 `reload()` 时不传递任何参数, 页面就会以最有效的方式重新加载.
  也就是说, 如果页面自上次请求以来并没有改变过, 页面就会从浏览器缓存中重新加载.
  如果要强制从服务器重新加载, 则需要像下面这样为该方法传递参数 `true`. 
  ```js
    // - 重新加载 (有可能从缓存中加载)
    location.reload(); 
    // - 重新加载 (从服务器重新加载)
    location.reload(true);
  ```
  位于 `reload()` 调用之后的代码可能会也可能不会执行,
  这要取决于网络延迟或系统资源等因素. 为此, 最好将 `reload()` 放在代码的最后一行.


### 8.3 navigator 对象
#### 8.3.1 检测插件
#### 8.3.2 注册处理程序


### 8.4 screen 对象


### 8.5 history 对象
- `history` 对象保存着用户上网的历史记录, 从窗口被打开的那一刻算起. 因为 `history`
  是 window 对象的属性, 因此每个浏览器窗口、每个标签页乃至每个框架, 都有自己的 
  `history` 对象与特定的 window 对象关联. 出于安全方面的考虑,
  开发人员无法得知用户浏览过的 URL. 不过, 借由用户访问过的页面列表,
  同样可以在不知道实际 URL 的情况下实现后退和前进. 
  
  使用 `go()` 方法可以在用户的历史记录中任意跳转, 可以向后也可以向前.
  这个方法接受一个参数, 表示向后或向前跳转的页面数的一个整数值.
  负数表示向后跳转(类似于单击浏览器的 "后退" 按钮), 
  正数表示向前跳转(类似于单击浏览器的 "前进" 按钮). 来看下面的例子. 
  ```js
    // - 后退一页
    history.go(-1);
    // - 前进一页
    history.go(1);
    // - 前进两页
    history.go(2);
  ```
  也可以给 `go()` 方法传递一个字符串参数,
  此时浏览器会跳转到历史记录中包含该字符串的第一个位置 -- 可能后退, 也可能前进,
  具体要看**哪个位置最近**. 如果历史记录中不包含该字符串, 那么这个方法什么也不做,
  例如: 
  ```js
    // - 跳转到最近的 wrox.com 页面
    history.go("wrox.com");
    
    // - 跳转到最近的 nczonline.net 页面
    history.go("nczonline.net");
  ```
  另外, 还可以使用两个简写方法 `back()` 和 `forward()` 来代替 `go()`. 顾名思义,
  这两个方法可以模仿浏览器的 "后退" 和 "前进" 按钮. 
  ```js
    // - 后退一页
    history.back();
    
    // - 前进一页
    history.forward();
  ```
  除了上述几个方法外, `history` 对象还有一个 `length` 属性, 保存着历史记录的数量.
  这个数量包括所有历史记录, 即所有向后和向前的记录. 对于加载到窗口、
  标签页或框架中的第一个页面而言, `history.length` 等于 0.
  通过像下面这样测试该属性的值, 可以确定用户是否一开始就打开了你的页面.
  ```js
    if (history.length == 0){
        // - 这应该是用户打开窗口后的第一个页面
    }
  ```
  虽然 `history` 并不常用, 但在创建自定义的 "后退" 和 "前进" 按钮,
  以及检测当前页面是不是用户历史记录中的第一个页面时, 还是必须使用它. 

  当页面的 URL 改变时, 就会生成一条历史记录. 在浏览器中, 这里所说的改变包括 URL
  中 `hash` 的变化(因此, 设置 `location.hash`
  会在这些浏览器中生成一条新的历史记录). 

  **Added:** History 对象还有一个常用的属性: `history.state`, 它返回 History
  堆栈最上层的状态值, (tip: 这个状态值就是第 16 章 - `16.4 历史状态管理` 中
  `pushState()` 方法的第一个参数(即: 一个状态对象)). 例如:
  ```js
    var stateObj = {foo: 'bar'};
    history.pushState(stateObj, 'page 2', '2.html');
    history.state;  // {foo: "bar"}
  ```

- **Additional Info:** 关于 HTML5 新添加的语法, 比如 `pushState()` /
  `replaceState()` / `popState` 事件, 请见 **第 16 章 HTML5 教程编程**
  内的 `16.4 历史状态管理`.

### 8.6 小结 


# JS-book-learning
《js高级程序设计》
《深入理解ES6》
《js设计模式与编程实践》

[js函数式编程](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)


-----------------HTML-----------------

# HTML
- 路徑:
    + `./`  当前目录;
    + `../` 父级目录;
    + `/` 根目录。

> **HTML5 新增元素**
- 新增的结构元素
    + 结构元素分为：主体结构元素 和 非主体结构元素
        - 主体结构元素：article、aside、nav、pubdate、section、time、figure。
        - 非主体结构元素：address、header、hgroup、footer、main。
- 新增的其他元素：
    + 1、video 元素：用于定义视频，实现播放视频资源。
    + 2、audio 元素：用于定义音频、实现播放音频资源。
    + 3、embed
    + 4、mark：高亮显示
    + 5、progress
    + 6、ruby 
        - rp
        - rt
    + 7、wbr 软换行
    + 8、canvas：用于定义徒刑图像。它只是一个容器画布，绘制图形时需要使用脚本。
    + 9、command
    + 10、details：与 summary 元素配合使用
        - 示例:
        - Firefox 不支持, Chrome & Safari 支持
        - ```
             <details>
                <summary>农夫与蛇</summary>
                一个农夫在寒冷的冬天里看见一条蛇冻僵了, 觉得它很可怜, 就把它拾起来，小心翼翼地
                揣进怀里，用暖热的身体温暖着它。那条蛇受到了暖气，渐渐复苏了，又恢复了生机。等到
                它彻底苏醒过来，便立即恢复了本性，用尖利的毒牙狠狠地咬了恩人一口，使他受到了致命
                的创伤。农夫临死的时候痛悔地说：“我可怜恶人，不辨好坏，结果害了自己，遭到这样的
                报应。 如果有来世 ，我绝不怜惜像毒蛇一样的恶人。”
            </details>
          ```
    + 11、datalist
    + 12、datagrid
    + 13、keygen
    + 14、output
    + 15、source：为媒体元素（video 和 audio）引入媒介资源。
    + 16、menu



-----------------CSS-----------------

# CSS
- box-shadow属性:
  ```css
      .box {
          /*横向阴影1px, 纵向阴影1px, 模糊半径3px, 阴影展开半径2px, 颜色值。*/
          box-shadow: 1px 1px 3px 2px #cfcecf;
          box-shadow: 0 .05em .25em rgba(0, 0, 0, .5);
      }
  ```

- 2、CSS 单位  
  + | 单位   | 解释 |
    | ----  | ---- |
    | `%`   | 百分比|
    | `px`  | 像素。计算机屏幕上的一个点为 1px. |
    | `em`  | 相对单位。相对于父元素计算，假如某个 p 元素为 `font-size:12px`,在它内部的 span 标签，设置 `font-size: 2em`, 那么， 这时候的 span 字体大小为 12*2 = 24px。|
    | `rem` | 相对单位。 相对于根元素 html 的 `font-size`. 例如 html 为 `font-size: 12px`, 那么其内的 div 设置为 `font-size: 2rem`, div 字体大小就为 24px. |
    | `rpx` | 微信小程序相对单位。1rpx = 屏幕宽度/750px. 在 750px 的设计稿上，1rpx = 1px |
    | `pt`  | 略 |
    | `ex`  | 略 |

- css强制换行和超出隐藏实现
   + (1). word-break: break-all; 只对英文起作用，以字母作为换行依据。假设div宽度为
     450px，它的内容就会到450px自动换行，如果该行末端有个很长的英文单词，它会把单词截断，
     一部分保持在行尾，另一部分换到下一行。
   + (2). word-wrap: break-word; 只对英文起作用，以单词作为换行依据。例子与上面一样，
     但区别就是它会把整个单词看成一个整体，如果该行末端宽度不够显示整个单词，它会自动把整个
     单词放到下一行，而不会把单词截断。
   + (3). white-space: pre-wrap; 只对中文起作用，强制换行。

- 表格清除格与格之前的间距的样式: border-collapse: collapse;

- 响应式网页的头部
  - viewport 是网页默认的宽度和高度，网页宽度默认等于屏幕宽度 (width = device-width), 
    原始缩放比例 (initial-scale=1) 为1.0，
    即网页初始大小占屏幕面积的100%, maximum-scale允许用户缩放到的最大比例，user-scalable
    允许用户是否可以手动缩放.
      `meta name="viewport" content="width=device-width, initial-scale=1, 
        maximum-scale=1.0, user-scalable=no" `
      `meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"`
  - 忽略将页面中的数字识别为电话号码，忽略android平台中对邮箱地 址的识别
    `meta content="telephone=no,email=no" name="format-detection"`

- 手机端页面解决ios的button按钮的各种bug问题
   - 解决点击input textarea出现边框的问题
        + `input:focus, input:active, input:link, 
           input:visited{ outline:none;border:0;} `
        + `textarea:focus, textarea:active, textarea:link, 
           textarea:visited{ outline:none;border:0;}`
   - 解决ios苹果button圆角和渐变的问题
        + `input[type=button], input[type=submit], input[type=file], 
           button {cursor: pointer;  -webkit-appearance: none;}`

   - 解决ios移动端点击按钮会出现暗色背景的问题
        + `input{
                /*去除系统默认的样式*/
               -webkit-appearance:none;
                /* 点击高亮的颜色*/
               -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
           }`
- 解决 Chrome 下 textarea 的问题
   + 取消chrome下input和textarea的聚焦边框: 
     `input,button,select,textarea{outline:none}`
   + 取消chrome下textarea可拖动放大: `textarea{resize:none}`
- css 的盒模型:
    + content+padding+border即内容的(宽高)+内边距的再加上边框，而不加上margin。

-----------------HTTP-----------------

# HTTP
> 最常见的 URL 组成部分分析:
- `http://www.joes-hardware.com/inventory-check.cgi?item=12731&color=blue`
    + `http:` -- 方案(scheme)
    + `www.joes-hardware.com:80` -- 主机(host) 和 端(port)，此处端口省略
    + `inventory-check.cgi` -- 路径(path)
    + `item=12731&color=blue` -- 查询(query)



-----------------JavaScript-----------------


# Javascript

- childNodes 和 children 区别: childNodes包括元素节点和文本节点，而children只包括元素节点。

- js中的根对象是 Object.prototype 对象。Object.prototype 对象是一个空的对象，我们在 
  js 中遇到的每个对象，实际上都是从 Object.prototype 对象克隆而来的，
  Object.prototype 对象就是他们的原型。

- 关于在浏览器中获取 "当前页面的可视高度" 和 "文档的总高度"的jq和js方法总结:
  1. jq方法:
    + ```javascript
        // jq获取当前可视窗口的高度和宽度:
        $(window).height();  
        $(window).width();
  
        // jq获取文档高度和宽度
        $(document).height();  
        $(document).height();
      ```
  2. js方法:
    + ```javascript
       // js获取当前页面可视窗口的高度和宽度(前提 `<!DOCTYPE html>` 是这种写法，以前古老
       // 的写法除外) IE,FF,Chrome 统一是:
       document.body.clientHeight;
       // IE9+, FF, Chrome 确定浏览器窗口大小(可视窗口大小)有两个新属性:
       window.innerHeight;  window.innerWidth;
       // 获取文档的高度和宽度兼容IE8的写法是:
       Math.max(document.documentElement.clientHeight, document.body.scrollHeight, 
                  document.documentElement.scrollHeight);
      ```
- 确定一个值是哪种基本类型使用 typeof 操作符，确定一个值是那种引用类型使用 instanceof 操作符。
    + ```javascript
         typeof 123;   // "number"
         typeof false;   // "boolean"

         let o = {};
         let a = [];
         if (o instanceof Object) {}
         if (a instanceof Array) {}
      ```
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
- 关于 js 中 this 指向的讲解: 
   + `《Javascript设计模式与编程实践》/第一部分--基础知识/第2章-this_call_apply/第2章--this.md`
   + 要分清楚 this 和 作用域 Scope 之间的区别， this 是当前对象的指向问题，Scope 是作用域
    （全局作用域 和 本地作用域）的问题，Scope 讲解见:
        - `《深入理解JavaScript系列》--汤姆大叔/12-1_理解JavaScript的Scope.md`
        - `《深入理解JavaScript系列》--汤姆大叔/12-变量对象(Variable Object).html`
        - `深入理解JavaScript系列》--汤姆大叔/13-this/13-this.html`
- 箭头函数的特性:
    + (1) 默认绑定外层 this
        + 示例见: 
    + (2) 不能用 call 方法修改里面的 this
    + (3) 没有 this、super、arguments 和 new.target 绑定。
    + (4) 不能通过 new 关键字调用
    + (5) 没有原型
    + (6) 不支持 arguments 对象
    + (7) 不支持重复的命名参数






## 第 7 章 -- 函数表达式
> **7.1 递归:**
  ```javascript
      // 递归: 用命名函数表达式实现递归。可以在严格模式和非严格模式下都行得通。
      let factorial = (function f(num) {
          if (num <= 1) {
              return 1;
          } else {
              return num * f(num - 1);
          }
      });
      console.log(factorial(4));      // 24
  ```

## 第 10 章 -- DOM
- DOM (Document Object Model 文档对象模型) 是针对 HTML 和 XML 文档的一个 API (应用
  程序编程接口)。DOM 描绘了一个层次化的节点树，允许开发人员添加、移除 和 修改页面的某一部分。
> 10.1.1 Node 类型
- DOM1 级定义了一个 Node 接口，该接口将由 DOM 中的所有节点类型实现。这个 Node 接口在 js
  中是作为 Node 类型实现的；js 中的所有节点类型都继承自 Node 类型，因此所有节点类型都共享
  着相同的基本属性和方法。
- 每个节点都有一个 nodeType 属性，用于表明节点的类型。节点类型由在 Node 类型中定义的下列
  12 个数值常量来表示，任何接地啊你类型都必居其一:
    + Node.element_node(1);
    + Node.attribute_node(2);
    + Node.text_node(3);
    + Node.cdata_section_node(4);
    + Node.entity_reference_node(5);
    + Node.entity_node(6);
    + Node.processing_instruction_node(7);
    + Node.comment_node(8);
    + Node.document_node(9);
    + Node.document_type_node(10);
    + Node.document_fragment_node(11);
    + Node.notation_node(12); 



> **16.cloneNode() 方法**
-  cloneNode() 方法不会复制添加到 DOM 节点中的 JavaScript 属性，例如事件处理程序等。
    这个方法只复制特性、（在明确指定的情况下也复制）子节点，其他一切都不会复制。


> **21.mouseover和mouseenter的区别：(js高级 13.4.3节)**
- mouseenter ：在鼠标光标从元素外部首次移动到元素范围之内时触发。这个事件不冒泡，而且在
   光标移动到后代元素上不会触发。
- mousemove ：当鼠标指针在元素内部移动时重复地触发。



> **24.JSON 对象有两个方法:**
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


> **28."标准的"对象,和函数  (17-5-21)**
  - (1.) 一个 Javascript 对象就是键和值之间的映射。键是一个字符串（或者 Symbol） ，
       值可以是任意类型的值。 这使得对象非常符合 哈希表。
  - (2.) 函数是一个附带可被调用功能的常规对象。(觉得这个解说很好)


> **合并2个数组到对象中，再把对象推入到数组中**
- ```javascript
    // 合并2个数组到对象中，再把对象推入到数组中
    var types3 =  [];
    var arr1 = [ '公司类合作', '个人类合作', '混合类合作' ];
    var arr2 = [ 20, 21, 22 ];
    var obj = {};
    for(var i=0; i<arr1.length; i++){
        obj.label = arr1[i];
        obj.value = arr2[i];
        types3.push(obj);
    }
    console.log(types3);
  ```


> **33.日期格式化**
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


> **35、银行卡添加和删除空格**
 - 见示例: js-sundry-goods\JS--方法总结\2019\20190218--表单数字添加空格.html


> **Array.prototype.**
 - 1、将 arguments (类数组对象)转换为数组, 或者把 NodeList 对象转换为数组(比如一组li):
    + `Array.prototype.slice.call(arguments);`
 - 2、取得 arguments 类数组的第一项:
    + `Array.prototype.shift.call(arguments);`
 - 3、取得 arguments 类数组除去第一项剩余的项:
    + `Array.prototype.slice.call(arguments, 1);`
    + (传入参数 1 表示被返回的数组包含从第二个参数开始的所有参数)


> **localStorage 对象**
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


> **Node.js 和 ES6 导入导出:**
- Node.js 导入 `require()`, 导出 `exports || module.exports`
    + ```javascript
        // 1. 导出  exports || module.exports
         let funName = function () {
             return "The nam is ....";
         };
         exports.funName = funName;
        
         module.exports = { a: 2 };
        
        // 2. 导入: require 一個模块，赋值给变量
         let foo = require("./foo.js");
         console.log(foo.funName());
        
         console.log( foo.a );
      ```

- ES6 导入 import， 导出 export
    + ```javascript
        // ---------------export.js
        
        // 0.导出基本语法见:
        // 13th chapter--用模块封装代码\1.export导出.js
        
        // 1. 导出默认值 :
        // (1). 导出一个函数: 由于函数被模块所代表，因而它不需要一个名称。
        export default function (num1, num2) {
           return num1 + num2;
        }
        
        // (2). 导出一个对象 ( Vue 框架中用的都此写法 )
        export default {
           // 实际上这个 name 属性不是必须的，原因同上。
           name: "App",
           components: {
               BaseInputText, TodoListItem
           },
           data () {
               return {
                   newTodoText: "",
                   odos: []
               }
           },
           methods: {
               addTodo () {},
               removeTodo (idToRemove) {}
           }
        }
        
        // -----------import.js
        // 0. 导入基本语法见:
        // 13th chapter--用模块封装代码\2.import导入.js
        
        // 1.导入默认值:
        import BaseInputText from "./BaseInputText.vue";
        import TodoListItem from "./TodoListItem.vue";
      ```
      
      
> **40. 客户区坐标位置 ( clientX 和 clientY ):**
  + 鼠标事件都是在浏览器视口中特定位置上发生的。这个位置信息保存在事件对象的 clientX 和 
    clientY 属性中。
    所有浏览器都支持这两个属性，他们的值标识事件发生时鼠标指针在视口中的水平和垂直坐标。
     event.clientX , event.clientY
  + ![clientX and clientY](./images/clientX%20and%20clientY.png)


> **41 上滑显示错误弹框**
 - ```javascript
	let errBoxPosTop = getPosition(errBoxEleConfig.errorBoxWall).top;
	let scrollTop = document.documentElement.scrollTop 
	    || document.body.scrollTop;
	function scrollBarRoll() {
	  scrollTop = scrollTop - 12;
	  window.scrollTo(0, scrollTop);
	  if (parseInt(scrollTop) > parseInt(errBoxPosTop)) {
		  requestAnimationFrame( scrollBarRoll );
	  }
	  if (parseInt(scrollTop) < parseInt(errBoxPosTop) ) {
		  window.scrollTo(0, 0);
	  }
	}
	scrollBarRoll();
   ```


> **42 js 经典原型图**
 <div style="overflow: hidden; width: 600px; height: 700px;">
    <img style="width: 100%; height: 100%; " src="./images/JS-原型图.png">
 </div>


> **构造函数的方法内可以动态给构造函数添加属性**
- ```javascript
    // Vue-study\Vue--文档+语法\Vue-双向数据绑定\Vue双向绑定-基础示例讲解
    // \Vue双向数据绑定原理-2.html
    // 订阅者 Watcher
    function Watcher (vm, node, name, nodeType) {
        Dependence.target = this;
        this.name = name;
        this.node = node;
        this.vm = vm;
        this.nodeType = nodeType;

        // 函数内调用 update() 方法，给节点赋值
        this.update();

        Dependence.target = null;
    }
    Watcher.prototype = {
        update: function () {
            this.get();
            if (this.nodeType === "text") {
                this.node.nodeValue = this.value;
            }
            if (this.nodeType === "input") {
                this.node.value = this.value;
            }
        },
        get: function () {
            // 在方法内给构造函数添加 value 属性
            this.value = this.vm[this.name];
        }
    };
  ```

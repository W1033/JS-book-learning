# DOM 元素的特性(`attribute`) 和 属性(`property`)

- [参考文章](https://www.cnblogs.com/wangfupeng1988/p/3631853.html)

## 目录(Catalog)
1. 介绍 `特性(attribute)` 和 `属性(property)`
2. 对比 `通过对象属性访问特性` 和 使用 `getAttribute` 获取元素 `特性` 的异同.



## 生词(New Words)


## 内容(Content)
> Important Hint: DOM 元素上的 `特性(attribute)` $\supset$ `属性(property)`.

### 1. 介绍 `特性(attribute)` 和 `属性(property)`
- 在同级目录《JavaScript高级程序设计》第 6 章的 `6.1.1 属性类型` 中有这样一段话:
    + ECMA-262 第 5 版在定义只有内部才用的 `特性(attribute)` 时,
      描述了 `属性(property)` 的各种特征. ECMA-262 定义这些特性是为了实现
      JavaScript 引擎用的, 因此在 JavaScript 中不能直接访问它们.
      为了表示**特性是内部值**, 该规范把它们放在了两对儿方括号中,
      例如 `[[Enumerable]]`. 尽管 ECMA-262 第 3 版的定义有些不同,
      但本书只参考第 5 版的描述. 
- 这段话中的 `定义只有内部才用的 特性(attribute) 时, 描述了 属性(property) 的各种特征`
  , 想表达的是什么意思? 不要着急, 我接着在 《JavaScript高级程序设计》的第 10 章
  `10.1.3 Element 类型中`(P265) 找到了一段这样的话来回答这个问题:
    + 任何元素的所有特性(attribute), 也都可以通过 DOM
      元素本身的属性(property)来访问.... 不过,
      只有公认的(非自定义的)特性才会以属性的形式添加到 DOM 对象中.
      (tip: DOM 的详细知识参见 《JavaScript高级程序设计》的第 10 章.)
  
  通过上面 2 段的回答, 是不是理解了什么是 `特性(attribute)` 和 `属性(property)`?
  简单回答就是: 在 `DOM (Document Object Model 文档对象模型)`
  对象中任何元素的公认特性(attribute), 都可以通过元素本身的属性(property)来访问,
  但是这里有一个前提, 必须是公认的特性才可以, 开发人员自定义的特性除外.
- 在上面的参考文章中, 作者说: "其实 Attribute 和 Property 这两个单词, 翻译出来都是
  `属性`, 《JavaScript高级程序设计》书中翻译为 `特性` 和 `属性` 是为了表示区分."
  我觉得这种说法虽然不太严谨, 但也不算错...

### 2. 对比 `通过对象属性访问特性` 和 使用 `getAttribute` 获取元素 `特性` 的异同.
- 在 《JavaScript高级程序设计》第 10 章的 `P264` 页, 这样写到:
    + 每个元素都有一或多个特性, 这些特性的用途是给出相应元素或其内容的附加信息.
      操作特性的 DOM 方法主要有 3 个: `getAttribute()`, `setAttribute()`,
      和 `removeAttribute()`. 这些方法可以针对任何特性使用, 包括那些以 HTMLElement
      类型属性的形式定义的特性.
- 我们通过下面的示例, 来讲解特性和属性的异同:
  ```html
    <!-- 特性和属性 -->
    <div id="myDiv" class="bd" title="my div element"
        lang="en" dir="ltr" title1="divTitle1"
        style="width: 200px;" onclick="clickEvent()">100</div>
    
    <script>
        const div = document.getElementById('myDiv');

        function clickEvent() {
            console.log('你触发了点击事件')
        }
    </script>
  ```
- (1) 先来看这 2 两种方式, 输出相同结果的情形:
  ```js
    // Output: "myDiv"
    console.log('div.id: ', div.id);       
    console.log('div.getAttribute("id"): ', div.getAttribute('id'));

    // - Notice: 通过对象属性访问特性的 `class` 时, 要使用 `className`;
    //   而通过 `getAttribute()` 方法获取特性值时,
    //   传入的特姓名和实际的特姓名相同.
    // Output: "bd"
    console.log('div.className: ', div.className); 
    console.log('div.getAttribute("class"): ', div.getAttribute('class'));

    // Output: "my div element"
    console.log('div.title: ', div.title);  
    console.log('div.getAttribute("title"): ', div.getAttribute('title'));

    // Output: "en"
    console.log('div.lang: ', div.lang);    
    console.log('div.getAttribute("lang"): ', div.getAttribute('lang'));

    // Output: "ltr"
    console.log('div.dir: ', div.dir);      
    console.log('div.getAttribute("dir"): ', div.getAttribute('dir'));
  ```
- (2) 再来看这 2 种方式的不同:
    + 1): 通过对象属性访问特性的方法不能取到我们自定义的 `特性`(title1)值,
      因为自定义的特性不是公认的特性.
      ```js
        console.log(div.title1);                    // undefined

        console.log(div.getAttribute('title1'));    // "divTitle1"
      ```
    + 2): 《JavaScript高级程序设计》`P265`: 有 2 类特殊的特性, 它们虽然有对应的属性名,
      但属性的值与通过 `getAttribute()` 返回的值并不相同. 
        - (1) 第一类特性就是 `style`, 用于通过 CSS 为元素指定样式. 在通过
          `getAttribute()` 访问时, 返回的 `style` 特性值中包含的是 **CSS 文本**,
          而通过属性来访问它则会返回一个对象. 由于 style
          属性是用于以编程方式访问元素样式的(`12.2.1 访问元素的样式`),
          因此并没有直接映射到 style 特性.
          ```js
            // - 输出的内容是 `CSSStyleDeclaration` 接口, 这个接口是一个对象, 
            //   它是一个 CSS 属性键值对的集合.它暴露了样式信息和各种与样式相关的方法和属性.
            //   控制台输出大致样式如下:
            //   CSSStyleDeclaration {
            //      cssText: "width: 200px;",
            //      length: 1,
            //      parentRule: null,
            //      cssFloat: "",
            //      0: "width",
            //      alignContent: "",
            //      alignItems: "",
            //      ...
            //   }
            console.log('div.style: ', div.style);

            console.log(div.getAttribute('style'));  // "width: 200px;"
          ```
        - (2) 第二类与众不同的特性是像 `onclick` 这类的事件处理程序.
          当在元素上使用时, `onclick` 特性中包含的是 JavaScript 代码, 
          如果通过 `getAttribute()` 访问, 则会返回相应代码的字符串. 而在访问
          `onclick` 属性时, 则会返回一个 JavaScript 函数（如果未在元素中指定相应特性,
          则返回 null）. 这是因为 `onclick`
          及其他事件处理程序属性本身就应该被赋予函数值.
          由于存在这些差别, 在通过 JavaScript 以编程方式操作 DOM 时, 
          开发人员经常不使用 `getAttribute()`, 而是只使用对象的属性. 
          只有在取得自定义特性值的情况下, 才会使用 `getAttribute()` 方法.
          
          ```js
            // - `div.onclick` 输出上面定义的 clickEvent 函数. 
  console.log('div.onclick: ', div.onclick);
          
            console.log(div.getAttribute('onclick'));   // "clickEvent()"
        ```
- (3) 我们也可以使用 `attributes` 属性来取得元素上的所有特性:
  ```js
    // {0: id, 1: class, 2: lang, 4: dir, 5: title1, 6: style,
    //  7: onclick, id: id, class: class, title: title, lang: lang,
    //  dir: dir, title1: title1}
    console.log(div.attributes);
  ```
  
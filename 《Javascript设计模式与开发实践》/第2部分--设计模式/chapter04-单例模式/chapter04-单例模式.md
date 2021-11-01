# 第 4 章 单例模式

## 目录 (Catalog)
- 4.1 实现单例模式
- 4.2 透明的单例模式 
- 4.3 用代理实现单例模式
- 4.4 JavaScript 中的单例模式
- 4.5 惰性单例
- 4.6 通用的惰性单例
- 4.7 小结


## 生词 (New Words)
- **singleton ['sɪŋɡltən] --n.独生子; 单身; 单例模型**
    + How to educate the singleton caused many arguments in China.  
      怎样培养好独生子女在中国引发了许多辩论.
    + This woman is probably the UK's most famous singleton.  
      那个女人可能是英国最有名的单身了.



## 内容 (Content)
- 单例模式的定义是： 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
- 单例模式是一种常用的模式，有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中
  的 window 对象等。在 JavaScript 开发中，单例模式的用途同样非常广泛。试想一下，
  当我们单击登录按钮的时候，页面中会出现一个登录浮窗，而这个登录浮窗是唯一的，无论单击
  多少次登录按钮，这个浮窗都只会被创建一次，那么这个登录浮窗就适合用单例模式来创建。
### 4.1 实现单例模式

### 4.2 透明的单例模式 

### 4.3 用代理实现单例模式
- 通过代理类来实现一个单例模式的编写, 以 4.2 的代码为基础: 
  ```js
    let CreateDiv = function(html) {
        this.html = html;
        this.init();
    };
    CreateDiv.prototype.init = function() {
        let div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    };
    // - 接下来引入代理类 proxySingletonCreateDiv: 现在我们把负责管理单例的逻辑
    //   移到了代理类 proxySingletonCreateDiv 中。这样一来， CreateDiv 就变成了
    //   一个普通的类，它跟 proxySingletonCreateDiv 组合起来可以达到单例模式的效果.
    // - 本例是缓存代理的应用之一，在第 6 章中，我们将继续了解代理带来的好处。
    let proxySingletonCreateDiv = (function() {
        let instance;
        return function(html) {
            if (!instance) {
                instance = new CreateDiv(html);
            }
        }
    })();
    let a = new proxySingletonCreateDiv('sven1');
    let b = new proxySingletonCreateDiv('sven2');
    console.log(a === b);
  ```

### 4.4 JavaScript 中的单例模式
- 前面提到的几种单例模式的实现，更多的是接近传统面向对象语言中的实现，单例对象
  从 “类” 中创建而来。在以类为中心的语言中，这是很自然的做法。
  **比如在 Java 中，如果需要某个对象, 就必须先定义一个类，对象总是从类中创建而来的.**
- 但 JavaScript 其实是一门**无类 (class-free)** 的语言, 也正因为如此, 生搬单例模式
  的概念并无意义. 在 JavaScript 中创建对象的方法非常简单，既然我们只需要一个“唯一”的
  对象，为什么要为它先创建一个“类”呢？这无异于穿棉衣洗澡，传统的单例模式实现在 
  JavaScript 中并不适用。
- 单例模式的核心是 `确保只有一个实例, 并提供全局访问.`
- 全局变量不是单例模式，但在 JavaScript 开发中，我们经常会把全局变量当成单例来使用。
  例如：`var a = {};`

### 4.5 惰性单例

### 4.6 通用的惰性单例
- 4.5 中的代码是一个可用的惰性单例，但是这段代码仍然违反单一职责原则，创建对象和
  管理单例的逻辑都放在 createLoginLayer 对象内部。
- 如果我们下次需要创建页面中唯一的 iframe, 或者 script 标签，用来跨域请求数据，
  就必须得如法炮制，把 createLoginLayer 函数几乎照抄一遍。
- 我们需要把不变的部分分离出来，先不考虑创建一个 div 和 iframe 有多少差异, 管理单例
  的逻辑其实完全可以抽象出来，这个逻辑始终是一样的: *用一个变量来标志是否创建过对象,**
  **如果是，则在下次直接返回这个已经创建好的对象.* 描述代码如下:
  ```js
    let obj;
    if (!obj) {
        obj = xxx;
    }
  ```
- 现在我们就如何管理单例的逻辑从原来的代码总抽离出来，这些逻辑被封装在 getSingle
  函数内部，创建对象的方法 fn 被当成参数动态传入 getSingle 函数:
  ```js
    let getSingle = function(fn) {
        let result;
        return function() {
            // - Tip: getSingle() 方法调用时, 把 function() 匿名函数推入到
            //   全局执行环境中(window), 
            console.log('this:', this); // window
            return result || result.apply(this, argument);
        }
    }
  ```
- 接下来将用于创建登录浮窗的方法用参数 fn 的形式传入 getSingle，我们不仅可以传入
  createLoginLayer，还能传入 createScript、createIframe、createXhr 等. 
  之后再让 getSingle 返回一个新的函数，并且用一个变量 result 来保存 fn 的计算结果.
  result 变量因为身在闭包中，它永远不会被销毁。在将来的请求中，如果 result 已经被赋值,
  那么它将返回这个值。代码如下:
  ```js
    let createLoginLayer = function() {
        let div = document.createElement('div');
        div.innerHTML = "我是登录弹框";
        div.style.display = 'none';
        div.className = 'layer';
        document.body.appendChild(div);
        return div;
    };
    let createSingleLoginLayer = getSingle(createLoginLayer);
    document.getElementById('login').addEventListener('click', function(){
        let layer = createSingleLoginLayer();
        layer.style.display = 'block';
    }, false);

    // 我们在试试创建唯一的 iframe 用于动态加载第三方页面:
    let createSingleIframe = getSingle(function() {
        let iFrame = document.createElement('iframe');
        document.getElementById('iframe').appendChild(iFrame);
        return iFrame;
    });

    document.getElementById('login').addEventListener('click', function(){
        let loginLayer = createSingleIframe();
        loginLayer.style.width = "100%";
        loginLayer.style.height = "100%";
        loginLayer.src = 'https://baidu.com';
    }, false)
  ```
- 在这个例子中, 我们把**创建实例对象的职责** 和 **管理单例的职责** 分别放置在 2
  个方法里, 这 2 个方法可以独立变化而互不影响, 当它们连接在一起的时候, 就完成了创建
  唯一实例对象的功能, 看起来是一件挺奇妙的事情.
- 这种单例模式的用途远不止创建对象, 比如我们通常渲染完页面中的一个列表之后, 接下来要给
  这个列表绑定 click 事件, 如果是通过 ajax 动态往列表里追加数据, 在使用事件代理的
  前提下, click 事件实际上只需要在第一次渲染列表的时候被绑定一次, 但是我们不想去判断
  当前列表是否是第一次渲染, 如果借助于 jQuery, 我们通常选择节点绑定 one 事件, 但是
  如果利用 getSingle 函数, 也能达到一样的效果, 代码如下: 
  ```js
    let bindEvent = getSingle(function() {
        document.getElementById('div1').onclick = function() {
            console.log('click');
        };
        return true;
    });
    let render = function() {
        console.log('开始渲染列表');
        bindEvent();
    };
    render();
    render();
    render();
    // - 可以看到, render 函数和 bindEvent 函数分别执行了 3 次, 但 div 实际上
    //   只被绑定了一次事件.
  ```

### 4.7 小结
- 单例模式是我们学习的第一个模式，我们先学习了传统的单例模式实现，也了解到因为语言
  的差异性，有更适合的方法在 JavaScript 中创建单例。这一章还提到了代理模式和
  单一职责原则，后面的章节会对它们进行更详细的讲解。
- 在 getSinge 函数中，实际上也提到了闭包和高阶函数的概念。单例模式是一种简单但非常实
  用的模式，特别是惰性单例技术，在合适的时候才创建对象，并且只创建唯一的一个。更奇妙的
  是，创建对象和管理单例的职责被分布在两个不同的方法中，这两个方法组合起来才具有单例模
  式的威力。

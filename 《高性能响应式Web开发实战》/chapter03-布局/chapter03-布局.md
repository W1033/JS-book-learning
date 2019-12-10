# 第 3 章 -- 布局 (layout)

## 本章目录 (Catalog)
- 3.1 写在编码前的话
    + 3.1.1 写出好的代码 
    + 3.1.2 代码的浏览器适配问题
    + 3.1.3 仰望星空与脚踏实地
- 3.2 全局样式
- 3.3 无懈可击的导航栏
    + 3.3.1 桌面端
    + 3.3.2 移动端导航栏
- 小结    

## 生词 (New words)
- **quirk [kwɜːk] --n.怪癖; 俏皮话; 急转, 剧变**
    + by a quirk of fate. 命运的剧变
    + a quirk of fate. 命运难料
    + All men have their own quirks and tiwsts.  
      人人都有他们自己的怪癖和奇想.
    + One of his quirks is that he refuses to travel by train.  
      他的怪癖之一是不愿乘火车旅行.
- **mode [məʊd] --n.模式, 方式, 状态**
    + a mode of life. 生活方式
    + a mode of expression. 一种表达方式
    + all the mode. 非常流行
    + an expensive mode of living. 奢侈的生活方式.


## 本章内容 (Content)
### 3.1 写在编码前的话
#### 3.1.1 写出好的代码 
- Bob Nystrom 在他的叙述游戏开发中的设计模式的图书《Game Programming Patterns》
  中有一段关于程序架构的描述我认为是非常精妙的:  
  The first key piece is that architecture is about change. Someone has
  to be modifying the codebase. If no one is touching the code -- whether
  because it's perfect and complete or so wretched no one will sully their
  editor with it -- its design is irrelevant. The measure of a design 
  is how easily it accommodates changes.  
  译文如下:  
  关键点是架构存在的意义是为了适应变化. 总会有人更新代码. 如果没有人再碰代码 -- 无论是
  因为代码已经完美, 还是项目已完成, 或是代码过于糟糕而没有人愿意再编辑, 那么也就不存在
  设计的问题了. 衡量设计优劣的标尺是它适应变化的难易程度.
- 他认为`架构存在的意义是为了适应变化`. 如果你编写的程序是一次性的, 不会再有程序员修改代码,
  那么也就谈不上设计, 程序架构的好坏也就无所谓了. 所以衡量架构设计的方法是判断它能够多快地
  适应变化. 程序架构设计的关键目标在于: `最小化修改程序所需要的获取信息.`  
  To me, this is a key goal of software architecture: minimize the amount
  of knowledge you need to have in-cranium before you can make progress.
- 换而言之，`解耦(decouple)`。当开发人员在修改 A 模块时，最好的情况是无需对 B、C、D 
  模块有任何的了解。虽然《Game Programming Patterns》整本书都是在用 C++ 语言描述
  游戏开发中的设计模式，但解耦这个原则是贯穿所有设计模式的主题，同样也适用于我们的编码
  (即使是CSS与HTML)当中。在讨论如何开发前端单页面应用的开源书《SinglePageAppBook》
  中，作者 Mikito Takada 给出了他认为可维护代码的3个特征:
    + ●易被理解和挑错;
    + ●易被测试:
    + ●易于重构。
- 并给出了难以维护的代码的基本特征:
    + ●拥有许多依赖，使模块难以理解和独立测试;
    + ●总是访问全局作用域下的数据; 
    + ●代码存在副作用，没法被初始化和被重复使用:
    + ●接口众多且不隐藏实现细节，难以在不修改其他组件的情况下重构。
- 不难看出，反复被提及的代码易于被重构、被测试和被理解，是最小成本拥抱变化的具体体现。如果
  说前一条解耦的原则要求的是从宏观上审视程序设计，那么以上这几条准则是从细节上把握独立的
  代码片段质量和功能模块的设计。

#### 3.1.2 代码的浏览器适配问题
#### 3.1.3 仰望星空与脚踏实地
- 在考察浏览器对于技术兼容性时, 我们会反复用到 2 个在线资源:
    + `http://caniuse.com`
    + `http://www.quirksmode.org/compatibility.html`

### 3.2 全局样式
- 首先需要对页面配置全局样式, 这些样式通常是影响站点风格的页面级别的代码. 把这些代码集中
  起来做统一的规划和管理, 来解决一些开发中可能遇到的差异性问题.
- (1) 视口标签
    + 首先, 要在 <head> 中引入第 2 章中的用于定义视口的 <meta> 标签. 页面应当依据
      设备的系统分辨率宽度进行渲染, 并禁止设备对页面的默认缩放:  
      ```html
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </head>
      ```
- (2) 重置样式
- (3) 自定义全局样式

### 3.3 无懈可击的导航栏
#### 3.3.1 桌面端
#### 3.3.2 移动端导航栏

### 小结   
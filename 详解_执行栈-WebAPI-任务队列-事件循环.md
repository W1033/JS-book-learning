# 详解:执行栈-WebAPI-任务队列-事件循环
- Hint: 本文内不包含  `变量对象`, `this`, 
  `引用类型 (Reference Type)`, `作用域链 (Scope Chain)`... 这些概念的讲解, 
  如果不理解可以 Google 查找 `汤姆大叔--《深入理解JavaScript系列》`

> 参考文章
- 浏览器事件循环机制(event loop)](https://juejin.im/post/5afbc62151882542af04112d#comment)
- [DOM，javascript，Web API之间的关系——onclick 引起的思考与调研](https://www.cnblogs.com/surfer/p/9724933.html)


## 文章目录 (Catalog)
- JavaScript 单线程的由来
- JS 引擎的主要组成
- 执行栈 (Call Stack)
- 浏览器中的 事件循环(event loop) 是什么?
- Web API 是什么?
- 任务队列/回调队列(Callback Queue/ Event Queue/ Message Queue)
- 宏任务(macro-task)和微任务(micro-task)
- event loop 中的 Update the rendering (更新渲染)



## 生词 (New Words)
- **execution [ˌeksɪ'kjuːʃ(ə)n] --n.执行，实行**
    + execution context 执行上下文
    + execution command 执行指令
    + break execution 中断执行


## 文章内容(Content)

### JavaScript 单线程的由来

### JS 引擎的主要组成

### 执行栈 (Call Stack)

### 浏览器中的 事件循环(event loop) 是什么?

### Web API(Web Application Programming Interface) Web 应用编程接口
Web API 是什么? : Web 应用编程接口 (Web API) 用于执行各种任务, 例如操作 DOM, 
播放音频或视频以及生成 3D 图形.
- [Web API 接口参考](https://developer.mozilla.org/zh-CN/docs/Web/API) 列出了
  Web 开发时你能使用的所有对象类型(构造函数的实例).
    + 在使用 JavaScript 编写 Web 代码时, 有许多 Web API 可供调用. 以下是所有接口 
      (即对象类型) 的列表, 你可以在开发网站或 Web 应用程序时使用他们. (Web API 主要用于
      JavaScript, 但也可能有例外.)
    + 规范: 这是一个所有 API 的列表:
        - |字母排列|对应 API|
          |:------|:------|
          |A | `Ambient Light Events`|
          |B | `Background Tasks`<br>`Battery API`<br>`Beacon`<br>`Bluetooth API`<br>`Broadcast Channel API` |
          |C | `CSS Counter Styles`<br>`CSS Font Loading API`<br>`CSSOM`<br>`Canvas API`<br>`Channel Messaging API`<br>`Console API`<br>`Credential Management API`|
          |D | `DOM`|
          |E | `Encoding API`<br>`Encrypted Media Extensions`|
          |F | `Fetch API`<br>`File System API`<br>`Frame Timing API`<br>`Fullscreen API`|
          |G | `Gamepad API`|
          |H | `HTML Drag and Drop API`<br>`High Resolution Time`<br>`History API`|
          |I | `Image Capture API`<br>`IndexedDB`<br>`Intersection Observer API`|
          |J | |
          |K | |
          |L | `Long Tasks API`|
          |M | `Media Capabilities API`<br>`Media Capture and Streams`<br>`Media Session API`<br>`Media Source Extensions`<br>`MediaStream Recording`|
          |N | `Navigation Timing`<br>`Network Information API`|
          |O | |
          |P | `Page Visibility API`<br>`Payment Request API`<br>`Performance API`<br>`Performance Timeline API`<br>`Permissions API`<br>`Pointer Events`<br>`Pointer Lock API`<br>`Proximity Events`<br>`Push API`|
          |Q | |
          |R | `Resize Observer API`<br>`Resource Timing API`|
          |S | `Server Sent Events`<br>`Service Workers API`<br>`Storage`<br>`Storage Access API`<br>`Streams` |
          |T | `Touch Events`|
          |U | |
          |V | `Vibration API`|
          |W | `Web Animations`<br>`Web Audio API`<br>`Web Authentication API`<br>`Web Crypto API`<br>`Web Notifications`<br>`Web Storage API`<br>`Web Workers API`<br>`WebGL`<br>`WebRTC`<br>`WebVR API`<br>`WebVTT`<br>`Websockets API` |
          |X ||
          |Y ||
          |Z ||
    + 接口: 这是一个所有接口 (即对象类型) 的列表: 略
- [WebAPI 页](https://developer.mozilla.org/zh-CN/docs/WebAPI) 列出了所有
  你可以在 Web 应用中使用的通信, 硬件访问等 API.
    + WebAPI指一组设备兼容套件和访问接口，它允许Web应用及其内容访问设备硬件（比如
      电池状态或设备振动器），同时也可以获取设备上的数据 (比如日历或联系人等信息). 
      通过这些API，我们希望对Web应用进行扩展，实现过去只有专有平台才可以实现的功能。
- [Web API 事件参考](https://developer.mozilla.org/zh-CN/docs/Web/Events) 列出了
  你可以用于追踪和响应你的网页或应用的事件.

### 任务队列/回调队列(Callback Queue/ Event Queue/ Message Queue)

### 宏任务(macro-task)和微任务(micro-task)

### event loop 中的 Update the rendering (更新渲染)


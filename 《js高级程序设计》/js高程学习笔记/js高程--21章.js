/* Created on 2018/3/12. */

/**
 *  Ajax 技术的核心是 XMLHttpRequest 对象 (简称 XHR)
 *  IE7+ 之后的浏览器原生都支持 XMLHttpRequest 对象，所以不再写兼容函数
 */

// 21.1 XMLHttpRequest 对象
var xhr = new XMLHttpRequest();

// 21.1.1 XHR 的用法: 使用 XHR 对象时，要调用的第一个方法是 open(), 它接受 3 个参数:
// (1). 要发送的请求的类型 ("get", "post" 等)、
// (2). 请求的 URL、
// (3). 表示是否异步发送请求的布尔值。
// 例如: xhr.open("get", "example.php", false)。 这行代码回启东一个针对 example.php 的 get 请求。
// 有关这行代码，需要说明2点: 1.是 URL 相对于执行代码的当前页面(当然也可以使用绝对路径)；2.是调用 open()
// 方法并不会真正发送请求，而只是启动一个请求以备发送。 要发送特定的请求，必须调用 send() 方法：xhr.send(null)
// 如果不需要通过请求主体发送数据，则必须传入 null。


/**
 * ## 同源策略:
 * 同源策略是对 XHR 的一个主要约束，他为通信设置了 "形同的域、相同的端口、相同的协议"这一限制。
 * 试图访问上述限制之外的资源，都会引发安全错误，除非采用被认可的跨域解决方案。这个解决方案叫作 CORS
 * (Cross-Origin Resource Sharing, 跨域资源共享)， IE8 通过 XDomainRequest 对象支持 CORS，其他
 * 浏览器通过 XHR 对象原生支持 CORS。 图像 Ping 和 JSONP 是另外两种跨域通信的技术，但不如 CORS 稳妥。
 * Comet 是对 Ajax 的进一步扩展， 让服务器几乎能够实时地向客户端推送数据。实现 Comet 的手段主要有
 * 2个: (1)长轮询 (2) HTTP 流。 所有浏览器都支持长轮询，而只有部分浏览器原生支持 HTTP 流。 SSE (Server-
 * Sent Events， 服务器发送事件) 是一种 Comet 交互的浏览器 API，即支持长轮询，也支持 HTTP 流。
 * Web Sockets 是一种与服务器进行全双工、双向通信的信道。与其他方案不同，Web Sockets 不使用 HTTP 协议，
 * 而使用一种自定义的协议。这种协议专门为快速传输小数据设计。虽然要求使用不同的 Web 服务器，但却具有速度上的优势。
 * */
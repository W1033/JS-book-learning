// # 封装 ajax

// - 原生 ajax: Ajax (Asynchronous Javascript + XML) 的簡寫。Ajax 技術的核心是
//   XMLHttpRequest 對象(簡稱 XHR).這是由微軟首先引入的一個特性，其他瀏覽器後來都提供
//   了相同的實現。

// - 先规定使用方法
// let obj = {
//     url: 'xxx',
//     data: {key: value},
//     type: 'get/post',
//     success: function() {},
//     error: function() {}
// };


// 拼接 json
let spliceJson = function(data) {
    let arr = [];
    for (let name of data) {
        arr.push(name + '=' + data[name]);
    }

    // - 数组的 join() 方法 : 参数为一个用作分隔符的字符串，
    //   返回包含所有数组项的字符串。
    return arr.join('&');
};


// 发送 ajax 的前提条件: 1.域名、2.端口，3.协议 -- 都必须相同
/**
 * ## 注释：
 * - (1). XHR 对象，第一个调用的方法是 open(), 接受三个参数
 *   `xhr.open('get', 'data.txt', true);` [Tip: 第三个参数默认为 true]
 * - (2). 要发送请求必须调用 send() 方法。 send() 方法接收一个参数，
 *   即要作为请求主题发送的数据。调用 send() 之后，请求就会分派到服务器。
 */


let ajax = function(obj) {
    obj = obj || {};
    if (!obj.url) {return;}
    obj.data = obj.data || {};
    obj.type = obj.type || 'get';

    let timer = null;
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    switch(obj.type) {
        case 'get':
            // - (1)
            if (obj.data.length > 0) {
                xhr.open('GET', obj.url + '?' + spliceJson(obj.data));
            } else {
                xhr.open('GET', obj.url);
            }
            // - (2)
            xhr.send();
            break;
        case 'post':
            xhr.open('POST', obj.url, true);
            // - 使用 XHR 来模仿表单提交: 将 Content-Type 头部信息设置为
            //   application/x-www-form-urlencoded。
            xhr.setRequestHeader('Content-Type',
                'application/x-www-form-urlencoded');
            xhr.send(spliceJson(obj.data));
            break;
    }

    /**
     * - (1). 多数情况下我们都是发送异步请求，才能让 JavaScript 继续执行而不必等待响应。
     *   此时，可以检测 XHR 对象的 readyState 属性，该属性表示 请求/响应 过程的当前活动
     *   阶段。 这个属性可取的值如下：
     *   + 0: 未初始化。尚未调用 open()方法。
     *   + 1: 启动。已经调用 open()方法，但尚未调用 send()方法。
     *   + 2: 发送。已经调用 send()方法，但尚未接收到响应。
     *   + 3: 接收。已经接收到部分响应数据。
     *   + 4: 完成。已经接收到全部响应数据，而且已经可以在客户端使用了
     *
     * - (2). 在接收到响应后，第一步是检查 status 属性，以确定响应已经成功返回。一般
     *   来说, 可以将 HTTP 状态码作为返回的标志：
     *   + 200: 作为成功的标志。此时，responseText 属性的内容已经就绪。
     *   + 304：304状态码表示请求的资源没有被修改可以直接使用浏览器中缓存的版本。
     *
     * - (3). 在收到响应后，响应的数据会自动填充 XHR 对象的属性，相关属性如下:
     *   + <1> responseText: 作为相应主题被返回的文本。
     *   + <2> responseXML：如果响应的内容类型是"text/xml"或"application/xml"，
     *     这个属性中将保存包含着响应数据的 XML DOM 文档。
     *   + <3> status: 响应的 HTTP 状态。
     *   + <4> statusText: HTTP 状态的说明。
     */
    // - 处理返回数据。
    xhr.onreadystatechange = function () {
        // - (1)
        if (xhr.readyState === 4) {
            clearTimeout(timer);
            // - (2)
            if (xhr.status >= 200 && xhr.status < 300
                || xhr.status === 304) {
                // - (3)
                obj.success && obj.success(xhr.responseText);
            } else {
                obj.error && obj.error(xhr.status);
            }
        }
    }
};
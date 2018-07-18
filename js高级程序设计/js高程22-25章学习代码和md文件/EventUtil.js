//EventUtil对象封装的跨浏览器添加事件的代码(来自《javascript高级程序设计》)
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }, //添加跨浏览器的事件

    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }, //移除跨浏览器的事件

    getEvent: function (event) {
        return event ? event : window.event;
    }, //取得跨浏览器的事件event

    getTarget: function (event) {
        return event.target || event.srcElement;
    }, //取得事件的目标


    /*DOM通过 event 对象的 relatedTarget 属性提供了相关元素的信息。
     这个属性只对于 mouseover和 mouseout 事件才包含值；
     对于其他事件，这个属性的值是 null 。IE8及之前版本不支持
     relatedTarget属性，但提供了保存着同样信息的不同属性。
     在 mouseover 事件触发时，IE的 fromElement属性中保存了相关元素；
     在 mouseout 事件触发时，IE的 toElement 属性中保存着相关元素。
     （IE9支持所有这些属性。）*/
    getRelatedTarget: function (event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    }, //取得相关元素的方法

    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }, //取消事件的默认行为

    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }, //取消事件的进一步传播和冒泡

    getButton: function (event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },

    getCharCode: function (event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }, //取得字符编码


    getWheelDelta: function (event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    }, //取得鼠标滚轮事件

    /*要访问剪贴板中的数据，可以使用 clipboardData 对象：在 IE 中，
     这个对象是 window 对象的属性；而在 Firefox 4+、Safari 和 Chrome
     中，这个对象是相应 event 对象的属性。但是，在 Firefox、Safari 和
     Chorme 中，只有在处理剪贴板事件期间 clipboardData 对象才有效，
     这是为了防止对剪贴板的未授权访问；在 IE 中，则可以随时访问
     clipboardData 对象。为了确保跨浏览器兼容性，最好只在发生剪贴板事件期
     间使用这个对象。*/
    /* getData()用于从剪贴板中取得数据，它接受一个参数，即要取得的数据的格式。在 IE中，有两种数据格式： "text"和 "URL" 。在 Firefox、Safari 和 Chrome 中，这个参数是一种 MIME 类型；不过，可以用 "text" 代表"text/plain" 。*/
    getClipboardText: function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    }, //取得粘贴的内容
    /*， setData() 方法的第一个参数也是数据类型，第二个参数是要放在剪贴板
     中的文本。对于第一个参数，IE 照样支持 "text" 和 "URL" ，而 Safari 和
     Chrome 仍然只支持 MIME 类型。但是，与getData() 方法不同的是，Safari
     和 Chrome的 setData() 方法不能识别 "text" 类型。这两个浏览器在成功将文
     本放到剪贴板中后，都会返回 true ；否则，返回 false 。*/
    setClipboardText: function (event, value) {
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData) {
            window.clipboardData.setData("text", value);
        }
    }
};
//EventUtil对象封装的跨浏览器添加事件的代码


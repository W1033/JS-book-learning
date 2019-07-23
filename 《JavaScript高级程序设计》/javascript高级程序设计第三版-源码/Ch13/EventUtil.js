var EventUtil = {

    addHandler: function (element, type, handler) { //addHandler()方法：它的职责是视情况分别使用DOM0级方法
        if (element.addEventListener) {           //，DOM2级方法或IE方法来添加事件。
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    getButton: function (event) { //P374鼠标按钮
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

    getCharCode: function (event) { //取得字符编码 P381
        if (typeof event.charCode == "number") { //getCharCode()方法首先检查charCode属性是否包含数值（在
            return event.charCode; //不支持这个属性的浏览器中，值为undefined），如果是就返回该值，否则，就返回
        } else {                   //keyCode属性值。
            return event.keyCode;
        }
    },

    getClipboardText: function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },

    getEvent: function (event) {  //返回对event对象的引用。
        return event ? event : window.event;
    },

    getRelatedTarget: function (event) { //event对象的relatedTarget提供了在发生mouseover和mouseout时相关元
        if (event.relatedTarget) {       //素的信息。
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }

    },

    getTarget: function (event) {
        return event.target || event.srcElement; //返回事件的目标：事件的目标event.target, IE中为
    },                                          //event.srcElement

    getWheelDelta: function (event) { //鼠标滚动事件P376
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },

    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault(); //取消事件的默认行为 preventDefault()
        } else {
            event.returnValue = false;
        }
    },

    removeHandler: function (element, type, handler) { //移除之前用addHandler()方法添加的事件处理程序
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    setClipboardText: function (event, value) {
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData) {
            window.clipboardData.setData("text", value);
        }
    },

    stopPropagation: function (event) { //取消事件的进一步捕获或冒泡。如果bubbles为true，则可以使用这个方法
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

};
/*
    步骤一：首先获取页面上需要懒加载的图片元素
 */

// 首先规定所有懒加载的元素都必须拥有`lazy-element`这个class名称
var lazyElementClassName = "lazy-element";

// 其次，需要加载的图片地址`src`值存放在另一个`data-src`属性中
// 当脚本确定该图片需要被加载时，将从`data-src`属性中取得图片地址，赋值给`src`属性完成加载
// 所以一个基本的懒加载图片标签应该为:
// `<img class="lazy-element" data-src="./demo.jpg">`
var srcAttrName = "data-src";

// 通过`getElementsByClassName`方法取得页面上所有懒加载元素
// 请注意，通过`getElementsByClassName`获取的DOM元素的数据类型为`HTMLCollection`
// 虽然类似于数组可以被遍历，但是该数据类型不存在数组中用于操作元素的方法，
// 因为我们希望当一个懒加载元素完成加载后，就不再对其进行检测，踢出队列中
// 所以我们使用`Array.prototype.slice.call`方法将`HTMLCollection`转化为数组结构
var elements = Array.prototype.slice.call(
                document.getElementsByClassName(lazyElementClassName)
            );

/*
    步骤二：检测元素是否在可视区域内
    注意，这里只检测元素的纵向位置是否在可视区域内，
    可能出现元素纵向坐标在可视区域内，但横向仍然在屏幕之外，仍然不可见。
    但因为横向检测与纵向的检测原理一致，就不重复了
 */
// 检测元素是否在可视区域内
 function checkElementIsInViewport (elem) {

    // 根据quirksmode: http://www.quirksmode.org/mobile/tableViewport_desktop.html#t01
    // IE8及以下并不支持`window.innerHeight`
    // 所以要通过其他方式取得视口大小
    var viewportHeight = window.innerHeight 
                        || document.documentElement.clientHeight 
                        || document.body.clientHeight;

    var elemPos = elem.getBoundingClientRect();
    if (elemPos.top 
            && elemPos.top > 0 
            && elemPos.top <= viewportHeight) {

        return true;
    }
    return false;
}

// 该函数用于获取页面元素距页面顶部（非浏览器顶部，非视口顶部）距离
function getElemOffsetTop(el) {
    var top = el.offsetTop;

    // offsetParent兼容性良好
    // http://www.quirksmode.org/dom/w3c_cssom.html#offsetParent
    var parent = el.offsetParent;
    while (parent) {
        top += parent.offsetTop || 0;
        parent = parent.offsetParent;
    }
    return top;
}

function checkElementIsInViewport (elem) {
    var viewportHeight = window.innerHeight 
                        || document.documentElement.clientHeight 
                        || document.body.clientHeight;

    if (elem.getBoundingClientRect) {
        var elemPos = elem.getBoundingClientRect();
        if (elemPos.top && elemPos.top > 0 && elemPos.top <= viewportHeight) {
            return true;
        }
        return false;
    // 如果用户浏览器不支持getBoundingClientRect
    } else {
        var scrollY = window.pageYOffset 
                        || window.scrollY
                        || document.documentElement.scrollTop
                        || document.body.scrollTop;

        var offsetTop = getElemOffsetTop(elem);
        if (offsetTop > scrollY && offsetTop < scrollY + viewportHeight) {
            return true;
        }
        return false;
    }       

}

// 加载图片
function loadElement (elem) {
    var srcURL = elem.getAttribute(srcAttrName);
    elem.src = srcURL;
}

// 调度函数
function checkAvailable () {
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];

        // 一旦检测发现进入可视区域
        if (checkElementIsInViewport(el)) {
            // 则加载图片
            loadElement(el);

            // 并将该元素踢出队列
            elements.splice(i--, 1);
        }
    }
}

// 绑定至滚动函数中
window.onscroll = function () {
    checkAvailable();   
}
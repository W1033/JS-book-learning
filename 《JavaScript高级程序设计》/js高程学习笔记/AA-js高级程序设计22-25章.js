/** Created on 2017/3/7 */

/**22.1.2 作用域安全的构造函数**/
function Polygon(sides) {
    if (this instanceof Polygon) {
        this.sides = sides;
        this.getArea = function () {
            return 0;
        };
    } else {
        return new Polygon(sides);
    }
}

function Rectangle(width, height) {
    Polygon.call(this, 2);
    this.width = width;
    this.height = height;
    this.getArea = function () {
        return this.width * this.height;
    };
}

Rectangle.prototype = new Polygon();  //这一点不明白 返回去看书

var rect = new Rectangle(5, 10);
console.log(rect.sides);   //2

/**-----------------------------------------------------------------**/


/** 22.1.4 函数绑定 **/
/** Javascript库实现了一个可以将函数绑定到指定环境的函数，这个函数一般都叫bind():
 * 这个函数接受[一个函数function(方法也是函数)]和[一个环境(context)]， 并返回一个在给定环境中调用给定函数的函数，
 * 并且将所有参数原封不动的传递过去。语法如下**/
//<input type="button" class="theBut" value="函数绑定">
function bind(fn, context) {
    return function () {
        return fn.apply(context, arguments);
    }
}

var handler = {
    message: "事件绑定",
    handleClick: function (event) {
        alert(this.message);
    }
};
//var btn = getClassName("theBut")[0];
//EventUtil.addHandler(btn, "click", bind(handler.handleClick, handler));

/**学完下一节的函数柯里化之后，改写bind()函数为更复杂的bind()函数如下**/
function bindOver(fn, context) {
    var args = Array.prototype.slice.call(arguments, 2);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(context, finalArgs)
    }
}

var handler2 = {
    message: "事件绑定",
    handleClick: function (event) {
        alert(this.message + " " + event.type);
    }
};
//var btn = getClassName("theBut")[0];
//EventUtil.addHandler(bindOver, "click", bind(handler2.handleClick, handler));


/**-----------------------------------------------------------------**/

/** 22.1.5 函数柯里化 **/
/**与函数绑定紧密相关的主题是函数柯里化（function currying），它用于创建已经设置好了一个或多个参数的函数。
 * 函数柯里化的基本方法和函数绑定是一样的：使用一个闭包返回一个函数。两者的区别在于，当函数被调用时，返回的函数还需要设置一些传入的参数**/

function curry(fn) {
    /* 对arguments对象使用 Array.prototype.slice() 方法可以将其转换为数组。丢弃第一个参数，因为第一参数就是将要柯里化的函数。*/

    /* 为了获取第一个参数之后的所有参数，在arguments对象上调用了slice()方法。并传入参数1表示被返回的数组包含从第二个参数
     * 开始的所有参数。然后args数组包含了来自外部函数的参数。在内部函数中，创建了innerArgs数组来存放所有传入的参数
     * (又一次用到了slice())有了存放来自外部函数和内部函数的参数数组后，就可以使用concat()方法将他们组合为finalArg,
     * 然后使用apply()将结果传递给该参数。注意这个函数并没有考虑到执行环境，所以调用apply()时第一个参数是null。*/
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    };
    //curry()函数的主要工作就是将被返回函数的参数进行排序。[第一个参数是要进行柯里化的函数]，[其他参数是要传入的值]。   /
}

/**-----------------------------------------------------------------**/










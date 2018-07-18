/**Created by Administrator on 2017/6/3.*/

/* 注释(1.)这个fnTest的目的就是为了验证 class method 中是否使用了 "_super()" 调用. 这种技术叫做 " function decompilation(函数反编译)" 也叫做
    "function serialisation(函数序列化)"， Function serialisation 是在一个函数被转换成字符串时发生的. 现在很多浏览器都支持 toString 方法。
    测试 Function serialisation, fnTest 使用一个匿名函数 function(){xyz;} 设置内容为 "xyz", 在转变成字符串后使用正则对 "xyz" 进行查找. 它将返回true
    (如果浏览器支持 function serialisation) 因为 函数将转变成字符串所以 "xyz" 也民属于字符串的一部分. 在这个例子中 fnTest 将返回 "/\b_super\b/"，
    另一种则返回(.*) 如果浏览器不支持 function serialisation 则始终返回 true。(这个指的是原始代码中的fnTest.test)使用 fnTest 正则, 和 函数序列化技术,
    我们能很容易知道方法中是否使用了 "_super" 如果它们使用, 则执行一些特殊方法. 反之正常.  这个特殊方法是为了避免在父类与子类中同时出现同一个方法时父类将会被覆盖.
    浏览器不支持 Function serialisation 将会始终返回 true, 那么会始终对 _super 进行额外的操作, 导致这些新的方法不能在 _super 中使用. 这会有一些小的性能消耗.
    但能保证在所有浏览器中 正常执行.*/


(function () {
    //initializing用于控制类的初始化，非常巧妙，请留意下文中使用技巧
    //fnTest返回一个正则表达式，用于检测函数中是否含有_super，这样就可以按需重写，提高效率。当然浏览器如果不支持的话就返回一个通用正则表达式
    var initializing = false,
        fnTest = /xyz/.test(function () {
            xyz;
        }) ? /\b_super\b/ : /.*/; //见上面的注释(1.)
    //所有类的基类Class,这里的this一般是window对象
    this.Class = function () {
    };
    //对基类添加extend方法，用于从基类继承
    Class.extend = function (prop) {
        //保存当前类的原型
        var _super = this.prototype;
        //创建当前类的对象，用于赋值给子类的prototype，这里非常巧妙的使用父类实例作为子类的原型，而且避免了父类的初始化(通过闭包作用域的initializing控制)
        initializing = true;
        var prototype = new this();
        initializing = false;
        //将参数prop中赋值到prototype中，这里的prop中一般是包括init函数和其他函数的对象
        for (var name in prop) {
            //对应重名函数，需要特殊处理，处理后可以在子函数中使用this._super()调用父类同名构造函数, 这里的fnTest很巧妙:只有子类中含有_super字样时才处理从写以提高效率
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function (name, fn) {
                    return function () {
                        //_super在这里是我们的关键字，需要暂时存储一下
                        var tmp = this._super;
                        //这里就可以通过this._super调用父类的构造函数了
                        this._super = _super[name];
                        //调用子类函数
                        var ret = fn.apply(this, arguments);
                        //复原_super，如果tmp为空就不需要复原了
                        tmp && (this._super = tmp);
                        return ret;
                    }
                })(name, prop[name]) : prop[name];
        }

        //当new一个对象时，实际上是调用该类原型上的init方法,注意通过new调用时传递的参数必须和init函数的参数一一对应
        function Class() {
            if (!initializing && this.init) {
                this.init.apply(this, arguments);
            }
        }

        //给子类设置原型
        Class.prototype = prototype;
        //给子类设置构造函数
        Class.prototype.constructor = Class;
        //设置子类的extend方法，使得子类也可以通过extend方法被继承
        Class.extend = arguments.callee;
        return Class;
    }
})();


//调用示例:
var Person = Class.extend({
    init: function (isDancing) {
        this.dancing = isDancing;
    },
    dance: function () {
        return this.dancing;
    }
});

var p = new Person(true); //这里创建Person构造函数的实例，赋值给变量p
console.log(p.dance());  //true


var Ninja = Person.extend({
    init: function () {
        this._super(false);
    },
    dance: function () {
        return this._super();
    },
    swingSword: function () {
        return true;
    }
});


var n = new Ninja();
console.log(n.dance());  //false
console.log(n.swingSword());  //true

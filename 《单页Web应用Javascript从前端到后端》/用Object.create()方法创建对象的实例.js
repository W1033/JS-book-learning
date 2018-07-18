/** Created on 2017/8/17. */

/**1. JavaScript对象是基于原型(prototype-based)的，而当今其他广泛使用的语言全部都使用 基于类(class-based)的对象。**/

/** 2. 在基于类的系统中，对象是这样定义的: 使用类(class)来描述它是什么样的。
 3. 在基于原型的系统中，我们创建的对象，看起来要像我们想要的所有这种类型的对象那样，然后告诉JavaScript引擎，我们想要更多像这样的对象。 */
// 简单对象创建: 类和原型的比较 : 1. 基于类的   2. 基于原型的
/** 1.
 public class Personal{
            public int  sentence  = 4;
            public int  probation = 2;
            public string name    = "Joe";
            public int  id        = 54321;
        }
 Personal personal = new Personal();
 **/
    //2. 基于原型的
var Personal = {
        sentence: 4,
        probation: 2,
        name: "Joe",
        id: 54321
    };

/** 4.多个对象: 类与原型的比较   **/
// (1.) 基于类的:    1.定义类。       2. 定义类的构造函数。  3.实例化对象。
/**
 // step 1
 public class Prisoner{
        public int sentence = 4;
        public int probation = 2;
        public string name;
        public string id;

        // step 2 : 在基于类的语言中，构造函数是在类的内部定义的，这样的话，当实例化对象时，哪个构造函数与哪个类配对，就很清晰了。
         public Prisoner( string name, string id ){
            this.name = name;
            this.id = id;
         }
     }
 // step 3
 Prisoner firtPrisoner = new Prisoner("Joe", "12A");
 Prisoner secondPrisoner = new Prisoner("Sam", "2BC");
 **/


    // (2,) 基于原型的:  1. 定义原型对象。 2. 定义对象的构造函数。 3.将构造函数关联到原型。 4. 实例化对象(创建对象的实例)
    //step1
var proto = {
        sentence: 4,
        probation: 2
    };
//step2
var Prisoner = function (name, id) {  //在js中，对象的构造函数和原型式分开设置的，所以需要多一步来将他们链接在一起。
    this.name = name;
    this.id = id;
};
//step3
Prisoner.prototype = proto;  //把proto对象赋值给Pisoner构造函数的原型

//step4
var firstPrisoner = new Prisoner("Joe", "12A");
var secondPrisoner = new Prisoner("Sam", "2BC");


// JavaScript使用了 new 操作符，这违背了它基于原型的核心思想。方法Object.create作为 new 操作符的替代方案，使用它来创建JavaScript对象时，能增添一种更像是基于原型的感觉。我们使用Object.crete 方法。
//因为IE6/7/8不支Object.create()方法，所以这里给出兼容代码
var objectCreate = function (arg) {
    //如果根本没有proto原型传进来，那就直接返回空数组
    if (!arg) {
        return {};
    }

    function obj() {
        obj.prototype = arg;
        return new obj;
    }
};
Object.create = Object.create || objectCreate;

var proto3 = {
    sentence: 4,
    probation: 2
};

var makePrisoner = function (name, id) {
    var prisoner = Object.create(proto3);

    prisoner.name = name;
    prisoner.id = id;
    return prisoner;
};
var firstPrisoner3 = makePrisoner("Joe", '12A');
var secondPrisoner3 = makePrisoner("Sam", "2BC");
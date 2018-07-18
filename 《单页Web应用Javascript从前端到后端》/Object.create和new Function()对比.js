//基于原型的:  1. 定义原型对象。 2. 定义对象的构造函数。 3.将构造函数关联到原型。 4. 实例化对象(创建对象的实例)
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

//JavaScript使用了 new 操作符，这违背了它基于原型的核心思想。方法Object.create作为 new 操作符的替代方案，使用它来创建JavaScript对象时，能增添一种更像是基于原型的感觉。我们使用Object.create 方法。

var proto2 = {
    sentence: 4,
    probation: 2
};
var firstPrisoner2 = Object.create(proto2);
firstPrisoner2.name = "Joe";
firstPrisoner2.id = "12A";

var secondPrisoner2 = Object.create(proto2);
secondPrisoner2.name = "Sam";
secondPrisoner2.id = "2BC";

//因为上面使用Object.create()的代码太过繁琐，所以使用Object.create()的常见模式是使用工厂函数来创建并返回最终的对象。所有的工厂函数我们以make<object_name>的形式来民命

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
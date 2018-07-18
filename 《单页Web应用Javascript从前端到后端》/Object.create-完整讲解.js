/** Created on 2017/8/20. */


/**《单页Web应用》的讲解:*/

//1.古老的用 new Function()创建调用对象的实例
var proto = {
    sentence: 4,
    probation: 2
};
var Prisoner = function (name, id) {  //在js中，对象的构造函数和原型式分开设置的，所以需要多一步来将他们链接在一起。
    this.name = name;
    this.id = id;
};
Prisoner.prototype = proto;  //把proto对象赋值给Pisoner构造函数的原型
//step4
var firstPrisoner = new Prisoner("Joe", "12A");
var secondPrisoner = new Prisoner("Sam", "2BC");


//2.Object.create()方法: 因为IE6/7/8不支Object.create()方法，所以这里给出兼容代码
/*var objectCreate = function(arg){
    //如果根本没有proto原型传进来，那就直接返回空数组
    if(!arg){return {};}
    function obj(){
        obj.prototype = arg;
        return new obj;
    }
};
Object.create = Object.create || objectCreate;

var proto3 = {
    sentence: 4,
    probation: 2
};

var makePrisoner = function(name, id){
    var prisoner = Object.create(proto3);

    prisoner.name = name;
    prisoner.id = id;
    return prisoner;
};
var firstPrisoner3 = makePrisoner("Joe", '12A');
var secondPrisoner3 = makePrisoner("Sam", "2BC");*/

/*----------------------------------------------*/


/** MDN -- Object.create();
 Object.create()方法会使用指定的原型对象及其属性去创建一个新的对象。(这里的示例并没有上面《单页Web应用》中讲的易懂)
 1. 语法:  Object.create(proto, [propertiesObject]):
 (1.) proto: 一个对象，应该是新创建的对象的原型。(具体来说就是要要赋值给构造函数的原型的对象)
 (2.) propertiesObject: 可选。该参数对象是一组属性和值，该对象的属性名称将是新创建的对象的属性名称，值是属性
 描述符(这些属性描述符的结构与Object.defineProperties()的第二个参数一样)。注意：该参数对象不能是 undefined,
 另外只有对象中自身拥有的不可枚举的属性才有效,也就是说该对象的原型链上的属性无效的。
 */

//2. 使用Object.create方法实现类式继承
//shape - superclass (形状 - 超类)
function Shape() {
    this.x = 0;
    this.y = 0;
}

Shape.prototype.move = function (x, y) { //在Shape的原型上定义一个move()方法
    this.x += x;
    this.y += y;
    console.info("Shape moved.(图形发生了变化)");
};

//Rectangle - subclass (矩形 - 子类)
function Rectangle() {
    Shape.call(this);  // call super constructor. 调用超类构造函数
}

//subclass extends superclass 子类扩展超类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log("Is rect an instance of Rectangle?(rect是Rectangle的实例吗) ", rect instanceof Rectangle);
console.log("Is rect an instance of Shape?(rect是Shape的实例吗?) ", rect instanceof Shape);
rect.move(1, 2);

/**
 3. 使用 Object.create的 propertyObject参数
 示例代码见: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 */


/**描述:可以让call()中的对象调用当前对象所拥有的function.可以使用call()来实现继承:写一个方法然后让另外一个新的对象来继承他
 (而不是在新对象中在写一次这个方法) <br/>**示例:使用call方法调用父构造函数 */

function Product(name, price) {
    this.name = name;
    this.price = price;
    if (price < 0) {
        throw RangeError("Cannot create product" + this.name + "with a negative price")
    }
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = "food";
}

/*---上面Food()构造函数调用Product()构造函数 "等同于"(=) 下面这个写法---*/

/*
function Food(name, price){
   this.name = name;
   this.price = price;
   if(price < 0){
       throw RangeError("Cannot create product" + this.name + "with a negative price")
   }
   this.category = "food";
}
*/


















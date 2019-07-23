/**Created by Administrator on 2017/6/4.*/

/*基本的: 组合式继承
    function SuperType(name) {
        this.name = name;
        this.colors = ["red", "blue", "green"];
    }
    SuperType.prototype.sayName = function () {
        alert(this.name);
    };
    function SubType(name, age) {
        SuperType.call(this, name);        // 第二次调用 SuperType()
        this.age = age;
    }
    SubType.prototype = new SuperType();   // 第一次调用 SuperType()
    SubType.prototype.constructor = SubType;
    SubType.prototype.sayAge = function () {
        alert(this.age);
    };

    var person1 = new Person("Nicholas", 29, "Software Engineer");
    var person2 = new Person("Greg", 27, "Doctor");
 */


/**(6.3.6 寄生组合式继承) : 所谓的寄生组合式继承,即通过借用构造函数来继承属性，通过原型链的混成
 形式来继承方法。其背后的基本思路是: 不必为了指定子类型的原型而调用超类型的构造函数，我们所需要
 的无非就是超类型原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后在将结果
 指定给子类型的原型。模式如下: */

//Douglas Crockford的寄生组合式继承(6.3.6 寄生组合式继承)
function object(o) { //这个object()函数会在inheritPrototype中用到。
    function F() {
    }

    F.prototype = o;
    return new F();
}


function inheritPrototype(subType, superType) {
    //把超类型的原型传到上面定义的object()函数中，返回一个引用当前对象的实例
    var prototype = object(superType.prototype); //superType.prototype创建超类型原型的一个副本
    //每个实例也有一个constructor属性默认调用原型对象的constructor属性（！！！）: 这个在js高程上虽然没有将到，但是应该是有的
    prototype.constructor = subType; //为创建的副本添加constructor属性，弥补因重写原型而失去的默认constructor属性
    subType.prototype = prototype;   //将第一步创建的superType对象的实例赋值给子类型的原型。
}

//这样我们就可以调用inheritPrototype()函数的语句，去替换前面例子中为子类型原型赋值的语句了。例:
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
    console.log(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function () {
    console.log(this.age);
};

/**------17/6/4 : 直到今天才彻底弄明白寄生组合式继承是什么:
 (1.)在基本的"组合继承"中构造函数SubType调用两次超类型构造函数 :
 第一: SubType.prototype = new SuperType(); 这是通过调用超类型SuperType构造函数的实例去寻找SuperType原型上的方法。
 第二: 在SubType(里调用 SuperType.call(this, name);)这是要继承超类型的属性。

 (2.)在"寄生组合式继承"中，只在SubType中用call方法调用了一次超类型，调用超类型原型上的方法是通过封装的inheritPrototype()
 方法实现的。内部实现原理是:
 (1.)创建超类型原型的一个副本,把superType.prototype放在object中可以看做是创建了一个superType构造函数的实例。
 (2.)为创建的副本添加重写元原型之后失去的constructor属性，并把subType的指针赋值给此原型的constrictor(补充:此时这个创建
 的superType原型副本的constructor属性就指向了subType,也就是说这个副本原型的构造函数是subType)
 (3.)把（1.）中的 超类型的实例 赋值给subType.prototype(子类型的原型)
 ------*/


//讲解 为什么寄生组合式继承中 var prototype = object(superType.prototype); subType.prototype = prototype;
// [子类型的原型 = 父类型的实例] 而不是 [子类型的原型 = 父类型的原型]
function Father() {
}

Father.prototype.type = "Person";

//子类
function Son(name) {
    this.name = name;
}

//1.打印父类的构造函数
console.log(Father.prototype.constructor); //[Function: Father]
Son.prototype = Father.prototype;
//Son.prototype = object(Father.prototype) //虽然不太明白，但是把构造函数的原型放在object()方法中等于调用了括号内构造函数的实例
Son.prototype.constructor = Son;
var son = new Son("laoLi");
console.log(son.type);  //Person

/*从最后一个函数输出可以得出，为什么不能把Father.prototype赋值给Son.prototype了,
  因为这样赋值之后,再次输出constructor属性时，真正的构造函数变成了Son()*/
console.log(Father.prototype.constructor); //[Function: Son]




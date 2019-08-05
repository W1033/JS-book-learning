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
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}


function inheritPrototype(subType, superType) {
    // 把超类型的原型传到上面定义的 object() 函数中，返回一个引用当前对象的实例
    var prototype = object(superType.prototype);
    //为创建的副本添加constructor属性，弥补因重写原型而失去的默认constructor属性
    prototype.constructor = subType;
    //将第一步创建的 superType 对象的实例赋值给子类型的原型。
    subType.prototype = prototype;
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





# 第 6 章 -- 面向对象的程序设计
 
## 本章目录 (Catalog)


## 生词 (New Words)

## 本章内容 (Content)   
- `面向对象(Object-Oriented，OO)` 的语言有一个标志，就是他们都有`类`的概念，而通过类
   可以创建任意多个具有相同属性和方法的对象。前面提到过，ECMAScript 中没有类的概念，因此
   它的对象也与基于类的语言中的对象有所不同。
- ECMA-262 把对象定义为: **"无序属性的集合，其属性可以包含基本值、对象、或者函数"** 严格
  来讲，这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字
  都映射到一个值。正因为这样（以及其他将要讨论的原因），我们可以把 ECMAScript 的对象想象
  成 散列表 (hash)：无非就是一组名值对，其中值可以是数据或函数。
 - **每个对象都是基于一个引用类型**创建的，这个引用类型可以是第 5 章讨论的原生类型，也可以
   是开发人员定义的类型。


 ### 6.1 理解对象
 ### 6.2 创建对象
  虽然 "Object构造函数" 或 "对象字面量" 都可以来创建单个对象，但是这些方式有一个明显的缺点: 使用同一个
   接口创建了很多对象，会产生大量的重复代码。为解决这个问题，人们开始使用工厂模式的一种变体。工厂模式是软件
   工程领域一种广为人知的设计模式，这种模式抽象了创建具体对象的过程。。。。下面是js中用到的设计模式:
    + 6.2.1 工厂模式
    + 6.2.2 构造函数模式
    + 6.2.3 原型模式
    + 6.2.4 组合使用构造函数模式和原型模式
    + 6.2.5 动态原型模式
    + 6.2.6 寄生构造函数模式
    + 6.2.7 稳妥构造函数模式


// 6.1 创建对象的基本方式: 1. new Object()的实例  2. 对象字面量
var person = new Object();
person.name = 'Nicholas';
person.age = 29;
person.sayName = function () {
    console.log(this.name);
};

var person2 = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",

    sayName: function () {
        console.log(this.name)
    }
}

> **6.3.4 原型式继承**
> MDN -- Object.create() 方法会使用指定的原型对象及其属性去创建一个新的对象。
- 语法: Object.create(proto, [propertiesObject]):
    + (1) proto: 一个对象，应该是新创建的对象的原型。(具体来说就是要赋值给构造函数的
        原型的对象)
    + (2) propertiesObject: 可选。该参数对象是一组属性和值，该对象的属性名称将是新创建
        的对象的属性名称，值是属性描述符(这些属性描述符的结构与 Object.defineProperties()
        的第二个参数一样)。注意：该参数对象不能是 undefined,另外只有对象中自身拥有的
        不可枚举的属性才有效,也就是说该对象的原型链上的属性无效的。
- ES5 - 提供了 Object.create 方法，可以用来克隆对象。
    + Object.create("要克隆的对象", "新对象定义额外属性的对象(可选,一般不写)")
    + js高程-P170: ECMAScript 5 通过新增 Object.create() 方法规范化了原型式继承。
      这个方法接收两个参数：
        - (1): 用作新对象原型的对象。(在传入一个参数的情况下 Object.create() 与 
          object() [tips: 6.3.4 自定义的 object() 方法] 方法的行为相同。)
        - (2): 一个为新对象定义额外属性的对象(可选)。
        - ```javascript
            // 示例1 : javascript 高程 -- 6.3.4 原型式继承
            let person = {
                // 基本类型值属性
                name: "Nicholas",
                // 引用类型值属性。(tips-P171: 不过不要忘了，包含引用类型值的属性始终
                // 都会共享相应的值，就像使用原型模式一样。)
                friends: ["Shelby", "Court", "Van"],
            };
            let anotherPerson = Object.create(person);
            anotherPerson.name = "Grey";
            anotherPerson.friends.push("Rob");

            let yetAnotherPerson = Object.create(person);
            yetAnotherPerson.name = "Linda";
            yetAnotherPerson.friends.push("Barbie");
            // - person.friends 不仅属于 person 所有，而且会被 anotherPerson 以及 
            //   yetAnotherPerson 共享。实际上这就相当于又创建了 person 对象的 2 个副本。
            console.log(person.friends);    // "Shelby,Court,Van,Rob,Barbie"
          ```
        - ```javascript
            // - 示例来源: 《Javascript设计模式与编程实践》/第一部分--基础知识
            //   /第1章-面形对象的JavaScript/Chapter01-面向对象的javascript.md
            const Plane = function () {
                this.blood = 100;
                this.attackLevel = 1;
                this.defenseLevel = 1;
            };

            let plane = new Plane();
            plane.blood = 500;
            plane.attackLevel = 10;
            plane.defenseLevel = 7;

            let clonePlane = Object.create(plane);
            console.log(clonePlane);            // Plane {}
            console.log(clonePlane.blood);      // 500
            console.log(clonePlane.attackLevel);// 10
          ```
- ES5 - Object.keys() 方法取得对象上所有可枚举的实例属性。 这个方法接受一个对象作为参数，
    返回一个包含所有可枚举属性的字符串数组。
    + 示例: 《js高级程序设计》\js高程学习笔记\js高程---Object.keys().js
- ES5 - Object.getOwnPropertyNames(): 【取得自身的属性名】。 js高程 - Chapter 6
- ES5 - Object.getPrototypeOf() 方法返回任意指定对象的原型。对象原型的真实值被存储在
内部专用属性 `[[Prototype]]` 中，调用 getPrototypeOf() 方法返回存储在其中的值。
- ES6 - Object.is(): [P76] 弥补全等运算符的不准确运算。比如之前 +0等于-0, NaN不等于NaN
- ES6 - Object.assign()
- ES6 - Object.setPrototypeOf() 方法可以改变任意指定对象的原型。接受2个参数: 
    + 1).被改变原型的对象 
    + 2).替代第一个参数原型的对象。
    + 示例:《深入理解ES6》\4th chapter--扩展对象的功能性\4th-扩展对象的功能性.js
## 第1章--面向对象的 javascript

> 1. 设计模式的定义是: 在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案。

### 模式在不同语言之间的区别
   - 《设计模式》一书的副标题是"可复用面向对象软件的基础。"
   - 在 Java 这种静态编译型语言中，无法动态地给已存在的对象添加职责，所以一般通过包装类的方式
     来实现装饰着模式。但在 Javascript 这种动态解释型语言中，给对象动态添加职责是再简单不过的
     事情。这就造成了 javascript 语言的装饰者模式不在关注于给对象动态添加职责，而是关注于给函
     数动态添加职责。

### 设计模式的适用性

### 对 js 设计模式的误解
   - 实际上，在 java 等静态类型语言中，让子类来 "决定" 创建何种对象的原因是为了让程序迎合
     **依赖倒置原则** (DIP)。 在这些语言中创建对象时，先解开对象类型之间的耦合关系非常重要，
     这样才有机会在将来让对象表现出多态性。
   - 而在 js 这种类型模糊的语言中，对象多态性是天生的，一个变量既可以指向一个类，又可以随时指向
     另外一个类。 js 不存在类型耦合的问题，自然也没有必要刻意去把对象 "延迟" 到子类创建，也就
     是说， js 实际上不需要工厂方法模式的。


### 第1章 面向对象的 Javascript
   - js 没有提供传统面向对象语言中的类式继承，而是通过原型委托的方式来实现对象与对象之间的继承。

### 1.1 动态类型语言和鸭子类型
   - 编程语言按照数据类型大体可以分为两类: 1.静态类型语言。 2.动态类型语言。


### 1.2 多态
- js 多态--实际上也就是对象的多态 【P8.js 对象的多态性是与生俱来的】: 多态最根本的作用
  就是通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句.
  ```javascript
    // - 类式多态
    const makeSound = function (animal) {
        // 此处调用对象下的 sound() 方法
        animal.sound();
    };
    const Duck = function () {};
    Duck.prototype.sound = function () {
        console.log("嘎嘎嘎");
    };
    const Chicken = function () {};
    Chicken.prototype.sound = function () {
        console.log("咯咯咯");
    };
    makeSound(new Duck());
    makeSound(new Chicken());
    const Dog = function () {};
    Dog.prototype.sound = function () {
        console.log("汪汪汪");
    };
    makeSound(new Dog());

    // js - 多态示例
    const googleMap = {
        show: function () {
            console.log("开始渲染谷歌地图");
        }
    };
    const baiduMap = {
        show: function () {
            console.log("开始渲染百度地图");
        }
    };
    const renderMap = function (map) {
        if (map.show instanceof Function) {
            map.show();
        }
    };
    renderMap(googleMap);
    renderMap(baiduMap);
    const sogouMap = {
        show: function () {
            console.log("开始渲染百度地图");
        }
    };
    renderMap(sogouMap);
  ```


### 1.4 原型模式和基于原型继承的 JavaScript 对象系统 
> *原型模式不单是一种设计模式，也被称为一种编程泛型。*

#### 1.4.1 使用克隆的原型模式** 
- 原型模式的关键实现，是语言本身是否提供了 clone 方法。 ECMAScript5 提供了 Object.create
   方法，可以用来克隆对象. 代码如下: 
    + Object.create("要克隆的对象", "新对象定义额外属性的对象(可选,一般不写)")
    + 《js高程》P170 --> ECMAScript 5 通过新增 Object.create() 方法规范化了原型式
      继承。个方法接收两个参数：
        - (1) 用作新对象原型的对象. 
        - (2) 一个为新对象定义额外属性的对象(可选)。
    在传入一个参数的情况下，Object.create() 与 object() 方法的行为相同。
    + ```javascript
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
        console.log("------------------");
        ```
    ``` 
   
    ```

#### 1.4.2 克隆是创建对象的手段** 

#### 1.4.3 体验 Io 语言** 

#### 1.4.4 原型编程规范的一些规则** 

#### 1.4.5 js 中的原型继承** 
- js 也遵循原型编程的基本原则:
     + 1).所有的数据(js只能说是绝大部分数据，比如 undefined 就不是對象)都是对象。
     + 2).要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。(tip: 自定义的
         构造函数也是对象。)
     + 3).对象会记住它的原型。
     + 4).如果对象无法响应某个请求，它会吧这个请求委托给自己的原型。

- 1).所有的数据都是对象。JavaScript 在设计的时候， 模仿Java引入了两套类型机制： 
     + 基本类型:  基本类型包括 undefined、 null、boolean、number、string、symbol 
       从现在看来，这并不是一个好的想法。按照JavaScript设计者的本意，除了undefined之外，
       一切都应是对象。为了实现这一目标，number、boolean、string这几种基本类型数据也可
       以通过“包装类”的方式变成对象类型数据来处理。
       [这里说的"包装类"应该就是"js高程"上的基本包装类型"Boolean, Number, String"]
     + 对象类型: 也就是引用类型--Object。(注: 书上这里讲解感觉有问题，Object肯定不是基本类型啊)
     
 + js中的根对象是 Object.prototype 对象。Object.prototype 对象是一个空的对象，
   我们在 js 中遇到的每个对象，实际上都是从 Object.prototype 对象克隆而来的，
   Object.prototype 对象就是他们的原型。例如下面的 obj1 和 obj2 对象:
     ```javascript
         let obj1 = {};
         let obj2 = {};
         // 可以利用 ES5 提供的 Object.getPrototypeOf 来查看这两个对象的原型:
         console.log(Object.getPrototypeOf( obj1 ) === Object.prototype);  // true
         console.log(Object.getPrototypeOf( obj2 ) === Object.prototype);  // true
     ```
- 2).要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
 + 上面的示例只需要显式地调用 var Obj1 = new Object() 此时引擎内部就会从 
   Object.prototype 上面克隆一个对象出来，我们最终得到的就是这个对象。
 + 下面的笔记见: P19-js通过原型构建面向对象系统.js

> **1.4.6 原型继承的未来** 


​    
​    
​    
​    


​    
​    
​    
​    
​    
​    
​    
​    
​    
​    
​    
​    
​    
​    

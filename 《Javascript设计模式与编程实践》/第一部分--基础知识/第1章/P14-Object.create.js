// 原型模式的实现关键是语言本身是否提供了 clone 方法。


/*
 *  - ES5 - 提供了 Object.create 方法，可以用来克隆对象。
  *     + Object.create("要克隆的对象", "新对象定义额外属性的对象(可选,一般不写)"):
 *  - 《js高程》P170 --> ECMAScript 5 通过新增 Object.create() 方法规范化了原型式继承。
 *   个方法接收两个参数：(1)用作新对象原型的对象. (2)一个为新对象定义额外属性的对象(可选)。
 *   在传入一个参数的情况下，Object.create() 与 object() 方法的行为相同。
 */
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


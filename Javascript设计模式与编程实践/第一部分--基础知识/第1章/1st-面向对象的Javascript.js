// Edit: 20180503

/** 1.2--多态 */
// js 多态--实际上也就是对象的多态 【P8. js 对象的多态性是与生俱来的】
// ** 多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句。 **
const makeSound = function (animal) {
    // 此处调用对象下的 sound() 方法
    animal.sound();

};

const Duck = function () {
};
Duck.prototype.sound = function () {
    console.log("嘎嘎嘎");
};

const Chicken = function () {
};
Chicken.prototype.sound = function () {
    console.log("咯咯咯");
};

makeSound(new Duck());
makeSound(new Chicken());

const Dog = function () {
};
Dog.prototype.sound = function () {
    console.log("汪汪汪");
};
makeSound(new Dog());


// edit:20180503--多态示例2
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
console.log("------------------");


// 20180203-edit-P14: Object.create
// 原型模式的实现关键是语言本身是否提供了 clone 方法。 ECMAScript 5 提供了 Object.create 方法，可以用来克隆对象。
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




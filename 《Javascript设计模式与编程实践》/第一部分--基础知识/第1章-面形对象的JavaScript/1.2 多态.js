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



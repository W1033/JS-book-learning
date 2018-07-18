/* create 20180410 */

// 很明显这个示例只写了继承属性
const A = function (name) {
    this.name = name;
};

const B = function () {
    // B 构造器借用 A 构造器的 name 属性
    A.apply(this, arguments);
};

B.prototype.getName = function () {
    return this.name;
};

const b = new B("Seven");
console.log(b.getName());   // Seven


/*~~~~~~~~~~~~~~~~~~~~ js高程- 6.3.3 组合继承 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function Father(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

Father.prototype.sayName = function () {
    console.log(this.name);
};

function Son(name, age) {
    // 继承 Father 的属性
    Father.call(this, name);
    this.age = age;
}

// Son 继承 Father 的方法
Son.prototype = new Father();
Son.prototype.constructor = Son;
Son.prototype.sayAge = function () {
    console.log(this.age);
};

const instance1 = new Son("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors);
instance1.sayName();
instance1.sayAge();

const instance2 = new Son("Greg", 27);
console.log(instance2);
instance2.sayName();
instance2.sayAge();


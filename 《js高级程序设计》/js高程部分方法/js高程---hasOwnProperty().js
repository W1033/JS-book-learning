/** Created 2018/1/9. */

/**
 * 使用 hasOwnProperty() 方法可以检测一个属性是存在于实例中，还是存在于原型中。这个方法
 * （不要忘了它是从 Object 继承来的）只在给定属性存在于对象实例中时，才会返回 true 。
 * -- 《js高程》第6章 - 6.2.3 原型模式
 * */

function Person() {
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
    console.log(this.name);
};
var person1 = new Person();
var person2 = new Person();
console.log(person1.hasOwnProperty("name"));    // false

person1.name = "Greg";
console.log(person1.name);      // "Greg" --- 来自实例
console.log(person1.hasOwnProperty("name")); // true

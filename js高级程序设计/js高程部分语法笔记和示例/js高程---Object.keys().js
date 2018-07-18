// 20180502-add: 6.2.4 -2 Object.keys()

/**
 * 要取得对象上所有可枚举的实例属性，可以使用 ES5 的 Object.keys() 方法。这个方法接受一个对象作为参数，
 * 返回一个包含所有可枚举属性的字符串数组。
 **/
function Person() {
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 34;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
    console.log(this.name);
};
let keys = Object.keys(Person.prototype);
console.log(keys);          // [ 'name', 'age', 'job', 'sayName' ]

let p1 = new Person();
p1.name = "Rob";
p1.age = 36;
let p1keys = Object.keys(p1);
console.log(p1keys);        // [ 'name', 'age' ]


/** 如果想得到所有实例属性，无论它是否可枚举，都可以使用 Object.getOwnPropertyNames()【取得自身属性名】
 * 方法: */
let keys2 = Object.getOwnPropertyNames(Person.prototype);
// 注意结果包含了不可枚举的 constructor 属性
console.log(keys2);         // [ 'constructor', 'name', 'age', 'job', 'sayName' ]

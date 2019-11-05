let firstName = Symbol();
let person = {};
person[firstName] = "Nicholas";

// - 编辑器内输出为: {[Symbol()]: 'Nicholas'}
// - 浏览器内输出为: {Symbol(): "Nicholas"}
console.log(person);
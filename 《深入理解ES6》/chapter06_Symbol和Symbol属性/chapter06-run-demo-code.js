let firstName = Symbol();
let person = {};
person[firstName] = "Nicholas";

// - 编辑器内输出为: {[Symbol()]: 'Nicholas'}
// - 浏览器内输出为: {Symbol(): "Nicholas"}
// console.log(person);



let MyClass = (function() {
    // module scoped symbol
    const key = Symbol('key');
    function MyClass(privateData) {
        this[key] = privateData;
    }
    MyClass.prototype = {
        constructor: MyClass,
        doStuff: function() {
            // ... this[key] ...
        }
    };
    return MyClass;
})();
let c = new MyClass('Hello');
console.log(c['key'] === "key");
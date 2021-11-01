// 先来看如何用 new 运算符从构造器中得到一个对象:
(function() {
    function Person(name) {
        this.name = name;
    }
    
    Person.prototype.getName = function () {
        return this.name;
    };
    
    let person = new Person('kell');
    console.log(person.name);
    console.log(person.getName());
    console.log(Object.getPrototypeOf(person) === Person.prototype);
    console.log('\n' +  '//' + ('*'.repeat(66)) + '\n');
    
    
    const ObjectFactory = function () {
        const obj = {};  
        let Constructor = Array.prototype.shift.call(arguments); 
        obj.__proto__ = Constructor.prototype; 
        let ret = Constructor.apply(obj, arguments);  
        return typeof ret === "object" ? ret : obj;
    };
    
    let a = ObjectFactory(Person, "seven");
    
    // console.log(a);     // Person { name: 'seven' }
    // console.log(a.name);
    // console.log(a.getName());
    // console.log(Object.getPrototypeOf(a) === Person.prototype);
})();


(function() {
    Object.prototype.name = 'Kew';

    var obj = {age: 31};

    var A = function() {};
    A.prototype = obj;

    var a = new A();
    console.log(a.name);    // Kew
})();
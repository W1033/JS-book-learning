// 类: 我们创建一个 User 类，它带有一个构造函数和一些公共字段。 注意类和接口可以一起工作，
// 程序员自行决定抽象的级别。
// TypeScript 里的类只是 JavaScript 里常用的基于原型面向对象编程的简写。(即是说 class
// 语法是构造函数的语法糖。)
class User {
    fullName: string;

    // tips: firstName 和 lastName 用 constructor() 中的写法
    // firstName: string;
    // lastName: string;

    // 注意: 在构造函数上使用 public 等同于创建了同名的成员变量。
    constructor(public firstName, public lastName) {
        // this.firstName = firstName;
        // this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName;
    }
}

interface Person {
    firstName: string
    lastName: string
}

function greeter(person: Person) {
    return 'Hello '+ person.firstName + ' ' + person.lastName;
}

let user = new User('Yee', 'Huang');

// output: Hello Yee Huang
console.log(greeter(user));




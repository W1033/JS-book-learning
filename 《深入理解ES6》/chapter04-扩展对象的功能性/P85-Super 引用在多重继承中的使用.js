/**
 * ## Super 引用在多重继承的情况下非常有用，因为在这种情况下 使用 Object.getPrototypeOf()
 *    方法将会出现问题。
 */

/*
 * > 注释
 * - (1)、原型模式的关键实现，是语言本身是否提供了 clone 方法。 ECMAScript5 提供了
 *   Object.create 方法，可以用来克隆对象. 代码如下:
 *   + Object.create("要克隆的对象", "新对象定义额外属性的对象(可选,一般不写)")
 *   + 《js高程》P170 --> ECMAScript 5 通过新增 Object.create() 方法规范化了原型式继承。
 *     个方法接收两个参数：(1)用作新对象原型的对象. (2)一个为新对象定义额外属性的对象(可选)。
 *     在传入一个参数的情况下，Object.create() 与 object() 方法的行为相同。
 *
 * - (2)、this 是 relative, relative 的原型是 friend 对象，当执行 relative 的
 *   getGreeting 方法时，会调用 friend 的 getGreeting() 方法，而此时的 this 值为
 *   relative, Object.getPrototypeOf(this) 又会返回 friend 对象。所以就会进入递归
 *   调用直到触发栈溢出报错。
 */



let person= {
    getGreeting() {
        return "Hello";
    }
};
// 以 person 对象为原型
let friend = {
    getGreeting() {
        // (2)、
        // return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";

        // Super 引用不是动态变化的，它总是指向正确的对象。
        return super.getGreeting() + ", hi!";
    }
};
// 把 friend 的原型设置为 person
Object.setPrototypeOf(friend, person);

// 克隆一个 relative 对象，原型是 friend
let relative = Object.create(friend);   // (1)、

console.log(person.getGreeting());
console.log(friend.getGreeting());
console.log(relative.getGreeting());

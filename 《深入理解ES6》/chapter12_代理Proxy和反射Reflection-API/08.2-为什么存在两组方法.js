// ####@ 8.2 为什么存在两组方法?
// - 关于 Reflect.getPrototypeOf() 与 Reflect.setPrototypeOf(), 它们看起来与
//   Object.getPrototypeOf() 和 Object.setPrototypeOf() 非常相似. 然而虽然
//   两组方法分别进行着相似的操作, 它们之间仍然存在显著差异.
// - 首先, ......
// - Reflect.getPrototypeOf() 方法在接收到的参数不是一个对象时会抛出错误， 而
//   Object.getPrototypeOf() 则会在操作之前先将参数值转换为一个对象。 如果你分别
//   传入一个数值给这两个方法， 会得到截然不同的结果：

let result1 = Object.getPrototypeOf(1);
console.log(result1 === Number.prototype);  // true

// - 抛出错误
// TypeError: Reflect.getPrototypeOf called on non-object
// Reflect.getPrototypeOf(1);


// - 在上一节 8.1 的第一个例子中, 当 setPrototypeOf 代理陷阱返回 false 时, 它导致
//   Object.setPrototypeOf() 方法抛出了错误. 此外, Object.setPrototypeOf() 方法
//   会将传入的第一个参数作为自身的返回值, 因此并不适合用来实现 setPrototypeOf 代理陷阱
//   的默认行为. 看下面的代码
(function() {
    let target01 = {};
    // - result01 保存的是 target01 对象
    let result01 = Object.setPrototypeOf(target01, {});
    console.log(result01 === target01);     // true

    let target02 = {};
    // - result02 保存利用 setPrototypeOf() 方法给 target02 设置一个 对象字面量({})
    //   为其原型的成功值 true
    let result02 = Reflect.setPrototypeOf(target02, {});
    console.log(result02);  // true;
})();

// - 虽然 Object 对象与 Reflect 对象貌似存在重复的方法, 但在代理陷阱内却必须使用 Reflect
//   对象上的方法.
// - 在使用代理时, 这两组方法都会调用 getPrototypeOf 与 setPrototypeOf 陷阱函数

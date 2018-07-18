/** Creation Date 2017-12-15 22:52 */

// constant /'kɒnst(ə)nt/  n.常数，常量  adj.不变的，恒定的

// const 和 let : IE11开始支持
// const 声明的是常量，其值一旦被设定后不可改变。因此，每个通过const声明的常量必须进行初始化。
// const 与 let 声明的都是块级标识符，所以常量也只有在当前代码块内有效，一旦执行到块外会立即销毁。 常量同样也不会被提升到作用域顶部。

/*if(condition) {
    const maxItems = 5;
}*/
// 此处无法访问 maxItems

// 用 const 声明不允许修改绑定，但允许修改值。这也就意味着用 const 声明对象后，可以修改该对象的属性值。 例如:
const person = {
    name: "Nicholas",
};
person.name = "Greg";


// 循環中的函數
let funcs = [];
let a = 0;
for (; a < 10; a++) {
    // (function(){})() 自执行匿名函数，也叫"立即调用函数表达式(IIFE)"。 还有一种写法为: (function(){}());
    funcs.push(function (value) {
        return function () {
            console.log("funcs 數組當前輸出值: " + value);
        }
    }(a))
}

funcs.forEach(function (item) {
    item();
})


// 20180426 add: P9 循环中的 let 声明
let arr = [];
for (let i = 0; i < 10; i++) {
    arr.push(function () {
        console.log("循环中的let声明: " + i);
    })
}
arr.forEach(function (item) {
    item();
});


// 20180426 add: P10 循环中的 let 声明, for-in 循环对象
let arr2 = [];
const obj = {
    a: true,
    b: true,
    c: true
};

// 20180426 add: P10 注意: 此时 let key 直接写在 for() 的括号中，如果像 jq 那样写在外面，也是无法实现 ES6 的封装效果的。
/* 20180426 add: P13： let 和 const 的行为很多时候与 var 一致。 然而，它们在循环中的行为却不一样。在 for-in and for-of 循环中，
 * let 和 const 都会每次迭代时创建新绑定，从而使循环体内创建的函数可以访问到相应迭代的值，而非最后一次迭代后的值(像使用 var 那样)。 let and for
 * 循环中同样如此，但在 for 循环中使用 const 声明则可能会引发错误。 */
for (let key in obj) {
    arr2.push(function () {
        console.log("循环输出key: " + key);
        console.log("循环输出value: " + obj[key]);
    })
}
console.log(arr2);
arr2.forEach(function (item) {
    item();
});

// 20180426 add: P12 用 var 声明的全局变量会自动添加为全局对象(window)的属性，但 let 和 const 声明变量则不会。 例:
var name = "Wang";
// console.log(name === window.name); // true 在浏览器中运行,编辑器环境中不存在 window 对象
const sex = "male";
// console.log("sex" in window);    // false

/** 20180426: 当前使用块级绑定的最佳实践是: 默认使用 const, 只在确定需要改变变量的值时使用 let。
 * 这样就可以在某种程度上实现代码的不可变，从而防止某些错误的产生。 */
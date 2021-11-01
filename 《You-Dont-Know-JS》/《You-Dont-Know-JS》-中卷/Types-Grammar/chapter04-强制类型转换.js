/**
 * # 第 4 章 - 强制类型转换
 */

// let a = new Boolean(false);
// let b = new Number(0);
// let c = new String('');
// let d = Boolean(a && b && c);
// console.log("d: ", d);  // true

// let a = false;
// console.log("Boolean(a):", Boolean(a));
// let b = 0;
// console.log("Boolean(b):", Boolean(b));
// let c = "";
// console.log("Boolean(c):", Boolean(c));
// let d = Boolean(a && b && c);
// console.log("d: ", d);  // true


let a = "false";
console.log("Boolean(a):", Boolean(a));
let b = "0";
console.log("Boolean(b):", Boolean(b));
let c = "''";
console.log("Boolean(c):", Boolean(c));
let d = Boolean(a && b && c);
console.log("d: ", d);  // true


/**
 * > 4.3.1 字符串和数字之间的显示转换
 *   - 2.奇特的 ~ (按位非) 运算符
 *      + 在 2.3.5 节中，我们讲过字位运算符值适用于 32 位整数，运算符会强制操作数使用
 *        32 位格式。这个通过抽象操作 ToInt32 来实现的。 (ES5 规范 9.5 节)
 *      + ToInt32 首先执行 ToNumber 强制类型转换，比如 "123" 会先被转换为 123，然后再
 *        执行 ToInt32.
 */


console.log('\n' + '*'.repeat(66) + '\n');


/**
 * > 4.4.3 布尔值到数字的隐士强制类型转换
 *   -
 */
function onlyOne() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        // (1)
        if (arguments[i]) {
            sum += arguments[i];
        }
    }
    return sum == 1;
}
/* - (1)、当 arguments 参数大于 0, 且只有一个参数项 argument[i] 的值为 true, 才会执行
 *   if 判断内 sum + 1 的语句，当 sum 编程 1 时，当 return sum == 1; 既是
 *   return true;  */

let aa = true;
let bb = false;

console.log(onlyOne(bb, aa));  // true
console.log(onlyOne(bb, aa, aa));  // false
console.log(onlyOne(bb, aa, bb, bb, bb));  // true

console.log('\n');

let aaa = 42;
let bbb = 'abc';
let ccc;
let ddd = null;
if ((aaa && ddd) || ccc) {
    console.log('Yep!');
}


console.log('\n' + '*'.repeat(66) + '\n');


/**
 * > 4.4.6 符号(Symbol)的强制类型转换
 *   - ES6 中引入了符号类型，它的强制类型转换有一个坑，在这里必须提一下。 ES6 允许从符号到
 *     字符串的<显式强制类型转换>，然而<隐式强制类型转换>会产生错误，具体的原因不再本书讨论
 *     范围之内。
 */
let s1 = Symbol('cool');
console.log("String(s1): ", String(s1));    // String(s1):  Symbol(cool)

let s2 = Symbol("not Cool");
// - 符号不能够被强制类型转换为数字(显式和隐式都会产生错误)，但可以被强制类型转换为布尔值。(
//   显式和隐式结果都是 true).-
// console.log("s2 + '': ", (s2 + ""));    // TypeError




/**
 * > 4.5.3 比较少见的情况
 *   - 任意值与布尔值比较，都会将两边的值转化为Number。
 * */
console.log(Boolean([]));   // true

console.log(Boolean(false));

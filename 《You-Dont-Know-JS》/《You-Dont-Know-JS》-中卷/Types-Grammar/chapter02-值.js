/** # 第二章 - 值 */

/**
 * ## 第 5 章 -- 引用类型
 * - (1.) Object 类型
 * - (2.) Array 类型
 * - (3.) Date 类型
 * - (4.) RegExp 类型
 * - (5.) Function 类型
 * - (6.) 基本包装类型
 *  +  Boolean 类型
 *  +  Number 类型
 *  +  String 类型
 * - (7.) 单体内置对象
 *  + Global 对象
 *  + Math 对象
 *
 *
 */


/**
 * ## 2.5 值和引用
 * - JavaScript '对值'和'引用' 的 赋值/传递 在语法上是根据值的类型来决定。
 */
let a = 2;
// - b 是 a 的值的一个复本。 基本类型的值(scalar primitive)总是通过'值复制'的方式来
// 赋值/传递。包括 (null、undefined、字符串、数字、布尔和 ES6 中的 symbol)。
let b = a;
b++;
console.log(a); // 2
console.log(b); // 3

let c = [2, 3, 4];
// d 是 [2, 3, 4] 的一个引用。
// - 引用类型的值【复合值(compound value)】则总是通过"引用复制"的方式来 赋值/传递。
let d = c;
d.push(5);
console.log(c); // [2, 3, 4, 5]
console.log(d); // [2, 3, 4, 5]

// - 由于引用指向的是值本身而非变量，所以一个引用无法更改另一个引用的指向。
// 现在把 [7, 8, 9] 复制给变量 d
d = [7, 8, 9];
// print array d: [ 7, 8, 9 ]
console.log("print array d:", d);
// print array c again:  [ 2, 3, 4, 5 ]
console.log("print array c again: ", c);

// - 函数参数传值也遵循上面的法则:
function foo(x) {
    x.push(4);
    // foo function parameter x:  [ 1, 2, 3, 4 ]
    console.log("foo function parameter x: ", x);

    // 然后把一个新数组(引用类型)赋值给 x
    x = [4, 5, 6];
    x.push(7);
    // print foo parameter x again:  [ 4, 5, 6, 7 ]
    console.log("print foo parameter x again: ", x);
}

let arrA = [1, 2, 3];
foo(arrA);
// arrA:  [ 1, 2, 3, 4 ]
console.log("arrA: ", arrA);

/**
 * ### 3.2.2 函数作为返回值输出
 * - Object.prototype.toString.call(obj): 通过获取 Object 原型上的 toString方法，
 *   让方法中的 this 变为需要检测的数据类型，并且让方法执行。
 */

const obj = {name: "WANG"};
const str = "250";
const bool = true;
const arr = [20, 30];
console.log(Object.prototype.toString.call(obj));     // [object Object]
console.log(Object.prototype.toString.call(str));     // [object String]
console.log(Object.prototype.toString.call(bool));    // [object Boolean]
console.log(Object.prototype.toString.call(arr));     // [object Array]

// 简单封装
let getType = function(obj) {
    return Object.prototype.toString.call(obj)
};

// getType(str): [object String]
console.log("getType(str):", getType(str));
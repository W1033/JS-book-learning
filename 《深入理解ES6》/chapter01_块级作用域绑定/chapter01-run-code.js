


// - P12 用 var 声明的全局变量会自动添加为全局对象(window)的属性，
//   但 let 和 const 声明变量则不会。 例:
var name = "Wang";
// console.log(name === window.name); // true 在浏览器中运行,编辑器环境中不存在 window 对象
const sex = "male";
// console.log("sex" in window);    // false

/**
 * - 当前使用块级绑定的最佳实践是: 默认使用 const, 只在确定需要改变变量的值时使用 let。
 *   这样就可以在某种程度上实现代码的不可变，从而防止某些错误的产生。
 */

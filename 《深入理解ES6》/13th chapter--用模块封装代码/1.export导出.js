// Date: 2017/12/22.

/**
 * 1.什么是模块？:
 *      模块是自动运行在严格模式下(strict mode)并且没有办法退出运行的 javascript 代码。在模块顶部创建的变量不会自动被添加到全局共享作用域，
 *   这个变量仅在模块的顶级作用域中存在，而且模块必须导出一些外部代码可以访问的元素，如变量或函数。模块也可以从其他模块导入绑定。
 *      在模块的顶部，this 的值是 undefined; 模块的真正魔力所在是仅导出和导入你需要的绑定，而不是将所用东西都放到一个文件。只有很好地理解了
 *   导出和导入才能理解模块与脚本的区别。
 */

/** 1. 导出基本语法 */

// 导出数据
export var color = "green";
export let name = "Nicholas";
export const magicNumber = 7;

// 导出函数
export function sum(num1, num2) {
    return num1 + num2;
}

// 导出类
export class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
}

// 这个函数是私有模块
function substract(num1, num2) {
    return num1 - num2
}

// 定义一个函数。。。  之后再将他导出
function multiply(n1, n2) {
    return n1 * n2
}

// 导出上面的multiply
export {multiply};

// 导出默认值
// 1. 由于函数被模块所代表，因而它不需要一个名称。
export default function (num1, num2) {
    return num1 + num2;
};
// 2. 导出一个对象
export default {
    name: "app",
    welcome() {
        return {
            msg: "Welcome to Your Vue.js App"
        }
    }
}

// 导出一个匿名类(就是到处一个构造函数，构造函数的名字在导入文件中自定义)
export default class {
    constructor(x,y ) {
        this.x = x;
        this.y = y;
    }
}







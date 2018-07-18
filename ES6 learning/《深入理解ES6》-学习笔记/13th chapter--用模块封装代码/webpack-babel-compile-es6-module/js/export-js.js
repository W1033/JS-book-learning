// 导出数据
export let color = "green";
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

// 导出上面的multiply --> 提示: 此时导出时multiply外需要加大括号，书上此处有错误
export {multiply};
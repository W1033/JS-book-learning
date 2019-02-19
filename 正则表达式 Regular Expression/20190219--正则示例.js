/**
 * @file: 记录示例
 * Create on 20190219
 *
 * */


const str = "foo";
// const reg = /foo{1,2}/;
const reg = new RegExp(/foo{1,2}/);
console.log(reg.test(str));
console.log(reg.exec(str));




// 替换字符为星号
let reg3 = /(doubi)/g,
    string = "Kid is a doubi";
// P127: ECMAScript 提供了 replace() 方法。这个方法接受两个参数：第一个参数可以是
// 一个 RegExp 对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。
string = string.replace(reg3, (word) => {
    return word.replace(/./g, "*")
});
console.log(string);  // Kid is a *****



/**
 * - 分组有四种类型:
 *  + () : 捕获型
 *  + (?:) : 非捕获型
 *  + (?=) : 正向前瞻型 (肯定表达式)
 *  + (?!) : 反向前瞻型 (否定表达式)
 * */

// `()`: 捕获型分组 --> 捕获与引用
let reg2 = /(\d{4})-(\d{2})-(\d{2})/;
let date = '2010-04-12';
if (reg2.test(date)) {
    console.log("RegExp.$1",RegExp.$1); // 2010
    console.log("RegExp.$2",RegExp.$2); // 04
    console.log("RegExp.$3",RegExp.$3); // 12
}

// (?:) : 非捕获型
let reg4 = /(?:\d{4})-(\d{2})-(\d{2})/;
let date4 = '2012-12-21';
if(reg4.test(date4)) {
    console.log(RegExp.$1);  // 12
    console.log(RegExp.$2)   // 21
}

// (?=) : 正向前瞻型 (肯定表达式)
let reg5 = /kid is a (?=doubi)/;
const string2 = "Kid is a doubi";
console.log(reg5.test('kid is a doubi'));  // true
console.log(reg5.test('kid is a shabi'));  // false


// (?!) : 反向前瞻型 (否定表达式)
let reg6 = /(kid is a (?=doubi))/;
console.log("reg6: ", reg6.test('kid is a doubi'));  // true


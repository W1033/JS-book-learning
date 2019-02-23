// Create on 20190223

/**
 * String 类型 (字符串类型) 的 replace() 方法:  P127 -- 5.6 基本包装类型
 * 接收2个参数: `replace("RegExp对象 | 一个字符串", "一个字符串 | 一个函数") `
 * 如果第 1 个参数是字符串，那么只会替换第一个子字符串。想要替换所有子字符串，
 * 唯一的办法就是提供一个正则表达式，而且要指定全局 (g) 标志。
 */
const text = "cat, bat, sat, fat";
let result = text.replace("at", "ond");
// "cond, bat, sat, fat"
console.log (result);
result = text.replace(/at/g, "ond");
// "cond, bond, sond, fond"
console.log(result);

// 替换字符为星号
let reg3 = /(doubi)/g,
    string = "Kid is a doubi";
// P127: replace() 方法接受两个参数：第一个参数可以是
// 一个 RegExp 对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。
string = string.replace(reg3, (word) => {
    return word.replace(/./g, "*")
});
console.log(string);  // Kid is a *****


/**
 * - test: RegExp 实例对象的方法 test (P107), 是用来检测字符串是否匹配某一个正则表达式，如果匹配返回 true, 反之为 fals
 * - match: 字符串的模式匹配方法。match 是获取正则匹配到的结果，以**数组的形式返回**
 + `"186a619b28".match(/\d+/g);  // ["186", "619", "28"]`
 *
 * */
console.log( "/\d+/.test(\"123\"): ", /\d+/.test("123"));   // true
console.log( "/\d+/.test(\"abc\"): ", /\d+/.test("abc"));   // false


const str = "foo";
// const reg = /foo{1,2}/;
const reg = new RegExp(/foo{1,2}/);
console.log("reg.test(str): ", reg.test(str));  // true
console.log("reg.exec(str): ", reg.exec(str));  // [ 'foo', index: 0, input: 'foo', groups: undefined ]



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



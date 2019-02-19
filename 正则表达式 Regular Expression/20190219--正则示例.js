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



/** `()`: 捕获型分组 --> 捕获与引用 */
var reg2 = /(\d{4})-(\d{2})-(\d{2})/;
var date = '2010-04-12';
if (reg2.test(date)) {
    console.log("RegExp.$1",RegExp.$1); // 2010
    console.log("RegExp.$2",RegExp.$2); // 04
    console.log("RegExp.$3",RegExp.$3); // 12
}
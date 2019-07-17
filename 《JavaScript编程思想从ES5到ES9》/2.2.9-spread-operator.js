/**
 * > 2.2.9 扩展运算符 (ES6)
 * - `...`(扩展运算符 spread operator): 可以用来 '卸除' 特定数组的中括号
 *   或特定对象的大括号。
 */

let obj01 = {name01: 'orange', amount01: 10};
let obj02 = {name02: 'blueberry', amount02: 5, origin: 'Thai'};
// 使用 扩展运算符 把 obj01 和 obj02 对象合并
let obj03 = {...obj01, ...obj02};

//obj03:  {
//   name01: 'orange',
//   amount01: 10,
//   name02: 'blueberry',
//   amount02: 5,
//   origin: 'Thai'
// }
// Notice: 这里 name01 和 name02 不重名，如果两个对象中存在名称相同的属性只会保留第二个。
console.log('obj03: ', obj03);



let greeting = ['Hi', 'Howdy', 'Hey, man', 'G\'day mate'];
let extended_greeting = ['Long time no see', 'Nice to meet you', 'Hiya', 
    ...greeting];

// [
//   'Long time no see',
//   'Nice to meet you',
//   'Hiya',
//   'Hi',
//   'Howdy',
//   'Hey, man',
//   "G'day mate"
// ]
console.log(extended_greeting);
console.log('');
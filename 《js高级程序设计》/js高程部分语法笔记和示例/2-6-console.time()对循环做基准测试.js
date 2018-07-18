/** 2018/2/6 */

// 使用 console.time() 和 console.timeEnd() 对循环做基准测试
console.time("Timer1");
var items = [];
var i = 0;
for (; i < 10000; i++) {
    items.push(i);
}
console.timeEnd("Timer1");
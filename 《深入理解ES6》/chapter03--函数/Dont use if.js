// Date: 20180501
// https://mp.weixin.qq.com/s/11FFrE__xWtdQGEsq1MUBA


// 假设我们有一个整数数组 integersArr，现在需要统计其中奇数的个数:
const integersArr = [1, 4, 5, 9, 0, -1, 5];


// 使用 if
let counter = 0;
integersArr.forEach(function (item) {
    const remainder = Math.abs(item % 2);
    if (remainder === 1) {
        counter++;
    }
});
console.log(counter);   // 5


// 不使用 if
let num = 0;
integersArr.forEach(function (item) {
    num += Math.abs(item % 2);
});
console.log(num);       // 5
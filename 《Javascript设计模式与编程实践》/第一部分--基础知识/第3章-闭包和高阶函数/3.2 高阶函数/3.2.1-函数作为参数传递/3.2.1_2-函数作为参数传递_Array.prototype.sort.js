/**
 * ### 3.2.1_2. Array.prototype.sort
 * - Array.prototype.sort 接受一个函数当参数，这个函数里面封装了数组元素的顺序规则
 *
 */

// 从小到大排列
let arr = [1, 3, 13, 5, 4, 6, 2, 9].sort(function(a, b) {
    return a - b;
});
// arr: [1, 2, 3, 4, 5, 6, 9, 13]
console.log("arr: ", arr);


// 从大到小排列
let arr2 = [1, 3, 13, 5, 4, 6, 2, 9].sort(function(a, b) {
    return b - a;
});
// arr2: [13, 9, 6, 5, 4, 3, 2, 1]
console.log("arr2: ", arr2);



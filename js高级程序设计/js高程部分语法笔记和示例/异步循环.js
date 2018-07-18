/** Created on 2018/1/12 */

var arr = new Array(999);

// fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。
arr.fill(1);


// 这里说一下 asyncForEach() 函数中第二个参数 handler 的语法问题: 正常情况下 asyncForEach 函数执行时是
// 按照代码顺序一行行执行，走到 else 时才把 handler 替换为了匿名函数，匿名函数执行先执行期内的代码，然后再执行
function asyncForEach(array, handler) {
    var t = setInterval(function () {
        if (array.length === 0) {
            clearInterval(t);
        } else {
            handler(arr.shift());
            console.log(arr.shift() + "1");
        }
    }, 0);
}

// 异步遍历
asyncForEach(arr, function (value) {
    console.log(value);
});


//同步遍历
// arr.forEach(function (value, index, arr) {
//     console.log(value);
// });
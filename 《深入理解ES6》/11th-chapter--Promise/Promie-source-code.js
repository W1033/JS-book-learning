// [js 异步之 Promise 源码分析] (https://juejin.im/entry/599968f6518825244630f809)
// https://download.csdn.net/download/tydqcjj/10036125

// 最簡單的異步執行
let basicAsync = (callback) => {
    setTimeout(()=> { callback(1) }, 1000)
};
basicAsync(function(data) { console.log(data) });   // 1s 后輸出1



// 添加代码执行错误时给出提示
let maybeAfterOneSecond = function(callback, errorback) {
    setTimeout(function() {
        // 进行判断情况，是执行成功的回调，还是执行错误的回调
        if (Math.random() < .5) {
            callback("输出1");
        } else {
           errorback(new Error("Can't provide one."))
        }
    }, 1000);
};
maybeAfterOneSecond(
    function(data) { console.log(data); },
    function(err) { console.log(err); }
);

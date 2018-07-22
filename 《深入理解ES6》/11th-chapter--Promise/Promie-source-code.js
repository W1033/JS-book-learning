// js 异步之 Promise 源码分析 ()


// 最簡單的異步執行
let basicAsync = (callback) => {
    setTimeout(()=> { callback(1) }, 1000)
};
basicAsync(function(data) { console.log(data) });   // 1s 后輸出1



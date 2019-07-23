/**
 * ### 3.2 高阶函数
 * - 高阶函数是指至少满足下列条件之一的函数：
 *     + 函数可以作为参数被传递。
 *     + 函数可以作为返回值输出。
 *
 */

// 把函数作为参数传递 -- 1.回调函数

// 示例1 -- Ajax 回调函数
let getUserInfo = function(userId, callback) {
    $.get('http://xxx.com/getUserInfo?' + userId, function(data) {
        if (typeof callback === 'function') {
            callback(data);
        }
    })
};

getUserInfo(13157, function(data) {
    console.log(data.userName);
});


// 示例2 -- 在页面中创建 100 个 div 节点，然后把这些 div 节点都设置为隐藏。
(function() {
    let appendDiv = function(callback) {
        for (let i=0; i < 100; i++) {
            let div = document.createElement('div');
            div.innerHTML = i;
            document.body.appendChild(div);
            if (typeof callback === "function") {
                callback(div);
            }
        }
    };

    // 我们把 div.style.display = 'none' 抽出来，用回调函数的形式传入 appendDiv 方法：
    appendDiv(function(node) {
        node.style.display = 'none';
    });
})();


# Github fe-interview 仓库笔记
> [仓库地址](https://github.com/haizlin/fe-interview/blob/master/category/history.md)

## 20190417 (17 Apr 2019)
> **1. 页面导入样式时, 使用 `link` 和 `@import` 有什么区别?**
- (1) `link` 是 `HTML` 标签, `@import` 是 `css` 提供的.
- (2) `link` 引入的样式页面加载时同时加载, `@import` 引入的样式需要等页面加载完成后
    再加载.
- (3) `link` 可以通过 js 操作 DOM 动态引入样式表改变样式, 而 `@import` 不可以.

> **2. 圣杯布局 和 双飞翼布局的理解和区别**

> **3. 用递归算法实现,数组长度为 5 且元素的随机数在 2 - 32 间不重复的值.**
- 这是一道大题目, 把考点拆成了 4 个小项; 需要候选人用递归算法实现 (限制 15 行
  代码以内实现; 限制时间为 10 分钟内完成):
    + <a> 创建一个长度为 5 的空数组 arr.
    + <b> 生成一个 (2 - 32) 之间的随机整数 random
    + <c> 把随机数插入到数组 arr 内, 如果数组内已存在 random 相同的数字, 则
      重新生成随机数并插入到 arr 内 (需要使用递归实现, 不能使用 for/while 等
      循环)
    + <d> 最终输出一个长度为 5, 且内容不重复的数组 arr.*
- ```javascript
    (function () {
        // - 1.使用 includes 做判断 +  生成固定长度数组
        function random(arr, length, min, max) {
            let num = Math.floor(Math.random() * (max - min + 1) + min);
            // - 这里不能用 indexOf(): 因为 indexOf 不能准确判断稀疏数组, 详见:
            //   /js-sundry-goods/JS--方法总结/20190920_indexOf_includes_的区别.html
            if (!arr.includes(num)) {
                arr.push(num);
            }
            return arr.length === length ? arr : random(arr, length, min, max);
        }
        var result = random([], 5, 2, 32);
        console.log(result);

        // ------

        // - 2.使用 object 实现去重 +  生成固定长度数组
        function randomArray(length, min, max, cache) {
            cache = cache || {};
            const random = Math.floor(Math.random()* (max - min +1) + min);
            if (!cache[random]) {
                length -= 1;
                cache[random] = true;
                console.log(cache);
            }

            // - Object.keys(): 取得对象上所有可枚举的实例属性
            // - Array.prototype.map(): 详见: 
            //   JS--方法总结/20190920_Array.prototype.map.js
            return length ? randomArray(length, min, max, cache): 
                Object.keys(cache).map(Number);
        }
        console.log(randomArray(5, 2, 32));
    })();

    // - Object 和 Array.prototype.includes 去重性能对比代码:
    (function() {
        const arr = [];
        const obj = {};
        const len = 1000;
        for (let i = 0; i <= len; i++) {
            arr.push(i);
            obj[i] = true;
        }

        console.time("Array.includes");
        for (let i = 0; i <= len; i++) {
            arr.includes(i);
        }
        console.timeEnd("Array.includes");

        console.time("Object.keys");
        for (let i = 0; i <= len; i++) {
            // obj[i];
            if (i === len) {
                // - 
                Object.keys(obj).map(Number);
            }
        }
        console.timeEnd("Object.keys");
    })();
  ```    
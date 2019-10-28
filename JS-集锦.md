# JavaScript 集锦

- SetTimeout() 第三个参数:
    + `setTimeout(function, delay, parameter1, parameter2)` 第 3 个参数及以后
      的参数都可以作为 function 函数的参数. 举个例子:
    + ```javascript
        function a(x, y) {
            console.log(x, y);
        }
        setTimeout(a, 1000, 2, 3);
      ```
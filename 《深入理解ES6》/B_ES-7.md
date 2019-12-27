# Appendix B: Understanding ECMAScript7 (2016)

## 内容 (Content)
### 1. 指数运算 `**` 
+ ES7 引入的唯一一个 js 语法变化是 求幂运算符 (`**`), 它是一种将指数应用于基数的数学
      运算. js 已有的 `Math.pow(基数, 指数)` 方法可以执行求幂运算, 但它也是为数不多的
      需要通过方法而不是正式的运算符来进行求幂运算的语言之一. 
    + 求幂运算符是两个星号 (`**`): 左操作数是基数, 右操作是指数. 例如:
      ```javascript
        let result = 5 ** 2;
        console.log(result);    // 25
        console.log(result === Math.pow(5, 2)); // true
      ```  
1. **运算顺序**
    + 求幂运算符在 js 所有二进制运算符中具有最高的优先级 (一元运算符的优先级高于 `**`), 
      这意味着它首先应用于所有复合操作, 如此示例所示:
      ```javascript
        let result = 2 * 5 **2;
        // - 先计算 5 的平方, 然后将得到的值再乘以 2
        console.log(result);    // 50
      ```
1. **运算限制**
     + 前缀 `++` 或 `--` 会在其他所有操作发生之前更改操作数, 而后缀版本直到整个表达式被
      计算过后才会进行改变. 这两个用法在运算符左侧都是安全的, 代码如下:
      ```javascript
        let num1 = 2,
            num2 = 2;
        console.log(++num1 ** 2);   // 9
        console.loog(num1); // 3

        console.log(num2-- ** 2);   // 4
        console.log(num);   // 1
      ```  
### 2. `Array.prototype.includes()` 方法
1. 如何使用 `Array.prototype.includes()` 方法
    + 使用见: `JS--方法总结\20190920_indexOf_includes_的区别.html`
1. 值的比较

### 3.函数作用域严格模式的一处改动
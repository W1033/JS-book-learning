# A ES6 中较小的改动 

## 内容(Content)
### 1.使用整数 (Working with Integers)
1. 识别整数 (Identifying Integers) `Number.isInteger()`
    + ES6 添加了 `Number.isInteger()` 方法来确定一个值是否为 js 整数类型. 虽然 js 
      使用 IEEE 754 编码系统来表示 2 种类型的数字, 但浮点数与整数的存储方式不同, 
      Number.isInteger() 方法则利用了这种存储的差异, 当调用该方法并传入一个值时, 
      js 引擎会查看该值的底层表示方式来确定该值是否为整数. 因此, 如果这些数字看起来像
      浮点数, 却存储为整数, Number.isInteger() 方法会返回 true, 例如:
      ```javascript
        console.log(Math.isInteger(25));    // true
        console.log(Math.isInteger(25.0));  // true
        console.log(Math.isInteger(25.1));  // false
      ```
2. 安全的整数 (Safe Integers) `Number.isSafeInteger()`
    + IEEE 754 编码系统只能准确地表示 $-2^{53} - 2^{53}$ 之间的整数, 在这个 "安全"
      范围之外, 则通过重用二进制来表示多个数值. 所以在问题尚未凸显时, js 只能安全地表示
      IEEE 754 范围内的整数. 例如, 看这段代码:
      ```javascript
        console.log(Math.pow(2, 53));   // 9007199254740992
        console.log(Math.pow(2, 53) + 1);   // 9007199254740992
      ``` 
    + 因此 ES6 引入了 `Number.isSafeInteger()` 方法来识别语言可以准确表示的整数,
      添加了 `Number.MAX_SAFE_INTEGER` 属性和 `Number.MIN_SAFE_INTEGER` 属性
      来分别表示整数范围的上限与下限. Number.isSafeInteger() 方法可以来确保一个值是
      整数, 并且落在整数值的安全范围内, 如下例所示:
      ```javascript
        var inside = Number.MAX_SAFE_INTEGER;
        var outside = inside + 1;
        console.log(Number.isInteger(inside)); // true
        console.log(Number.isSafeInteger(inside)); // true

        console.log(Number.isInteger(outside)); // true
        console.log(Number.isSafeInteger(outside)); // false
      ```
### 2. 新的 Math 方法 (New Math Methods)
- 游戏与图形计算重要性的俱增使得 ES6 在给 js 引入了 **类型数组 (typed array)** 的同时
  也意识到 JavaScript 引擎应该更有效率的处理很多数学运算。但是诸如 ams.js 的优化策略, 
  一方面利用一部分 js 来提升性能, 但是也需要更多信息才能以最快的速度执行计算. 例如，
  基于硬件(hardware-based) 的操作远比 基于软件(software-based) 的操作快得多, 
  能够区分 32 位整数与 64 位浮点数对这些操作来说至关重要.
- 于是，ECMAScript 6 给 Math 对象添加了几个方法来提升常用的数学运算的性能，同时包含
  大量数学运算的应用性能也会提升，比如图形编程（graphics program）。下面列出了这些新
  的方法：
    + `Math.acosh(x)`: 返回 x 的反双曲余弦值
    （Returns the inverse hyperbolic cosine of x）。
    + `Math.asinh(x)`: 返回 x 的反双曲正弦值
     （Returns the inverse hyperbolic sine of x）。
    + `Math.atanh(x)`: 返回 x 的反双曲正切值
     （Returns the inverse hyperbolic tangent of x）。
    + `Math.cbrt(x)`: 返回 x 的立方根
     （Returns the cubed root of x）。
    + `Math.clz32(x)`: 返回 x 以 32 位整型数字的二进制表达形式开头为 0 的个数
     （Returns the number of leading zero bits in the 32-bit integer representation of x）。
    + `Math.cosh(x)`: 返回 x 的双曲余弦值
     （Returns the hyperbolic cosine of x）。
    + `Math.expm1(x)`: 返回 e - 1 的值
     （Returns the result of subtracting 1 from the exponential function of x）。
    + `Math.fround(x)`: 返回最接近 x 的单精度浮点数
     （Returns the nearest single-precision float of x）。
    + `Math.hypot(...values)`: 返回参数平方和的平方根
     （Returns the square root of the sum of the squares of each argument）。
    + `Math.imul(x, y)`: 返回两个参数之间真正的 32 位乘法运算结果
     （Returns the result of performing true 32-bit multiplication of the two arguments）。
    + `Math.log1p(x)`: 返回以 自然对数为底的 x + 1 的对数
     （Returns the natural logarithm of 1 + x）。
    + `Math.log10(x)`: 返回以 10 为底 x 的对数
      (Returns the base 10 logarithm of x.)
    + `Math.log2(x)`: 返回以 2 为底 x 的对数
     （Returns the base 2 logarithm of x）。
    + `Math.sign(x)`: 如果 x 为负数返回 -1；+0 和 -0 返回 0；正数则返回 1
     （Returns -1 if the x is negative, 0 if x is +0 or -0, or 1 if x is positive）。
    + `Math.sinh(x)`: 返回 x 的双曲正弦值
     （Returns the hyperbolic sine of x）。
    + `Math.tanh(x)`: 返回 x 的双曲正切值
     （Returns the hyperbolic tangent of x）。
    + `Math.trunc(x)`: 移除浮点类型小数点后面的数字并返回一个整型数字
     （Removes fraction digits from a float and returns an integer）。
### 3. Unicode 标识符
- 略
### 4. 正式化 `__proto__` 属性
- 尽管应该避免使用 `__proto__`属性, 但是需要注意规范定义概述性的方式. 在 ES6 引擎中 
  `Object.prototype.__proto__` 被定义为一个访问器属性, 其 `get` 方法会调用 
  `Object.getPrototypeOf()`(getPrototypeOf 取得原型) 方法, 其 `set` 方法会调用 
  `Object.setPrototypeOf()`方法. 因此, 使用 `__proto__` 和使用 
  `Object.getPrototypeOf()` 方法或 `Object.setPrototypeOf()`方法的区别在于, 
  `__proto__` 可以直接设置对象字面量的原型. 以下代码展示了二者的区别:
  ```javascript
    let person = {
        getGreeting() {
            return "Hello";
        }
    };
    let dog = {
        getGreeting() {
            return "Woof";
        }
    };
    // - 原型是 person
    let friend = {
        __proto__: person
    };
    console.log(friend.getGreeting());  // "Hello"
    console.log(Object.getPrototypeOf(friend) === person);  // true
    console.log(friend.__proto__ === person);   // true

    // - 将 friend 的原型设置为 dog
    friend.__proto__ = dog;
    console.log(friend.getGreeting());  // "Woof"
    console.log(Object.getPrototypeOf(friend) === dog);  // true
    console.log(friend.__proto__ === dog);   // true
  ```
- 此示例没有通过调用 `Object.create()`(详见 P82 的示例代码) 方法来创建 friend 对象,
  而是创建一个标准对象字面量, 并将一个值赋给 __proto__ 属性. 而另一方面, 当使用
  `Object.create()`方法创建对象时, 必须为对象的任意附加属性制定完整的属性描述符.
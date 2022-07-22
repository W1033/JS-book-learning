# 第 7 章 -- 函数表达式

## 本章目录 (Catalog)


## 生词 (New Words)


## 本章内容 (Content)
> **7.1 递归:**
  ```javascript
      // 递归: 用命名函数表达式实现递归。可以在严格模式和非严格模式下都行得通。
      let factorial = (function f(num) {
          if (num <= 1) {
              return 1;
          } else {
              return num * f(num - 1);
          }
      });
      console.log(factorial(4));      // 24
  ```
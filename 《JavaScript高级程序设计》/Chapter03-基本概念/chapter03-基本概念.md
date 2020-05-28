# 第 3 章 -- 基本概念

## 本章目录 (Catalog)



## 生词 (New Words)
- **continue [kən'tɪnjuː] --vt.继续**


## 本章内容 (Content)

### 3.1
#### 3.1.2 标识符:
- 所谓标识符，就是指变量、函数、属性的名字，或者函数的参数。

### 3.2


### 3.3 

### 3.4 数据类型
- 最新的 ECMAScript 标准定义了 8 种数据类型: 
    + 7 种原始类型: 
        * `Undefined` (未定义): 
            + Undefined 类型, 一个没有被赋值的变量会有一个默认值 undefined.
        * `Null` (空值): 
            + Null 类型只有一个值: null。
        * `Boolean` (布尔值): 
            + 布尔类型表示一个逻辑实体，有两个值: true 和 false
        * `Number` (数字)
        * `String` (字符串)
        * `Symbol` (符号， ES6 中新增)
        * `BigInt` 
    + 和 `Object`
        * 复杂数据类型.
- 原始值 (primitive values): 除 Object 以外的所有类型都是不可变的 (值本身无法被改变)
  . 例如, 与 C 语言不同, JavaScript 中字符串是不可变的. (译注: js 中对字符串的操作一定
  返回了一个新字符串, 原始字符串并没有被改变). 我们成这些类型的值为 "原始值".    
- [文档来源](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)  

### 3.5 
#### 3.5.8 条件操作符(三目运算符 / 条件运算符)
- 条件操作符应该算是 ECMAScript 中最灵活的一种操作符了，而且它遵循与 Java 
  中的条件操作符相同的语法形式，如下面的例子所示:
  ```js 
    variable = boolean_expression ? true_value : false_value;
  ```
  本质上，这行代码的含义就是基于对 `boolean_expression` 求值的结果，
  决定给变量 `variable` 赋什么值。如果求值结果为 `true`，则给变量
  `variable` 赋 `true_value` 值；如果求值结果为 `false`，则给变量
  `variable` 赋 `false_value`
  值。再看一个例子:
  ```js
    var max = (num1 > num2) ? num1 : num2;
  ```
  在这个例子中，`max` 中将会保存一个最大的值。这个表达式的意思是: 如果 `num1` 大于
  `num2`（关系表达式返回 `true`），则将 `num1` 的值赋给 `max`；如果 `num1`
  小于或等于 `num2`（关系表达式返回 `false`），则将 `num2` 的值赋给 `max`。

### 3.6 语句 --> 3.6.7 break 和 continue 语句
break 和 continue 语句用于在循环中精确地控制代码的执行。
- break 语句会立即退出循环，强制继续执行循环后面的语句。
    + ```javascript
        function breakExample() {
            var num = 0;
            for (var i =1; i < 10; i++) {
                if (i % 5 === 0) {
                    break;
                }
                num++;
            }
            return num;
        }
        console.log(breakExample())
      ```
- continue 语句虽然也是立即退出循环，但退出循环后会从循环的顶部继续执行。
    + ```javascript
        function continueExample() {
            var num = 0;
            for (var i =1; i < 10; i++) {
                if (i % 5 === 0) {
                    continue;
                }
                num++;
            }
            return num;
        }
        console.log(continueExample())
      ```

### 3.7 函数 
#### 3.7.1 理解参数
- 其实，arguments 对象只是与数组类似 (它并不是 Array 的实例),
  因为可以使用方括号语法访问它的每一个元素 (arguments[0]、arguments[1]), 
  使用 length 属性来确定传递进来多少个参数。

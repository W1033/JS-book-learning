# 第 3 章 -- 基本概念

## Catalog
- 3.1 语法
    + 3.1.1 区分大小写 
    + 3.1.2 标识符
    + 3.1.3 注释
    + 3.1.4 严格模式
    + 3.1.5 语句
- 3.2 关键字和保留字
- 3.3 变量
- 3.4 数据类型
    + 3.4.1 `typeof` 操作符
    + 3.4.2 Undefined 类型
    + 3.4.3 Null 类型 
    + 3.4.4 Boolean 类型
    + 3.4.5 Number 类型
    + 3.4.6 String 类型
    + 3.4.7 Object 类型
- 3.5 操作符
    + 3.5.1 一元操作符
    + 3.5.2 位操作符
    + 3.5.3 布尔操作符
    + 3.5.4 乘性操作符
    + 3.5.5 加性操作符
    + 3.5.6 关系操作符
    + 3.5.7 相等操作符
    + 3.5.8 条件操作符
    + 3.5.9 赋值操作符
    + 3.5.10 逗号操作符
- 3.6 语句
    + 3.6.1 if 语句
    + 3.6.2 do-while 语句
    + 3.6.3 while 语句
    + 3.6.4 for 语句
    + 3.6.5 for-in 语句
    + 3.6.6 label 语句
    + 3.6.7 break 和 continue 语句
    + 3.6.8 with 语句 
    + 3.6.9 switch 语句
- 3.7 函数
    + 3.7.1 理解参数
    + 3.7.2 没有重载
- 3.8 小结




## 生词 (New Words)
- **continue [kən'tɪnjuː] --vt.继续**
- **finite ['faɪnaɪt] --adj.有限的, 限定的.  --n.有限之物**
    + the finite is not commensurable with the infinite.
      有限和无限是不能用同一标准来衡量的. 
    + a finite number of possibilities. 有限的的可能. 
    + Yes, oil is a finite resource, and yes, burning oil harms the 
      environment. 是的, 石油是不可再生资源；是的, 使用石油会造成环境污染. 
- **infinite ['ɪnfɪnət] --adj.无穷的, 无限的；无数的. --n.无限, 无穷大**
    + infinite importance. 非常重要
    + a person of infinite (literature [ˈlitəritʃə] --n.文学, 文献). 学士广博的人. 




## Content
### 3.1 语法
#### 3.1.1 区分大小写 

#### 3.1.2 标识符
- 所谓标识符, 就是指变量、函数、属性的名字, 或者函数的参数. 

#### 3.1.3 注释

#### 3.1.4 严格模式

#### 3.1.5 语句


### 3.2 关键字和保留字


### 3.3 变量


### 3.4 数据类型
- 最新的 ECMAScript 标准定义了 8 种数据类型: 
    + 7 种原始类型: 
        * `Undefined` (未定义): 
            + Undefined 类型, 一个没有被赋值的变量会有一个默认值 undefined.
        * `Null` (空值): 
            + Null 类型只有一个值: null. 
        * `Boolean` (布尔值): 
            + 布尔类型表示一个逻辑实体, 有两个值: true 和 false
        * `Number` (数字)
        * `String` (字符串)
        * `Symbol` (符号,  ES6 中新增)
        * `BigInt` 
    + 和 `Object`
        * 复杂数据类型.
- 原始值 (primitive values): 除 Object 以外的所有类型都是不可变的
  (值本身无法被改变). 例如, 与 C 语言不同, JavaScript 中字符串是不可变的.
  (译注: js 中对字符串的操作一定返回了一个新字符串, 原始字符串并没有被改变).
  我们成这些类型的值为 "原始值".    
  
  [文档来源](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)  
#### 3.4.1 `typeof` 操作符

#### 3.4.2 Undefined 类型

#### 3.4.3 Null 类型 

#### 3.4.4 Boolean 类型

#### 3.4.5 Number 类型
- Number 类型应该是 ECMAScript 中最令人关注的数据类型了, 这种类型使用
  `IEEE754 格式` 来表示**整数**和**浮点数**值
  (浮点数值在某些语言中也被称为双精度数值). 为支持各种数值类型, ECMA-262
  定义了不同的数值字面量格式. 
  
  最基本的数值字面量格式是十进制整数, 十进制整数可以像下面这样直接在代码中输入: 
  ```js
    var intNum = 55; // 整数
  ```
  除了以十进制表示外, 整数还可以通过八进制(以 8 为基数)或十六进制(以 16 为基数)
  的字面值来表示. 其中, 八进制字面值的第一位必须是零( 0), 然后是八进制数字序列
  ( 0～ 7). 如果字面值中的数值超出了范围, 那么前导零将被忽略, 
  后面的数值将被当作十进制数值解析. 请看下面的例子: 
  ```js
    var octalNum1 = 070;    // 八进制的 56
    var octalNum2 = 079;    // 无效的八进制数值——解析为 79
    var octalNum3 = 08;     // 无效的八进制数值——解析为 8
  ```
  八进制字面量在严格模式下是无效的, 会导致支持的 JavaScript 引擎抛出错误. 

  十六进制字面值的前两位必须是 0x, 后跟任何十六进制数字( 0～ 9 及 A～ F). 其中, 
  字母 A～ F 可以大写, 也可以小写. 如下面的例子所示: 
  ```js
    var hexNum1 = 0xA;      // 十六进制的 10
    var hexNum2 = 0x1f;     // 十六进制的 31
  ```
  在进行算术计算时, 所有以八进制和十六进制表示的数值最终都将被转换成十进制数值. 

  Note: 鉴于 JavaScript 中保存数值的方式, 可以保存正零(+0)和负零(-0). 
  正零和负零被认为相等, 但为了读者更好地理解上下文, 这里特别做此说明. 
##### 3.4.5.1 浮点数值
##### 3.4.5.2 数值范围
- 由于内存的限制,  ECMAScript 并不能保存世界上所有的数值.  ECMAScript
  能够表示的最小数值保存在 `Number.MIN_VALUE` 中 -- 在大多数浏览器中, 这个值是
  $5e-324$; 能够表示的最大数值保存在 `Number.MAX_VALUE` 中 --
  在大多数浏览器中, 这个值是 $1.7976931348623157e+308$. 
  如果某次计算的结果得到了一个超出 JavaScript 数值范围的值, 
  那么这个数值将被自动转换成特殊的 `Infinity` 值. 具体来说, 如果这个数值是负数, 
  则会被转换成 `-Infinity`(负无穷), 如果这个数值是正数, 则会被转换成
  `Infinity`(正无穷). 
  
  如上所述, 如果某次计算返回了正或负的 `Infinity` 值, 
  那么该值将无法继续参与下一次的计算, 因为 `Infinity` 不是能够参与计算的数值. 
  要想确定一个数值是不是有穷的(换句话说, 是不是位于最小和最大的数值之间),
  可以使用 `isFinite()` 函数. 这个函数在参数位于最小与最大数值之间时会返回 true, 
  如下面的例子所示: 
  ```js
    var result = Number.MAX_VALUE + Number.MAX_VALUE;
    alert(isFinite(result)); //false
  ```
尽管在计算中很少出现某些值超出表示范围的情况, 但在执行极小或极大数值的计算时, 检测监控
这些值是可能的, 也是必需的. 
##### 3.4.5.3 **NaN**
- `NaN`, 即非数值(Not a Number)是一个特殊的数值,
  这个数值用于表示一个本来要返回数值的操作数未返回数值的情况(这样就不会抛出错误了).
  例如, 在其他编程语言中, 任何数值除以 0 都会导致错误, 从而停止代码执行.
  但在 ECMAScript 中, 任何数值除以 0 会返回 `NaN`① [① 原书如此,
  但实际上只有 0 除以 0 才会返回 `NaN`, 正数除以 0 返回 `Infinity`, 负数除以 0
  返回`-Infinity`.], 因此不会影响其他代码的执行. 

  `NaN` 本身有两个非同寻常的特点. 首先, 任何涉及 `NaN` 的操作(例如 NaN/10)
  都会返回 `NaN`, 这个特点在多步计算中有可能导致问题. 其次,  `NaN` 与任何值都不相等,
  包括 `NaN` 本身. 例如, 下面的代码会返回 false:
  ```js
    alert(NaN == NaN); //false
  ```
  针对 NaN 的这两个特点,  ECMAScript 定义了 `isNaN()` 函数.
  这个函数接受一个参数, 该参数可以是任何类型, 而函数会帮我们确定这个参数是否
  "不是数值". `isNaN()` 在接收到一个值之后, 会尝试将这个值转换为数值.
  某些不是数值的值会直接转换为数值, 例如字符串 "10" 或 Boolean 值.
  而任何不能被转换为数值的值都会导致这个函数返回 true. 请看下面的例子:
  ```js
    alert(isNaN(NaN));      // true
    alert(isNaN(10));       // false( 10 是一个数值)
    alert(isNaN("10"));     // false(可以被转换成数值 10)
    alert(isNaN("blue"));   // true(不能转换成数值)
    alert(isNaN(true));     // false(可以被转换成数值 1)
  ```
  Note: 尽管有点儿不可思议, 但 `isNaN()` 确实也适用于对象。在基于对象调用
  `isNaN()` 函数时, 会首先调用对象的 `valueOf()` 方法,
  然后确定该方法返回的值是否可以转换为数值。如果不能, 则基于这个返回值再调用
  `toString()` 方法, 再测试返回值。而这个过程也是 ECMAScript
  中内置函数和操作符的一般执行流程, 更详细的内容请参见 3.5 节.

##### 3.4.5.4 数值转换
- 有 3 个函数可以把非数值转换为数值:
    + (1) `Number()`, 
    + (2) `parseInt()`, 
    + (3) `parseFloat()`.

  第一个函数, 即转型函数 `Number()` 可以用于任何数据类型,
  而另两个函数则专门用于把字符串转换成数值. 这 3
  个函数对于同样的输入会有返回不同的结果.


#### 3.4.6 String 类型

#### 3.4.7 Object 类型


### 3.5 操作符
#### 3.5.1 一元操作符

#### 3.5.2 位操作符

#### 3.5.3 布尔操作符

#### 3.5.4 乘性操作符

#### 3.5.5 加性操作符

#### 3.5.6 关系操作符

#### 3.5.7 相等操作符

#### 3.5.8 条件操作符(三目运算符 / 条件运算符)
- 条件操作符应该算是 ECMAScript 中最灵活的一种操作符了, 而且它遵循与 Java 
  中的条件操作符相同的语法形式, 如下面的例子所示:
  ```js 
    variable = boolean_expression ? true_value : false_value;
  ```
  本质上, 这行代码的含义就是基于对 `boolean_expression` 求值的结果, 
  决定给变量 `variable` 赋什么值. 如果求值结果为 `true`, 则给变量
  `variable` 赋 `true_value` 值；如果求值结果为 `false`, 则给变量
  `variable` 赋 `false_value`
  值. 再看一个例子:
  ```js
    var max = (num1 > num2) ? num1 : num2;
  ```
  在这个例子中, `max` 中将会保存一个最大的值. 这个表达式的意思是: 如果 `num1` 大于
  `num2`(关系表达式返回 `true`), 则将 `num1` 的值赋给 `max`；如果 `num1`
  小于或等于 `num2`(关系表达式返回 `false`), 则将 `num2` 的值赋给 `max`. 
#### 3.5.9 赋值操作符

#### 3.5.10 逗号操作符


### 3.6 语句
#### 3.6.1 if 语句

#### 3.6.2 do-while 语句

#### 3.6.3 while 语句

#### 3.6.4 for 语句

#### 3.6.5 for-in 语句

#### 3.6.6 label 语句

#### 3.6.7 break 和 continue 语句
- break 和 continue 语句用于在循环中精确地控制代码的执行. 
- break 语句会立即退出循环, 强制继续执行循环后面的语句. 
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
- continue 语句虽然也是立即退出循环, 但退出循环后会从循环的顶部继续执行. 
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
#### 3.6.8 with 语句 

#### 3.6.9 switch 语句


### 3.7 函数
#### 3.7.1 理解参数
- 其实, arguments 对象只是与数组类似 (它并不是 Array 的实例),
  因为可以使用方括号语法访问它的每一个元素 (arguments[0]、arguments[1]), 
  使用 length 属性来确定传递进来多少个参数. 
#### 3.7.2 没有重载


### 3.8 小结




# 第 6 章 -- Symbol 和 Symbol 属性

## 本章目录 (Catalog)
- 6.1 创建 Symbol
- 6.2 Symbol 的使用方法
- 6.3 Symbol 共享体系
- 6.4 Symbol 与类型强制转换
- 6.5 Symbol 属性检索
- 6.6 通过 well-known Symbol 暴露内部操作
    + 6.6.1 Symbol.hasInstance 方法
    + 6.6.2 Symbol.isConcatSpreadable 属性
    + 6.6.3 Symbol.match, Symbol.replace, Symbol.search 和 Symbol.split 属性
    + 6.6.4 Symbol.toPrimitive 方法
    + 6.6.5 Symbol.toStringTag 属性
    + 6.6.6 Symbol.unscopables 属性

## 生词 (New Words)
- **spreadable ['spredəbl] --adj.可扩展的; 可涂抹的.**
    + The news soon spread to the farthest corner.  
      消息很快传到最远的角落.
- **species ['spiːʃiːz] --n.种类; 物种; 类**
    + birds of many species. 许多种的鸟
    + the human species = our species. 人类
    + a new species of watch. 新型表
    + The species is[are] valuable. 这一物种很珍贵.
    + He felt a species of uneasiness. 他有一种不安的感觉.
- **unscopables --不适用**


## 本章内容 (Content)
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
  . 例如, 与 C 语言不同, JavaScript 中字符串是不可变的. (译注: JS
  中对字符串的操作一定返回了一个新字符串, 原始字符串并没有被改变).
  我们称这些类型的值为 "原始值".  
- [文档来源](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)  
- ```javascript
    // 20190621- add: https://github.com/lukehoban/es6features#symbols
    let MyClass = (function() {
        // module scoped symbol
        const key = Symbol('key');
        function MyClass(privateData) {
            this[key] = privateData;
        }
        MyClass.prototype = {
            constructor: MyClass,
            doStuff: function() {
                // ... this[key] ...
            }
        };
        return MyClass;
    })();
    let c = new MyClass('Hello');
    console.log(c['key'] === undefined);
  ```

### 6.1 创建 Symbol
- 可以通过全局的 Symbol 函数创建一个 Symbol, 就像这样:
  ```js
    let firstName = Symbol();
    let person = {};
    person[firstName] = "Nicholas";
    console.log(person[firstName]); // "Nicholas"
  ```
- Symbol 函数接受一个可选参数，其可以让你添加一段文本来描述即将创建的 Symbol, 这段
  描述不可用于属性访问，主要用于阅读代码和调试 Symbol 程序。 Symbol 的描述被存储在
  内部的 `[[Description]]` 属性中，只有当调用 Symbol 的 toString() 方法时才可以
  读取这个属性。在执行 console.log() 时隐式调用了 firstName 的 toString() 方法,
  所以它的描述会被打印到日志中, 但不能直接在代码里访问 `[[Description]]`
  ```javascript
    let firstName = Symbol("first name");
    let person = {};
    person[firstName] = "Nicholas";
    console.log("first name" in person);    // false
    console.log(person[firstName]);         // Nicholas
    console.log(firstName);                 // Symbol(first name) 
  ```
- Symbol 的辨识方法
    + Symbol 是原始值，且 ECMAScript6 同时扩展了 typeof 操作符，支持返回 
      "Symbol", 所以可以用 typeof 来检测变量是否为 Symbol 类型。
      ```javascript
        let symbol = Symbol("test symbol");
        console.log(typeof symbol); // "symbol" 
      ```
    + 通过其他间接方式也可以检测变量是否为 Symbol 类型，但是 typeof 操作符是
      最准确也是你最应首选的检测方式。  

### 6.2 Symbol 的使用方法
- 所有使用可计算属性名的地方, 都可以使用 `Symbol`. 前面我们看到的都是在括号中使用 
  `Symbol`, 事实上, `Symbol` 也可以用于计算对象字面量属性名,
  `Object.defineProperty()` 方法和 `Object.defineProperties()` 方法的调用过程中.
  ```js
    let firstName = Symbol('first name');
    // - 使用一个可计算对象字面量属性
    let person = {
        [firstName]: 'Nicholas'
    };
    // - 将属性设置为只读. 通过可计算对象字面量属性语法为 person 对象创建了一个 
    //   Symbol 属性 firstName. 
    Object.defineProperty(person, firstName, {writable: false});
     
    let lastName = Symbol('last name');
    Object.defineProperties(person, {
        [lastName]: {
            value: 'Zakas',
            writable: false
        }
    });

    console.log(person[firstName]); // 'Nicholas'
    console.log(person[lastName]);  // 'Zakas'
  ```

### 6.3 Symbol 共享体系
- 有时我们可能希望在不同的代码中共享同一个 Symbol, 例如，在你的应用中有两种不同的
  对象类型,但是你希望它们使用同一个 Symbol 属性来表示-个独特的标识符。一般而言，
  在很大的代码库中或跨文件追踪 Symbol 非常困难而且容易出错，出于这些原因，
  ECMAScript 6 提供了一个可以随时访问的全局 Symbol 注册表。
- 如果想创建一个可共享的 Symbol, 要使用 `Symbol.for()` 方法。它只接受一个参数,
  即将创建的 Symbol 的字符串标识符, 这个参数同样也被用作 Symbol 的描述, 就像这样:
  ```js
    // - Symbol.for() 方法首先在全局 Symbol 注册表中搜索键为 "uid" 的Symbol
    //   是否存在，如果存在，直接返回已有的 Symbol; 否则，创建一个新的 Symbol ,
    //   并使用这个键在 Symbol 全局注册表中注册，随即返回新创建的 Symbol。
    let uid = Symbol.for("uid");
    let obj = {};
    obj[uid] = "12345";
    console.log(obj[uid]);      // 12345
    console.log(uid);           // Symbol(uid)

    let uid2 = Symbol.for("uid");
    // - 在这个示例中，uid 和 uid2 包含相同的 Symbol 并且可以互换使用。第一次调用
    //   Symbol.for() 方法创建这个 Symbol, 第二次调用可以直接从 Symbol 的
    //   全局注册表中检索到这个 Symbol。
    console.log(uid === uid2);  // true
  ```
- 还有一个与 Symbol 共享有关的特性: 可以使用 `Symbol.keyFor()` 方法在 Symbol 
  全局注册表中检索与 Symbol 有关的键。e.g:
  ```js
    // - 注意, uid 和 uid2 都返回了 'uid' 这个键, 而在 Symbol 全局注册表中不存在
    //   uid3 这个 Symbol, 也就是不存在与之有关的键, 所以最终返回 undefined.
    let uid = Symbol.for("uid");
    console.log(Symbol.keyFor(uid));    // uid

    let uid2 = Symbol.for("uid");
    console.log(Symbol.keyFor(uid2));   // uid2
    
    let uid3 = Symbol("uid");
    console.log(Symbol.keyFor(uid3));  // undefined  
  ```
- Note: Symbol全局注册表是一个类似全局作用域的共享环境，也就是说你不能假设目前环境中
  存在哪些键。当使用第三方组件时，尽量使用 Symbol 键的命名空间以减少命名冲突.

### 6.4 Symbol 与类型强制转换
- 我们使用 console.log() 方法来输出 Symbol 的内容, 它会调用 Symbol 的 String() 
  方法并输出有用的信息. 也可以像这样直接调用 String() 方法来获得相同的内容.
  ```js
    let uid = Symbol.for('uid');
    // - String() 函数调用了 uid.toString() 方法, 返回字符串类型的 Symbol 描述
    //   里的内容.
    let desc = String(uid);
    console.log(desc);  // 'Symbol(uid)'

    // - 不可以将 Symbol 与一个字符串拼接, 会导致程序抛出错误. 将 uid02 与空字符串
    //   拼接, 首先要将 uid02 强制转换成为一个字符串, 而 Symbol 不可以被转换为字符串,
    //   故程序直接抛出错误.
    let uid02 = Symbol.for('uid02');
    let desc02 = uid02 + '';    // 报错

    // - 同样, 也不能将 Symbol 强制转换成数字类型. 将 Symbol 与每一个数学运算符混合
    //   使用都会导致程序抛出错误, 就像这样:
    let uid03 = Symbol.for('uid03');
    let sum = uid03 / 1;    // 报错
    // - 但是 Symbol 与 JavaScript 中的费控值类似, 其等价布尔值为 true, 所以逻辑操
    //   作符可以使用.
  ```

### 6.5 Symbol 属性检索
- `Object.keys()` 和 `Object.getOwnPropertyNames()` 方法可以检索对象中所有的属性:
    + `Object.keys()`返回对象中所有可枚举的属性名; 
    + `Object.getOwnPropertyNames()` 不考虑对象属性的可枚举性一律返回。
    
  然而为了保持 ES5函数的原有功能, 这两个方法都不支持 Symbol 属性, 而是在 ES6 添加了一个
  `Object.getOwnPropertySymbols()` 来检索对象中的 Symbol 属性。  
  此方法的返回值是一个包含所有 Symbol 自有属性的数组。 就像这样:
  ```js
    let uflag = Symbol("u flag");
    let obj = {
        // obj 有一个 名为 uflag 的 Symbol 属性
        [uflag]: "67890"
    };
    let symbols = Object.getOwnPropertySymbols(obj);
    console.log(symbols.length);        // 1
    console.log(symbols[0]);            // Symbol(u flag)
    console.log(obj[symbols[0]]);      // 67890
  ```


### 6.6 通过 well-known Symbol 暴露内部操作
- ES5 的一个中心主旨是将 js 中的一些 "神奇" 的部分暴露出来, 并详尽定义了这些开发者们
  在当时模拟不了的功能. ES6 延续了这个传统, 新标准中主要通过在原型链上定义与 Symbol
  相关的属性来暴露更多的语言内部逻辑.
- ES6 开放了以前 js 中常见的内部操作, 并通过预定义一些 well-known Symbol 来表示.
  每一个这类 Symbol 都是 Symbol 对象的一个属性, 例如 Symbol.match.
- 这些 well-known Symbol 包括:
    + `Symbol.hasInstance`: 一个在执行 `instanceof` 时调用的内部方法, 用于检测
      对象的继承信息.
    + `Symbol.isConcatSpreadable`: (is concat spreadable 可扩展的) 一个布尔值，
      用于表示当传递一个集合作为 `Array.prototype.concat()` 方法的参数时，是否应该
      将集合内的元素规整到同一层级。
    + `Symbol.iterator`: 一个返回迭代器（将在第 8 章讲解）的方法。
    + `Symbol.match`: 一个在调用 `String.prototype.match()` 方法时调用的方法, 
      用于比较字符串。
    + `Symbol.replace`: 一个在调用 `String.prototype.replace()` 方法时调用的
      方法，用于替换字符串的子串。
    + `Symbol.search`: 一个在调用 `String.prototype.search()` 方法时调用的方法,
      用于在字符串中定位子串。
    + `Symbol.species`: 用于创建派生类（将在第 9 章讲解）的构造函数。
    + `Symbol.split`: ー个在调用 `String.prototype.split()` 方法时调用的方法, 
      用于分割字符串。
    + `Symbol.toPrimitive`: 一个返回对象原始值的方法。
    + `Symbol.toStringTag`: 一个在调用 `Object.prototype.toString()` 方法时
      使用的字符串，用于创建对象描述.
    + `Symbol.unscopables`: (unscopables 不适用) 一个定义了一些不可被 `with`
      语句引用的对象属性名称的对象集合。
- 重写一个由 well-known Symbol 定义的方法, 会导致对象内部的默认行为被改变, 从而一个
  普通对象会变为一个奇异对象 (exotic object). 但实际上其不会对你的代码产生任何影响,
  只是在规范中描述对象的方式改变了.      
#### 6.6.1 Symbol.hasInstance 方法
- 每个函数中都有一个 `Symbol.hasInstance` 方法，用於確定對象是否為函數的实例。该方法在
  Function.prototype 中定義，所以所有函數都繼承了 `instanceof` 属性的默認行為。为了
  确保 Symbol.hasInstance 不会被意外重写, 该方法被定义为不可写, 不可配置并且不可枚举.
- Symbol.hasInstance 方法只接受一個參數，即要檢查的值。如果傳入的值是函數的實例。則
  返回 true. 我們看一下這行代碼:
  ```js
    obj instanceof Array;
    // - 上一行等价于
    Array[Symbol.hasInstance](obj);

    // - 本質上 ES6 中只是將 instanceof 操作符重新定義為此方法的簡寫語法(上句中前面
    //   是後面的簡寫). 現在引入方法調用後，就可以隨意改變 instanceof 的運行方式了。
  ```
- 假设你想定义一个无实例的函数, 就可以將 Symbol.hasInstance 的返回值硬編碼為 false:
  ```js
    function MyObject() {}
    // - 在 MyObject 對象上定義一個訪問器屬性 Symbol.hasInstance (注: 这个示例中，
    //   默認的 getter 和 setter 函數都沒有定義)
    Object.defineProperty(MyObject, Symbol.hasInstance, {
        value: function (v) {
            return false;
        }
    });
    let obj = new MyObject();
    console.log(obj instanceof MyObject);    // false
  ```
- 也可以基於(于) 任意條件，通過值檢查來確定被檢測的是否為實例。例如, 可以將 1~100
  的數字定位為一個特殊數字類型的實例，具體實現的代碼如下:
  ```js
    function SpecialNumber() {}

    // - 定義一個 Symbol.hasInstance 方法，當值為 Number 的實例且其值在 1~100
    //   之間時返回 true。所以即使 SpecialNumber 的函數和變量 two 之間沒有直接關係
    //   , 變量 two 也被認為 SpecialNumber 的實例。
    Object.defineProperty(SpecialNumber, Symbol.hasInstance, {
        // - Tip: v 应该是 two/zero 因为从判断 "v instanceOf Number" 可以看出.
        value: function (v) {
            // Number 對象在這裡
            return (v instanceof Number) && (v >= 1 && v <= 100)
        }
    });
    let two = new Number(2);
    let zero = new Number(0);
    console.log(two instanceof SpecialNumber);    // true
    console.log(zero instanceof SpecialNumber);   // false  
  ```
#### 6.6.2 Symbol.isConcatSpreadable 属性
- JavaScript 数组的 `concat()` 方法被设计用于拼接 2 个数组, 使用方法如下: 
  ```js
    let colors1 = ["red", "green"],
        colors2 = colors1.concat(["blue", "black"], "brown");
    console.log(colors2);  // [ 'red', 'green', 'blue', 'black', 'brown' ]
  ```
  在这段代码中, 额外的 concat() 方法传入一个字符串参数 "brown" 作为数组 colors2
  的第 5 个元素. 为什么数组参数就要区别对待呢? js 规范声明, 凡是传入了数组参数, 就
  会自动将它们分解为独立元素. 在 ES6 标准以前, 我们根本无法调整这个特性.
- `Symbol.isConcatSpreadable` 属性是一个布尔值，如果该属性值為 `true`, 則表示對象有
  `length 屬性` 和 `數字鍵`，故他的數值型属性值应该独立添加到 concat() 調用的結果中。它与
  其他 well-known Symbol 不同的是， 这个 Symbol 属性默认情况下不会出现在标准对象中,
  它只是一个可选属性，用于增强作用于特定对象类型的 concat() 方法的功能，有效简化其默认
  特性。可以通过以下方法, 定义一个在 concat() 调用中与数组行为相近的新类型。
  ```js
    let collection = {
        0: "Hello",
        1: "world",
        length: 2,
        [Symbol.isConcatSpreadable]: true
    };
    let message = ["Hi"].concat(collection);
    console.log(message);     // [ 'Hi', 'Hello', 'world' ]
  ```
  在这个示例中，定义了一个类数组对象 `collection`: 它有一个 `length` 属性，还有两个
  数字键，`Symbol.isConcatSpreadable` 属性值为 `true` 表明属性值应当作为独立元素
  添加到数组中。将 collection 传入 concat() 方法后，最后生成的数组中的元素分别是
  "hi"、"Hello"及"world"。
- Note: Q: `类数组对象`是什么: A: 拥有一个 `length` 属性和若干索引属性的对象. 
  例如: 
  ```js
    let arr = ['name', 'age', 'gender'];
    let arrayLike = {
        0: 'name',
        1: 'age',
        2: 'sex',
        length: 3
    }
  ```
- Note: 也可以在派生数组子类中将 `Symbol.isConcatSpreadable` 设置为 `false`, 从而
  防止元素在调用 concat() 方法时被分解. 具体细节请查看第 9 章相关内容.

#### 6.6.3 Symbol.match, Symbol.replace, Symbol.search 和 Symbol.split 属性
- **Review**(复习)《JavaScript高级程序设计》-- P126-128 -- 6.字符串的模式匹配方法:  
    + (1) `match()`: 只接受一个参数(正则表达式 / RegExp对象)
    + (2）`search()`: 参数与 match 方法相同。 search() 方法返回字符串中第一个匹配项
      的索引; 如果没有返回 -1.
    + (3) `replace()`: 接受2个参数: 第一个为 "正则表示 / RegExp对象", 第二个参数为
      "一个字符串 / 一个函数"。
    + (4) `split()`: 基于指定的分隔符将一个字符串分割为多个子字符串，并将结果放在一个
      数组中。
      ```js
        // (1.) match()
        let word = "cot, bot, sot, fot";
        let pattern = /.ot/;
        let matches = word.match(pattern);
        console.log(matches.index);   // 0
        console.log(matches[0]);      // cot
        console.log(pattern.lastIndex);   // 0

        // (2.) search()
        let font = "cat, bat, dat, eat";
        let pos = font.search(/at/);
        console.log(pos);     // 1
        
        // (3.) replace()
        let text = "cat, bat, sat, fat";
        let result = text.replace(/at/g, "ond");
        console.log(result);      // replace 返回的是字符串:  cond, bond, sond, fond
        
        // (4.) split()
        const colorText = "red, blue, green, yellow";
        let colorArr = colorText.split(",");
        console.log(colorArr);        // [ 'red', ' blue', ' green', ' yellow' ]
      ```
- 在 ES6 之前，以上4个方法 `match(regex), replace( regex, replacement ),` 
  `search(regex), split(regex)` 无法使用开发者自定义的对象来替代正则表达式进行
  字符串匹配。 而在 ES6 中，定义了与上述 4 个方法相对应的 4 个 Symbol,将语言内建的
  RegExp 对象的原生特性完全外包出来。  
  `Symbol.match, Symbol.replace, Symbol.search 和 Symbol.split` 这4个 Symbol
  属性表示 match(), replace(), search() 和 split() 方法的第一个参数应该调用的正则
  表达式参数的方法，他们被定义在 `RegExp.prototype` 中， 是字符串方法应该使用的默认实现.  
  了解原理后, 我们使用类似于正则表达式的方式创建一个与字符串方法一起使用的对象. 为此,
  可以在代码中使用以下 Symbol 函数:
    + (1) Symbol.match 接受一个字符串类型的参数，如果匹配成功则返回匹配元素的数组,
      否则返回 null.
    + (2) Symbol.replace 接受一个字符串类型的参数和一个替换用的字符串，最终依然返回
      一个字符串。
    + (3) Symbol.search 接受一个字符串参数，如果匹配到内容，则返回数字类型的索引位置,
      否则返回 -1。
    + (4) Symbol.split 接受一個字符串參數，根據匹配內容將字符串分解，并返回一個包含
      分解后片段的數組。
  ```js
    // 实际上等同于 /^.{10}$/:   正则 . （小数点）匹配除换行符之外的任何单个字符
    let hasLengthOf10 = {
        [Symbol.match]: function (value) {
            return value.length === 10 ? [value] : null;
        },
        [Symbol.replace]: function (value, replacement) {
            return value.length === 10 ? replacement : value;
        },
        [Symbol.search]: function (value) {
            return value.length === 10 ? 0 : -1;
        },
        [Symbol.split]: function (value) {
            return value.length === 10 ? ["", ""] : [value];
        }
    };
    
    let message1 = "Hello world",   // 11 characters
        message2 = "Hello John";    // 10 characters
    let match1 = message1.match(hasLengthOf10),
        match2 = message2.match(hasLengthOf10);
    console.log(match1);        // null
    console.log(match2);        // [ 'Hello John' ]
    
    let replace1 = message1.replace(hasLengthOf10, "Howdy!"),
        replace2 = message2.replace(hasLengthOf10, "Howdy!");
    console.log(replace1);      // Hello world
    console.log(replace2);      // Howdy！
    
    let search1 = message1.search(hasLengthOf10),
        search2 = message2.search(hasLengthOf10);
    console.log(search1);       // -1
    console.log(search2);       // 0
    
    let split1 = message1.split(hasLengthOf10),
        split2 = message2.split(hasLengthOf10);
    console.log(split1);        // [ 'Hello world' ]
    console.log(split2);        // [ '', '' ]
  ```
#### 6.6.4 Symbol.toPrimitive 方法

#### 6.6.5 Symbol.toStringTag 属性

#### 6.6.6 Symbol.unscopables 属性

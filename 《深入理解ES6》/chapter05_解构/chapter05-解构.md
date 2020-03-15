# Chapter05 解构: 是数据访问更便捷


## 目录(Catalog)
- 5.1 为何使用解构功能 - 89
- 5.2 对象解构 - 90
    + 5.2.1 对象解构赋值
    + 5.2.2 默认值
    + 5.2.3 为非同名局部变量赋值
    + 5.2.4 嵌套对象解构
- 5.3 数组解构 - 96
    + 5.3.1 数组解构赋值
    + 5.3.2 默认值
    + 5.3.3 嵌套数组解构
    + 5.3.4 不定元素
- 5.4 混合解构 - 101
- 5.5 解构参数 - 102
    + 5.5.1 必须传值的结构参数
    + 5.5.2 解构参数的默认值 
- 5.6 小结


## 生词(New Words)
- **identifier [ai'dentifaiə] --n.标识符，识别码**
    + unique identifier. 唯一标识符
    + If we were to add another row to this table, it would have an 
      identifier of 4. 如果我们向这个表中添加另外一行，那么该行的标识符将会是 4.


## 内容(Content)
### 5.1 为何使用解构功能 - 89
- 许多语言都通过极少量的语法实现了解构功能, 而 `ES6`
  中的实现实际上利用了你早已熟的语法: **对象和数组字面量的语法**.
### 5.2 对象解构 - 90
- 对象解构是在 `赋值语句` 的 `左侧` 使用了 `对象字面量` 语法, 例如:
  ```js
    let node = {
        type: "Identifier",
        name: "foo"
    };
    let {type, name} = node;
    console.log(type);
    console.log(name);
  ```
  在这段代码中, `node.type` 的值被存储在名为 `type` 的变量中; `node.mname`
  的值被存储在名为 `name` 的变量中. 此处的语法与第 4 
  章中对象字面量属性初始化的简写语法相同, `type` 和 `name` 都是局部声明的变量,
  也是用来从 `options` 对象读取相应值的属性名称.
- Note: 不要忘记初始化程序:
    + 如果使用 `var`, `let` 或 `const` 解构声明变量, 则必须提供初始化程序
      (也就是等号右侧的值). 下面这几行代码全部都会导致程序抛出语法错误,
      它们都缺少了初始化程序:
      ```js
        // - 语法错误
        var {type, name};
        // - 语法错误
        let {type, name};
        // - 语法错误
        const {type, name};
      ```
    + 如果不使用结构功能, `var` 和 `let` 不需要初始化值, 但是 `const` (constant)
      是无论如何都要提供初始化程序.
#### + 5.2.1 对象解构赋值
- 上面我们经将对象解构应用到了变量的声明中. 我们同样可以在给变量赋值时使用解构语法.
  举个例子, 你可能在定义变量之后想要修改它们的值. 就像这样:
  ```js
    let node = {
        type: "Identifier",
        name: "foo"
    };
    let type = "literal";
    let name = 5;

    // - 使用解构语法为多个变量赋值
    ({type, name} = node);

    console.log(type); // "Identifier"
    console.log(name); // "foo"
  ```
  此示例中, 声明变量 `type` 和 `name` 并初始化, 在下面通过解构赋值的方法,
  从 `node` 对象读取相应的值重新为这两个变量赋值. 请注意, 
  **一定要用一对小括号包裹解构赋值语句**, 
  JS 引擎将`一对开放的花括号视为一个代码块`, 而语法规定, 
  `代码块语句不允许出现在赋值语句左侧`, 添加 **`小括号`** 后`可以将块语句转化为一个表达式`, 
  从而实现整个解构赋值的过程。
  
  `解构赋值表达式`的值与表达式右侧(即`=`右侧)的值相等, 如此一来,
  在任何可以使用值的地方你都可以使用解构赋值表达式. 想象一下给函数传递参数值的过程:
  ```js
    let node = {
        type: 'Identifier',
        name: 'foo'
    };
    let type = 'Literal';
    let name = 5;

    function outputInfo(value) {
        console.log(value === node);    // true
    }
    outputInfo({type, name} = node);

    console.log(type);  // "Identifier"
    console.log(name);  // "foo"
  ```
  调用 `outputInfo()` 函数时传入了一个解构表达式, 由于 JS 表达式的值为右侧的值,
  因而此处传入的参数等同于 `node`, 且变量 `type` 和 `name` 被重新赋值,
  同时 `node` 也被传入 `outputInfo()` 函数。

  当解构赋值表达式的右侧(即: `=` 后面的表达式) 的计算结果为 `null` 或 `undefined` 时,
  会抛出错误. 因为任何尝试读取 `null` 或 `undefined` 的属性的行为都会导致
  "运行时" 错误 (`runtime error`).

#### + 5.2.2 默认值
- 使用解构赋值表达式时, 如果指定的局部变量名称在对象中不存在, 那么这个局部变量会被赋值为
  `undefined`, 就像这样:
  ```js
    let node = {
        type: 'Identifier',
        name: 'foo'
    };
    let {type, name, value} = node;

    console.log(type);  // "Identifier"
    console.log(name);  // "foo"
    console.log(value); // undefined
  ```
  这段代码额外定义了一个局部变量 `value`, 然后尝试为它赋值, 然而在 `node` 对象上,
  没有对应名称的属性值, 所以像预期中的那样将它赋值为 undefined.

  当指定的属性不存在时, 可以随意定义一个默认值, 在属性名称后添加个等号(`=`)
  和相应的默认值即可:
  ```js
    let node = {
        type: 'Identifier',
        name: 'foo'
    };
    let {type, name, value = true} = node;

    console.log(type);  // "Identifier"
    console.log(name);  // "foo"
    console.log(value); // true
  ```
  在此示例中，为变量 `value` 设置了默认值 `true`, 只有当 `node`
  上没有该属性或者该属性值为 `undefined` 时该值才生效, 此处没有 `node.Value` 属性,
  因为 `value` 使用了预设的默认值, 我们曾在第 3 章讨论过函数的默认参数值,
  这个过程与其很相似.

#### + 5.2.3 为非同名局部变量赋值
- 到目前为止的每一个示例中, 解构赋值使用的都是与对象属性同名的局部变量,
  例如: `node.type` 的值被存储在了变量 `type` 中. 
  但如果你希望使用不同命名的局部变量来存储对象属性的值,
  ES6 中的一个扩展语法可以满足你的需求, 
  这个语法与完整的对象字面量属性初始化程序的很像, 请看这个示例:
  ```js
    let node = {
        type: 'Identifier',
        name: 'foo'
    };
    let {type: localType, name: localName} = node;
    console.log(localType); // "Identifier"
    console.log(localName); // "foo"
  ```
  此代码使用了解构赋值来声明 `localType` 与 `localName` 变量, 
  分别获得了 `node.type` 与 `node.name` 属性的值. `type: localType`
  这种语法表示要读取名为 `type` 的属性, 并把它的值存储在变量 `localType` 上.
  该语法实际上与传统对象字面量语法相反, 传统语法将名称放在冒号左边, 值放在冒号右边;
  而在本例中, 则是名称在右边, 需要进行值读取的位置则被放在了左边.

  你也可以给变量别名添加默认值, 依然是在本地变量名称后添加等号与默认值, 例如:
  ```js
    let node = {
        type: 'Identifier'
    };
    let {type: localType, name: localName = 'bar'} = node;
    console.log(localType); // "Identifier"
    console.log(localName); // "bar"
  ```
  此处的 `localName` 变量拥有一个默认值 "bar" , 该变量最终被赋予了默认值, 
  因为 `node.name` 属性并不存在.

  到此为止, 你已经了解了如何解构属性为原始值的对象, 而对象解构也可被用于从嵌套的对象结构
  (即: 对象的属性可能还是一个对象) 中提取属性值.

#### + 5.2.4 嵌套对象解构
- 使用类似于对象字面量的语法, 可以深入到嵌套的对象解构中去提取你想要的数据. 这里有个示例:
  ```js
    let node = {
        type: 'Identifier',
        name: 'foo',
        loc: {
            start: {
                line: 1,
                 column: 1
            },
            middle: {
                subMiddle: {
                    subLine: 11,
                    subColumn: 11
                }
            }
            end: {
                line: 1,
                 column: 4 
            }
        }
    };
    // - tip: 假如想找 `subMiddle` 下的 `subLine` 和 `subColumn`,
    //   只需这样写即可: {middle: {subMiddle}}}
    let {loc: {start}} = node;
    console.log(start.line);    // 1
    console.log(start.colunm);  // 1
  ```
  本例中的解构模式使用了花括号, 表示应当深入到 `node` 对象中的 `loc` 属性内部去寻找
  `start` 属性. 记住上一节介绍过, **每当有一个冒号在解构模式中出现, 
  就意味着冒号之前的标识符代表需要检查的位置, 而冒号右侧则是赋值的目标.
  当冒号右侧存在花括号时, 表示目标被嵌套在对象的更深一层中.**

  你还可以更进一步, 在对象的嵌套解构中同样可以为本地变量使用不同的名称, 如下:
  ```js
    let node = {
        type: 'Identifier',
        name: 'foo',
        loc: {
            start: {
                line: 1,
                 column: 1
            },
            end: {
                line: 1,
                 column: 4 
            }
        }
    };
    let {loc: {start: localStart}} = node;
    console.log(localStart.line);    // 1
    console.log(localStart.colunm);  // 1
  ```
  在此版本的代码中, `node.loc.start` 的值被存储在一个新的本地变量 `localStart` 上,
  解构模式可以被嵌套在任意深度的层级, 并且在每个层级的功能都一样.

  对象解构十分强大并有很多可用形式, 而数组解构则提供了一些独特的能力, 
  用于提取数组中的信息.
- Note: **语法警示**
    + 使用嵌套的解构时需要小心, 因为你可能无意中就创建了一个没有任何效果的语句.
      空白花括号在对象解构中是合法的, 然而它不会做任何事. 例如:
      ```js
        // 没有变量被声明！
        let { loc: {} } = node;
      ```
      在此语句中并未声明任何变量绑定. 由于花括号在右侧, `loc`
      被作为需检查的位置来使用, 而不会创建变量绑定. 这种情况仿佛是想用等号来定义一个默认值,
      但却被语法判断为想用冒号来定义一个位置. 这种语法将来可能是非法的,
      但现在只需留意自己不要写类似的代码.

### 5.3 数组解构 - 96
- 示例:
  ```js
    let colorArr = ["red", "green", "black"];
    let [fir, sec] = colorArr;
    console.log(fir);
    console.log(sec);

    // 解构模式中, 省略元素
    let [, , thi] = colorArr;
    console.log(thi);
  ```
#### + 5.3.1 数组解构赋值
- 数据解构赋值 示例:
  ```js
    // - ES5 交换变量
    let a = 1,
        b = 2,
        tmp;
    tmp = a;
    a = b;
    b = tmp;
    console.log(a);     // 2
    console.log(b);     // 1

    // - ES6 解构赋值-交换变量
    let c = 1,
        d = 2;
    [c, d] = [d, c];
    console.log(c);     // 2
    console.log(d);     // 1
  ```
#### + 5.3.2 默认值
#### + 5.3.3 嵌套数组解构
- 示例: 
  ```js
    let colors = ["red", ["green", "lightgreen"], "blue"];
    let [firstColor, [, thirdColor]] = colors;
    console.log(firstColor);    // red
    console.log(thirdColor);    // lightgreen
  ```
#### + 5.3.4 不定元素
- 示例: 
  ```js
    // 不定元素
    let animals = ["monkey", "tiger", "lion", "cat", "dog"];
    let [firstAnimal, ...restAnimals] = animals;
    console.log(firstAnimal);
    console.log(restAnimals.length);
    console.log(restAnimals[0]);
  ```

### 5.4 混合解构 - 101
- 混合解构示例:
  ```js
    let nodeObj = {
        type: "identifier",
        name: "foo",
        loc: {
            begin: {
                line: 1,
                column: 1
            },
            end: {
                line: 1,
                column: 4
            }
        },
        range: [0, 3]
    };

    // - P101: 解构模式中的 loc: 和 range: 代表他们在 nodeObj 对象中所处的位置
    //   (也就是该对象的属性)。当使用混合解构的语法时，则可以从 nodeObj 提取任意想要的信息。
    let {loc: {begin}, range: [startIndex]} = nodeObj;
    console.log(begin.line);        // 1
    console.log(begin.column);      // 1
    console.log(startIndex);        // 0
  ```
### 5.5 解构参数 - 102
#### + 5.5.1 必须传值的结构参数
#### + 5.5.2 解构参数的默认值 

### 5.6 小结




// - ES5 通过 concat()方法克隆数组: concat()方法设计初衷是连接2个数组，如果调用时
//   不传递参数就会返回当前数组的副本。
let arr1 = ["purple", "yellow", "white"];
let arr2 = arr1.concat();
console.log(arr2);          // [ 'purple', 'yellow', 'white' ]
// ES6 通过不定元素的语法来实现克隆数组
let [...cloneArr1] = arr1;
console.log(cloneArr1);     // [ 'purple', 'yellow', 'white' ]
console.log("------------------");



/** - P102: 解构参数 */
// - 解构参数支持本章中已讲解的所有解构特性. 可以使用默认值，混合对象和数组的解构模式及
//   非同名变量存储提取出来的信息。
function setCookie(name, value, {secure, path, domain, expires}) {
    // 设置 cookie 的代码
}

setCookie("type", "js", {
    secure: true,
    expires: 60000
});

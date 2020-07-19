# Chapter05 解构: 使数据访问更便捷
# Chapter05 Destructuring for Easier Data Access

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
    + 5.3.4 剩余项(`rest items`) / 不定元素
- 5.4 混合解构 - 101
- 5.5 参数解构(Destructured Parameters) - 102
    + 5.5.1 解构的参数是必需的
    + 5.5.2 参数解构的默认值
- 5.6 小结




## 生词(New Words)
- **identifier [ai'dentifaiə] --n.标识符, 识别码**
    + unique identifier. 唯一标识符
    + If we were to add another row to this table, it would have an 
      identifier of 4. 如果我们向这个表中添加另外一行, 那么该行的标识符将会是 4.
- **expire [ɪk'spaɪə] vi.到期, 期满, 断气**
    + expire date 过期日期

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
  在这段代码中, `node.type` 的值被存储在名为 `type` 的变量中; `node.name`
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
    + 如果不使用解构功能, `var` 和 `let` 不需要初始化值, 但是 `const` (constant)
      是无论如何都要提供初始化程序.
#### 5.2.1 对象解构赋值
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
  从而实现整个解构赋值的过程. 
  
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
  同时 `node` 也被传入 `outputInfo()` 函数. 

  当解构赋值表达式的右侧(即: `=` 后面的表达式) 的计算结果为 `null` 或 `undefined` 时,
  会抛出错误. 因为任何尝试读取 `null` 或 `undefined` 的属性的行为都会导致
  "运行时" 错误 (`runtime error`).

#### 5.2.2 (设置)默认值
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

- **Additional Info:** 这里添加一个示例, 这个示例在 Vuex 官网文档的 todos
  示例中有相似的使用: 
  ```js
    let todo = {text: '吃饭', done: false}
    // - 解构组件的默认值, 在函数的参数中使用解构.
    function merge({todo, text = todo.text, done = todo.done}) {
        console.log('todo:', todo);
        console.log('text: ', text);
        console.log('done: ', done);
    }
    merge({todo, done: true})
  ```

#### 5.2.3 为非同名局部变量赋值
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

#### 5.2.4 嵌套对象解构
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
    console.log(start.column);  // 1
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
- 数组解构的语法看起来与对象解构非常相似, 只是将对象字面量替换成了数组字面量. 
  **数组解构时, 解构作用在数组内部的位置上, 而不是作用在对象的具名属性上**, 例如:
  ```js
    let colors = ["red", "green", "black"];
    let [first, second] = colors;
    console.log(first);
    console.log(second);
  ```
- 你也可以在解构模式中忽略一些项, 并且只给感兴趣的项提供变量名. 例如,
  下面值获取数组的第三个元素:
  ```js
     // - 解构模式中, 省略元素
    let [, , third] = colors;
    console.log(third);
  ```
  模式中 `third` 之前的逗号, 是为数组前面的项提供的占位符. 

  与对象解构类似, 在使用 `var`, `let`, `const` 进行数组解构时, 你必须提供初始化.

#### 5.3.1 数组解构赋值
- 你可以在赋值表达式中使用数据解构, 但是与对象解构不同, 不必将表达式包含在圆括号内, 例如:
  ```js
    let colors = ['red', 'green', 'blue'];
    let first = 'black';
    let second = 'purple';
    [first, second] = colors;
    console.log(first);     // "red"
    console.log(second);    // "green"
  ```
  数组解构赋值有一个非常独特的用例: 能轻易地互换两个变量的值.
  互换变量值(即: 值交换)在排序算法中十分常用, 而在 ES5 中需要使用第三个变量作为临时变量,
  如下例:
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
  ```
  这种变量交换的方式中, 中间变量 `tmp` 是不可或缺的. 如果使用数组解构赋值语法,
  就不再需要额外的变量了. 在 ES6 中可以这么做:
  ```js
    // - ES6 解构赋值-交换变量
    let a = 1,
        b = 2;
    [a, b] = [b, a];
    console.log(a);     // 2
    console.log(b);     // 1
  ```
  在这个示例中, 数组解构赋值看起来像是一个镜像: 赋值语句左侧(即等号左側)
  与其他数组解构示例一样, 是一个解构模式; 右侧是一个为交换过程创建的临时数组字面量.
  代码执行过程中, 先解构临时数组, 将 `b` 和 `a` 的值复制到左侧数组的前两个位置,
  结果是两个变量就互换了它们的值.

  Notice: 与对象解构赋值相同, 若等号右侧的计算结果为 `null` 或 `undefined`,
  那么数组结构赋值表达式也会抛出错误.

#### 5.3.2 默认值
- 数组解构赋值同样允许在数组任意位置指定默认值. 当指定位置的项不存在,
  或其值为 `undefined`, 那么该默认值就会被使用. 例如:
  ```js
    let colors = ['red'];
    let [first, second = 'gree'] = colors;
    console.log(first);     // "red"
    console.log(second);    // "green"
  ```

#### 5.3.3 嵌套数组解构
- 与解构嵌套的对象相似, 可以用类似的方式来解构嵌套的数组. 在整个解构模式中插入另一个数组模式,
  解构操作就会下行到嵌套的数组中, 就像这样: 
  ```js
    let colors = ["red", ["green", "lightgreen"], "blue"];
    let [firstColor, [, thirdColor]] = colors;
    console.log(firstColor);    // red
    console.log(thirdColor);    // lightgreen
  ```
  与对象解构相似, 你也能使用任意深度的数组嵌套.

#### 5.3.4 剩余项(`rest items`) / 不定元素
- Note: 这里书本上的翻译叫`不定元素`, 但电子书翻译为 `剩余项(rest items)`,
  我个人觉得明显 `剩余项` 更合适, 而且对应的英文直译就是 `剩余项`,
  不能理解这个 `不定元素`...
- 第 3 章介绍过函数的`剩余参数(rest parameter)`(tip: 纸质书翻译叫 `不定参数`),
  而数组结构有个类似的名为 `剩余项` 的概念, 它使用 `...`
  语法来将剩余的项目赋值给一个指定的变量, 此处有个范例:
  ```js
    // - 剩余项(rest items) / 不定元素
    let animals = ["monkey", "tiger", "lion", "cat", "dog"];
    let [firstAnimal, ...restAnimals] = animals;
    console.log(firstAnimal);           // "monkey"
    console.log(restAnimals.length);    // 4 
    console.log(restAnimals[0]);        // "tiger"
  ```
  `animals` 数的第一项被赋值给了 `firstAnimal` 变量, 而剩余的则赋值给了一个新的
  `restAnimals` 数组; `restAnimals`数组包含 4 项; 
  `剩余项(rest items)` 语法有助于从数组中提取特定元素并保证其余元素可用,
  它还有另外一个有用的功能.

  在设计 JS 时, 很明显遗漏掉了数组复制的功能, 而在 ES5 中, 开发者们经常使用 
  `concat()` 方法来克隆数组, 如下:
  ```js
    // - concat()方法的设计初衷是连接2个数组, 如果调用时不传递参数便返回当前数组的副本.
    let arr1 = ["purple", "yellow", "white"];
    let arr2 = arr1.concat();
    console.log(arr2);          // [ 'purple', 'yellow', 'white' ]
  ```
  ES6 通过 `剩余项` 的语法来实现克隆数组:
  ```js
    let [...cloneArr1] = arr1;
    console.log(cloneArr1);     // [ 'purple', 'yellow', 'white' ]
  ```
  使用这种技术复制数组未必比使用 `concat()` 方法更明显, 但这依然是个值得关注的技巧.

  剩余项必须是数组解构模式中最后的部分, 之后不能再有逗号, 否则就是语法错误.

### 5.4 混合解构 - 101
- 对象与数组解构能被用在一起, 以创建更复杂的解构表达式, 在对象与数组混合而成的结构中,
  这么做便能准确提取其中你想要的信息片段. 例如:
  ```js
    let node = {
        type: "identifier",
        name: "foo",
        loc: {
            start: {
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
    let {loc: {start}, range: [startIndex]} = node;
    console.log(start.line);        // 1
    console.log(start.column);      // 1
    console.log(startIndex);        // 0
  ```
  此代码将 `node.loc.start` 与 `node.range[0]` 提取出来, 并将它们的值分别存储到
  `start` 与 `startIndex` 中, 要记住**解构模式中的 `loc:` 与 `range:` 只是对应与
  `node` 对象中属性的位置**. 混合使用对象与数组解构, `node` 的任何部分都能提取出来.
  对于 `JSON` 配置结构中提取数据来说, 这种方法尤其有用, 因为它不再需要遍历整个结构了.

### 5.5 参数解构(Destructured Parameters) / 解构参数  - 102
- 解构还有一个特别有用的场景, 即在传递函数参数时. 当 JS 的函数接收大量可选参数时,
  一个常用模式是创建一个 `options` 对象, 其中包含了附加的参数, 就像这样:
  ```js
    // - options 上的属性表示附加参数
    function setCookie(name, value, options) {
        options = options || {};

        let secure = options.secure;
        let path = options.path;
        // - domain 和 expires 为 undefined
        let domain = options.domain;
        let expires = options.expires;

        // - 设置 cookie 的代码 
    }
    // - 第 3 个参数映射到 options
    setCookie('type', 'js', {
        secure: true,
        expires: 60000
    });
  ```
  很多 JS 的库都包含了类似于此例的 `setCookie()` 函数. 在此函数内,
  `name` 与 `value` 参数是必需的, 而 `secure`, `path`, `domain` 与
  `expires` 则不是. 并且因为此处对于其余数据并没有顺序要求, 将它们作为
  `options` 对象的具名属性会更有效率, 而无须列出一堆额外的具名参数. 
  这种方法很有用, 但无法仅通过查看函数定义就判断出函数所期望的输入,
  你必须阅读函数体的代码.
- `参数解构` 提供了更清楚地标明函数期望输入的替代方案.
  它使用对象或数组解构的模式替代了具名参数. 要看到其实际效果,
  请看下面重写版本的 `setCookie()` 函数:
  ```js
    function setCookie(name, value, {secure, path, domain, expires}) {
        
        // - 设置 cookie 的代码
    }
    setCookie('type', 'js', {
        secure: true,
        expires: 60000
    })
  ```
  此函数的行为与上例可选的 `options` 类似, 但此时只是使用解构语法代替了第 3
  个参数来提取必要的信息, 其他参数保持不变, 但是对于调用 `setCookie()`
  函数的使用者而言, 参数结构让函数的使用变得更清晰了.

  解构参数在没有传递值的情况下类似于常规参数,它们会被设为 `undefined`.
- Note: 参数解构支持本章中已讲解的所有解构特性. 可以在其中使用 默认参数,
  混合解构, 或使用与属性不同的变量名.

#### 5.5.1 解构的参数是必需的
- 解构参数有一个奇怪的地方, 默认情况下, 如果调用函数时不提供被解构的参数会导致程序抛出错误.
  举个例子, 调用上一个示例中的 `setCookie()` 函数, 如果不传递第 3 个参数, 会报错:
  ```js
    // - 报错
    setCookie("type", "js");
  ```
  缺失的第 3 个参数, 其值就会默认等于 `undefined`. 这导致了一个错误,
  因为参数解构实际上只是解构声明的简写. 当 `setCookie()` 函数被调用时,
  JS 引擎实际上是这么做的:
  ```js
    function setCookie(name, value, options) {
        let {secure, path, domain, expires} = options;

        // - 设置 cookie 的代码
    }
  ```
  本章的上面有提到, 如果解构赋值表达式(即: `=`)的右侧为 `null` 或 `undefined`, 
  解构会抛出报错, 同理, 若调用 `setCookie()` 函数是不传入第 3 个参数,
  也会导致程序抛出错误.

  如果解构参数是必需的, 那么大可忽略掉这些问题; 但如果希望将解构参数定义为可选的,
  那么就必须为其提供默认值来解决这个问题:
  ```js
    function setCookie(name, value, {secure, path, domain, expires} = {}) {
        // ...
    }
  ```
  这个示例中为解构参数添加了一个新对象作为默认值, `secure`、`path`、`domain` 及
  `expires` 这些变量的值全部为 `undefined`, 这样即使在调用 `setCookie()`
  时未传递第 3 个参数, 程序也不会报错.
#### 5.5.2 参数解构的默认值
- 你可以为参数解构提供可解构的默认值, 就像在解构赋值时所做的那样,
  只需在其中每个参数后面添加等号并指定默认值即可. 例如:
  ```js
    function setCookie(name, value, 
        {
            secure = false,
            path = '/',
            domain = 'example.com',
            expires = new Date(Date.now() + 360000000)
        } = {}
    ) {
        // ...
    }
  ```
  此代码中参数结构给每个属性都提供了默认值, 所以你可以避免检查指定属性时否已被传入
  (以便在未传入时使用正确的值). 而整个结构的参数同样有一个默认值, 即一个空对象,
  令该参数称为可选参数. 这么做是的函数声明看起来比平时更复杂一些,
  但却是为了确保每个参数都有可用的值而付出的微小代价.

### 5.6 小结

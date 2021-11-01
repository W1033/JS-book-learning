# 第 8 章 -- 迭代器(Iterator) 和生成器 (Generator)

## 本章目录 (Catalog)
- 8.1 循环语句的问题
- 8.2 什么是迭代器 
- 8.3 什么是生成器
    + 8.3.1 生成器函数表达式 
    + 8.3.2 生成器对象的方法
- 8.4 可迭代对象和 for-of 循环
    + 8.4.1 访问默认迭代器
    + 8.4.2 创建可迭代对象
- 8.5 内建迭代器
    + 8.5.1 集合对象迭代器
    + 8.5.2 字符串迭代器
    + 8.5.3 NodeList 迭代器
- 8.6 展开运算符与非数组可迭代对象
- 8.7 高级迭代功能
    + 8.7.1 给迭代器传递参数 
    + 8.7.2 在迭代器中抛出错误
    + 8.7.3 生成器返回语句
    + 8.7.4 委托生成器
- 8.8 异步任务执行
    + 8.8.1 简单任务执行器
    + 8.8.2 向任务执行器传递数据
    + 8.8.3 异步任务执行器
- 小结


## 生词 (New Words)
- **iterator [ɪtə'reɪtə] --n.迭代器**
    + Iterators are objects that allow one to iterate over a collection in 
        sequence. 迭代器是允许按顺序迭代集合的对象。 
- **generator ['dʒɛnəretɚ] --n.发电机; 发生器; 迭代器.**
    + electric generator. 发电机.
    + signal generator. 信号发生器.


## 本章内容 (Content)
- 用循环语句迭代数据时，必须要初始化一个变量来记录每一次迭代在数据集合中的位置，
  而在许多编程语言中，已经开始通过程序化的方式用**迭代器对象**返回过程中集合的每一个元素。
  
  迭代器的使用可以极大地简化数据操作，于是 ES6 也向 JS 中添加了这个迭代器特性。
  新的数据方法 和 新的集合类型 (例如: Set 集合, Map 集合) 都依赖迭代器的实现,
  你会发现在语言的其他特性中也都有迭代器的身影: 新的 `for...of` 循环，
  `展开运算符(...)`，甚至连`异步编程`都可以使用迭代器。

### 8.1 循环语句的问题

### 8.2 什么是迭代器 
- 迭代器是一种特殊对象，它具有一些专门为迭代过程设计的专有接口。
  所有的迭代对象都有一个 `next()` 方法，每次调用都返回一个结果对象。结果对象有2个属性:
    + (1) 一个是 `value`, 表示下一个将要返回的值. 
    + (2) 另一个是 `done`, 它是一个布尔类型的值，当没有更多可返回数据时返回 true。
  
  迭代器还会保存一个内部指针，用来指向当前集合中值的位置，每调用一次 `next()` 方法，
  都会返回下一个可用的值。
  
  如果在最后一个值返回后再调用 `next()`方法，那么返回的对象中属性 `done` 的值为 `true`,
  属性 `value` 则包含迭代器最终返回的值，这个返回值不是数据集的一部分，
  它与函数的返回值类似，是函数调用过程中最后一次给调用者传递信息的方法，
  如果没有相关数据则返回 `undefined`。
  
  了解了这些以后，我们用 ECMAScript5 的语法创建一个迭代器.
  ```js
    (function() {
        function es5CreateIterator(items) {
            let i = 0;
            return {
                next: function () {
                    let done = (i >= items.length);
                    let value = !done ? items[i++] : undefined;

                    return {
                        done: done,
                        value: value
                    }
                }
            }
        }
        let es5Iterator = es5CreateIterator([1, 2, 3]);

        console.log(es5Iterator.next());   // {done: false, value: 1}
        console.log(es5Iterator.next());   // {done: false, value: 2}
        console.log(es5Iterator.next());   // {done: false, value: 3}
        // - 之后所有的调用都会返回相同内容.
        console.log(es5Iterator.next());   // {done: true, value: undefined}
    })();
  ```
  在上面这段代码中，`createIterator()` 方法返回的对象有一个 `next()` 方法, 每次调用时,
  `items` 数组的下一个值会作为 `value` 返回。当 i 为 3 时，done 变为 true，
  此时三元表达式会将 `value` 的值设置为 `undefined`。最后两次调用的结果与
  `ECMAScript6` 迭代器的最终返回机制类似，当数据集被用尽后会返回最终的内容。
    + 上面这个示例很复杂，而在 `ES6` 中，迭代器的编写规则也同样复杂，但 ES6
      同时还引入了一个生成器对象，它可以让创建迭代器对象的过程变得更简单。

### 8.3 什么是生成器
- 生成器是一种返回迭代器 (iterator) 的函数。生成器函数由放在 function 关键字之后的一个
  星号 (`*`) 来表示，并能使用新的 `yield` 关键字。将星号紧跟在 function 关键字之后，
  或是在中间留出空格，都是没问题的，如下例:
  ```js
    // - 示例 1 -- 生成器
    function *createIte() {
        yield 1;
        yield 2;
        yield 3;
    }
    // - 生成器的调用方式与普通函数相同, 只不过返回的是一个迭代器
    let ite = createIte();
    console.log(ite.next().value);  // 1
    console.log(ite.next().value);  // 2
    console.log(ite.next().value);  // 3

    // - 在这个示例中，createIte（）前的星号表明它是一个生成器；yield 关键字也是 
    //   ES6 的新特性，可以通过它来指定调用迭代器的 next（）方法时的返回值及返回顺序。
    //   生成迭代器后，连续 3 次调用它的 next（）方法返回 3 个不同的值，分别是 1、2 
    //   和 3。生成器的调用过程与其他函数一样，最终返回的是创建好的迭代器。
    // - 生成器函数最有趣的部分大概是，每当执行完一条 yield 语句后函数就会自动停止执行。
    //   举个例子，在上面这段代码中，执行完语句 yield 1 之后，函数便不再执行其他任何语句,
    //   直到再次调用迭代器的 next（）方法才会继续执行 yield 2 语句。生成器函数的这种
    //   中止函数执行的能力有很多有趣的应用，我们将在本章后面 “高级迭代器功能” 一节中继续
    //   讲解它的应用.
    // - 使用 yield 关键字可以返回任何值或表达式，所以可以通过生成器函数批量地给迭代器
    //   添加元素。例如，可以在循环中使用 yield 关键字：

    // - 示例 2 -- 生成器
    function * createIterator (items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i]
        }

        // yield 关键字只能用在生成器内部，用于其他任意位置都是语法错误，即使在生成器内部的
        // 函数中也不行，如下例:
        // function *createIterator (items) {
        //     items.forEach(function (item) {
        //          // 语法错误
        //          yield item + 1;
        //     })
        // }
    }
    // 生成器的调用和普通函数一样，只不过返回的是一个迭代器。
    let iterator = createIterator([1, 2, 3]);

    console.log(iterator.next());   // {done: false, value: 1}
    console.log(iterator.next());   // {done: false, value: 2}
    console.log(iterator.next());   // {done: false, value: 3}
    console.log(iterator.next());   // {done: true, value: undefined}

    // - 之后所有的调用都会返回相内容
    console.log(iterator.next());   // '{done: true, value: undefined}'
    // - 此示例中, 给生成器函数 createIterator() 传入一个 items 数组, 而在函数内部,
    //   for 循环不断从数组中生成新的元素放入迭代器, 每遇到一个 yield 语句循环都会
    //   停止; 每次调用迭代器的 next() 方法, 循环会继续运行并执行下一条 yield 语句.
  ```
#### 8.3.1 生成器函数表达式 
- 也可以通过函数表达式来创建生成器, 只需在 function 关键字和小括号中间添加一个星号(*)
  即可: 
  ```js
    let createIterator = function *(items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i];
        }
    };
    let iterator = createIterator([1, 2, 3]);

    console.log(iterator.next());   // {done: false, value: 1}
    console.log(iterator.next());   // {done: false, value: 2}
    console.log(iterator.next());   // {done: false, value: 3}
    console.log(iterator.next());   // {done: true, value: undefined}

    // - 之后所有的调用都会返回相内容
    console.log(iterator.next());   // '{done: true, value: undefined}'
  ```
#### 8.3.2 生成器对象的方法
- 由于生成器本身就是函数, 因而可以将它添加到对象中. 例如, 在 ES5 风格的对象字面量中,
  可以通过函数表达式来创建生成器, 就像这样;
  ```js
    let o = {
        createIterator: function* (items) {
            for (let i = 0; i < items.length; i++) {
                yield items[i]
            }
        }
    };
    let secondIterator = o.createIterator([1, 2, 3]);
    console.log("secondIterator.next(): ", secondIterator.next());
  ```
- 也可以使用 ES6 对象方法的简写语法, 只需在函数名前添加一个 * 号:
  ```js
    let o = {
        *createIterator(items) {
            for (let i = 0; i < items.length; i++) {
                yield items[i]
            }
        }
    };
    let secondIterator = o.createIterator([1, 2, 3]);
    console.log("secondIterator.next(): ", secondIterator.next());
  ```
  ```  
  
  ```

### 8.4 可迭代对象和 for-of 循环
- 可迭代对象具有 `Symbol.iterator` 属性，是一种与迭代器密切相关的对象。
  Symbol.iterator 通过指定的函数可以返回一个作用于附属对象的迭代器。在 ES6 中，
  所有的集合对象（`数组`、`Set 集合`及 `Map 集合`）和 `字符串` 都是**可迭代对象**，
  这些对象中都有默认的迭代器。ECMAScript 中新加入的特性 `for-of` 循环需要用到
  可迭代对象的这些功能. (Tip: 注意并不包含自定义的 `对象字面量`)
- Note: 由于生成器默认会为 `Symbol.iterator` 属性赋值，因此所有通过生成器创建的迭代器
  都是可迭代对象。
- 在本章一开始，我们曾提到过循环内部索引跟踪的相关问题，要解决这个问题，需要两个工具：
  一个 `是迭代器`, 另一个是 `for...of` 循环。如此一来，便不需要再跟踪整个集合的索引，
  只需关注集合中要处理的内容。
- `for-of` 循环每执行一次都会调用可迭代对象的 next() 方法，并将迭代器返回的结果对象的
  value 属性存储在一个变量中，循环将持续执行这一过程直到返回对象的 done 属性的值为
  true. 例如下面这个示例: 
  ```js
    let values = [1, 2, 3];
    for (let num of values) {
        console.log(num);
    }
  ```
  这段 for-0f 循环的代码通过用 values 数组的 Symbol.iterator 方法来获取
  迭代器，这一过程是在 JavaScript 引擎背后完成的.(Tip: 内部实现原理应该和上面 8.3.2
  把方法变成生成器函数差不多); 随后迭代器的 next() 方法被多次调用,
  对象的 value 属性读取值并存储在变量 num 中，依次为 1、2 和 3，当结果对象的属性值为
  true 时循环退出，所以 num 不会被赋值为 undefined.
#### 8.4.1 访问默认迭代器
- 可以使用 Symbol.iterator 来访问对象上的默认迭代器，就像这样, 此代码获取了 nums 数组
  的默认迭代器，并用它来迭代数组中的项。这个过程与使用 for~of 循环时在后台发生的过程一致。
  ```js
    let nums = [1, 2, 3];
    let thirdIte = nums[Symbol.iterator]();
    console.log(thirdIte.next());  // { value: 1, done: false }
    console.log(thirdIte.next());  // { value: 2, done: false }

    // - 由于具有 Symbol.iterator 属性的对象都有默认的迭代器，因此可以用它来检测
    //   对象是否为可迭代对象. 代码如下:
    function isIterable(object) {
        return typeof object[Symbol.iterator] === "function";
    }
    console.log(isIterable([1, 2, 3]));     // true
    console.log(isIterable("Hello"));       // true
    console.log(isIterable(new Map()));     // true
    console.log(isIterable(new Set()));     // true
    console.log(isIterable(new WeakMap())); // false
    console.log(isIterable(new WeakSet())); // false
  ```
#### 8.4.2 创建可迭代对象
- 默认情况下，开发者定义的对象都是不可迭代对象，但如果给 Symbol.iterator 属性添加
  一个生成器，则可以将其变成可迭代对象。例如:
  ```js
    let collection = {
        items: [],
        * [Symbol.iterator]() {
            for (let item of this.items) {
                yield item;
            }
        }
    };
    collection.items.push(1);
    collection.items.push(2);
    collection.items.push(3);
    for (let x of collection) {
        console.log(x);
    }

    console.log('*'.repeat(66));
  ```

### 8.5 内建迭代器
#### 8.5.1 集合对象迭代器
#### 8.5.2 字符串迭代器
#### 8.5.3 NodeList 迭代器

### 8.6 展开运算符与非数组可迭代对象

### 8.7 高级迭代功能
#### 8.7.1 给迭代器传递参数 
#### 8.7.2 在迭代器中抛出错误
#### 8.7.3 生成器返回语句
#### 8.7.4 委托生成器

### 8.8 异步任务执行
#### 8.8.1 简单任务执行器
#### 8.8.2 向任务执行器传递数据
#### 8.8.3 异步任务执行器

### 小结





```javascript

    /**
     *  ## 内置迭代器
     *  - 1)、集合对象迭代器(iterator):
     *      + ES6 具有 3 种集合对象类型 (tip: Python 中'组'包含3种数据类型(列表/Set/字典)):
     *          - (1) 数组
     *          - (2) Map 集合
     *          - (3) Set 集合
     *      + 为了更好的访问对象的内容，这 3 种对象都内建了以下 3 种迭代器: (tips: 这 3 个方法
     *        都可以访问集合的迭代器.)
     *          - (1) entries(): 返回一个迭代器，其值为多个键值对。
     *          - (2) values(): 返回一个迭代器，其值为集合的值。
     *          - (3) keys(): 返回一个迭代器，其值为集合中的所有键名。
     *      + 不同集合的默认迭代器: 每个集合类型都有一个默认的迭代器，在 for~of 循环中，如果没有
     *        显式指定则使用默认的迭代器。数组 和 Set集合的默认迭代器是 values() 方法， Map集合
     *        默认迭代器是 entries() 方法。
     *
     *  - 2)、字符串迭代器
     *
     *  - 3)、NodeList 迭代器
     */

    // + (1) entries() 迭代器: 每次调用 next() 方法时，entries() 迭代器都会返回一个数组，
    //   数组中的 2 个元素分别表示集合中每个元素的键与值。
    let colors = ["red", "green", "blue"];

    let tracking = new Set([1234, 5678, 9012]);
    console.log("tracking Set: ", tracking);

    let data = new Map();
    data.set("title", "Understanding ES6");
    data.set("format", "ebook");

    for (let entry of colors.entries()) {
        console.log(entry);
    }
    console.log('\n');

    for (let entry of tracking.entries()) {
        console.log(entry);
    }
    console.log('\n');

    for (let entry of data.entries()) {
        console.log(entry);
    }
    console.log('\n');


    // + (2) values() 迭代器: 调用 values() 迭代器时会返回集合中所存的所有值。例如:
    for (let value of colors.values()) {
        console.log('colors.values(): ', value);
    }
    console.log('\n');
    for (let value of tracking.values()) {
        console.log('tracking.values(): ', value);
    }
    console.log('\n');
    for (let value of data.values()) {
        console.log('data.values(): ', value);
    }
    console.log('\n');


    // + (3) keys() 迭代器: 返回集合中存在的每一个键。
    for (let key of colors.keys()) {
        console.log('colors.keys(): ', key);
    }
    console.log('\n');
    for (let key of tracking.keys()) {
        console.log('tracking.keys(): ', key);
    }
    console.log('\n');
    for (let key of data.keys()) {
        console.log('data.keys(): ', key);
    }


    console.log('*'.repeat(33), 'Over', '*'.repeat(33));


    // 解构与 for-of 循环
    let author = new Map();
    data.set("title", "Understanding ES6");
    data.set("format", "ebook");
    // 与使用 data.entries() 相同
    for (let [key, value] of data) {
        console.log(key + "=" + value);
    }

    /** 内置的迭代器 --> 字符串的迭代器 **/
    // - ES5标准化了字符串的方括号表示法，用于访问其中的字符(即: 使用 text[0] 来获取
    //   第一个字符，以此类推)。不过方括号标识发工作在码元而非字符上，因此它不能被用于正确访问
    //   双字节的字符，如此例演示:
    let message = "A    B";
    for (let i = 0; i < message.length; i++) {
        console.log(message[i]);
    }

    // 此为日语不是中文"吉"字
    let text = '𠮷𠮷𠮷';
    for (let i = 0; i < text.length; i++) {
        console.log(text[i]);
    }

    // - 由于双字节字符被当做2个分离的码元来对待，此处的输出在 A 与 B 之间就有 4 个空行。
    //   ES6 旨在为 Unicode 提供完全支持(相见第二章markdown)，字符串的默认迭代器就是解决
    //   字符串迭代问题的一种尝试。这样一来，借助字符串默认迭代器就能处理字符而不是码元。
    //   把上面的循环改为 for-of 得到合理的输出
    for (let c of text) {
        console.log(c);
    }

    /** 内置的迭代器 --> NodeList 的迭代器 **/
    // let divs = document.getElementsByTagName("div");
    // for (let div of divs) {
    //     console.log(div.id);
    // }


    /** ## 扩展运算符(...)与非数组的可迭代对象 **/
    // - 你可以不限次数地在数组字面中使用扩展运算符，而且可以在任意位置用扩展运算符将可迭代对象
    //   的多个项插入到数组，这些项在新数组中将会出现在扩展运算符对应的位置:
    let smallNumbers = [1, 2, 3],
        bigNumbers = [100, 101, 102],
        allNumbers = [0, ...smallNumbers, ...bigNumbers];
    console.log(allNumbers);


    /** ## 迭代器高级功能 **/

    /** 迭代器高级功能 --> 传递参数给迭代器 **/
    // - 你可以通过 next() 方法向迭代器传递参数。 当一个参数被传递给 next() 方法时，该参数
    //   就会成为生成器 内部 yield 语句的值。 这种能力对于更多高级功能(例如异步编程)来说是
    //   非常重要的。下面是个基本范例:
    (function() {
        function *createIterator() {
            let first = yield 1;
            let second = yield first + 2;
            yield second + 3;
        }
        let iterator = createIterator();

        // - (1)
        console.log(iterator.next());
        // - (2)
        console.log(iterator.next(4));
        // - (3)
        console.log(iterator.next(5));

        /**
         * - (1). 我们可以通过 next() 方法向迭代器传递参数。当一个参数被传递给 next 方法时，
         *   该参数就会成为生成器内部 yield 语句的值。但对于 next() 的首次调用是一个特殊情况，
         *   传递给它的任意参数都会被忽略。由于传递给 next() 的参数会成为 yield 语句的值，该
         *   yield 语句指的是上次生成器中断执行处的语句；而 next() 方法第一次被调用时，生成器
         *   函数才刚刚开始执行，没有所谓的 "上一次中断处的 yield 语句" 可供复制。因此在第一次
         *   调用 next() 时，不存在任何向其传递参数的理由。
         *
         * - (2). 第 2 次调用 next() 时， 4 作为参数被传递进去，这个 4 最终被复制给了生成器
         *   函数内部的 first 变量。在包含赋值操作的第一个 yield 语句中，表达式右侧在第一次
         *   调用 next() 时被计算，而表达式左侧则在第二次调用 next() 方法时、并在生成器函数
         *   继续执行前被计算。由于第二次调用 next() 传入了 4， 这个值就被赋给了 first 变量，
         *   之后生成器继续执行。
         *
         * - (3). 第 2 个 yield 使用了第一个 yield 的结果并加上了 2，也就是返回了一个 6. 当
         *   next() 第 3 次被调用时，传入了参数 5. 这个值被赋给了 second 变量，并随后用在了
         *   第 3 个 yield 语句中，返回了 8。
         *
         */

    })();


    /** 迭代器高级功能 --> 在迭代器器中抛出错误 **/


    /** 迭代器高级功能 --> 生成器的 Return 语句 **/
    function* createReturnIte() {
        yield 1;
        // 注意: 在扩展云算符与 for-of 循环会忽略 return 语句所指定的任意值。
        return 42;
    }

    let returnIte = createReturnIte();
    console.log(returnIte.next());
    console.log(returnIte.next());
    console.log(returnIte.next());


    /** 迭代器高级功能 --> 生成器委托 **/
    // - 在某些情况下，将2个迭代器的值合并在一起会更有用。生成器可以用星号 (*) 配合 yield
    //   这以特殊形式来委托其他的迭代器。正如生成器的定义，星号出现在何处是不重要的，只要落在
    //   yield 关键字与生成器函数之间即可。
    function* createNumberIterator() {
        yield 1;
        yield 2;
        // 此处的 3 当前生成器函数外是怎么也访问不到的
        return 3;
    }

    function* createRepeatingIterator(count) {
        for (let i = 0; i < count; i++) {
            yield "repeat";
        }
    }

    function* createCombinedIterator() {
        let result = yield* createNumberIterator();
        yield* createRepeatingIterator(result);
    }

    let combinedIte = createCombinedIterator();
    console.log(combinedIte.next());
    console.log(combinedIte.next());
    console.log(combinedIte.next());
    console.log(combinedIte.next());
    console.log(combinedIte.next());
    console.log(combinedIte.next());


    /** ## 异步任务运行 **/
    /** 异步任务运行 --> 一个简单的任务运行器 **/
    // - 由于 yield 能停止运行，并在重新开始运行前等待 next() 方法被调用，你就可以在没有
    //   回调函数的情况下实现异步调用。首先，你需要一个能够调用生成器并启动迭代器的函数，像这样:
    function run(taskDef) {
        // 创建迭代器，让他在别处可用
        let task = taskDef();

        // 启动任务
        let result = task.next();

        // 递归使函数来保持对 next() 的调用
        function step() {
            // 如果还有更多要做的
            if (!result.done) {
                if (typeof result.value === "function") {
                    result.value(function (err, data) {
                        if (err) {
                            result = task.throw(err);
                            return;
                        }
                        result = task.next(data);
                        step();
                    })
                } else {
                    result = task.next(result.value);
                    step();
                }
            }
        }

        // 开始处理过程
        step();
    }

    let fs = require("fs");
    // - 这个 readFile() 方法接受单个参数，即文件名，并返回一个能执行回调函数的函数。
    //   此回调函数会被直接传递给 fs.readFile() 方法， 后者会在操作完成后执行回调。
    //   接下来你就可以使用 yield 来运行这个任务
    function readFile(filename) {
        return function (callback) {
            fs.readFile(filename, callback);
        }
    }

    // 使用 yield 来运行这个任务
    run(function* () {
        let contents = yield readFile("config.json");
        doSomethingWith(contents);
        console.log("Done");
    });


    /** 异步任务运行 --> 带数据的任务运行 **/
    /** 异步任务运行 --> 异步任务运行器 **/
```
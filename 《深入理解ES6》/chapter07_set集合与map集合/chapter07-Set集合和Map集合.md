# 第 7 章 -- Set 集合和 Map 集合

## 本章目录 (Catalog)
- ES5 中的 Set 集合与 Map 集合 
- 该解决方案的一些问题 
- ES6 中的 Set 集合
    + 创建 Set 集合并添加元素 
    + 移除元素
    + Set 集合的 forEach() 方法 
    + 将 Set 集合转换为数组
    + Weak Set 集合
        - 创建 Weak Set 集合
        - 两种 Set 类型的主要区别
- ES6 中的 Map 集合
    + Map 集合支持的方法
    + Map 集合的初始化方法
    + Map 集合的 forEach() 方法
    + Weak Map 集合
        - 使用 Weak Map 集合
        - Weak Map 集合的初始化方法 
        - Weak Map 集合支持的方法
        - 私有对象数据 
        - Weak Map 集合的使用方式及使用限制
- 小结


## 生词 (New Words)
- **processor ['prəʊsesə] --n.处理器**


## Added: 
#### 1. Set/Map 的原生 JavaScript 实现见: 
- 仓库 `DataStructure-Algorithm-Learning` 下 `《学习JavaScript数据结构与算法》` 
  中的 `chapter07-集合Set` 和 `chapter08-字典(Map)和散列表(HashTable)`

#### 2. Python 中的集合是这样的: 
- ```python
    ''' 集合 (set) '''
    # {1, 2, 5, 6}
    print({1, 2, 3, 4, 5, 6} - {3, 4})
    # {3, 4}
    print({1, 2, 3, 4, 5, 6} & {3, 4})
    # {1, 2, 3, 4, 5, 6, 7}
    print({1, 2, 3, 5, 6} | {4, 7})
    ```
- JavaScript 在 ES6 添加的 set 集合类型, 和 python 中集合的格式是类似的, 但是也有很大
不同; ES6 中的集合是值的集合, 可以按照插入的顺序迭代它的元素. Set 中的元素只会出现一次,
即 Set 中的元素是唯一的. 
- 更多内容见下面的示例

#### 3. 插入来自 《JavaScript编程思想从ES5到ES9》 中的笔记:
- 3.6.2 Set 类型
  ```javascript
    let actions = new Set();
    actions.add("read");
    actions.add("write").add("update");
    actions.add("delete");

    // - VSCode 输出如下: 
    // actions: Set { 'read', 'write', 'update', 'delete' }
    console.log("actions:", actions);

    // - VSCode 输出如下:
    // actions.entries():  [Set Entries] {
    //   [ 'read', 'read' ],
    //   [ 'write', 'write' ],
    //   [ 'update', 'update' ],
    //   [ 'delete', 'delete' ]
    // }
    console.log("actions.entries(): ", actions.entries());

    // - VSCode 输出如下:
    // actions.keys():  [Set Iterator] { 'read', 'write', 'update', 'delete' }
    console.log("actions.keys(): ", actions.keys());

    // - VSCode 输出如下:
    // actions.values():  [Set Iterator] { 'read', 'write', 'update', 'delete' }
    console.log("actions.values(): ", actions.values());

    for (let element of actions) {
        console.log(`element: ${element}`);
    }
  ```
- 3.6.2 Map(地图/映射): 是内含 **键** 对应到(`=>`) **值** 的组合. Map 与 对象(Object) 
  极为相似, 只是节省了对象的累赘和限制. 运用见以下示例:
```javascript
    let items = new Map();
    items.set("slipper", 50);
    items.set("shoes", 200);
    items.set("pants", 100).set("shirt", 150);

    // - VSCode 中输出为:
    // items: Map { 'slipper' => 50, 'shoes' => 200, 'pants' => 100, 'shirt' => 150 }

    // - 浏览器中输出为:
    // Map(4):
    //   [[Entries]]
    //      0: {"slipper" => 50}
    //          key: "slipper"
    //          value: 50
    //      1: {"shoes" => 200}
    //          key: "shoes"
    //          value: 200
    //      2: {"pants" => 100}
    //          key: "pants"
    //          value: 100
    //      3: {"shirt" => 150}
    //          key: "shirt"
    //          value: 150
    //      size: 4
    //   __proto__: Map
    //      clear: f clear()
    //      constructor: f Map()
    //      delete: f delete()
    //      entries: f entries()
    //      forEach: f forEach()
    //      get: f ()
    //      has: f has()
    //      keys: f keys()
    //      set: f ()
    //      size: 4
    //      values: f values()
    //      Symbol(Symbol.iterator): f entries()
    //      Symbol(Symbol.toStringTag): "Map"
    //      get size: f size()
    //      __proto__: Object

    // - Tip: 上面 clear()/delete()/entries()/forEach/... 这些方法在浏览器中
    //   显示都具有公共的:
    //     + arguments: (...)
    //     + caller: (...)
    //     + length: 0
    //     + name: "clear/delete/entries/forEach/..."
    //     + __proto__: f ()
    //     + [[Scopes]]: Scopes[0]
    console.log("items:", items);

    console.log("items.size:", items.size); // 4

    // - VSCode 输出如下: 
    // items.entries(): [Map Entries] {
    //   [ 'slipper', 50 ],
    //   [ 'shoes', 200 ],
    //   [ 'pants', 100 ],
    //   [ 'shirt', 150 ]
    // }
    console.log("items.entries():", items.entries());

    // - VSCode 输出如下: 
    // items.keys(): [Map Iterator] { 'slipper', 'shoes', 'pants', 'shirt' }
    console.log("items.keys():", items.keys());

    // - VSCode 输出如下:
    // items.values(): [Map Iterator] { 50, 200, 100, 150 }
    console.log("items.values():", items.values());
    for (let [key, value] of items) {
        console.log(`One ${key} costs ${value}.`);
    }
  ```



## 本章内容 (Contents)

### 7.1 ES5 中的 Set 集合与 Map 集合 

### 7.2 该解决方案的一些问题 

### 7.3 ES6 中的 Set 集合
- ES6 中新增的 Set 類型是一種有序列表，其中含有一些相互獨立的非重複值，通過 Set 集合
  可以快速訪問其中的數據，更有效追踪各种离散值。
#### 7.3.1 创建 Set 集合, 使用 `add()` 方法添加元素
- ```javascript
    let set = new Set();
    set.add(5);
    set.add("5");
    // - (1). 使用 add() 方法传入相同的值作为参数会直接被忽略
    set.add(5);     
    // set:  Set { 5, '5' }
    console.log("set: ", set); 

    let set2 = new Set(),
    key1 = {},
    key2 = {};
    set2.add(key1);
    set2.add(key2);
    // set2: Set { {}, {} }
    console.log("set2:", set2);
  ``` 
#### 7.3.2 移除元素 `delete(value)`
- ```javascript
    // (2). has()方法可以检测 Set 结合中是否函存在某个值:
    console.log(set.has(5));      // true
    console.log(set.has(6));      // false

    // (3). delete() 方法可以移除 Set 集合中的某一个元素
    set.delete(5);
    console.log(set.has(5));  // false

    // (4). clear() 方法可以移除 Set 集合中的所有元素
    set.clear();
    console.log(set.size);    // 0
  ```
#### 7.3.3 Set 集合的 `forEach()` 方法 
- ```javascript
    let set3 = new Set([1, 2]);
    set3.forEach(function (value, key, ownerSet) {
        console.log(key + " " + value);
        console.log(ownerSet === set3);
    });

    let set4 = new Set([1, 3, 5, 7]);
    // set4:  Set { 1, 3, 5, 7 }
    console.log("set4: ", set4);
    let processor = {
        output(value) {
            console.log(value);
        },
        process(dataSet) {
            // - 如果需要在回调函数中使用 this 引用, 则可以将它作为第二个参数传入 forEach()
            dataSet.forEach(function (value) {
                this.output(value);
            }, this)

            // 这里可以用 ES6 的箭头函数简写为: 箭头函数从外围的 process() 函数读取 this 值，
            // 所以可以把 this.output() 方法正确得解析为 processor.output()
            // dataSet.forEach ( value => this.output ( value ) )

        }
    };
    processor.process(set4);
  ```
#### 7.3.4 将 Set 集合转换为数组
- ```javascript
    let set5 = new Set([1, 2, 3, 3, 3, 4, 5]);；
    // - `...`(展开运算符 spread operator): 可以用来 '卸除' 特定数组的中括号或特定
    //   对象的大括号。
    let arr = [...set5];
    console.log("set5: ", set5);
    console.log(arr);           // [1, 2, 3, 4, 5]

    // 创建一个无重复值的新数组
    function eliminateDuplicates(items) {
        return [...new Set(items)];
    }

    let numbers = [1, 2, 3, 4, 4, 4, 5],
        noDuplicates = eliminateDuplicates(numbers);
    console.log('noDuplicates: ', noDuplicates);   // [1, 2, 3, 4, 5]
  ```
#### 7.3.5 Weak Set 集合
- *ES6 也包含了 Weak Set 集合(弱引用 set 集合)，该类型只**允许存储对象**弱引用，*
  **不能存储基本类型的值**。*集合中的弱引用如果是对象唯一的引用，则会被回收并释放相应内存*
- (7.3.5-1) 创建 Weak Set 集合
    + 用 WeakSet 构造函数可以创建 Weak Set 集合, 集合支持 3 个方法: `add()`, 
      `has()` 和 `delete()`. 下面这个示例创建了一个集合并分别调用这 3 个方法:
      ```javascript
        let set = new WeakSet();
        let key = {};
        set.add(key);
        console.log(set.has(key));  // true
        set.delete(key); 
        console.log(set.has(key));  // false
      ```
- (7.3.5-2)两种 Set 类型的主要区别
    + 两种 Set 类型之间最大的区别是 Weak Set 保存的是对象值的弱引用. 下面这个示例展示
      2 者之间的差异:
      ```js
        let set = new WeakSet();
        let key = {};
        set.add(key);
        console.log(set.has(key));  // true
        // - 移除对象 key 的最后一个强引用 (Weak Set 中的引用也自动移除)
        key = null;
      ```
      这段代码执行过后，就无法访问 Weak Set  中 key 的引用了。由于我们需要向 has()
      方法传递一个强引用才能验证这个弱引用是否已被移除，因此测试有点儿难以进行下去，但是
      请你相信，Javascript 引擎一定会正确地移除最后一个弱引用。
    + 以上示例展示了一些 Weak Set 集合与普通 Set 集合的共同特性，但是它们之间还有下面
      几个差别：
        - (1) 在 WeakSet 的实例中，如果向 add()、has() 和 delete() 这 3 个方法
          传入非对象参数都会导致程序报错。
        - (2) Weak Set 集合不可迭代，所以不能被用于 for-of 循环。
        - (3) Weak Set 集合不暴露任何迭代器 (例如 keys() 和 values() 方法), 所以
          无法通过程序本身来检测其中的内容 Weak Set 集合不支持 foreach（）方法。
        - (4) Weak Set 集合不支持 size 属性
        - (5) Weak Set 集合的功能看似受限，其实这是为了让它能够正确地处理内存中的数据。
          总之，如果你只需要跟踪对象引用，你更应该使用 Weak Set 集合而不是普通的 Set 集合。
    + Se 类型可以用来处理列表中的值，但是不适用于处理 `键值对` 这样的信息结构。
      ECMAScript6 也添加了 Map 集合来解决类似的问题。

### 7.4 ES6 中的 Map 集合
- *ES6 中的 Map 类型是一种存储着许多键值对的有序列表，其中的键名和对应的值支持所有的*
  *数据类型。键名会通过 Object.is() 方法来判断是否相等*
- Map 集合 `添加(set)` 和 `获取(get)` 元素的方法
    + `set(key, value)` 方法: 向 Map 集合中添加新的元素，参数分别为 "键名" 和 "对应值"
    + `get(key)` 方法: 从集合中获取信息，参数为 "键名"
      ```javascript
        let map = new Map();
        map.set("title", "Understanding ECMAScript 6");
        map.set("year", 2016);
        console.log(map.get("title"));
        console.log(map.get("year"));
      ```
#### 7.4.1 Map 集合支持的方法
- Map 集合和 Set 集合一样都支持 3 个通用方法:
    + `has(key)`: 检测指定的键名在 Map 集合中是否已经存在。
    + `delete(key)`: 从 Map 集合中移除指定键名及其对应的值。
    + `clear()`: 移除 Map 集合中的所有键值对。
#### 7.4.2 Map 集合的初始化方法
#### 7.4.3 Map 集合的 `forEach()` 方法
#### 7.4.4 Weak Map 集合
- (7.4.4-1) 使用 Weak Map 集合
    + Weak Map 集合中的键名必须是一个对象.
- (7.4.4-2) Weak Map 集合的初始化方法
    + Weak Map 集合的初始化过程与 Map 集合类似，调用 WeakMap 构造函数并传入一个
      数组容器，容器内包含其他数组，每一个数组由 2 个元素构成：
        - 第 1 个元素是一个 `键名`，传入的值必须是非 null 的对象；
        - 第 2 个元素是这个键对应的`值`（可以是任意类型）。举个例子
        - ```js
            let key1 = {},
                key2 = {},
                map = new WeakMap([[key1, "Hello"], [key2, 42]]);
            console.log(map.has(key1));     // true 
            console.log(map.get(key1));     // "Hello" 
            console.log(map.has(key2));     // true 
            console.log(map.get(key2));     // 42
          ```
    + 对象 key1 和 key2 被当作 Weak Map 集合的键使用，可以通过 `get()` 方法和
      `has()`方法去访问。如果给 WeakMap 构造函数传入的诸多键值对中含有非对象的键，
      会导致程序抛出错误.
- (7.4.4-3) Weak Map 集合支持的方法
    + Weak Map 集合只支持 2 个可以操作键值对的方法: 
        - `has(key)`: 检测给定的键在集合中是否存在.
        - `delete(key)`: 移除指定的键值对.
- (7.4.4-4) 私有对象数据 
    + 使用 Weak Map 结合存储对象实例的私有数据:
      ```js
        let People = (function () {
            let privateData = new WeakMap();

            function People(name) {
                // - this 为构造函数的实例
                privateData.set(this, {name: name});
            }

            People.prototype.getName = function () {
                return privateData.get(this).name;
            };
            return People;
        }());
        let people = new People("Nicholas");
        console.log(people.getName()); 
      ```
- (7.4.4-5) Weak Map 集合的使用方式及使用限制
    + (1) Weak Map 只允许使用对象作为集合的键名.
    + (2) 不支持 `forEach()` 方法, `size`属性 以及 `clear()` 方法来管理集合中的元素. 

### 小结
- ECMAScript6 正式将 Set 集合与 Map 集合引入到 Javascript 中，而在这之前，开发者们
  经常用对象来模拟这两种集合，但是由于对象属性自身的限制，经常会遇到一些问题。
- Set 集合是一种包含多个非重复值的无序列表，值与值之间的等价性是通过 `Object.is()` 方法
  来判断的，如果相同，则会自动过滤重复的值，所以可以用 Set 集合来过滤数组中的重复元素。
  Set 集合不是数组的子类，所以你不能随机访问集合中的值，只能通过 `has()` 方法检测指定的值
  是否存在于 Set 集合中，或者通过 `size` 属性查看 Set 集合中的值的数量。Set 类型同样支持
  `foreach()` 方法来处理集合中的每一个值。
- Weak Set 集合是一类特殊的 Set 集合，集合只支持存放对象的弱引用，当该对象的其他强引用
  都被清除时，集合中的弱引用也会自动被垃圾回收。由于内存管理非常复杂，Weak Set 集合
  不可以被检查，因此追踪成组的对象是该集合最好的使用方式。
- Map 是多个无序键值对组成的集合，键名支持任意数据类型。与 Set 集合相似的是，Map 集合
  也是通过 `Object.is()`方法来过滤重复值，数字 5 和字符串 “5” 可以分别作为两个独立的
  键名使用。通过 `set()` 方法可以将任意类型的值添加到集合中，通过 `get()` 方法可以检索
  集合中的所有值，通过 `size` 属性可以检査集合中包含的值的数量，通过 `foreach()`方法
  可以遍历并操作集合中的每一个值。
- Weak Map 集合是一类特殊的 Map 集合，只支持对象类型的键名。与 Weak Set 相似的是，
  集合中存放的键是对象的弱引用，当该对象的其他强引用都被清除时，集合中弱引用键及其对应的值
  也会自动被垃圾回收。这种内存管理机制非常适合这样的场景：为那些实际使用与生命周期管理分离
  的对象添加额外信息.
# 第 7 章 -- Set 集合和 Map 集合

## 本章目录 (Catalog)
- ES5 中的 Set 集合与 Map 集合 (Sets and Maps in ECMAScript 5)
- 该解决方案的一些问题 (Problems with Workarounds)
- ES6 中的 Set 集合 (Sets in ECMAScript 6)
    + 创建 Set 集合并添加元素 (Creating Sets and Adding Items)
    + 移除元素 (Removing Values)
    + Set 集合的 forEach() 方法 (The forEach() Method for Sets)
    + 将 Set 集合转换为数组 (Converting a Set an Array)
    + Weak Set 集合 (Weak Sets)
        - 创建 Weak Set 集合 (Creating a Weak Set)
        - 两种 Set 类型的主要区别 (Key Differences Between Set Types)
- ES6 中的 Map 集合 (Maps in ECMAScript 6)
    + Map 集合支持的方法 (Map Methods)
    + Map 集合的初始化方法 (Map Initialization)
    + Map 集合的 forEach() 方法 (The forEach() Method on Maps)
    + Weak Map 集合 (Weak Maps)
        - 使用 Weak Map 集合(Using Weak Maps)
        - Weak Map 集合的初始化方法 (Weak Map Initialization)
        - Weak Map 集合支持的方法 (Weak Map Methods)
        - 私有对象数据 (Private Object Data)
        - Weak Map 集合的使用方式及使用限制 (Weak Map Uses and Limitations)
- 小结


## 生词 (New Words)
- **processor ['prəʊsesə] --n.处理器**


## 提示: 
- Python 中的集合是这样的: 
  ```python
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
    + 更多内容见下面的示例


## 插入来自 《JavaScript编程思想从ES5到ES9》 中的笔记:
#### 3.6.2
- Map 类型
    + Map(地图)是内含**键名**对应到(`=>`)**值/数据**的组合. Map 与 对象(Object) 极为
      相似, 只是节省了对象的累赘和限制. 运用见以下示例:
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
- Set 类型
    + ```javascript
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


## 本章内容 (Contents)
### ES5 中的 Set 集合与 Map 集合
### 该解决方案的一些问题
### ES6 中的 Set 集合
ES6 中新增的 Set 類型是一種有序列表，其中含有一些相互獨立的非重複值，通過 Set 集合可以快速
訪問其中的數據，更有效追踪各种离散值。
- 创建 Set 集合, 使用 add() 方法添加元素
  ```javascript
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
- 移除元素
  ```javascript
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
- Set 集合的 forEach() 方法
  ```javascript
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
- 将 Set 集合转换为数组
  ```javascript
    let set5 = new Set([1, 2, 3, 3, 3, 4, 5])；
    // - `...`(扩展运算符 spread operator): 可以用来 '卸除' 特定数组的中括号或特定
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
- Weak Set 集合
    + *ES6 也包含了 Weak Set 集合(弱引用 set 集合)，该类型只**允许存储对象**弱引用，*
      **不能存储基本类型的值**。*集合中的弱引用如果是对象唯一的引用，则会被回收并释放相应内存*
    + 创建 Weak Set 集合
      ```javascript
        let set6 = new Set(),
            key = {};
        set6.add(key);
        console.log(set6.size); // 1
        // - 取消原始引用
        key = null;
        console.log(set6.size);  // 1
        // - 重新获得原始引用
        key = [...set6][0];
        
        /* 创建 Weak Set */
        let wSet = new WeakSet(),
            wKey = {};
        // - 将对象加载 set
        wSet.add(wKey);
        console.log(wSet.has(wKey));
        wSet.delete(wKey);
        console.log(wSet.has(wKey));
      ```
    + 两种 Set 类型的主要区别 
### ES6 中的 Map 集合
- *ES6 中的 Map 类型是一种存储着许多键值对的有序列表，其中的键名和对应的值支持所有的*
  *数据类型。键名会通过 Object.is() 方法来判断是否相等*
- Map 集合支持的方法
    + `set()` 方法: 向 Map 集合中添加新的元素，参数分别为 "键名" 和 "对应值"
    + `get()` 方法: 从集合中获取信息，参数为 "键名"
    + ```javascript
        let map = new Map();
        map.set("title", "Understanding ECMAScript 6");
        map.set("year", 2016);
        console.log(map.get("title"));
        console.log(map.get("year"));
      ```
- Map 集合的初始化方法
- Map 集合的 forEach() 方法
- Weak Map 集合
    + 使用 Weak Map 集合
    + Weak Map 集合的初始化方法 
    + Weak Map 集合支持的方法
        - Map 和 Set 集合公共的方法:
            + `has(key)`: 检测指定的键名在 Map 集合中是否已经存在。
            + `delete(key)`: 从 Map 集合中移除指定键名及其对应的值。
            + `clear()`: 移除 Map 集合中的所有键值对。
    + 私有对象数据 
    + Weak Map 集合的使用方式及使用限制
        - 当你要在 Weak Map 集合与普通的 Map 集合之间做出选择时，需要考虑的主要问题是，
          是否只用对象作为集合的键名。如果是，那么 Weak Map 集合是最好的选择。当数据再也
          不可访问后集合中存储的相关引用和数据都会被自动回收，这有效地避免了内存泄露的问题，
          从而优化了内存的使用。
        - 请记住，相对 Map 集合而言，Weak Map 集合对用户的可见度更低，其不支持通过 
          `foreach()`方法、`size`属性 及 `clear()`方法来管理集合中的元素。如果你非常
          需要这些特性，那么 Map 集合是一个更好的选择，只是一定要留意内存的使用情况。
        - 当然，如果你只想使用非对象作为键名，那么普通的 Map 集合是你唯一的选择。
### 小结
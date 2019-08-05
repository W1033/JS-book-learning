/* Create date: 2018-06-02 */

/**
 * 第 7 章: Set 集合与 Map 集合
 *  1. ECMAScript 5 中的 Set 集合与 Map 集合
 *  2. 解决方案的一些问题
 *  3. ECMAScript 6 中的 Set 集合
 *      - 创建 Set 集合并添加元素
 *      - 移除元素
 *      - Set 集合的 forEach() 方法
 *      - 将 Set 集合转换为数组
 *      - Weak Set 集合
 *  4. ECMAScript 6 中的 Map 集合
 *      - Map 集合支持的方法
 *      - Map 集合的初始化方法
 *      - Map 集合的 forEach() 方法
 *      Weak Map 集合
 *
 * */


/** 20180602-P131: ES6 中的 Set 集合  **/
//  ES6 中新增的 Set 類型是一種有序列表，其中含有一些相互獨立的非重複值，通過 Set 集合
//  可以快速訪問其中的數據，更有效追踪各种离散值。

/** 3. ES6 中的 Set 集合 --> P131: 创建 Set 集合并添加元素，删除元素 **/
// (1).創建 Set 集合， 使用 add() 方法添加元素
let set = new Set();
set.add(5);
set.add("5");
set.add(5);     // 使用 add() 方法传入相同的值作为参数会直接被忽略
console.log("set: ", set);      // 2

let set2 = new Set(),
    key1 = {},
    key2 = {};
set2.add(key1);
set2.add(key2);
console.log(set2.size);   // 2

// (2). has()方法可以检测 Set 结合中是否函存在某个值:
console.log(set.has(5));      // true
console.log(set.has(6));      // false

// (3). delete() 方法可以移除 Set 集合中的某一个元素
set.delete(5);
console.log(set.has(5));  // false

// (4). clear() 方法可以移除 Set 集合中的所有元素
set.clear();
console.log(set.size);    // 0

/** 3. ES6 中的 Set 集合 --> P133: Set 集合的 forEach() 方法 **/
let set3 = new Set([1, 2]);
set3.forEach(function (value, key, ownerSet) {
    console.log(key + " " + value);
    console.log(ownerSet === set3);
});

// processor /'prəʊsesə/ n.处理器
let set4 = new Set([1, 3, 5, 7]);
// set4:  Set { 1, 3, 5, 7 }
console.log("set4: ", set4);
let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        // 从这里可以看出 forEach() 方法并不只是只接受一个参数, this 为 processor 对象，这里要清楚。
        dataSet.forEach(function (value) {
            this.output(value);
        }, this)

        // 这里可以用 ES6 的箭头函数简写为: 箭头函数从外围的 process() 函数读取 this 值，
        // 所以可以把 this.output() 方法正确得解析为 processor.output()
        // dataSet.forEach ( value => this.output ( value ) )

    }
};
processor.process(set4);


/** 3. ES6 中的 Set 集合 --> P136: 将 set 集合转换成数组 **/
let set5 = new Set([1, 2, 3, 3, 3, 4, 5]),
    arr = [...set5];
console.log("set5: ", set5);
console.log(arr);           // [1, 2, 3, 4, 5]

// 创建一个无重复值的新数组
function eliminateDuplicates(items) {
    return [...new Set(items)];
}

let numbers = [1, 2, 3, 4, 4, 4, 5],
    noDuplicates = eliminateDuplicates(numbers);
console.log('noDuplicates: ', noDuplicates);   // [1, 2, 3, 4, 5]


/** 3. ES6 中的 Set 集合 --> P136: Weak Set:
 * ES6 也包含了 Weak Set 集合(弱引用 set 集合)，该类型只允许存储对象弱引用，不能存储基本类型的值。
 * 集合中的弱引用如果是对象唯一的引用，则会被回收并释放相应内存。 **/
let set6 = new Set(),
    key = {};
set6.add(key);
console.log(set6.size); // 1
// 取消原始引用
key = null;
console.log(set6.size);  // 1
// 重新获得原始引用
key = [...set6][0];

/* 创建 Weak Set */
let wSet = new WeakSet(),
    wKey = {};
// 将对象加载 set
wSet.add(wKey);
console.log(wSet.has(wKey));
wSet.delete(wKey);
console.log(wSet.has(wKey));


/** 4. ECMAScript 6 中的 Map 集合 */
/* ES6 中的 Map 类型是一种存储着许多键值对的有序列表，其中的键名和对应的值支持所有的数据类型。
 * 键名会通过 Object.is() 方法来判断是否相等 */
// - set() 方法: 向 Map 集合中添加新的元素，参数分别为 "键名" 和 "对应值"
// - get() 方法: 从集合中获取信息，参数为 "键名"
let map = new Map();
map.set("title", "Understanding ECMAScript 6");
map.set("year", 2016);
console.log(map.get("title"));
console.log(map.get("year"));

/** 4. ECMAScript 6 中的 Map 集合 --> Map 集合支持的方法 */
// Map 和 Set 集合公共的方法:
// - has(key): 检测指定的键名在 Map 集合中是否已经存在。
// - delete(key): 从 Map 集合中移除指定键名及其对应的值。
// - clear(): 移除 Map 集合中的所有键值对。

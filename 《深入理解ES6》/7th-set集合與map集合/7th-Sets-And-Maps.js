/* Create date: 2018-06-02 */


/** 20180602-P131: ES6 中的 Set 集合  **/
//  ES6 中新增的 Set 類型是一種有序列表，其中含有一些相互獨立的非重複值，通過 Set 集合可以快速訪問其中的數據，更有效追踪各种离散值。

/** ES6 中的 Set 集合 --> P131: 创建 Set 集合并添加元素，删除元素 **/
// (1).創建 Set 集合， 使用 add() 方法添加元素
let set = new Set();
set.add(5);
set.add("5");
set.add(5);     // 使用 add() 方法传入相同的值作为参数会直接被忽略
console.log(set.size);      // 2

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

/** ES6 中的 Set 集合 --> P133: Set 集合的 forEach() 方法 **/
let set3 = new Set([1, 2]);
set3.forEach(function (value, key, ownerSet) {
    console.log(key + " " + value);
    console.log(ownerSet === set3);
});

// processor /'prəʊsesə/ n.处理器
let set4 = new Set([1, 3, 5, 7]);
let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        // 从这里可以看出 forEach() 方法并不只是只接受一个参数, this 为 processor 对象，这里要清楚。
        dataSet.forEach(function (value) {
            this.output(value);
        }, this)

        // 这里可以用 ES6 的箭头函数简写为: 箭头函数从外围的 process() 函数读取 this 值，所以可以把 this.output() 方法正确得解析为 processor.output()
        // dataSet.forEach ( value => this.output ( value ) )

    }
};
processor.process(set4);


/** ES6 中的 Set 集合 --> P136: 将 set 集合转换成数组 **/
let set5 = new Set([1, 2, 3, 3, 3, 4, 5]),
    arr = [...set5];
console.log(arr);           // [1, 2, 3, 4, 5]

// 创建一个无重复值的新数组
function eliminateDuplicates(items) {
    return [...new Set(items)];
}

let numbers = [1, 2, 3, 4, 4, 4, 5],
    noDuplicates = eliminateDuplicates(numbers);
console.log(noDuplicates);   // [1, 2, 3, 4, 5]


/** ES6 中的 Set 集合 --> P136: Weak Set:
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

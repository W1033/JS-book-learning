/* Created 20180711 */
/**
 * 第十章 改进的数组功能
 *  1. 创建数组
 *      - Array.of() 方法
 *      - Array.from() 方法
 *  2. 为所有的数组添加的方法
 *      - find() 方法和 findIndex() 方法
 *      - fill() 方法
 *      - copyWithin() 方法
 *  3. 定型数组
 *      - 数值数据类型
 *      - 数组缓冲区
 *      - 通过视图操作数组缓冲区
 *  4. 定型数组与普通该数组的相似之处
 *      - 通用方法
 *      - 相同的迭代器
 *      - of() 方法和 from() 方法
 *  5. 定型数组与普通数组的差别
 *      - 行为差异
 *      - 缺失的方法
 *      - 附加方法
 *  小结
 * */


/** 1. 创建数组 --> Array.of() 方法: 创建数组 */
// Array.of() 方法总会创建一个包含所有参数的数组。
let items = Array.of(1, 2);
console.log(items.length);
console.log(items[0]);

// 如果需要给一个函数传入 Array 的构造函数，则你可能希望传入 Array.of() 来确保行为一致。例如:
function createArray(arrayCreator, value) {
    return arrayCreator(value);
}
// let items2 = createArray(Array.of, value);

/* Array.of() 方法不通过 Symbol.species 属性 (见第9章) 确定返回值得类型，他使用当前构造函数
* (也就是 of() 方法中的 this 值) 来确定正确的返回数据类型。 */



/** 1. 创建数组 --> Array.from() 方法: 把类数组转换为数组  */
// ES5 中把类数组转换为数组: Array.prototype.slice.call(arrayLike);
// Array.from() 接受可迭代对象或类数组对象作为第一个参数，最终返回一个数组。
// let args = Array.from(args);

/* 映射转换: 如果想要进一步转化数组，可以提供一个映射函数作为 Array.from() 的第二个参数， 这个
 * 函数用来将类数组对象中的每一个值转换成其他形式，最后将这些结果存储在结果数组的相应索引中。 例下: */
function translate() {
    return Array.from(arguments, (value) => value + 1);
}

let numbers = translate(1, 2, 3);
console.log(numbers);   // 2, 3, 4

// 如果用映射函数处理对象，也可以给 Array.from() 方法传入第三个参数来表示映射函数的 this 值。例:
let helper = {
    diff: 1,
    add(value) {
        return value + this.diff;
    }
};

function translate2() {
    return Array.from(arguments, helper.add, helper);
}

let numbers2 = translate2(1, 2, 3);
console.log(numbers2);

// - 用 Array.from() 转换可迭代对象: Array.from() 方法可以处理类数组对象和可迭代对象，
//   也就是说该方法能够将所有含有 Symbol.iterator 属性的对象转换为数组。例如:
let nums = {
    * [Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
};
let nums2 = Array.from(nums, (value) => value + 1);
console.log(nums2);     // 2, 3, 4

// ----------------------------------------------------------------------


/** 2.为所有的数组添加的方法 --> find() 方法和 findIndex() 方法 【数组中查找元素】 */
// - ES5 添加了 indexOf() 和 lastIndexOf() 两个方法，用于在数组中查找特定的值，但每次
//   只能查找一个值。如果想在一系列数字中查找一个偶数，则必须自己编写代码。
// - 于是 ES6 引入了 find() 和 findIndex() 方法来解决这个问题。
//     + find() 方法返回查找到的值。
//     + findIndex() 方法返回查找到的值的索引。
// - 这2个方法都接受2个参数: 
//     + 1.一个回调函数; 
//     + 2.可选参数，用于指定回调函数中 this 的值。 
//  执行回调函数时，传入的参数分别为: (1). 数组中的当前元素; (2).该元素在数组中的索引; 
//  (3).数组本身. 与传入 map() 和 forEach() 方法的参数相同。如果给定的值满足定义的标准，
//  回调函数应返回 true, 一旦回调函数返回 true，find() 和 findIndex() 方法都会立即
//  停止搜索数组剩余的部分。
let numbersArr = [25, 30, 35, 40, 45];
console.log(numbersArr.find(function (n) {
    return n > 33;
}));
// 把上面的回调函数写成箭头函数更简洁，
// 注意: 参数 n 外面一般不写括号(虽然有括号也正常执行)，带括号的写法多为: (n) => { return n >33 };
console.log(numbersArr.find(n => n > 33));
console.log(numbersArr.findIndex(n => n > 33));

/** 2.为所有的数组添加的方法 --> fill() 方法: 用指定的值填充一至多个数组元素。
 *     - 当传入一个值时，fill() 方法会用这个值重写数组中的所有值。
 *     - 如果只想改变数组某一部分的值，可以传入:
 *         + (1).要填充的值
 *         + (2).开始索引
 *         + (3).结束索引(不包含结束索引当前值)
 *  */
let numbersAgain = [1, 2, 3, 4, 5];
numbersAgain.fill(6);
console.log(numbersAgain.toString());
console.log(numbersAgain.fill(2, 2));
console.log(numbersAgain.fill(0, 1, 3));

/** 2.为所有的数组添加的方法 --> copyWithin() 方法: 【从数组中赋值元素的值】
 *    调用 copyWithin() 方法可传入 3 个参数，第 3 个参数为可选:
 *      - (1). 开始填充值的索引位置
 *      - (2). 开始复制值的索引位置
 *      - (3). (可选)限制被重写元素的数量。不包含结束索引，用于指定停止复制值的位置。
 *    */
let anotherNums = [1, 3, 5, 6, 7, 9, 10];
// 从数组的索引 3 开始粘贴值
// 从数组的索引 0 开始复制值
/* 注: 2 个参数从后往前看: 从索引 0 开始复制值到索引 3 处停止 (不包含索引 3), 然后把复制的 1, 3, 5
 * 插入到索引为 3 的元素的前面，数组总长度不改变，所以数组变更为 -> [1, 3, 5, 1, 3, 5, 6]  */
anotherNums.copyWithin(3, 0);
console.log(anotherNums);       // [1, 3, 5, 1, 3, 5, 6]

let otherNum = [1, 3, 5, 6, 7, 9, 10];
// 从索引 3 开始粘贴值
// 从索引 0 开始复制值
// 当位于索引 2 时停止复制值 ( 此时复制了前两项 1, 3 )
otherNum.copyWithin(3, 0, 2);
/* 注: 通过输出值可以看出: 当第 3 个参数存在时和上面 2 个参数的情形并不一样，第 3 个参数存在时复制的
 * 1, 3 项直接覆盖了 6, 7 两项，并不是插入到这两项之前。  */
console.log(otherNum);  // [1, 3, 5, 1, 3, 9, 10]

// ----------------------------------------------------------------------

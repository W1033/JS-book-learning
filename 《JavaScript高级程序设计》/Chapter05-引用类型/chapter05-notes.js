// let colors = ['red', 'green', 'blue'];
// // - 创建当前 colors 数组的一个副本.
// let copyColors = colors.concat();
// // - 合并数组
// let colors2 = copyColors.concat('yellow', ['black', 'brown']);
// // [ 'red', 'green', 'blue', 'yellow', 'black', 'brown' ]
// console.log(colors2)


// var colors = ["red", "green", "blue", "yellow", "purple"];
// var colors2 = colors.slice(1);
// var colors3 = colors.slice(1,4);
// console.log(colors2); // [ 'green', 'blue', 'yellow', 'purple' ]
// console.log(colors3); // [ 'green', 'blue', 'yellow' ]


// let colors = ["red", "green", "blue"];
// let removed = colors.splice(0,1);
// console.log('colors:', colors);    // colors: [ 'green', 'blue' ]
// console.log('removed:', removed);  // removed: [ 'red' ]

// // 从位置 1 开始插入两项
// removed = colors.splice(1, 0, "yellow", "orange");
// console.log(colors)     // [ 'green', 'yellow', 'orange', 'blue' ]
// console.log(removed)    // []

// // 插入两项, 删除一项
// removed = colors.splice(1, 1, "red", "purple");
// console.log(colors);    // [ 'green', 'red', 'purple', 'orange', 'blue' ]
// console.log(removed);   // [ 'yellow' ]


let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
// console.log(numbers.indexOf(4));        // 3
// // - 从后向前查找即为倒数第一个 4, 但我们数索引为从前向后数, 所以索引为 5 
// console.log(numbers.lastIndexOf(4));    // 5

// console.log(numbers.indexOf(4, 4));     // 5
// console.log(numbers.lastIndexOf(4, 4))  // 3

// let person = {name: 'Nicholas'};
// let people = [{name: 'Nicholas'}];
// let morePeople = [person];
// console.log(typeof person);
// console.log(typeof people[0]);
// // - 为什么在 people 内查找 person 返回 -1, 因为 person 和 people
// //   为引用类型类型的值, 它们在堆内存中指向不同的内存地址.
// console.log(people.indexOf(person));        // -1
// console.log(morePeople.indexOf(person));    // 0


// let colors = ['red', 'blue', 'green'];
// console.log(colors.slice().toString());     // red,blue,green
// console.log(colors.valueOf());              // [ 'red', 'blue', 'green' ]


const arr = [11, 22, 33, 44];
let total = arr.reduce((accumulator, current) => {
    return accumulator + current;
})
console.log('total:', total);   // total: 110

// - (2) 带初始值
const arr4 = [11, 22, 33, 44];
let total2 = arr3.reduce(function(acc, cur) {
        //debugger;
        // 第一次输出 acc 为 55
        console.log(acc);
        return acc + cur;
    }
, 55);
console.log("total2: ", total2);

// - (3) 求乘积
const arr5 = [11, 22, 33, 44];
// product /'prɒdʌkt/ n.产品，乘积
let pro = arr5.reduce((acc, cur) => acc * cur);
console.log("pro: ", pro);

// - (4) 求最大值
const arr6 = [11, 22, 33, 44];
let max = arr6.reduce((acc, cur) => {
    return acc > cur ? acc : cur;
});
console.log("max: ", max);
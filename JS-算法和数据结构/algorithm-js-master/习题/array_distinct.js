//数组去重
function arryDistinct1(arr) {
    return [...new Set(arr)]
}

function arryDistinct2(arr) {
    return arr.filter((item, index, array) => {
        return index === array.lastIndexOf(item)
    })
}

function arryDistinct3(arr) {
    /*const temp = []
    arr.forEach(item => {
        if (temp.indexOf(item) === -1) temp.push(item)
    })
    return temp*/

    const temp = [];
    let i = 0;
    for (; i < arr.length; i++) {
        if (temp.indexOf(arr[i]) === -1) {
            temp.push(arr[i]);
        }
    }
    return temp;
}

console.log(arryDistinct1([1, 1, 2, 3, 2, 4]));
console.log(arryDistinct2([1, 1, 2, 3, 2, 4]));
console.log(arryDistinct3([1, 1, 2, 3, 2, 4]));


// 2 个 数组去重
var arr1 = ["i", "b", "c", "d", "e", "f", "x"]; //数组A
var arr2 = ["a", "b", "c", "d", "e", "f", "g"];//数组B
var temp = []; //临时数组1
var temparray = [];//临时数组2

for (var i = 0; i < arr2.length; i++) {
    //巧妙地方：把数组B的值当成临时数组1的键并赋值为真
    temp[arr2[i]] = true;
}
console.log(temp);

for (var i = 0; i < arr1.length; i++) {
    if (!temp[arr1[i]]) {
        //巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组
        temparray.push(arr1[i]);
    }
}
console.log(temparray);
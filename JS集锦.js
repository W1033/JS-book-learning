/** Created on 2018/3/9. */

/*--------------------------------------------------------*/
// 1. 下面的对象字面量创建对象 = new Object();
var a1 = {name: "a Object"};


// <button id="btnId"></button>
// $("#btnId").click(function () {
//     // this 输出为: <button id="btnId"></button>
//     console.log(this);
// });


function test() {
    console.log(this);
}

// 因为 test 挂载在 window 上
// test();      // 输出: window

// 一般都是把构造函数通过 new 调用，此处的写法不严谨，但是jq本身也不是第一个字母大写，所以不能说此处为错误
new test();     // 输出: test {}


test.call(a1);   // 输出: {name: "a Object"}
/*--------------------------------------------------------*/

/** 把类数组转换为数组 : 在 batchTransfer.jsp 中使用示例
 *
 *   对 arguments 对象使用 Array.prototype.slice() 方法可以将其转换为数组。
 *   而采用同样的方法，也可以将 NodeList 对象转换为数组:
 *   //在 IE8 及之前版本中无效
 *   var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);
 *   ------《js 高程》
 */
var classArr = {};
console.log(Array.prototype.slice.call(classArr));


/** 3. 判断一个对象是否为数组 */
function isArray(arg) {
    if (arg && typeof arg === "object") {
        return Object.prototype.toString.call(arg) === "[object Array]";
    }
    return false;
}


/** 数组的 splice() 方法: js高程 5.2.6 */
var myArr = [1, 2, 3, 4, 5];
// splice(): 參數1: 要删除的第一项的位置  參數2: 删除的项数
// 从索引为 1 開始刪除 3 项，删除后把 5,2,1 插入
myArr.splice(1, 3, 5, 2, 1);         // 输出: [1, 5, 2, 1, 5]
console.log(myArr);


/*--------------------------------------------------------*/


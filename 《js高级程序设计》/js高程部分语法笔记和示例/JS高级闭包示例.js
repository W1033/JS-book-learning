/** Created by wxh-s022 on 2017/3/7.*/

function closure() {
    var a = [];
    for (var i = 0; i < 10; i++) {
        a[i] = function () {
            return i;
        };
    }
    return a;
}

var returnArr = closure();
for (var i = 0; i < returnArr.length; i++) {
    console.log(returnArr[i]());//调用时不要忘记后面的()小括号，这样returnArr[i]只是调用了函数的指针。
}

console.log("-------------------------------------");


//改进闭包问题，输出正常值
function closureConversionNormal() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        arr[i] = function (num) {
            return function () {
                return num;
            }
        }(i);
    }
    return arr;
}

var theArr = closureConversionNormal();
for (var j = 0; j < theArr.length; j++) {
    console.log(theArr[j]());
}
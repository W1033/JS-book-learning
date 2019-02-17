/**
 * 全排列（递归交换）算法
 * 1、将第一个位置分别放置各个不同的元素；
 * 2、对剩余的位置进行全排列（递归）；
 * 3、递归出口为只对一个元素进行全排列。
 */
function perm1(A) {
    if (A.length === 1) {
        return [A]
    }
    return [].concat(...A.map((a, i) => perm1(A.slice(0, i)
        .concat(A.slice(i + 1)))
        .map(p => [a].concat(p))))
}

console.log(perm(['a', 'b', 'c']))


function swap(arr, i, j) {
    if (i != j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

var count = 0;

function show(arr) {
    document.write("P<sub>" + ++count + "</sub>: " + arr + "<br />");
}

function perm2(arr) {
    (function fn(n) { //为第n个位置选择元素  
        for (var i = n; i < arr.length; i++) {
            swap(arr, i, n);
            if (n + 1 < arr.length - 1) //判断数组中剩余的待全排列的元素是否大于1个
                fn(n + 1); //从第n+1个下标进行全排列
            else
                show(arr); //显示一组结果  
            swap(arr, i, n);
        }
    })(0);
}

perm(["e1", "e2", "e3", "e4"]);


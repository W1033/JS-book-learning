/**Created by Administrator on 2017/6/4.*/

function deepCopy(parent, child) {
    child = child || {};
    for (var i in parent) {
        if (typeof parent[i] === "object") {
            child[i] = (parent[i].constructor === Array) ? [] : {};
            deepCopy(parent[i], child[i]);
        } else {
            child[i] = parent[i];
        }
    }
    return child;
}

//调用示例:
var Chinese = {
    nation: "中国",
    birthPlaces: ["北京", "上海", "深圳"]
};

var Doctor = deepCopy(Chinese);
Doctor.career = "医生";
Doctor.birthPlaces.push("厦门");

console.log(Chinese.birthPlaces);
console.log(Doctor.birthPlaces);
console.log(Doctor);        // { nation: '中国', birthPlaces: [ '北京', '上海', '深圳', '厦门' ], career: '医生' }

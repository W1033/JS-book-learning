// 将 values 数组中的所有字符串都转化成同一种标准形式。
let values = ['English', 'fuck', '吉', '123', '𠮷'];  // 注意第一个为"吉"字，第二个为日语

let normalized = values.map(function (text) {
    return text.normalize()    // 以标准等价方式分解，然后以标准等价方式重组("NFC")，默认选项。
});

// 先经过上面把数组中的每一项转换为标准形式，下面再次排序
// f: first, s:second
normalized.sort(function (f, s) {
    if (f < s) {
        return -1
    } else if (f === s) {
        return 0
    } else {
        return 1
    }
});
console.log(values);
console.log(normalized);  // 这里生成了一个新数组

// 把数组格式化之后，重新排序 --> f: first, s: second
values.map(function (f, s) {
    let fNor = f.normalize();
    let sNor = s.normalize();
    if (fNor < sNor) {
        return -1
    } else if (fNor === sNor) {
        return 0;
    } else {
        return 1;
    }
});

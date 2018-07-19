//js 深拷贝实现
function deepClone1(obj) {
    return JSON.parse(JSON.stringify(obj))
}


function deepClone2(target) {
    function isObject(obj) {
        return !(target == null || typeof (target) !== 'object')
    }

    if (!isObject(target)) return target
    const copy = (target instanceof Array) ? [] : {}
    for (let key in target) {
        copy[key] = isObject(target[key]) ? deepClone2(target[key]) : target[key]
    }
    return copy
}

const demo = {a: 1, b: 2, c: [1, 2]}

console.log(deepClone1(demo))
console.log(deepClone2(demo))
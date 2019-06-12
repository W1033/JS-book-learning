/** 7. 使用 deleteProperty 陷阱函数防止刪除屬性 */

let target = {
    name: 'target',
    value: 32
};

let proxy = new Proxy(target, {
    // trapTarget: 要删除属性的对象 (代理的目标)
    // key: 要删除的属性键 (字符串或 Symbol)
    deleteProperty: function(trapTarget, key) {
        if (key === 'value') {
            return false
        } else {
            return Reflect.deleteProperty(trapTarget, key)
        }
    }
});

// 尝试删除 proxy.value
console.log('value' in proxy);  // node

let result1 = delete proxy.value;
console.log(result1);   // false

console.log('value' in proxy);  // true

console.log('name' in proxy);   // true
// 尝试删除 proxy.name
let result2 = delete proxy.name;
console.log(result2);   // true

console.log('name' in proxy);   // false

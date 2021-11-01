// #### 6.使用 has 陷阱函数隐藏已有属性

let target = {
    name: "target",
    value: 42,
};
let proxy = new Proxy(target, {
    has(trapTarget, key) {
        if (key === 'value') {
            return false;
        } else {
            return Reflect.has(trapTarget, key);
        }
    }
});
console.log('value' in proxy);  // false
console.log('name' in proxy);   // true
console.log('toString' in proxy);   // true
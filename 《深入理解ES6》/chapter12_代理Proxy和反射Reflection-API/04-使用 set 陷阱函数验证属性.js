// #### 4.使用 set 陷阱函数验证属性 

let tar = {
    name: "target"
};
let proxy = new Proxy(tar, {
    // - 4 个从参数见上面的文档解释
    // - receiver (本例中未使用) 等于 proxy.
    set(trapTarget, key, value, receiver) {
        // - 忽略已有属性，避免影响他们
        if (!trapTarget.hasOwnProperty(key)) {
            if (isNaN(value)) {
                // throw new TypeError("属性必须是数字");
            }
        }
        // 添加属性
        return Reflect.set(trapTarget, key, value, receiver);
    }
});

// - 添加一个新属性
proxy.count = 1;
console.log(proxy.count);
console.log(tar.count);

// - 可以为 name 赋一个非数值类型的值，因为该属性已经存在. 用于接收属性的
//   对象上已有的非数字属性仍然可以被操作.
proxy.name = "proxy";
console.log(proxy.name);
console.log(tar.name);

// 抛出错误
proxy.anotherName = "proxy";
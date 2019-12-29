// #### 5.使用 get 陷阱函数验证对象结构 (Object Shape)
let proxy = new Proxy({}, {
    get(trapTarget, key, receiver) {
        if (!(key in receiver)) {
            // throw new TypeError('属性 ' + key  + ' 不存在');
        }
        return Reflect.get(trapTarget, key, receiver);
    }
});
// - 添加一个属性, 程序仍正常运行
proxy.name = 'proxy';
console.log(proxy.name);    // "proxy"
// - 如果属性不存在, 则抛出错误
console.log(proxy.age);     // TypeError: 属性 age 不存在
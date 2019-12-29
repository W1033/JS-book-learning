// - 8.1 原型代理的陷阱函数如何工作

let target = {};
let proxy = new Proxy(target, {
    getPrototypeOf(trapTarget) {
        return null;
    },
    setPrototypeOf(trapTarget, proto) {
        return false;
    }
});
// - Object.prototypeOf(target) 是直接调用内置方法来判断 target 的原型.
let targetProto = Object.getPrototypeOf(target);
// - Proxy 代理中的 getPrototypeOf() 方法拦截了 Object.getPrototypeOf()
//   方法的默认操作, 所以这里返回 null.
let proxyProto = Object.getPrototypeOf(proxy);
console.log(proxyProto);    // null

console.log(targetProto === Object.prototype);  // true
console.log(proxyProto === Object.prototype);   // false

// - 成功
Object.setPrototypeOf(target, {});

// - 抛出错误
Object.setPrototypeOf(proxy, {});
// - JavaScript 中的单例模式

// 4.4 JavaScript 中的单例模式: 单例模式的核心时: 确保只有一个实例，并提供全局访问。

// P64: 1.使用命名空间 (引自 Object-Oriented JavaScript 一书)
let MyApp = {};
MyApp.namespace = function(name) {
    // split() 基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。
    let parts = name.split(".");

    // parts: ['dom','style']

    let current = MyApp;
    for (let i in parts) {
        // 当 i = 0 时 MyApp[parts[i]] 即是: MyApp.dom 并不存在，所以直接 MyApp.dom = {},
        // if 走完后接着把 MyApp.dom 赋值给 current (MyApp)，所以此时 current 等于 MyApp.dom。
        // 当 i = 1 时 MyApp.dom[parts[i]] 既是: MyApp.dom.style，下面的就可以理解了...
        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
};

// MyApp.namespace("event");


MyApp.namespace("dom.style");

// MyApp: { namespace: [Function], dom: { style: {} } }
console.log("MyApp:", MyApp);

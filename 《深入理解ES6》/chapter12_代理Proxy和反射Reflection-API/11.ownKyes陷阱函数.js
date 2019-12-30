// - 11.ownKeys(自身键) 陷阱函数
let proxy = new Proxy({}, {
    ownKeys(trapTarget) {
        // - Reflect.ownKeys() 方法来获取目标对象的键列表; 接下来, filter() 方法
        //   被用于将所有下划线打头的字符串类型的键过滤出去
        return Reflect.ownKeys(trapTarget).filter(key => {
            return typeof key !== 'string' || key[0] !== '_';
        });
    }
});

// - 向 proxy 对象添加了 3 个属性.
let nameSymbol = Symbol('name');
proxy.name = 'proxy';
proxy._name = 'private';
proxy[nameSymbol] = 'symbol';

let names = Object.getOwnPropertyNames(proxy);
let keys = Object.keys(proxy);
let symbols = Object.getOwnPropertySymbols(proxy);

console.log(names.length);  // 1
console.log(names[0]);      // "name"

console.log(keys.length);   // 1
console.log(keys[0]);       // "name"

console.log(symbols.length);    // 1
console.log(symbols[0]);    // "Symbol(name)"











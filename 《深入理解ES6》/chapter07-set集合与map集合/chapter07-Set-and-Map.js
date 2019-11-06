let set2 = new Set(),
    key1 = {},
    key2 = {};
set2.add(key1);
set2.add(key2);
// set2: Set { {}, {} }
console.log("set2:", set2);

console.log("------");

let set = new Set();
set.add(5);
set.add("5");
// - 使用 add() 方法传入相同的值作为参数会直接被忽略
set.add(5);     
// set:  Set { 5, '5' }
console.log("set: ", set); 
set.forEach(function(value, key, set) {
    console.log(key + " " + value);
});

console.log("------");


// - WeakMap 示例
(function() {
    let weakmap = new WeakMap();
    (function() {
        let o = {n: 1};
        weakmap.set(o, "A");
    })();   // - here "o" key is garbage collected. 这里的 "o" 键被垃圾回收
    let s = {m: 1};
    weakmap.set(s, "B");
    console.log(weakmap.get(s));
    // - Tip: 因为 WeakMap 不能遍历所以, 下面输出为 items unknown
    // WeakMap { <items unknown> }
    console.log(weakmap);

    console.log("------");

    const _items = new WeakMap();
    const _count = new WeakMap();
    

})();
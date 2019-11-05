

console.log("------");

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

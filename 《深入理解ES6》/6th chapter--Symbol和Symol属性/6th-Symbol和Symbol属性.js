// Created on 20180503

/** ES5 中包含 5 种原始类型: strings(字符串类型)， numbers(数字型)，booleans(布尔型) ，null 和 undefined。
 *  ES6 引入了第6种原始类型: Symbol. **/

/** ------ 20180503-P108: 创建 Symbol  ------ **/
/* Symbol 函数接受一个可选参数，其可以让你添加一段文本来描述即将创建的 Symbol, 这段描述不可用于属性访问，
 * 主要用于阅读代码和调试 Symbol 程序。 Symbol 的描述被存储在内部的 [[Description]] 属性中，只有当调用
 * Symbol 的 toString() 方法时才可以读取这个属性。 */
let firstName = Symbol("first name");
let person = {};
person[firstName] = "Nicholas";
console.log("first name" in person);    // false
console.log(person[firstName]);         // Nicholas
console.log(firstName);                 // Symbol(first name)
console.log("------------------");


/** ------ 20180503-P100: Symbol 共享体系  ------ **/
// 如果想创建一个可共享的 Symbol, 要使用 Symbol.for() 方法。 也只接受一个参数，作用同上面的 Symbol()一样。
let uid = Symbol.for("uid");
let obj = {};
obj[uid] = "12345";
console.log(obj[uid]);      // 12345
console.log(uid);           // Symbol(uid)

let uid2 = Symbol.for("uid");
console.log(uid === uid2);  // true

// 還有一個與 Symbol 共享有關的特性: 可以 Symbol.keyFor() 方法在 Symbol 全局註冊表中檢索與 Symbol 有關的鍵。e.g:
let uId = Symbol.for("uId");
console.log(Symbol.keyFor(uId));    // uId
let uId2 = Symbol.for("uId");
console.log(Symbol.keyFor(uId2));   // uId2
let uId3 = Symbol("uId");
console.log(Symbol.keyFor(uId3));  // undefined


/** 20180503-P100- Symbol 共享体系 --> Symbol 属性检索 **/
/* Object.keys() 和 Object.getOwnPropertyNames()方法可以检索对象中所有的属性: 前一个返回所有可枚举的属性名；
 * 后一个方法不考虑属性的可枚举性一律返回。
 *
 * ES6 添加了一个 Object.getOwnPropertySymbols() 来检索对象中的 Symbol 属性。 返回值是一个包含所有 Symbol
 * 自有属性的数组。
 * */
let uflag = Symbol("u flag");
let aObj = {
    // aObj 有一个 名为 uflag 的 Symbol 属性
    [uflag]: "67890"
};
let symbols = Object.getOwnPropertySymbols(aObj);
console.log(symbols.length);        // 1
console.log(symbols[0]);            // Symbol(u flag)
console.log(aObj[symbols[0]]);      // 67890

console.log("------------------");


/** 20180520-P113- 通過 well-know (眾所周知的) Symbol 暴露內部操作 **/

/* (1.) Symbol.hasInstance 方法 :
 *  每個函數中都有一個 Symbol.hasInstance 方法，用於確定對象是否為函數的實例。該方法是 Function.prototype
 *  中定義，所以所有函數都繼承了 instanceof 屬性的默認行為。
 *  Symbol.hasInstance 方法只接受一個參數，紀要檢查的值。如果傳入的值是函數的實例。則返回 true. 為了更好理解
 *  Symbol.hasInstance 的運作機制，我們看一下這行代碼:
 *      obj instanceof  Array  ===(等價于)  Array[Symbol.hasInstance](obj);
 *   本質上 ES6 中只是將 instanceof 操作符重新定義為此方法的簡寫語法(上句中前面是後面的簡寫)。現在引入方法調用後，
 *   就可以隨意改變 instanceof 的運行方式了。
 * */

// 定義一個無實例的函數，就可以將 Symbol.hasInstance 的返回值硬編碼為 false:
function MyObject() {
}

// git-clone\js-sundry-goods\js--A语法--MDN文档\js高程 Object.defineProperty.html
// 在 MyObject 對象上定義一個訪問器屬性 Symbol.hasInstance (注: 這個定義訪問器屬性的示例中，默認的
// getter 和 setter 函數都沒有定義)
Object.defineProperty(MyObject, Symbol.hasInstance, {
    value: function (v) {
        return false;
    }
});
let obje = new MyObject();
console.log(obje instanceof MyObject);    // false

// 也可以基於(于) 任意條件，通過值檢查來確定被檢測的是否為實例。For example, 可以將 1~100 的數字定位為一個特殊數字
// 類型的實例，具體實現的代碼如下:
function SpecialNumber() {
}

// 定義一個 Symbol.hasInstance 方法，當值為 Number 的實例且其值在 1~100 之間時返回 true。所以即使 SpecialNumber
// 的函數和變量 two 之間沒有直接關係，變量 two 也被認為 SpecialNumber 的實例。
Object.defineProperty(SpecialNumber, Symbol.hasInstance, {
    value: function (v) {
        // Number 對象在這裡
        return (v instanceof Number) && (v >= 1 && v <= 100)
    }
});
let two = new Number(2);
let zero = new Number(0);
console.log(two instanceof SpecialNumber);    // true
console.log(zero instanceof SpecialNumber);   // false


/* (2.) Symbol.isConcatSpreadable 屬性: spreadable /'spredəbl/ adj.塗抹
 * symbol.isConcatSpreadable 屬性是一個布爾值，如果該屬性值為 true, 則表示對象有 length 屬性和數字鍵，故他的
 * 數值型屬性值應該獨立添加到 concat() 調用的結果中。它與(与)其他 well-known Symbol 不同的是， 这个 Symbol 属性
 * 默认情况下不会出现在标准对象中，它只是一个可选属性，用于增强作用于特定对象类型的 concat() 方法的功能，有效简化
 * 其默认特性。可以通过以下方法【2】，定义一个在 concat() 调用中与数组行为相近的新类型。
 * */

// 数组的 concat() 正常使用情形
let colors1 = ["red", "green"],
    colors2 = colors1.concat(["blue", "black"], "brown");
console.log(colors2);     // [ 'red', 'green', 'blue', 'black', 'brown' ]

// 【2】: Symbol.isConcatSpreadable
let collection = {
    0: "Hello",
    1: "world",
    length: 2,
    [Symbol.isConcatSpreadable]: true
};
// 数组的 concat 方法
let message = ["Hi"].concat(collection);
console.log(message);     // [ 'Hi', 'Hello', 'world' ]


// ------------ 《js高程》-- P126-128 --- 6.字符串的模式匹配方法:  ------------
// (1.) match(): 只接受一个参数( 正则表达式 || RegExp对象 )
// (2.) search(): 参数与 match 方法相同。 search() 方法返回字符串中第一个匹配项的索引; 如果没有返回 -1.
// (3.) replace(): 接受2个参数: 第一个为 "正则表示 || RegExp对象", 第二个参数为 " 一个字符串 || 一个函数 "。
// (4.) split(): 基于指定的分隔符将一个字符串分割为多个子字符串，并将结果放在一个数组中。

// (1.) match()
let word = "cot, bot, sot, fot";
let pattern = /.ot/;
let matches = word.match(pattern);
console.log(matches.index);   // 0
console.log(matches[0]);      // cot
console.log(pattern.lastIndex);   // 0


// (2.) search()
let font = "cat, bat, dat, eat";
let pos = font.search(/at/);
console.log(pos);     // 1

// (3.) replace()
let text = "cat, bat, sat, fat";
let result = text.replace(/at/g, "ond");
console.log(result);      // replace 返回的是字符串:  cond, bond, sond, fond

// (4.) split()
const colorText = "red, blue, green, yello";
let colorArr = colorText.split(",");
console.log(colorArr);        // [ 'red', ' blue', ' green', ' yello' ]
console.log("------------------");
// ------------ 《js高程》-- P126-128 --- 6.字符串的模式匹配方法:  ------------


/* (3.) Symbol.match、 Symbol.replace、 Symbol.search 和 Symbol.split 属性:
 *  在 ES6 之前，以上4个方法【match(regex), replace( regex, replacement ), search(regex), split(regex)】
 *  无法使用开发者自定义的对象来替代正则表达式进行字符串匹配。 而在 ES6 中，定义了与上述 4 个方法相对应的 4 个 Symbol,
 *  将语言内建的 RegExp 对象的原生特性完全外包出来。
 *  Symbol.match, Symbol.replace, Symbol.search 和 Symbol.split 这4个 Symbol 属性表示 match(), replace(),
 *  search() 和 split() 方法的第一个参数应该调用的正则表达式参数的方法，他们被定义在 RegExp.prototype 中， 是字符串
 *  应该使用的默认实现。
 *  (1.) Symbol.match 接受一个字符串类型的参数，如果匹配成功则返回匹配元素的数组， 否则返回 null.
 *  (2.) Symbol.replace 接受一个字符串类型的参数和一个替换用的字符串，最终依然返回一个字符串。
 *  (3.) Symbol.search 接受一个字符串参数，如果匹配到内容，则返回数字类型的索引位置，否则返回 -1。
 *  (4.) Symbol.split 接受一個字符串參數，根據匹配內容將字符串分解，并返回一個包含分解后片段的數組。
 **/

// 实际上等同于 /^.{10}$/:   正则 . （小数点）匹配除换行符之外的任何单个字符
let hasLengthOf10 = {
    [Symbol.match]: function (value) {
        return value.length === 10 ? [value] : null;
    },
    [Symbol.replace]: function (value, replacement) {
        return value.length === 10 ? replacement : value;
    },
    [Symbol.search]: function (value) {
        return value.length === 10 ? 0 : -1;
    },
    [Symbol.split]: function (value) {
        return value.length === 10 ? ["", ""] : [value];
    }
};

let message1 = "Hello world",   // 11 characters
    message2 = "Hello John";    // 10 characters
let match1 = message1.match(hasLengthOf10),
    match2 = message2.match(hasLengthOf10);
console.log(match1);        // null
console.log(match2);        // [ 'Hello John' ]

let replace1 = message1.replace(hasLengthOf10, "Howdy!"),
    replace2 = message2.replace(hasLengthOf10, "Howdy!");
console.log(replace1);      // Hello world
console.log(replace2);      // Howdy！

let search1 = message1.search(hasLengthOf10),
    search2 = message2.search(hasLengthOf10);
console.log(search1);       // -1
console.log(search2);       // 0

let split1 = message1.split(hasLengthOf10),
    split2 = message2.split(hasLengthOf10);
console.log(split1);        // [ 'Hello world' ]
console.log(split2);        // [ '', '' ]


console.log("------------------");

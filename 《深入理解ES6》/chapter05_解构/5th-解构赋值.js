
// - P90 许多语言都通过极少量的语法实现了结构功能，而 ES6 中的实现实际上利用了你早已熟悉
//   的语法: **对象和数组字面量的语法**。


/** - P90: 对象解构 */
let node = {
    type: "Identifier",
    name: "foo"
};
// - 注意: 如果使用 var, let 或 const 解构声明变量，则必须提供初始化程序
//   (也就是等号右侧的值)。
// - 如果不使用结构功能，var 和 let 不需要初始化值，但是 const (constant) 是无论如何
//   都要提供初始化程序。
let {type, name} = node;
console.log(type);
console.log(name);
console.log("---------- ----------");


/** P91: 对象解构 ---> 对象解构赋值 */
let obj = {
    type2: "whatever",
    name2: "It is OK that if you happy"
};
let type2 = "Literal",
    name2 = "5";

// - 使用解构语法为多个变量赋值: obj 对象内的属性名要和解构赋值左侧的变量同名。
//   (注意: 外围的小括号是一定要的)
({type2, name2} = obj);
console.log("type2",type2);
console.log("name2", name2);

/* obj 对象内的属性名也可以和解构赋值左侧的变量名不同名，语法如下:
 * P93: 为非同名局部变量赋值
 * (但是这种写法前面的 type2, 和 name2 还是要和对象内的属性同名，真是鸡肋语法)
 * type2: localType 语法的含义是读取名为 type2 的属性并将气质存储在变量 localType 中。*/
let {type2: localType, name2: localName} = obj;
console.log("localType", localType);
console.log("localName", localName);
console.log("---------- ----------");

/** P91: 对象解构 ---> 嵌套对象解构 */
let loc1 = {
    star: {
        line: "first line",
        column: 1
    },
    end: {
        line: 1,
        column: 4
    }
};
// 把 loc 下的 star 属性赋值给变量 star (和上面的差不多)
let {star: star} = loc1;
console.log(star.line);

//----------

let local = {
    start: {
        line: {
            horizontal: "first horizontal line",
            vertical: 1
        }
    },
    end: {
        line: {
            horizontal: "end horizontal line",
            vertical: 10
        }
    }
};
// - 含义: 找到 local 对象下的 start属性后，应当深入一层继续查找 line 属性。所有冒号前的
//   标识符都代表在对象中的检索位置，其右侧为被赋值的变量名；如果冒号后是花括号，则意味着要
//   赋值的最终只嵌套在对象内部更深层的层级中。
let {start: {line}} = local;
console.log(line.horizontal);   // first horizontal line
console.log("---------- ----------");


/** - P97: 数组解构 */
let colorArr = ["red", "green", "black"];
let [fir, sec] = colorArr;
console.log(fir);
console.log(sec);

// 解构模式中，省略元素
let [, , thi] = colorArr;
console.log(thi);


/** - P97: 数组解构 ---> 解构赋值 */
// ES5 交换变量
let a = 1,
    b = 2,
    tmp;
tmp = a;
a = b;
b = tmp;
console.log(a);     // 2
console.log(b);     // 1

// ES6 解构赋值-交换变量
let c = 1,
    d = 2;
[c, d] = [d, c];
console.log(c);     // 2
console.log(d);     // 1


/** - P97: 数组解构 ---> 嵌套数组解构 */
let colors = ["red", ["green", "lightgreen"], "blue"];
let [firstColor, [, thirdColor]] = colors;
console.log(firstColor);    // red
console.log(thirdColor);    // lightgreen


// 不定元素
let animals = ["monkey", "tiger", "lion", "cat", "dog"];
let [firstAnimal, ...restAnimals] = animals;
console.log(firstAnimal);
console.log(restAnimals.length);
console.log(restAnimals[0]);


// - ES5 通过 concat()方法克隆数组: concat()方法设计初衷是连接2个数组，如果调用时
//   不传递参数就会返回当前数组的副本。
let arr1 = ["purple", "yellow", "white"];
let arr2 = arr1.concat();
console.log(arr2);          // [ 'purple', 'yellow', 'white' ]
// ES6 通过不定元素的语法来实现数组来实现克隆数组
let [...cloneArr1] = arr1;
console.log(cloneArr1);     // [ 'purple', 'yellow', 'white' ]
console.log("------------------");


/** - P101: 混合解构 */
let nodeObj = {
    type: "identifier",
    name: "foo",
    loc: {
        begin: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    },
    range: [0, 3]
};

// - P101: 解构模式中的 loc: 和 range: 代表他们在 nodeObj 对象中所处的位置
//   (也就是该对象的属性)。当使用混合解构的语法时，则可以从 nodeObj 提取任意想要的信息。
let {loc: {begin}, range: [startIndex]} = nodeObj;
console.log(begin.line);        // 1
console.log(begin.column);      // 1
console.log(startIndex);        // 0
console.log("------------------");


/** - P102: 解构参数 */
// - 解构参数支持本章中已讲解的所有解构特性。 可以使用默认值，混合对象和数组的解构模式及
//   非同名变量存储提取出来的信息。
function setCookie(name, value, {secure, path, domain, expires}) {
    // 设置 cookie 的代码
}

setCookie("type", "js", {
    secure: true,
    expires: 60000
});

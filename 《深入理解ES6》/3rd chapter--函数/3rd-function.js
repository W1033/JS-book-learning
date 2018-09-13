/* Date 2017-12-7 */

// parametric  /ˌpærə'metrik/ adj.参数的
// parameter   /pə'ræmɪtə/     n. 参数
// statement   /'steɪtm(ə)nt/  n. 声明, 陈述
// expression  /ɪk'spreʃ(ə)n/  n. 表达， 表现


/** 20180428-P46: ES5 中的无命名参数 */
let book = {
    title: "Understanding ECMAScript 6",
    author: "Nicholas C. Zakas",
    year: 2016
};

function pick(obj) {
    // Javascript设计模式与编程实践\第一部分--基础知识\第1章\P14-Object.create.js
    let result = Object.create(null);   // 克隆一个空对象

    // start at the second parameter
    for (let i = 1, len = arguments.length; i < len; i++) {
        result[arguments[i]] = obj[arguments[i]];
    }

    return result;
}

let bookData = pick(book, "author", "year");
console.log(bookData.author);
console.log(bookData.year);

/** 20180428-P47: ES6 不定参数(Rest parameters): */
// 在函数的命名参数前添加三个点(...)就表明这是一个不定参数，该参数为一个数组，包含着
// 自它之后传入的所有参数，通过这个数组名即可逐一访问里面的参数。e.g. 重写上面的 pick() 函数:
function pick2(obj, ...keys) {
    let result = Object.create(null);

    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = obj[keys[i]]
    }

    return result;
}

let bookData2 = pick2(book, "author", "year");
console.log("bookData2.author: " + bookData2.author);      // bookData2.author: Nicholas C. Zakas


/**  20180428-P50: 展开运算符 */
// ES5 中返回最大值
let values = [25, 50, 75, 100];
console.log(Math.max.apply(Math, values));  // 100

// ES6 利用展开运算符实现返回最大值
console.log(Math.max(...values));       // 100

// ES6 展开运算符示例2
let values2 = [-25, -70, -50, -100];
console.log(Math.max(...values2, 0));   // 0

// 20180913-add:  展开运算符使用示例3
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log("x", x);
console.log("y", x);
console.log("...z", ...z);


/** 20180428-P52: name 属性 */
// ES6 中为所有的函数新增了 name 属性。 函数声明/函数表达式。 For example:
let doSomething = function doSomethingElse() {
};
const person = {
    // getter 函数， 它的名称为"get firstName", setter 函数的名称有前缀 "set"
    get firstName() {
        return "Nicholas";
    },
    sayName: function () {
        console.log(this.name);
    }
};
console.log(doSomething.name);      // doSomething
console.log(person.sayName.name);   // sayName

// 这里和书上有出入，这是发现的第二处修改了
const descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor.get.name);   // get firstName

// P53: 通过 bind() 函数创建的函数，其名称将带有 "bound" 前缀; 通过 Function 构造函数创建的函数，其名称
// 将是 "anonymous"(/ə'nɒnɪməs/ adj.匿名)。 示例如下:
const doSome = function () {
    // 空函数
};
console.log(doSomething.bind().name);   // bound doSomethingElse
console.log((new Function()).name);     // anonymous


// P54 Chapter3-函数 【 在 ECMAScript 5 中判断函数被调用的方法 】
// (1.) 在ES5中如果想确定一个函数是否通过 new 关键字被调用(或者说，判断该函数是否作为构造函数被调用),最流行的方式是使用 instanceof, 例如:
function Person(name) {
    if (this instanceof Person) {
        this.name = name;
    } else {
        throw new Error("必须通过new关键字来调用Person.");
    }
}

// (2.) 还有一种在库中常见的写法是:  add-20180428
function SendVerCode() {
    if (typeof this === "undefined" || Object.getPrototypeOf(this) !== SendVerCode.prototype) {
        return new SendVerCode();
    }
}


// 20180501 - P55 元属性(Metaproperty) new.target: 检测一个函数是否通过 new 关键字来调用。
function Person2(name) {
    if (typeof new.target !== "undefined") {
        console.log(this.name = name);
    } else {
        console.log("必须通过 new 关键字来调用 Person.");
    }
}

let person2 = new Person2("Nicholas");                  // Nicholas
let anotherPerson = Person2.call(person, "Michael");    // 必须通过 new 关键字来调用 Person.


/*
 * 箭头函数: 所谓箭头函数，目的其实就是为了实现函数式的 lambda 表达式的，它本身就是为了函数式而添加进去的新概念，
 * 所谓“方便写”只是附带的特性。然而，函数式和面向对象两种编程语言范式是冲突的，冲突的点在于数据组织的方式不一致。
 * 面向对象是利用 “对象” 来集合一组数据和方法，而函数式是通过函数来集合一组数据，并且他的方法是和数据分开的。
 * 所以在函数式里面不会存在 this 这种上下文概念。
 * */
// 箭头函数: 一个箭头函数表达式的语法比一个"函数表达式"更短，并且不绑定自己的this, arguments,super或new.target。
// 这些函数表达式最适合用于非方法函数，并且不能用作构造函数。

// 20180501 - P59: 箭头函数:
// (1.) 没有 this、super、arguments 和 new.target 绑定。
// (2.) 不能通过 new 关键字调用
// (3.) 没有原型
// (4.) 不能改变 this 的绑定
// (5.) 不支持 arguments 对象
// (6.) 不支持重复的命名参数

// P60 - 箭头函数语法
let reflect = value => value;

let sum = (num1, num2) => num1 + num2;

let getName = () => "Nicholas";

let sum2 = (sum1, sum2) => {
    return num1 + num2;
}

let doNothing = () => {
};

let getTempItem = id => ({id: id, name: "Temp"});

// P62 - 创建立即执行函数表达式
let people = ((name) => {
    return {
        getName: function () {
            return name;
        }
    }
})("Nicholas");
console.log(people.getName);

// P65 - 箭头函数和数组
let numsArr = [1, 6, 4, 8, 2, -1, -20];
let result = numsArr.sort((a, b) => a - b);
console.log(numsArr);   // [ -20, -1, 1, 2, 4, 6, 8 ]

// P66 - 箭头函数没有 arguments 绑定: 始终可以访问外围函数的 arguments 对象。
function createArrowFunReturningFirstArg() {
    return () => arguments[0];
}

let arrowFunction = createArrowFunReturningFirstArg(5);
console.log(arrowFunction());   // 5


// P69 - 如果利用尾调优化   factorial /fæk'tɔːrɪəl/ n.阶乘
function factorial(n, p = 1) {
    if (n <= 1) {
        return 1 * p;
    } else {
        let result = n * p;

        // 优化后
        return factorial(n - 1, result)
    }
}

console.log(factorial(4, p = 1));    // 24
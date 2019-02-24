// Create on 20190223

/**
 * - test: RegExp 实例对象的方法 test (P107), 是用来检测字符串是否匹配某一个正则表达式，如果匹配返回 true, 反之为 fals
 * - match: 字符串的模式匹配方法。match 是获取正则匹配到的结果，以**数组的形式返回**
 + `"186a619b28".match(/\d+/g);  // ["186", "619", "28"]`
 *
 * */
console.log( "/\d+/.test(\"123\"): ", /\d+/.test("123"));   // true
console.log( "/\d+/.test(\"abc\"): ", /\d+/.test("abc"));   // false


const str = "foo";
// const reg = /foo{1,2}/;
const reg = new RegExp(/foo{1,2}/);
console.log("reg.test(str): ", reg.test(str));  // true
console.log("reg.exec(str): ", reg.exec(str));  // [ 'foo', index: 0, input: 'foo', groups: undefined ]


/** --------------------- replace start ------------------------- */
/**
 * String 类型 (字符串类型) 的 replace() 方法:  P127 -- 5.6 基本包装类型
 * 接收 2 个参数: `replace("RegExp对象 | 一个字符串", "一个字符串 | 一个函数") `
 * 如果第 1 个参数是字符串，那么只会替换第一个子字符串。想要替换所有子字符串，
 * 唯一的办法就是提供一个正则表达式，而且要指定全局 (g) 标志。
 */
const text = "cat, bat, sat, fat";
let result = text.replace("at", "ond");
// "cond, bat, sat, fat"
console.log (result);
result = text.replace(/at/g, "ond");
// "cond, bond, sond, fond"
console.log(result);

// 替换字符为星号
let reg3 = /(doubi)/g,
    string = "Kid is a doubi";
// P127: replace() 方法接受两个参数：第一个参数可以是
// 一个 RegExp 对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。
string = string.replace(reg3, (word) => {
    return word.replace(/./g, "*")
});
console.log(string);  // Kid is a *****

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*
 * replace 另外讲解文章: https://zhuanlan.zhihu.com/p/32179882
 * 如果 replace() 第 1 个参数是 RegExp， js 会先提取 RegExp 匹配处的结果，然后用 第 2 个擦书逐一替换匹配出的结果。
 * 如果 replace() 第 2 个参数是回调函数，每匹配到一个结果就回调一次，每次回调都会传递以下参数:
 *  - result: 本次匹配到的结果
 *  - $1...$9: 正则表达式中有几个 (), 就会传递几个参数， $1~$9 分别代表本次匹配中每个 () 提取的结果，最多 9 个
 *  - offset: 记录本次匹配的开始位置
 *  - source: 接受匹配的原始字符串
 */
function replacer(match, p1, p2, p3, offset, string) {
    return [p1, p2, p3].join(" - ");
}
let newString = "abc12345#$*%".replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log("newString: ", newString);  // abc - 12345 - #$*%

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// \w: 匹配字母、数字、下划线
const nameReg = /(\w+)\s(\w+)/;
const name = "John Smith";
// output: Smith, John
console.log("name.replace(re, '$2, $1')", name.replace(nameReg, '$2, $1'));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 数字千分位就是将数字三个一分，如1234567890转为1,234,567,890
/* 详解: \d{1,3}: 表示匹配连续的 1 到 3 个数字;  (?=) 表示反向匹配，即为从后向前匹配，
 * (?=(\d{3}+$)) 表示从后向前 3 位数字一匹配，至少匹配一次，而最前面必须要有 1 到 3 个
 * 数字, 即第一次的 \d{1,3}, 最后的参数 g 表示全局匹配，匹配完所有 */
const number = "1234567890";
let numberComma = number.replace(/\d{1,3}(?=(\d{3})+$)/g, function(match){
    return match + ",";
});
// output: 1,234,567,890
console.log("numberComma: ", numberComma);

// 下面在回调函数中多添加几个参数:
let numberCommaMore = number.replace(/\d{1,3}(?=(\d{3})+$)/g, function(match, p1, offset, string){
    console.log("~~~~~~~~~~start~~~~~~~~~~~");
    console.log("match: ", match);
    console.log("p1: ", p1);
    console.log("offset: ", offset);
    console.log("string: ", string);
    console.log("~~~~~~~~~~~over~~~~~~~~~~");
});
console.log("numberCommaMore: ", numberCommaMore);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// "-" 命名方式转驼峰命名方式:
// Camel Case 小驼峰式命名;
// Pascal Case 大驼峰式命名
let naming = "shou-hou";
// \w: 匹配字母、数字、下划线
// 这个实例: $0="-h"; $1="h"
naming = naming.replace(/-(\w)/g, function($0, $1) {
    return $1.toUpperCase();
});
console.log("~~~~~~~|S|~~~~~~");
console.log("naming: ", naming);
console.log("~~~~~~~|O|~~~~~~");


/* replace 和 js 正则搭配使用的几个经典案例 */
// 1. 实现字符串的trim函数，去除字符串两边的空格
String.prototype.trim = function(){

    //方式一：将匹配到的每一个结果都用""替换
    /*return this.replace(/(^\s+)|(\s+$)/g,function(){
        return "";
    });*/

    //方式二：和方式一的原理相同
    return this.replace(/(^\s+)|(\s+$)/g,'');
};


// 2. 提取浏览器url中的参数名和参数值，生成一个key/value的对象
function getUrlParamObj(){
    var obj = {};
    //获取url的参数部分
    var params = window.location.search.substr(1);
    //[^&=]+ 表示不含&或=的连续字符，加上()就是提取对应字符串
    params.replace(/([^&=]+)=([^&=]*)/gi,function(rs,$1,$2){
        obj[$1] = $2;
    });
    return obj;
}

// 3. 在字符串指定位置插入新字符串
String.prototype.insetAt = function(str,offset){
    //使用RegExp()构造函数创建正则表达式
    var regx = new RegExp("(.{"+offset+"})");
    return this.replace(regx,"$1"+str);
};
"abcd".insetAt('xyz',2); //在b和c之间插入xyz

// 4. 将手机号12988886666转化成129 8888 6666
function telFormat(tel){
    tel = String(tel);
    /*//方式一
    return tel.replace(/(\d{3})(\d{4})(\d{4})/,function (rs,$1,$2,$3){
        return $1+" "+$2+" "+$3
    });*/
    //方式二
    return tel.replace(/(\d{3})(\d{4})(\d{4})/,"$1 $2 $3");
}

// 5. 实现函数escapeHtml，将<, >, &, " 进行转义
function escapeHtml(str) {
    //匹配< > " &
    return str.replace(/[<>"&]/g, function(rs) {
        switch (rs) {
            case "<":
                return "<";
            case ">":
                return ">";
            case "&":
                return "&";
            case "\"":
                return "";
        }
    });
}

/** --------------------- replace over ------------------------- */




/**
 * - 分组有四种类型:
 *  + () : 捕获型分组
 *  + (?:) : 非捕获型分组
 *  + (?=exp) : 正向前瞻型分组: 表示后面要有什么。 属于 "非捕获组匹配"。
 *      - 前瞻分组会作为匹配校验，但不出现在匹配结果字符里面，而且不作为子匹配返回。
 *  + (?!exp) : 反向前瞻型分组: 表示后面不能有什么。 属于 "非捕获组匹配"。
 *      - 前瞻分组会作为匹配校验，但不出现在匹配结果字符里面，而且不作为子匹配返回。
 * */

// `()`: 捕获型分组 --> 捕获与引用
let reg2 = /(\d{4})-(\d{2})-(\d{2})/;
let date = '2010-04-12';
if (reg2.test(date)) {
    console.log("RegExp.$1",RegExp.$1); // 2010
    console.log("RegExp.$2",RegExp.$2); // 04
    console.log("RegExp.$3",RegExp.$3); // 12
}

// (?:) : 非捕获型
let reg4 = /(?:\d{4})-(\d{2})-(\d{2})/;
let date4 = '2012-12-21';
if(reg4.test(date4)) {
    console.log(RegExp.$1);  // 12
    console.log(RegExp.$2)   // 21
}

/* (?=exp) : 正向前瞻型分组 (肯定表达式)。属于 "非捕获组匹配"。 定义: 它断言自身出现的位置的后面能匹配表达式 exp。 */
// 示例 1 :
const positiveReg = /ap(?=ple)/g;
// output: [ 'ap', index: 7, input: 'I like apple not app!', groups: undefined ]
// console.log("positiveReg.exec(): ", positiveReg.exec('I like apple not app!'));

/* output: 9   讲解: 第一个.exec会找到句子中ple之前的ap，那么第7-11个字符apple就符合我们的条件，
 * 但是由于(?=ple)是非捕获的，所以ple的并没有被计算到结果中，自然ple这3个字符也没有影响到lastIndex，
 * 所以lastIndex的值为 7+2=9 ，而不是7+5=11;*/
// **非捕获不会影响lastIndex的值**
// console.log("positiveReg.lastIndex: ", positiveReg.lastIndex);

// output: null
// console.log("positiveReg.exec(): ", positiveReg.exec('I like apple not app!'));

// output: 0
// console.log("positiveReg.lastIndex: ", positiveReg.lastIndex);


// 示例 2 : 正向前瞻型分组 (?=doubi) 表示:后面要有什么
let reg5 = /kid is a (?=doubi)/g;
console.log(reg5.test('kid is a doubi'));  // true


// 示例 3:
//正向前瞻，匹配.jpg后缀文件名
const positive = "123.jpg, 456.gig, abc.jpg";
// 正向前瞻，匹配 .jpg 后缀文件名
let positivePattern = /\w+(?=\.jpg)/g;
console.log(positive.match(positivePattern));   // ['123', 'abc']   返回结果正确，没有匹配456.gif

// 示例 4:
const moneyStr = 1234567.88;
function money(num) {
    // ("" + num) 就是利用 字符串 + 数组 = 字符串的语法
    /* (?=(\d{3})+(?!\d)): 它表示某个匹配规则之后，有一个或者多个数字组 +, 每组
     * 由 3 个数字 (\d{3}) 组成 (比如 123456， 213， 3534636, 这些都是由多个数字组成的字符串)，
     * 并且数字组之后不是数字 (?!\d) [注: 这个是用来找到结尾，只要后面不是数字我们都认为是结尾]。
     */
    // 更详细的图标见: https://www.zhuwenlong.com/blog/article/5937f6c85bc74f66e8fc9a53
    // 此文章的最后部分。
    return ("" + num).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
console.log("money(): ", money(moneyStr));  // 64,342,567.88




/* (?!exp) : 反向前瞻型 (否定表达式) */
// 反向前瞻型分组 (否定表达式: 表示后面不能有什么)。
let reg6 = /(kid is a (?!doubi))/;
console.log("reg6: ", reg6.test('kid is a doubi'));  // false

// 示例 2:
const negative = "aaa000 aaaa111 aaaaaaaa222";
// 反向前瞻，匹配 3 个及以上的 a, 而且后面不能有 000 的字符
let negativePattern = /a{3,}(?!000)/g;
console.log(negative.match(negativePattern));  // ['aaaa', 'aaaaaaa']   返回结果正确，没有匹配aaa000



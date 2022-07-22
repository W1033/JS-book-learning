# 第 2 章 -- 字符串和正则表达式

## 生词 (New Words)
- multilingual `/ˈmʌltiˈliŋɡwəl/` --adj.使用多种语言的
    + --> a multilingual dictionary. 多语词典.
- surrogate `/'sʌrəɡɪt/` --n.代理
- normalize `/ˈnɔ:məˌlaɪz/`  --n.标准化, 正常化  --vt&vi(使)正常化
- ideographic `/ˌɪdɪə'græfɪk/` --adj.表意的; 表意文字的
- octet `/ɒk'tet/` --n. 八重奏，八重唱



## ▲ 前置补充内容

### Unicode(统一码) 是什么？

> 此段内容来自 Unicode 中文维基百科：https://zh.wikipedia.org/wiki/Unicode

**Unicode**，[联盟](https://zh.wikipedia.org/wiki/統一碼聯盟)官方中文名称为**统一码**[[1\]](https://zh.wikipedia.org/wiki/Unicode#cite_note-1)，是[计算机科学](https://zh.wikipedia.org/wiki/電腦科學)领域的业界标准。它整理、编码了世界上大部分的[文字系统](https://zh.wikipedia.org/wiki/文字系統)，使得电脑可以用更为简单的方式来呈现和处理文字。

Unicode 伴随着[通用字符集](https://zh.wikipedia.org/wiki/通用字符集) (UCS) 的标准而发展，同时也以书本的形式[[2\]](https://zh.wikipedia.org/wiki/Unicode#cite_note-2)对外发表。Unicode 至今仍在不断增修，每个新版本都加入更多新的字符。目前最新的版本为 2021 年 9 月公布的 14.0.0[[3\]](https://zh.wikipedia.org/wiki/Unicode#cite_note-3)，已经收录超过 14 万个[字符](https://zh.wikipedia.org/wiki/字符_(计算机科学))（第十万个字符在2005年获采纳）。Unicode 除了视觉上的字形、编码方法、标准的[字符编码](https://zh.wikipedia.org/wiki/字符编码)资料外，还包含了字符特性（如大小写字母）、书写方向、拆分标准等特性的资料库。

- **通用字符集**（英语：Universal Character Set, UCS）是由[ISO](https://zh.wikipedia.org/wiki/國際標準化組織)制定的**ISO 10646**（或称**ISO/IEC 10646**）标准所定义的标准字符集。

    通用字符集又称 Universal Multiple-Octet$^*$ Coded Character Set，中国大陆译为**通用多八位编码字符集**，台湾译为**广用多八位元组编码字元集**。

Unicode的发展由非营利机构统一码联盟负责，该机构致力于让 Unicode 方案取代既有的字符编码方案$^*$。因为既有的方案往往空间非常有限，亦不适用于[多语](https://zh.wikipedia.org/wiki/多語)环境。

- 已有的字符编码方案包括：[摩尔斯电码](https://www.wikiwand.com/en/Morse_code)、[Baudot 码](https://www.wikiwand.com/en/Baudot_code)、美国信息交换标准码 ( [ASCII](https://www.wikiwand.com/en/ASCII) ) 和[Unicode](https://www.wikiwand.com/en/Unicode)。[Unicode](https://www.wikiwand.com/en/Unicode)是一种定义明确且可扩展的编码系统，已经取代了大多数早期的字符编码，~~但代码开发到现在的路径是众所周知的~~。 (Common examples of character encoding systems include [Morse code](https://www.wikiwand.com/en/Morse_code), the [Baudot code](https://www.wikiwand.com/en/Baudot_code), the American Standard Code for Information Interchange ([ASCII](https://www.wikiwand.com/en/ASCII)) and [Unicode](https://www.wikiwand.com/en/Unicode). [Unicode](https://www.wikiwand.com/en/Unicode), a well defined and extensible encoding system, has supplanted most earlier character encodings, but the path of code development to the present is fairly well known.) 
   > https://www.wikiwand.com/en/Character_encoding

Unicode备受认可，并广泛地应用于电脑软件的[国际化与本地化](https://zh.wikipedia.org/wiki/國際化與本地化)过程。有很多新科技，如[可扩展置标语言](https://zh.wikipedia.org/wiki/可扩展置标语言)（Extensible Markup Language，简称：XML）、[Java编程语言](https://zh.wikipedia.org/wiki/Java)以及现代的[操作系统](https://zh.wikipedia.org/wiki/作業系統)，都采用Unicode编码。Unicode也被[ISO](https://zh.wikipedia.org/wiki/ISO)作为国际标准采纳于[通用字符集](https://zh.wikipedia.org/wiki/通用字符集)，即 ISO/IEC 10646，且 Unicode 兼容 ISO/IEC 10646 且完整对应各个版本标准。[[4\]](https://zh.wikipedia.org/wiki/Unicode#cite_note-Unicode-technical-intro-4)[[5\]](https://zh.wikipedia.org/wiki/Unicode#cite_note-5)



### Unicode字符平面映射

>  https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84

目前的 Unicode 字符分为 17 组编排，每组称为**平面**（Plane），而每平面拥有 65536（即$2^{16}$）个代码点。然而目前只用了少数平面。

|        平面         |     始末字符值      |                           中文名称                           |                     英文名称                     |
| :-----------------: | :-----------------: | :----------------------------------------------------------: | :----------------------------------------------: |
|       0号平面       |   U+0000 - U+FFFF   |                      **基本多文种平面**                      |      Basic Multilingual Plane，简称**BMP**       |
|       1号平面       |  U+10000 - U+1FFFF  |                      **多文种补充平面**                      |  Supplementary Multilingual Plane，简称**SMP**   |
|       2号平面       |  U+20000 - U+2FFFF  |                     **表意文字补充平面**                     |   Supplementary Ideographic Plane，简称**SIP**   |
|       3号平面       |  U+30000 - U+3FFFF  |                     **表意文字第三平面**                     |     Tertiary Ideographic Plane，简称**TIP**      |
| 4号平面 至 13号平面 |  U+40000 - U+DFFFF  |                         （尚未使用）                         |                                                  |
|      14号平面       |  U+E0000 - U+EFFFF  |                     **特别用途补充平面**                     | Supplementary Special-purpose Plane，简称**SSP** |
|      15号平面       |  U+F0000 - U+FFFFF  | 保留作为**私人使用区（A区）**[[1\]](https://zh.wikipedia.org/wiki/Unicode字符平面映射#cite_note-PUA-1) |        Private Use Area-A，简称**PUA-A**         |
|      16号平面       | U+100000 - U+10FFFF | 保留作为**私人使用区（B区）**[[1\]](https://zh.wikipedia.org/wiki/Unicode字符平面映射#cite_note-PUA-1) |        Private Use Area-B，简称**PUA-B**         |



### 中文编码区间说明

现在网上大多数用于判断中文字符的是　`0x4E00~0x9FA5`　这个范围是只是**“中日韩统一表意文字”**

| 范围       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| 4E00~9FA5  | 中日韩统一表意文字                                           |
| 2E80－A4CF | 中日朝部首补充、康熙部首、表意文字描述符、中日朝符号和标点、日文平假名、 日文片假名、注音字母、谚文兼容字母、象形字注释标志、注音字母扩展、 中日朝笔画、日文片假名语音扩展、带圈中日朝字母和月份、中日朝兼容、 中日朝统一表意文字扩展A、易经六十四卦符号、 中日韩统一表意文字、彝文音节、彝文字根 |
| F900-FAFF  | 中日朝兼容表意文字                                           |
| FE30-FE4F  | 中日朝兼容形式                                               |
| FF00-FFEF  | 全角ASCII、全角中英文标点、半宽片假名、半宽平假名、半宽韩文字母 |

一般用4E00－9FA5已经可以，如果要更广，则用`2E80－A4CF || F900-FAFF　||　FE30-FE4F`



## ▲ 补充内容2: 来自《Node.js 开发指南》6.4.4 Unicode 与国际化

Node.js 不支持完整的 Unicode, 很多字符无法用 string 表示. 公平地说这不是 Node.js 的缺陷, 而是 JavaScript 标准的问题. 目前 JavaScript 支持的字符集还是双字节的 UCS2, 即用两个字节来表示一个 Unicode 字符, 这样能表示的字符数量是 65536.

显然, 仅仅是汉字就不止这个数目, 很多生僻汉字, 以及一些较为罕见语言的文字都无法表示. 这其实是一个历史遗留问题, 像2000 年问题（俗称千年虫）一样, 都起源于当时人们的主观判断. 最早的 Unicode 设计者认为 65536 个字符足以囊括全世界所有的文字了, 因此那个时候盲目兼容 Unicode 的系统或平台（如Windows、Java 和JavaScript）在后来都遇到了问题. 

Unicode 随后意识到 2 个字节是不够的, 因此推出了 UCS4, 即用 4 个字节来表示一个 Unicode 字符. 很多原先用定长编码的 UCS2 的系统都升级为了变长编码的 UTF-16, 因为只有它向下兼容 UCS2. UTF-16 对 UCS2 以内的字符采用定长的双字节编码, 而对它以外的部分使用多字节的变长编码. 这种方式的好处是在绝大多数情况下它都是定长的编码, 有利于提高运算效率, 而且兼容了 UCS2, 但缺点是它本质还是变长编码, 程序中处理多少有些不便. 许多号称支持 UTF-16 的平台仍然只支持它的子集 UCS2, 而不支持它的变长编码部分. 

相比之下, UTF-8 完全是变长编码($^a$), 有利于传输, 而 UTF-32 或 UCS4 则是 4 字节的定长编码, 有利于计算.

+ $a$:  可变长(/宽)度编码看这篇文章：https://zhuanlan.zhihu.com/p/51202412

当下(2019)的 JavaScript 内部支持的仍是定长的 UCS2 而不是变长的 UTF-16, 因此对于处理 UCS4 的字符它无能为力. 所有的JavaScript 引擎都被迫保留了这个缺陷, 包括 V8 在内, 因此你无法使用 Node.js 处理罕见的字符. 想用 Node.js 实现一个多语言的字典工具？还是算了 吧, 除非你放弃使用 string 数据类型, 把所有的字符当作二进制的 Buffer 数据来处理.





## 1. 更好的 Unicode(采用双字节对字符进行编码) 支持

在 ES6 出现之前, javascript 字符串一直基于 16 位字符编码 (UTF-16) 进行构建, 每 16 位的序列是一个 **编码单元(code unit)**, 代表一个字符. `length`, `charAt()` (character at 字符串位于) 等字符串属性和方法都是基于这种编码单元构造的. 在过去 16 位足以, 直到 Unicode 引入 拓展字符集, 编码规则不得不进行变更. 




### 1.1 UTF-16 码位

Unicode 的目标是为全世界每一个字符提供全球唯一的标识符. 如果把字符长度限制在 16 位, 码位数量将不足以表示如此多的字符. "全球唯一标识符" 又被称作 `码位(code point)`, 是从 0 开始的数值. 而表示字符的这些**数值**或**码位**, 我们称之为 `字符编码(character encode)`. 字符编码必须将码位编码为内部一致的编码单元. 对于 UTF-16 来说, 码位可以有多重编码单元表示. 

在 UTF-16 中, 前 $2^{16}$ (65536)个码位均以 16 位的编码单元表示, 这个范围被称作 -- `基本多文种平面 (BMP, Basic Multilingual Plane)`. 超出这个范围的码位则要归属于某个 `辅助平面 (supplementary plane)`, 其中的码位仅用 16 位就无法表示了. 为此, UTF-16 引入了 -- `代理对 surrogate pair`, 其规定用两个 16 位编码单元表示一个码位. 也就是说, 字符串里的字符有 2 种, 一种是有一个编码单元 16 位表示的 BMP 字符, 另外一种是由 2 个编码单元 32 位表示的辅助平面字符. 

在 ES5 中, 所有字符串的操作都基于 16 位编码单元. 如果采用同样的方式处理包含代理对的 UTF-16 编码字符, 得到的结果可能与预期不符, 就像这样

```javascript
// "𠮷"为日文字, 不是中文"吉"
let text = "𠮷";

// - 变量 text 的长度事实上为 1, 但它的 length 属性值为2
console.log(text.length);   // 2 

// - text 被判断为 2 个字符, 因此匹配单一字符的正则表达式会失效. 
console.log(/^.$/.test(text));  // false 
    
// - 前后两个 16 位的编码单元都不表示任何可打印的字符, 因此 charAt() 方法
//   不会返回合法的字符. 
console.log(text.charAt(0));        // ""

// - 同上
console.log(text.charAt(1));        // "" 

// - charCodeAt() 方法同样不能正确地识别字符, 它会返回每个 16 位编码单元对应
//   的数值, 在 ES5 中, 这是能得到的最近text真实的结果了. 
console.log(text.charCodeAt(0));    // 55362
```
ES6 强制使用 UTF-16 字符串编码来解决上述问题, 并按照这种字符编码来标准化字符串操作, 在 js 中增加了专门针对代理对的功能.  本章下面会讨论有关代理对的典型操作.  

### 1.2 `codePointAt()` 方法
ES6 新增加了完全支持 UTF-16 的 codePointAt()方法. 这个方法接受字符在编码单元中的位置而非字符位置作为参数, 返回与字符串中给定位置对应的码位, 即一个整数值. 

```javascript
let text = "𠮷a";
console.log(text.charCodeAt(0));    // 55362
console.log(text.charCodeAt(1));    // 57271
console.log(text.charCodeAt(3));    // 97

console.log(text.codePointAt(0));   // 134071
console.log(text.codePointAt(1));   // 57271
console.log(text.codePointAt(2));   // 97
```

对于 BMP 字符集中的字符, codePointAt() 方法的返回值与 charCodeAt() 方法的相同,而对于非 BMP 字符集来说返回值则不同. 字符串 text 中的第一个字符是非 BMP 的, 包含返回的只是位置 0 处的第一个编码单元, 而 codePointAt() 方法则返回完整地码位, 即使这个码位包含多个编码单元. 对于位置 1(第一个字符的第二个编码单元) 和位置 2 (字符 "a")二者的返回值相同.

要检测一个字符占用的编码单元数量, 最简单的方法是调用字符的 codePointAt() 方法, 可以写这一样一个函数来检测:

```javascript
function is32Bit(c) {
    // - 用 16 位表示的字符集上界为十六进制 FFFF, 所有超过这个上界的码位一定由
    //   两个编码单元来表示, 总共有 32 位. 
    return c.codePointAt(0) > 0xFFFF
}
console.log(is32Bit("𠮷")); // true
console.log(is32Bit("a")); // false
```

### 1.3 `String.fromCodePoint()` 方法
ES 通常面向同一个操作提供正反 2 种方法. 你可以使用 codePointAt() 方法在字符串中检索一个字符的码位, 也可以使用 `String.fromCodePoint()` 方法根据指定的码位生成一个字符. 举个例子: 

```javascript
   // code point 码位
   console.log(String.fromCodePoint(134071));    //"𠮷"
```

可以把 String.fromCodePoint() 看成是更完整版的 String.fromCharCode().

### 1.4 `normalize()` 方法

ES6为字符串添加了一个 normalize() 方法, 他可以提供 Unicode 的标准化形式. 这个方法接受一个可选的字符串参数. " NFC/NFD/NFKC/NFKD " (4 种参数详解见书本 P17~18)

```js
// - 将 values 数组中的所有字符串都转化成同一种标准形式. 
// - Tip: 注意第一个为"吉"字, 第二个为日语
let values = ['English', 'fuck', '吉', '123', '𠮷']; 

// -  normalized 为 values 经过 map 后生成的新数组 (map() 方法并不会改变原数组)
let normalized = values.map(function (text) {
    // - 以标准等价方式分解, 然后以标准等价方式重组("NFC"), 默认选项. 
    return text.normalize()    
});

// - 先经过上面把数组中的每一项转换为标准形式, 下面再次排序
// - f: first, s:second
normalized.sort(function (f, s) {
    if (f < s) {
        return -1
    } else if (f === s) {
        return 0
    } else {
        return 1
    }
});
// Output: [ '123', 'English', 'fuck', '吉', '𠮷' ]
console.log(normalized); 
```

### 1.5 正则表达式 `u` 修饰符
正则表达式可以完成简单的字符串操作, 但默认将字符串中的每个字符按照 16 位编码单元处理. 为了解决这个问题, ES6给正则表达式定义了一个支持 Unicode 的 u 修饰符

#### 1.5.1 `U` 修饰符实例
当一个正则表达式添加了 u 修饰符时, 它就不从编码单元操作模式切换为字符模式,如此以来正则表达式就不会视代理对为 2 个字符, 从而完全按照预期正常运行. 例一下代码: 

```javascript
let text = "𠮷";
console.log(text.length);     // 2
// /^.$/匹配所有单字符字符串 : "小数点" 匹配除换行符之外的任何单个字符
console.log(/^.$/.test(text));    // false
console.log(/^.$/u.test(text))   // true
```
正则表达式 `/^.$/` 匹配所欲偶单字符字符串. 没有使用 u 修饰符时, 会匹配编码单元, 因此使用 2 个编码单元表示的日文字符不会匹配这个表达式; 使用了 u 修饰符后, 正则表达式会匹配字符, 从而就可以匹配日文字符了.  

#### 1.5.2 计算码位数量

代码见 -- chapter2-书上源码.js

#### 1.5.3 检测 `U`修饰符支持

代码见 -- chapter2-书上源码.js


## 2. 其他字符串变更

### 2.1 字符串中的字串识别

`isCludes()`, `stratsWith()`, `endsWith()` 都接受 2 个参数, 第 1 个为要查找的字符；第 2 个可选, 指定一个索引值表示从哪里开始搜索. 

- `isCludes()`: 如果在字符串中检测到指定文本返回 true, 否则返回 false.  
- `startsWith()`: 如果在字符串的起始部分检测到指定文本则返回 true, 否则 false. 
- `endsWith()`: 如果在字符串的结束部分检测到指定文本则返回 true, 否则 false.  

上面4个方法的示例见: chapter2-书上源码.js


### 2.2 `repeat()` 方法
repeat() 方法: 接受一个 number 类型的参数, 表示该字符串的重复次数, 返回值是当前字符串重复一定次数后的新字符串.

方法的示例见: chapter2-书上源码.js  

## 3. 其他正则表达式语法变更

### 3.1 正则表达式 `y` 修饰符

### 3.2 正则表达式的复制

### 3.3 `flags` 属性

## 4. 模板字面量

### 4.1 基础语法

### 4.2 多行字符串

#### 4.2.1 ES6之前版本中的解决方案

#### 4.2.2 简化多行字符串

### 4.3 字符串占位符(/替换位)
此时模板字面量看上去仅仅是普通 JS 字符串的升级版,但二者之间真正的区别在于前者的 "替换位". 替换位允许你将任何有效的 JS表达式嵌入到模板字面量中, 并将其结果输出为字符串的一部分.

替换位由起始的 `${` 与结束的 `}` 来界定, 之间允许放入任意的 JS 表达式.最简单的替换位允许你将本地变量直接嵌入到结果字符串中, 例如:

```js
let name = "Nicholas",
message = `Hello, ${name}.`;
console.log(message); // "Hello, Nicholas."
```
替换位 `${name}` 会访问本地变量 name , 并将其值插入到 message 字符串中.message 变量会立即保留该替换位的结果. 
      
模板字面量能访问到作用域中任意的可访问变量. 试图使用未定义的变量会抛出错误,无论是严格模式还是非严格模式. 既然替换位是 JS 表达式, 那么可替换的就不仅仅是简单的变量名. 你可以轻易嵌入计算、函数调用, 等等. 例如:
```js
  let count = 10,
  price = 0.25,
  message = `${count} items cost $${(count * price).toFixed(2)}.`;
  console.log(message); // "10 items cost $2.50."
```
此代码在模板字面量的一部分执行了一次计算, count 与 price 变量相乘, 再使用 `.toFixed()` 方法将结果格式化为两位小数.

而在第二个替换位之前的美元符号被照常输出, 因为没有左花括号紧随其后. 
      
模板字面量本身也是 JS 表达式, 意味着你可以将模板字面量嵌入到另一个模板字面量内部, 如同下例:
```js
  let name = "Nicholas",
  message = `Hello, ${
    `my name is ${name}`
  }.`;
  console.log(message);   // "Hello, my name is Nicholas."
```
此例在第一个模板字面量中套入了第二个.  在首个 `${` 之后使用了另一个模板字面量, 第二个 `${` 标示了嵌入到内层模板字面量的表达式的开始, 该表达式为被插入结果的 name 变量. 

### 4.4 标签模板
#### 4.4.1 定义标签
#### 4.4.2 在模板字面量中使用原始值  

### 5. 小结

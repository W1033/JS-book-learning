# 第 2 章 -- 字符串和正则表达式

## 目录 (Catalog)
1. 更好的 Unicode(采用双字节对字符进行编码) 支持
    - 1.1 UTF-16 码位
    - 1.2 `codePontAt()` 方法
    - 1.3 `String.fromCodePoint()` 方法
    - 1.4 `normalize()` 方法
    - 1.5 正则表达式 `u` 修饰符
2. 其他字符串变更
    - 2.1 字符串中的字串识别
    - 2.2 `repeat()` 方法
3. 其他正则表达式语法变更
    - 3.1 正则表达式 `y` 修饰符
    - 3.2 正则表达式的复制
    - 3.3 `flags` 属性
4. 模板字面量
    - 4.1 基础语法
    - 4.2 多行字符串
    - 4.3 字符串占位符
    - 4.4 标签模板
5. 小结
---

## 生词 (New Words)
- **multilingual [ˈmʌltiˈliŋɡwəl] --adj.使用多种语言的**
    + --> a multilingual dictionary. 多语词典.
- **surrogate ['sʌrəɡɪt] --n.代理**
- **normalize [ˈnɔ:məˌlaɪz]  --n.标准化, 正常化  --vt&vi(使)正常化**


## 插入内容: 来自《Node.js 开发指南》
- 6.4.4 Unicode 与国际化
    + Node.js 不支持完整的Unicode, 很多字符无法用 string 表示. 公平地说这不是Node.js 的
      缺陷, 而是JavaScript 标准的问题. 目前JavaScript 支持的字符集还是双字节的UCS2, 即用
      两个字节来表示一个Unicode 字符, 这样能表示的字符数量是65536. 显然, 仅仅是汉字就不
      止这个数目, 很多生僻汉字, 以及一些较为罕见语言的文字都无法表示. 这其实是一个历史
      遗留问题, 像2000 年问题（俗称千年虫）一样, 都起源于当时人们的主观判断. 最早的Unicode
      设计者认为65536个字符足以囊括全世界所有的文字了, 因此那个时候盲目兼容Unicode 的系
      统或平台（如Windows、Java 和JavaScript）在后来都遇到了问题. 
      Unicode 随后意识到2个字节是不够的, 因此推出了UCS4, 即用4 个字节来表示一个
      Unicode 字符. 很多原先用定长编码的UCS2 的系统都升级为了变长编码的UTF-16, 因为只
      有它向下兼容UCS2. UTF-16 对UCS2 以内的字符采用定长的双字节编码, 而对它以外的部分
      使用多字节的变长编码. 这种方式的好处是在绝大多数情况下它都是定长的编码, 有利于提
      高运算效率, 而且兼容了UCS2, 但缺点是它本质还是变长编码, 程序中处理多少有些不便. 
      许多号称支持UTF-16 的平台仍然只支持它的子集UCS2, 而不支持它的变长编码部分. 
      相比之下, UTF-8 完全是变长编码, 有利于传输, 而UTF-32 或UCS4 则是4 字节的定长编码, 
      有利于计算. 
      当下的JavaScript 内部支持的仍是定长的UCS2 而不是变长的UTF-16, 因此对于处理
      UCS4 的字符它无能为力. 所有的JavaScript 引擎都被迫保留了这个缺陷, 包括V8 在内, 因
      此你无法使用Node.js 处理罕见的字符. 想用Node.js 实现一个多语言的字典工具？还是算了
      吧, 除非你放弃使用 string 数据类型, 把所有的字符当作二进制的 Buffer 数据来处理.
    + 目前(2019 年末) Node.js 对变长的 UTF-16 字符编码的支持? (待查)  

## 内容 (Content)
### 1. 更好的 Unicode(采用双字节对字符进行编码) 支持
- 在 ES6 出现之前, javascript 字符串一直基于 16 位字符编码 (UTF-16) 进行构建, 每 
  16 位的序列是一个 **编码单元(code unit)**, 代表一个字符. `length`, `charAt()`
  等字符串属性和方法都是基于这种编码单元构造的. 在过去 16 位足以, 直到 Unicode 引入
  拓展字符集, 编码规则不得不进行变更. 
- 1.1 UTF-16 码位
    + Unicode 的目标是为全世界每一个字符提供全球唯一的标识符. 如果把字符长度限制在 16 位, 
      码位数量将不足以表示如此多的字符. "全球唯一标识符" 又被称作 `码位(code point)`, 
      是从 0 开始的数值. 而表示字符的这些**数值**或**码位**, 我们称之为 
      `字符编码(character encode)`. 字符编码必须将码位编码为内部一致的编码单元. 对于 
      UTF-16 来说, 码位可以有多重编码单元表示. 
    + 在 UTF-16 中, 前 $2^{16}$ 个码位均以 16 位的编码单元表示, 这个范围被称作 -- 
      `基本多文种平面 (BMP, Basic Multilingual Plane)`. 超出这个范围的码位则要归属于
      某个 `辅助平面 (supplementary plane)`, 其中的码位仅用 16 位就无法表示了. 为此, 
      UTF-16 引入了 -- `代理对 surrogate pair`, 其规定用两个 16 位编码单元表示一个码位
      . 也就是说, 字符串里的字符有 2 种, 一种是有一个编码单元 16 位表示的 BMP 字符, 另外
      一种是由 2 个编码单元 32 位表示的辅助平面字符. 
    + 在 ES5 中, 所有字符串的操作都基于 16 位编码单元. 如果采用同样的方式处理包含代理对的
      UTF-16 编码字符, 得到的结果可能与预期不符, 就像这样
    + ```javascript
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
    + ES6 强制使用 UTF-16 字符串编码来解决上述问题, 并按照这种字符编码来标准化字符串操作, 
      在 js 中增加了专门针对代理对的功能.  本章下面会讨论有关代理对的典型操作.  
- 1.2 `codePointAt()` 方法
    + ES6 新增加了完全支持 UTF-16 的 codePointAt()方法. 这个方法接受字符在编码单元中
      的位置而非字符位置作为参数, 返回与字符串中给定位置对应的码位, 即一个整数值. 
    + ```javascript
        let text = "𠮷a";
        console.log(text.charCodeAt(0));    // 55362
        console.log(text.charCodeAt(1));    // 57271
        console.log(text.charCodeAt(3));    // 97

        console.log(text.codePointAt(0));   // 134071
        console.log(text.codePointAt(1));   // 57271
        console.log(text.codePointAt(2));   // 97
      ```
    + 对于 BMP 字符集中的字符, codePointAt() 方法的返回值与 charCodeAt() 方法的相同,
      而对于非 BMP 字符集来说返回值则不同. 字符串 text 中的第一个字符是非 BMP 的, 包含
      返回的只是位置 0 处的第一个编码单元, 而 codePointAt() 方法则返回完整地码位, 即使
      这个码位包含多个编码单元. 对于位置 1(第一个字符的第二个编码单元) 和位置 2 (字符 "a")
      二者的返回值相同.    
    + 要检测一个字符占用的编码单元数量, 最简单的方法是调用字符的 codePointAt() 方法, 
      可以写这一样一个函数来检测:
      ```javascript
        function is32Bit(c) {
            // - 用 16 位表示的字符集上界为十六进制 FFFF, 所有超过这个上界的码位一定由
            //   两个编码单元来表示, 总共有 32 位. 
            return c.codePointAt(0) > 0xFFFF
        }
        console.log(is32Bit("𠮷")); // true
        console.log(is32Bit("a")); // false
      ```
- 1.3 `String.fromCodePoint()` 方法
    + ES 通常面向同一个操作提供正反 2 种方法. 你可以使用 codePointAt() 方法在字符串中
      检索一个字符的码位, 也可以使用 `String.fromCodePoint()` 方法根据指定的码位生成
      一个字符. 举个例子: 
      ```javascript
         // code point 码位
         console.log(String.fromCodePoint(134071));    //"𠮷"
      ```
    + 可以把 String.fromCodePoint() 看成是更完整版的 String.fromCharCode().
- 1.4 `normalize()` 方法
    + ES6为字符串添加了一个 normalize() 方法, 他可以提供 Unicode 的标准化形式. 这个
      方法接受一个可选的字符串参数. " NFC/NFD/NFKC/NFKD " (4 种参数详解见书本 P17~18)
    + ```js
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

- 1.5 正则表达式 `u` 修饰符
    + 正则表达式可以完成简单的字符串操作, 但默认将字符串中的每个字符按照 16 位编码单元处理. 
      为了解决这个问题, ES6给正则表达式定义了一个支持 Unicode 的 u 修饰符
    + 1.5.1 `U` 修饰符实例 
        - 当一个正则表达式添加了 u 修饰符时, 它就不从编码单元操作模式切换为字符模式, 
          如此以来正则表达式就不会视代理对为 2 个字符, 从而完全按照预期正常运行. 例如
          一下代码: 
          ```javascript
            let text = "𠮷";
            // - 
            console.log(text.length);     // 2
            // /^.$/匹配所有单字符字符串 : "小数点" 匹配除换行符之外的任何单个字符
            console.log(/^.$/.test(text));    // false
            console.log(/^.$/u.test(text))   // true
          ```
        - 正则表达式 `/^.$/` 匹配所欲偶单字符字符串. 没有使用 u 修饰符时, 会匹配编码
          单元, 因此使用 2 个编码单元表示的日文字符不会匹配这个表达式; 使用了 u 修饰符
          后, 正则表达式会匹配字符, 从而就可以匹配日文字符了.  
    + 1.5.2 计算码位数量
      
        -  代码见 -- chapter2-书上源码.js
    + 1.5.3 检测 `U`修饰符支持
      
        -  代码见 -- chapter2-书上源码.js
### 2. 其他字符串变更
- 2.1 字符串中的字串识别
    + `isCludes()`, `stratsWith()`, `endsWith()` 都接受2个参数, 第 1 个为要查找的
      字符；第 2 个可选, 指定一个索引值表示从哪里开始搜索. 
        - `isCludes()`: 如果在字符串中检测到指定文本返回 true, 否则返回 false.  
        - `startsWith()`: 如果在字符串的起始部分检测到指定文本则返回 true, 否则 false. 
        - `endsWith()`: 如果在字符串的结束部分检测到指定文本则返回 true, 否则 false.  
            <br/>
          上面4个方法的示例见: chapter2-书上源码.js
- 2.2 `repeat()` 方法
    + repeat()方法: 接受一个 number 类型的参数, 表示该字符串的重复次数, 返回值是当前
      字符串重复一定次数后的新字符串.  <br/>
      方法的示例见: chapter2-书上源码.js  
### 3. 其他正则表达式语法变更
- 3.1 正则表达式 `y` 修饰符
- 3.2 正则表达式的复制
- 3.3 `flags` 属性
### 4. 模板字面量
- 4.1 基础语法
- 4.2 多行字符串
    + 4.2.1 ES6之前版本中的解决方案
    + 4.2.2 简化多行字符串
- 4.3 字符串占位符(/替换位)
    - 此时模板字面量看上去仅仅是普通 JS 字符串的升级版,
      但二者之间真正的区别在于前者的 "替换位". 替换位允许你将任何有效的 JS
      表达式嵌入到模板字面量中, 并将其结果输出为字符串的一部分.
      
      替换位由起始的 `${` 与结束的 `}` 来界定, 之间允许放入任意的 JS 表达式.
      最简单的替换位允许你将本地变量直接嵌入到结果字符串中, 例如:
      ```js
        let name = "Nicholas",
        message = `Hello, ${name}.`;
        console.log(message); // "Hello, Nicholas."
      ```
      替换位 `${name}` 会访问本地变量 name , 并将其值插入到 message 字符串中.
      message 变量会立即保留该替换位的结果. 
      
      模板字面量能访问到作用域中任意的可访问变量. 试图使用未定义的变量会抛出错误,
      无论是严格模式还是非严格模式. 既然替换位是 JS 表达式, 
      那么可替换的就不仅仅是简单的变量名. 你可以轻易嵌入计算、函数调用, 等等. 例如:
      ```js
        let count = 10,
        price = 0.25,
        message = `${count} items cost $${(count * price).toFixed(2)}.`;
        console.log(message); // "10 items cost $2.50."
      ```
      此代码在模板字面量的一部分执行了一次计算, count 与 price 变量相乘, 再使用
      `.toFixed()` 方法将结果格式化为两位小数.
      而在第二个替换位之前的美元符号被照常输出, 因为没有左花括号紧随其后. 
      
      模板字面量本身也是 JS 表达式, 意味着你可以将模板字面量嵌入到另一个模板字面量内部,
      如同下例:
      ```js
        let name = "Nicholas",
        message = `Hello, ${
            `my name is ${name}`
        }.`;
        console.log(message);   // "Hello, my name is Nicholas."
      ```
      此例在第一个模板字面量中套入了第二个.  在首个 `${` 之后使用了另一个模板字面量,
      第二个 `${` 标示了嵌入到内层模板字面量的表达式的开始, 该表达式为被插入结果的
      name 变量. 
- 4.4 标签模板
    + 4.4.1 定义标签
    + 4.4.2 在模板字面量中使用原始值  

### 5. 小结

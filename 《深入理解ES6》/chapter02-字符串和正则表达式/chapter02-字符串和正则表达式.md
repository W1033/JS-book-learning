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
- **normalize [ˈnɔ:məˌlaɪz]  --n.标准化，正常化  --vt&vi(使)正常化**
---

## 内容 (Content)
### 1. 更好的 Unicode(采用双字节对字符进行编码) 支持
- 在 ES6 出现之前，javascript 字符串一直基于 16 位字符编码 (UTF-16) 进行构建，每 
  16 位的序列是一个 **编码单元(code unit)**，代表一个字符。`length`, `charAt()`
  等字符串属性和方法都是基于这种编码单元构造的。在过去 16 位足以，直到 Unicode 引入
  拓展字符集，编码规则不得不进行变更。
- 1.1 UTF-16 码位
    + Unicode 的目标是为全世界每一个字符提供全球唯一的标识符。如果把字符长度限制在 16 位，
      码位数量将不足以表示如此多的字符。"全球唯一标识符" 又被称作 `码位(code point)`，
      是从 0 开始的数值。而表示字符的这些**数值**或**码位**，我们称之为 
      `字符编码(character encode)`。字符编码必须将码位编码为内部一致的编码单元。对于 
      UTF-16 来说， 码位可以有多重编码单元表示。
    + 在 UTF-16 中，前 $2^{16}$ 个码位均以 16 位的编码单元表示，这个范围被称作 -- 
      `基本多文种平面 (BMP, Basic Multilingual Plane)`。超出这个范围的码位则要归属于
      某个 `辅助平面 (supplementary plane)`, 其中的码位仅用 16 位就无法表示了。为此，
      UTF-16 引入了 -- `代理对 surrogate pair`，其规定用两个 16 位编码单元表示一个码位
      。也就是说，字符串里的字符有 2 种， 一种是有一个编码单元 16 位表示的 BMP 字符，另外
      一种是由 2 个编码单元 32 位表示的辅助平面字符。
    + 在 ES5 中, 所有字符串的操作都基于 16 位编码单元. 如果采用同样的方式处理包含代理对的
      UTF-16 编码字符, 得到的结果可能与预期不符, 就像这样
    + ```javascript
        // "𠮷"为日文字，不是中文"吉"
        let text = "𠮷";

        // - 变量 text 的长度事实上为 1，但它的 length 属性值为2
        console.log(text.length);   // 2 
        
        // - text 被判断为 2 个字符，因此匹配单一字符的正则表达式会失效。
        console.log(/^.$/.test(text));  // false 
          
        // - 前后两个 16 位的编码单元都不表示任何可打印的字符，因此 charAt() 方法
        //   不会返回合法的字符。
        console.log(text.charAt(0));        // ""
        
        // - 同上
        console.log(text.charAt(1));        // "" 
        
        // - charCodeAt() 方法同样不能正确地识别字符，它会返回每个 16 位编码单元对应
        //   的数值，在 ES5 中，这是能得到的最近text真实的结果了。
        console.log(text.charCodeAt(0));    // 55362
      ```    
    + ES6 强制使用 UTF-16 字符串编码来解决上述问题，并按照这种字符编码来标准化字符串操作，
      在 js 中增加了专门针对代理对的功能。 本章下面会讨论有关代理对的典型操作.  
- 1.2 `codePontAt()` 方法
    + ES6 新增加了完全支持 UTF-16 的 codePointAt()方法。这个方法接受字符在编码单元中
      的位置而非字符位置作为参数，返回与字符串中给定位置对应的码位，即一个整数值。
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
    + 要检测一个字符占用的编码单元数量，最简单的方法是调用字符的 codePointAt() 方法，
      可以写这一样一个函数来检测:
      ```javascript
        function is32Bit(c) {
            // - 用 16 位表示的字符集上界为十六进制 FFFF, 所有超过这个上界的码位一定由
            //   两个编码单元来表示，总共有 32 位。
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
    + ES6为字符串添加了一个 normalize() 方法，他可以提供 Unicode 的标准化形式。这个
      方法接受一个可选的字符串参数。" NFC/NFD/NFKC/NFKD " (4 种参数详解见书本 P17~18)
    + ```js
        // - 将 values 数组中的所有字符串都转化成同一种标准形式。
        // - Tip: 注意第一个为"吉"字，第二个为日语
        let values = ['English', 'fuck', '吉', '123', '𠮷']; 

        // -  normalized 为 values 经过 map 后生成的新数组 (map() 方法并不会改变原数组)
        let normalized = values.map(function (text) {
            // - 以标准等价方式分解，然后以标准等价方式重组("NFC")，默认选项。
            return text.normalize()    
        });

        // - 先经过上面把数组中的每一项转换为标准形式，下面再次排序
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
    + 正则表达式可以完成简单的字符串操作，但默认将字符串中的每个字符按照 16 位编码单元处理。
      为了解决这个问题， ES6给正则表达式定义了一个支持 Unicode 的 u 修饰符
    + 1.5.1 `U` 修饰符实例 
        - 
        - ```javascript
            let text = "𠮷";
            // - 
            console.log(text.length)         // 2
            // /^.$/匹配所有单字符字符串 : "小数点" 匹配除换行符之外的任何单个字符
            console.log(/^.$/.test(text))    // false
            console.log(/^.$/u.test(text))   // true
          ```
    + 1.5.2 计算码位数量
    + 1.5.3 检测 `U`修饰符支持
### 2. 其他字符串变更
- 2.1 字符串中的字串识别
- 2.2 `repeat()` 方法
### 3. 其他正则表达式语法变更
- 3.1 正则表达式 `y` 修饰符
- 3.2 正则表达式的复制
- 3.3 `flags` 属性
### 4. 模板字面量
- 4.1 基础语法
- 4.2 多行字符串
- 4.3 字符串占位符
- 4.4 标签模板
### 5. 小结



### 更好的 Unicode(采用双字节对字符进行编码) 支持
       
        
        
### UTF-16 码位 : 
         
          
    


### codePointAt() 方法:  
   
    console.log(text.codePointAt(0));   // 134071
    console.log(text.codePointAt(1));   // 57271
    
      
### String.fromCodePoint() 方法根据指定的码位生成一个字符。(和上面的 codePointAt()相反的方法。)
   

   
### normalize()方法      /ˈnɔ:məˌlaɪz/  n.标准化，正常化  vt&vi (使)正常化
   
    
    
### 正则表达式 u 修饰符
       
 #### 1. u 修饰符
    当一个正则表达式添加了 u 修饰符，他就从编码单元操作模式切换到字符模式，如此一来正则表达式就不会视代理对位2个字符，从而完全按照预期正常运行。
    let text = "𠮷";
    console.log(text.length);         // 2
    // "小数点" 匹配除换行符之外的任何单个字符
    console.log(/^.$/.test(text));    // false
    console.log(/^.$/u.test(text));   // true
 #### 2. 计算码位数量
    代码见 -- chapter2-书上源码.js
 #### 3. 检测 U 修饰符支持情况 
    代码见 -- chapter2-书上源码.js
    
    
### 其他字符串变更
 #### 字符串中的子串识别
    isCludes(), stratsWith(), endsWith() 都接受2个参数，第一个为要查找的字符； 第二个可选，指定一个索引值表示从哪里开始搜索。
  - isCludes():     如果在字符串中检测到指定文本返回 true, 否则返回 false。 
  - startsWith():   如果在字符串的起始部分检测到指定文本则返回 true, 否则 false。
  - endsWith()      如果在字符串的结束部分检测到指定文本则返回 true, 否则 false。 
  - repeat()方法:    接受一个 number 类型的参数，表示该字符串的重复次数，返回值是当前字符串重复一定次数后的新字符串。<br/>
    上面4个方法的示例见: chapter2-书上源码.js

  
### 其他正则表达式语法变更: 示例代码见 chapter2-书上源码.js
 #### 1.正则表达式 y 修饰符
 #### 2.正则表达式的复制 : 
   - 
 #### 3.flags 属性
  

### 模板字面量: 示例代码见 chapter2-书上源码.js
 #### 1. 基础语法
 #### 2. 多行字符串
  - (1.) ES6之前版本中的解决方案
  - (2.) 简化多行字符串
 #### 3. 字符串占位符
 #### 4. 标签模板
  - (1.) 定义标签
  - (2.) 在模板字面量中使用原始值  

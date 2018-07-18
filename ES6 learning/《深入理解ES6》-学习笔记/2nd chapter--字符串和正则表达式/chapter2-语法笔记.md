## Chapter 2 字符串和正则表达式

### 更好的 Unicode(采用双字节对字符进行编码) 支持
        在 ECMAScript 6 出现之前，javascript字符串一直基于16位字符编码(UTF-16)进行构建，
    每16位的序列是一个编码单元(code unit)，代表一个字符。length, charAt()等字符串属性和方法都是
    基于这种编码单元构造的。在过去16位足以，直到 Unicode 引入拓展字符集，编码规则不得不进行变更。
        
        
### UTF-16 码位 : 
         Unicode的目标是为全世界每一个字符提供全球唯一的标识符。如果把字符长度限制在16位，码位数量将不足以表示如此多的字符。
     "全球唯一标识符"又被称作 码位(code point)，是从0开始的数值。而表示字符的这些数值或码位，我们称之为 "字符编码(character encode)"。
     字符编码必须将码位编码为内部 一致的编码单元。对于 UTF-16 来说， 码位可以有多重编码单元表示。
     
         在 UTF-16中，前 【2的16次方】 个码位以16位的编码单元表示，这个范围被称作 -- "【基本多文种平面 BMP, Basic Multilingual Plane】"。
     超出这个范围的码位则要归属于某个 "【辅助平面  (supplementary plane)】",其中的码位仅用16位就无法表示了。 为此， UTF-16引入了 -- 
     "【代理对surrogate(/'sʌrəɡɪt/n.代理) pair】"，其规定用两个16位编码单元表示一个码位。也就是说，字符串里的字符有 2 中， 
     一种是有一个编码单元16位表示的BMP字符，另外一种是由2个编码单元32位表示的辅助平面字符。
          
    // "𠮷"为日文字，不是中文"吉"
    let text = "𠮷";
    console.log(text.length);           // 2     :   变量text的长度事实上为1，但它的length属性值为2
    console.log(/^.$/.test(text));      // false :   text被判断为2个字符，因此匹配单一字符的正则表达式会失效。
    console.log(text.charAt(0));        // ""    :   前后两个16位的编码单元都不表示任何可打印的字符，因此 charAt()方法不会返回合法的字符。
    console.log(text.charAt(1));        // ""    :   同上
    console.log(text.charCodeAt(0));    // 55362 :   charCodeAt()方法同样不能正确地识别字符，它会返回每个16位编码单元对应的数值，在ECMAScript5中，这是能得到的最近text真实的结果了。
    ES6强制使用UTF-16字符串编码来解决上述问题，并按照这种字符编码来标准化字符串操作，在Javascript中增加了专门针对代理对的功能。


### codePointAt() 方法:  
    ES6新增加了完全支持 UTF-16的 codePointAt()方法。这个方法接受字符在编码单元中的位置而非字符位置作为参数，返回与字符串中给定位置对应的码位，即一个整数值。
    console.log(text.codePointAt(0));   // 134071
    console.log(text.codePointAt(1));   // 57271
    
      
### String.fromCodePoint() 方法根据指定的码位生成一个字符。(和上面的 codePointAt()相反的方法。)
    // code point 码位
    console.log(String.fromCodePoint(134071));    //"𠮷"

   
### normalize()方法      /ˈnɔ:məˌlaɪz/  n.标准化，正常化  vt&vi (使)正常化
    ES6为字符串添加了一个 normalize()方法，他可以提供 Unicode 的标准化形式。这个方法接受一个可选的字符串参数。" NFC/NFD/NFKC/NFKD " (四种参数详细讲解年书本)
    
    
### 正则表达式 u 修饰符
    正则表达式可以完成简单的字符串操作，但默认将字符串中的每个字符按照 16 位编码单元处理。为了解决这个问题， ES6给正则表达式定义了一个支持 Unicode 的 u 修饰符   
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

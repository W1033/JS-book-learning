 [技术学习]正则表达式分析

jquery源码学习中，发现大量正则表达式的使用，因此在此对常用正则表达式进行分解，并举例他们的匹配规则

## 一、匹配常用的数字格式，包括正负整数小数以及可以计数法
   core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,  // Used for matching numbers
　　 1、[+-]? 表示第一位为+或-号，也可以没有  <br/>
　　 2、(?:\d*\.|) :使用?:表示分组不会被捕捉，有0到多个数字，一个小数点，|表示匹配空.，即匹配12.格式或者空  <br/>
　　 3、\d+ ：表示1到多个数字   <br/>
　　 4、(?:[eE][+-]?\d+|) 表示分组不被捕捉，匹配e或者E，0-1个+-号，多个数字，表示匹配e+3格式或者空   <br/>
    可以进行匹配数字格式，由于以.source为标记，得到为备份字符串，可以与其他字符串组成完整的正则，进行使用，主要使用为:  <br/>
    
举例说明：复制代码

   var core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,// Used for matching numbers      <br/>    
   rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),//^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$    <br/>
   rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),   <br/>
   rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),    <br/>

复制代码
复制代码
   var core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,  // Used for matching numbers
   ///^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(.*)$
   //可以将数字与其他字符进行分离,例如：100px，分离为100和px
   rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
   //^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$
   //匹配非px结尾的字符
   rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
   ///^([+-])=([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))/i
   rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
   ///^(?:([+-])=|)([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))([a-z%]*)$/i
   rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" );

var width='100px';
alert(width.match(rnumsplit));//['100px','100','px']
alert(width.match(rnumnonpx));//null

var aa="+=100.12"
alert(rrelNum.exec(aa));//['+=100.12','+','100.12']

复制代码


复制代码

    var core_pnum = /^[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)$/;//
    var num1=1.0034e-18;
    alert(core_pnum.exec(num1))//1.0034e-18

    var num2=43.12
    alert(core_pnum.exec(num2))//43.12

    var num3=43
    alert(core_pnum.exec(num3))//43

复制代码

## 二、非空字符，全局匹配

　　 core_rnotwhite = /\S+/g,

    使用环境为，进行字符串切割，将所有字符串按字符进行转化为数组：
    var core_rnotwhite = /\S+/g,
    str='one two three';
    alert(str.match(core_rnotwhite))//['one','two','three']

## 三、全局匹配左侧或者右侧空格

    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    
    aa=' aaa ' ;
    alert("1"+aa.replace(rtrim,'')+"1");//1aaa11

## 四、匹配html标签或者id选择器#xxx

    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

## 五、匹配单独的html标签
    rsingleTag= /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

## 六、匹配由],:{}以及任意字符组成的字符串，json常用字符串
    rvalidchars = /^[\],:{}\s]*$/,

## 七、
    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
    rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

    // Matches dashed string for camelizing
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,

-----------------------分割线----------------------------------------------
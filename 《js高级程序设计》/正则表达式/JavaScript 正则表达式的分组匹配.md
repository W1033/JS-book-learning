
## 分组
##### 下面的正则表达式可以匹配kidkidkid：

    /kidkidkid/

##### 而另一种更优雅的写法是：

    /(kid){3}/

##### 这里由圆括号包裹的一个小整体称为分组。



## 候选
##### 一个分组中，可以有多个候选表达式，用|分隔：

    var reg = /I love (him|her|it)/;

    reg.test('I love him')   // true  
    reg.test('I love her')   // true
    reg.test('I love it')    // true
    reg.test('I love them')  // false
    
##### 这里的|相当于“或”的意思。



## 捕获与引用
##### 被正则表达式匹配（捕获）到的字符串会被暂存起来。其中，由分组捕获的串会从1开始编号，于是我们可以引用这些串：

    var reg = /(\d{4})-(\d{2})-(\d{2})/
    var date = '2010-04-12'
    reg.test(date)

    RegExp.$1  // 2010
    RegExp.$2  // 04
    RegExp.$3  // 12

##### $1引用了第一个被捕获的串，$2是第二个，依次类推。


## 与replace配合
##### String.prototype.replace方法的传参中可以直接引用被捕获的串。比如我们想将日期12.21/2012改为2012-12-21：

    var reg = /(\d{2}).(\d{2})\/(\d{4})/
    var date = '12.21/2012'

    date = date.replace(reg, '$3-$1-$2')  // date = 2012-12-21

##### 顺道一提，给replace传迭代函数，有时能优雅地解决一些问题。

##### 将违禁词转换为等字数的星号是一个常见功能。比如文本是kid is a doubi，其中kid与doubi是违禁词，那么转换后应该为*** is a *****。我们可以这么写：

    var reg = /(kid|doubi)/g
    var str = 'kid is a doubi'

    str = str.replace(reg, function(word){
        return word.replace(/./g, '*')
    })


## 嵌套分组的捕获
##### 如果碰到类似/((kid) is (a (doubi)))/的嵌套分组，捕获的顺序是什么？来试试：

    var reg = /((kid) is (a (doubi)))/
    var str = "kid is a doubi"

    reg.test( str )  // true

    RegExp.$1  // kid is a doubi
    RegExp.$2  // kid
    RegExp.$3  // a doubi
    RegExp.$4  // doubi

##### 规则是以左括号出现的顺序进行捕获。



## 反向引用
##### 正则表达式里也能进行引用，这称为反向引用：

    var reg = /(\w{3}) is \1/

    reg.test('kid is kid')  // true
    reg.test('dik is dik')  // true
    reg.test('kid is dik')  // false
    reg.test('dik is kid')  // false

##### \1引用了第一个被分组所捕获的串，换言之，表达式是动态决定的。

##### 注意，如果编号越界了，则会被当成普通的表达式：

    var reg = /(\w{3}) is \6/;

    reg.test( 'kid is kid' );  // false
    reg.test( 'kid is \6' );   // true
    
    

## 分组的类型

##### 分组有四种类型：

      捕获型　　　-　()
      非捕获型　　-　(?:)
      正向前瞻型　-　(?=)
      反向前瞻型　-　(?!)

##### 我们之前说的都是捕获型分组，只有这种分组会暂存匹配到的串。


## 非捕获型分组

##### 有时候，我们只是想分个组，而没有捕获的需求，则可以使用非捕获型分组，语法为左括号后紧跟?:：

    var reg = /(?:\d{4})-(\d{2})-(\d{2})/
    var date = '2012-12-21'
    reg.test(date)

    RegExp.$1  // 12
    RegExp.$2  // 21

##### 这个例子中，(?:\d{4})分组不会捕获任何串，所以$1为(\d{2})捕获的串。


## 正向与反向前瞻型分组

##### 就好像你站在原地，向前眺望：

    1正向前瞻型分组 - 你前方是什么东西吗？
    2负向前瞻型分组 - 你前方不是什么东西吗？

##### 太拗口了，我喜欢称之为肯定表达式与否定表达式。先举个正向前瞻的例子：

    var reg = /kid is a (?=doubi)/

    reg.test('kid is a doubi')  // true
    reg.test('kid is a shabi')  // false

##### kid is a 后面跟着什么？如果是doubi才能匹配成功。

##### 而负向前瞻则刚好相反：

    var reg = /kid is a (?!doubi)/

    reg.test('kid is a doubi')  // false
    reg.test('kid is a shabi')  // true

##### 如果前瞻型分组也不会捕获值。那么它与非捕获型的区别是什么？看例子：

    var reg, str = "kid is a doubi"

    reg = /(kid is a (?:doubi))/
    reg.test(str)
    RegExp.$1  // kid is a doubi

    reg = /(kid is a (?=doubi))/
    reg.test(str)
    RegExp.$1  // kis is a

##### 可见，非捕获型分组匹配到的串，仍会被外层的捕获型分组捕获到，但前瞻型却不会。当你需要参考后面的值，又不想连它一起捕获时，前瞻型分组就派上用场了。

##### 最后，JS不支持后瞻型分组。

    #####原创，自由转载，请署名，本人博客 kid-wumeng.me谢谢


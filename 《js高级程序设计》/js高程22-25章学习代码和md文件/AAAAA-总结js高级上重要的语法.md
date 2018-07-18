/** Created on 2017/3/7.*/

## 一:. <br/> 第五章: 引用类型 : 引用类型的值[对象]是[引用类型]的一个实例。在ECMAScript中[引用类型]是一种数据结构，用于将数据和功能组织在一起。它也常被称为["类"],但这种称呼并不妥当。尽管ECMAScript从技术上讲是一门面向对象的语言，但它不具备传统的面向对象语言所支持的[类]和[接口]等基本结构。引用类型有时候也被称为[对象定义]，因为他们描述的是一类对象所具有的属性和方法。<br/> [虽然引用类型与类看起来相似，但它们并不是相同的概念], [对象是某个特定引用类型的实例 / --> 也就是说 : 对象是实例 / 实例是对象]

### ES中已定义的原生引用类型有 <br/>
### (1.) Object类型 --> 我们所说的创建object对象的实例，实际上严谨一些应该说是创建object引用类型的实例/object类型的实例
### (2.) Array类型     
### (3.) Date类型      
### (4.) RegExp类型    
### (5.) Function类型  
### (6.) 基本包装类型 --> 基本包装类型包含:Boolean类型, Number类型, String类型 <br/>
### (7.) 单体内置对象 --> 单体内置对象包含: Global对象，Math对象  <br/>

### 如上所述，[对象是某个特定引用类型的实例]。新对象是使用new操作符后跟一个构造函数来创建的。构造函数本身就是一个函数，只不过该函数式处于创建新对象的目的而定义的。
     var person = new Ojbect(); 
### 这行代码创建了 Object引用类型的一个新实例，然后把该实例保存在了变量person中。使用的构造函数是Object,它只为新对象定义了默认的属性和方法。

### 创建[Object类型实例]的方式有两种: /也可以说成[创建Object对象]的两种方式 
 - (1.) 使用new 操作符后跟 Object 构造函数：<br/>
       var person = new Object();       <br/>
       person.name = "Nicholas";         <br/>
       person.age = 29;    <br/>

 - (2.) 使用 [对象字面量]表示法:  <br/>
       var person = {          <br/>
           name: "Nicholas",   <br/>
           age: 29             <br/>
       }

-------------------------------------------------------------   

## 二. 
### 6.1 : 理解对象
#### 每个对象都是基于一个引用类型创建的。 创建自定义对象的最简单方式，就是创建一个Object的实例，然后在为他添加属性和方法。 ，

### 6.1.1 属性类型 
#### ECMA-262第5版在定义只有内部采用的特性(attribute)时，描述了属性(property)的各种特性。ECMA-262定义这些特性是为了实现js引擎用的，因为在js中不能直接访问他们。为了表示特性是内部值，该规范把他们放在了两对方括号中，例如[[Enumerable]]。
#### ECMAScript中有两种属性: 数据属性和访问器属性
#### (1.) 数据属性: <br/> 数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有4个描述其行为的特性 : A: [[Configurable]]; B: [[Enumerable]]; C: [[Writable]]; D: [[Value]]; <br/> 对于直接在对象上定义的属性，他们的 [[Configurable]]; [[Enumerable]]和[[Writable]]特性都被设置为true,而[[Value]]特性被设置为指定的值。
   例如:  var person = {name: "Nicholas"}
#### 要修改属性默认的特性，必须使用ECMAScript5的 Object.defineProperty()方法。这个方法接受三个参数: [属性所在的对象],[属性的名字]和[一个描述符对象]。其中，描述符(descriptor)对象的属性必须是: configurable，enumerable，writable 和 value。设置其中的一或多个值，可以修改对应的特性值。
#### 在调用Object.defineProperty()方法时，如果不指定，configurable，enumerable和 writable特性的默认值都是false。多数情况下，可能都没有必要利用Object.defineProperty()方法提供的这些高级功能。

#### (2.) 访问器属性 : <br/> 访问器属性不包含数据值:他们包含以对gette和setter函数(不过这连个函数都不是必需的)。在读取访问器属性时，会调用getter函数，这个函数负责返回有效的值；在写入访问器属性时，会调用setter函数并传入新值，这个函数负责决定如何处理数据。访问器属性有下面四个特性。<br/> A: [[Configurable]]; B: [[Enumerable]]; C: [[Get]]; D: [[Set]]; <br/> 访问器属性不能直接定义，必须使用 Object.defineProperty()来定义。

       var book = {
          _year: 2004,
           edition: 1
       };
       Object.defineProperty(book, "year", {
           get: function(){
             return this._year;
           },
           set: function(newValue){
               if(newValue > 2004){
                   this._year = newValue;
                   this.edition = newValue - 2004;
               }
           }
       });

       book.year = 2017;
       console.log(book.edition);
#### 以上代码创建了一个book对象，并给他定义两个默认的属性: _year和edition. [_year前面的下划线是一种常用的几号，用于表示只能通过对象方法访问的属性]。


--------------------------------------------------------------
## 三.  <br/> js高级 5.5.5函数属性和方法 apply()和call(): 这两个方法的用途是在[特定的作用域中调用函数]，实际上等于设置函数体内this对象的值。
  - (1.)apply()方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以是Array的实例，也可以是arguments对象。

       function sum(num1, num2){  <br/>
           return num1 + num2;   <br/>
       } <br/>
       function callSum1(num1, num2){  <br/>
           return sum.apply(this, arguments); //传入arguments对象    <br/>
       }  <br/>
       function callSum2(num1, num2){ <br/>
           return sum.apply(this, [num1, num2]); //传入数组  <br/>
       }  <br/>
       alert(callSum1(10, 10)); //20  <br/>
       alert(callSum2(10, 10)); //20  <br/>   

  - ( 2.) call()方法也是接收两个参数: 第一个参数是this值没有变化，变化的是其余参数都是直接传递给函数。换句话说就是在使用call()方法时，传递给函数的参数必须诸葛列举出来。


## 四. typeof 和 instanceof 操作符:
  - (1). typeof操作符检测变量是哪种基本数据类型: typeof操作符是确定一个变量是字符串，数值，布尔值，还是 undefined 的最佳工具。 <br/> 如果变量的值是一个对象或null，则typeof操作符会返回 "object"。 <br/>
  - (2). instanceof操作符检测变量是哪种引用类型 
  
## 五. 第6章: 6.2.3  (6).原型中所有属性被实例共享

## 六. 7.2 闭包是指有权访问另一个函数作用域中的变量的函数。

## 七. 第5章: 5.6.3 String类型: 
 #### 6. replace()方法:
  为了简化替换子字符串的操作，ECMAScript 提供了 replace() 方法。这个方法接受两个参数： <br/>
  [第一个参数可以是一个 RegExp 对象或者一个字符串（这个字符串不会被转换成正则表达式）]，[第二个参数可以是一个字符串或者一个函数]。 <br/>
  如果第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有子字符串，唯一的办法就是提供一个正则表达式，而且要指定全局（ g ）标志，如下所示。 <br/>
      var text = "cat, bat, sat, fat";  <br/>
      var result = text.replace("at", "ond");   <br/>
      alert(result); //"cond, bat, sat, fat"    <br/>
      result = text.replace(/at/g, "ond");      <br/>
      alert(result); //"cond, bond, sond, fond" <br/>
                StringTypePatternMatchingExample01.htm  <br/>
                
## 八. 第10章: 10.1.1 Node类型
 ### 10.1.1-2 节点关系: 我们在本书前面介绍过，[对arguments对象使用 Array.prototype.slice() 方法可以将其转换为数组。] <br/>而采用同样的方法，也可以将 NodeList 对象转换为数组。来看下面的例子：
  //在 IE8 及之前版本中无效 <br/>
  var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0); <br/>
  
  将NodeList对象转换为数组
  
    function convertToArray(nodes){                     
        var array = null;                               
        try {                                           
            array = Array.prototype.slice.call(nodes, 0); //针对非 IE 浏览器    
        } catch (ex) {                                  
            array = new Array();                        
            for (var i=0, len=nodes.length; i < len; i++){  
            array.push(nodes[i]);                       
            }                                           
        }                                               
        return array;                                   
    }

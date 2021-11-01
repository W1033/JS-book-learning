# 第 5 章 -- 引用类型

## 本章目录 (Catalog)
- 5.1 `Object` 类型
- 5.2 `Array` 类型
    * 5.2.1 检测数组
    * 5.2.2 转换方法
    * 5.2.3 栈方法
    * 5.2.4 队列方法
    * 5.2.5 重排序方法
    * 5.2.6 操作方法
    * 5.2.7 位置方法
    * 5.2.8 迭代方法
    * 5.2.9 归并方法
- 5.3 `Date` 类型
    * 5.3.1 继承的方法 
    * 5.3.2 日期格式化方法
    * 5.3.3 日期/时间组件方法
- 5.4 `RegExp` 类型
    * 5.4.1 RegExp 实例属性 
    * 5.4.2 RegExp 实例方法
    * 5.4.3 RegExp 构造函数属性
    * 5.4.4 模式的局限性
- 5.5 `Function` 类型
    * 5.5.1 没有重载 (深入理解)
    * 5.5.2 函数声明与函数表达式
    * 5.5.3 作为值的函数
    * 5.5.4 函数内部属性
    * 5.5.5 函数属性和方法
- 5.6 基本包装类型
    * 5.6.1 `Boolean` 类型
    * 5.6.2 `Number` 类型
    * 5.6.3 `String` 类型
- 5.7 单体内置对象
    * 5.7.1 `Global` 对象
    * 5.7.2 `Math` 对象



## 生词 (New Words)
- **character ['kærəktɚ] --n.字符; 人物; 性格; 性质.**
    + Chinese character. 汉字.
    + moral character. 品德
    + main character. 主要人物; 主要角色
    + His character is set. 他的性格已定型.
- **slice [slaɪs] --n.片, 薄片  --v.切片, 切**
    + Don't know how to describe the role I play on most projects.
      (不知道如何描述我在大多数项目中扮演的角色.)  
      It's some mixture of dev, tech lead, solutions architect,
      UX design, user advocate, and product manager. (它是开发、技术领先、
      解决方案架构师、UX体验设计、用户倡导者和产品经理的混合体.)  
      I build products.(我制造产品.)
      Do we have to slice that into 10 different roles?
      Can I just be a product developer? (我们必须把它分成10个不同的角色吗? 
      我可以成为产品开发人员吗?)
- **split `[splɪt]` --vt.分离; 使分离; 劈开; 离开. --vi.离开; 被劈开; 断绝关系. --n.裂口,裂缝; 分裂,分歧;**
    + split(vt) logs. 劈开圆木.
    + The gale split(vt) the sails. 强风把帆扯破.
    + split(vt) a board in two. 把木板劈成两半.
    + a debate that has split(vt) the country down the middle. 
      使全国分成两大派的一场争论.
    + Let's split(vt)! 咱们快走吧.
    + This wood splits(vi) easily. 这种木材容易裂开.
    + The ship suddenly split(vi) in two. 那艘船突然裂成两半.
    + The party split(vi) on the issue. 该党因那个问题而分裂.
    + There's a big split(n) in the tent. 帐篷上撕了一个大口子.
    + He demanded a 50-50 split(n) in the profits. 他要求利润对半分成.
- **splice [splaɪs] --vt.拼接; 接合. --n.拼接**
    + He spliced(vt) the two lengths of film together. 
      他把两段胶卷粘接起来.
- **accumulator [ə'kjuːmjʊleɪtə] --n.累加器**
- **reduce [rɪ'djuːs] --v.减少，降低，缩小**
- **reducer [rɪ'djuːsə] --n.减速器，还原剂**
- **product ['prɒdʌkt] --n.产品; 产物; 乘积**
    + natural products. 天然产物
    + the products of genius. 天才作品.
    + The product of 21 and 16 is 336


## 本章内容 (Content)
- 引用类型的值(对象) 是 **引用类型** 的一个实例. 在 ECMAScript 中, 引用类型是一种
  数据结构, 用于将数据和功能组织在一起. 它也常被称为**类**, 但这种称呼并不妥当. 尽管
  ECMAScript 从技术上讲是一门面向对象的语言, 但它不具备传统的面型对象语言所支持的 类
  和 接口 等基本结构. 引用类型有时候也被称为**对象定义**, 因为它们描述的是一类对象所
  具有的属性和方法.
- Hint: *虽然引用类型与类看起来相似, 但它们并不是相同的概念. 为避免混淆, 本书将不再*
  *使用类这个概念.*
- 如前所述, **对象是某个特定引用类型的实例**. 新对象是使用 `new` 操作符后跟一个
  **构造函数**来创建的. 
- 构造函数本身就是一个函数, 只不过该函数是出于创建新对象的目的而定义的. (Q:
  构造函数本省就是函数, 但函数实际上是对象, 那就是说构造函数也是对象.
  只是说必须通过 new 来调用罢了.) 请看下面这行代码:
  `var person = new Object();`
  这行代码创建了 Object 引用类型的一个新实例, 然后把该实例保存在了变量 person 中.
  使用的构造函数是 Object, 它只为新对象定义了默认的属性和方法.  ECMAScript
  提供了很多原生引用类型（例如 Object）, 以便开发人员用以实现常见的计算任务.   

### 5.1 `Object` 类型
一般来说, 访问对象属性时使用的都是点表示法, 这也是很多面向对象语言中通用的语法. 不过, 在 JavaScript 中也可以使用方括号表示法来访问对象的属性. 在使用方括号语法时, 应该将要访问的 **属性以字符串的形式放在方括号中**, 如下面的例子所示. 
```javascript
let person = {
    name : "Nicholas",
    age : 29
};
console.log(person["name"]);    // "Nicholas"
console.log(person.name);   // "Nicholas"
```
### 5.2 `Array` 类型
#### 5.2.1 检测数组
对一个网页, 或者一个全局作用域而言, 使用 `instanceof` 操作符即可:
```js
let numbers = [1, 3, 5, 7, 9];
if (numbers instanceof Array) { 
    // ...
}
```
instanceof 操作符的问题在于, 它假定只有一个全局执行环境. 如果网页中包含多个框架,
那实际上就存在两个以上不同的全局执行环境, 从而存在两个以上不同版本的 Array
构造函数. 如果你从一个框架向另一个框架传入一个数组,
那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数.

为了解决这个问题, ECMAScript 5 新增了 `Array.isArray()` 方法.
这个方法的目的是最终确定某个值到底是不是数组, 而不管它是在哪个全局执行环境中创建的.
这个方法的用法如下:
```js
if (Array.isArray(numbers)) {
    // ...
}
```
支持 `Array.isArray()` 方法的浏览器有 IE9+、Firefox 4+、Safari 5+、
Opera 10.5+ 和 Chrome.

由于上面的 `Array.isArray()` 只支持 IE9+, 那么在低版本的浏览器中, 用什么方法呢?
答案是: `Object.prototype.toString.call(value);`, 在任何值上调用 Object
原生的 `toString()` 方法, 都会返回一个 `[object NativeConstructorName]`
格式的字符串. 每个类在内部都有一个 `[[Class]]` 属性,
这个属性中就指定了上述字符串中的构造函数名. 举个例子:
```js
// - 注意: 下面输出值中, object 是小写, Array 第一个字母是大写
// "[object Array]"
console.log(Object.prototype.toString.call(numbers));
```

#### 5.2.2 转换方法
- 所有对象都具有 `toLocaleString()`、`toString()` 和 `valueOf()`方法.
  其中, 调用数组的 `toString()`
  方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串.
  而调用 `valueOf()` 返回的还是数组. 
  ```js
    let colors = ['red', 'blue', 'green'];
    console.log(colors.slice().toString());     // red,blue,green
    console.log(colors.valueOf());              // [ 'red', 'blue', 'green' ]
  ```
- `join()` 只接收一个参数, 即用作分隔符的字符串, 然后返回包含所有数组项的字符串.
  ```javascript
    let colors = ["red", "green", "blue"];
    console.log(colors.join(",")); //red,green,blue
    console.log(colors.join("||")); //red||green||blue
    
    // - 字符串通过"借用"数组的非变更方法来处理字符串: 
    let a = "foo";
    let b = ['f', 'o', 'o'];
    console.log(Array.prototype.join.call(a, '-'));    // "f-o-o"
    let c = Array.prototype.map.call(a, function(item) {
        return item.toUpperCase() + ".";
    }).join("");
    console.log(c)    // "F.O.O"
  ```
- **Tip:** 巧记
    + `join()` 将数组转换为字符串.
    + `split()` 将字符串转换为数组.
#### 5.2.3 栈方法
- ECMAScript 数组也提供了一种让数组的行为类似于其他数据结构的方法. 具体说来,
  数组可以表现得就像栈一样, 后者是一种可以限制插入和删除项的数据结构. 栈是一种
  **LIFO(Last-In-First-Out, 后进先出)** 的数据结构,
  也就是最新添加的项最早被移除. 而栈中项的插入(叫 推入)和移除(叫 弹出),
  只发生在一个位置 -- 栈的顶部(即: 数组的末尾). ECMAScript 为数组专门提供了
  `push()` 和 `pop()` 方法, 以便实现类似栈的行为. 
    + (1) 在数组末尾插入元素 `push()`
    + (2) 删除数组末尾的元素: `pop()`
  
#### 5.2.4 队列方法
- 队列数据结构的访问规则是 **FIFO (First-In-First-Out, 先进先出)**.
  队列在列表的末端添加项 `push()`, 从列表的前端移除项 `shift()`.
  同时将数组长度减 1. 结合使用 shift()和 push()方法, 可以像使用队列一样使用数组.
    + (1) 在数组开头插入元素 `unshift()`:
      它能在数组前端添加任意项并返回新数组的长度.
    + (2) 删除数组的第一个元素: `shift()`
  
  同时用时 `unshift()` 和 `pop()`, 可以从相反的方向来模拟队列,
  即在数组的前端添加项, 从数组末端移除项.

#### 5.2.5 重排序方法
- 数组中存在 2 个可以直接用来重排序的方法: `reverse()` 和 `sort()`. 

  (1) `reverse()` 方法会反转数组项的顺序.
  ```js
    let values = [1, 2, 3, 4, 5];
    console.log(values.reverse());  // [5, 4, 3, 2, 1]
  ```

  (2) `sort()`: 方法在对数组做排序时, 把元素默认成字符串进行相互比较.
  
  在默认情况下, `sort()` 方法按升序排列数组项 -- 即最小的值位于最前面,
  最大的值排在最后面. 为了实现排序, `sort()` 方法会调用每个数组项的 `toString()`
  转型方法, 然后比较得到的字符串, 以确定如何排序。即使数组中的每一项都是数值,
  `sort()` 方法比较的也是字符串, 如下所示.
  ```js
    var values = [0, 1, 5, 10, 15];
    console.log(values.sort()); 
  ```
  不用说, 这种排序方式在很多情况下都不是最佳方案. 因此 `sort()`
  方法可以接受一个比较函数作为参数, 以便指定哪个值位于哪个值的前面.

  比较函数接受 2 个参数, 如果第一个参数应该位于第二个之前则返回一个负数,
  如果两个参数相等, 则返回 0, 如果第一个参数应该位于第二个之后则返回一个整数.
  下面为几个使用示例: 
  ```js
    const numbers = [1, 2, 4, 5, 6, 7, 9, 12];
    function compare(a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        // - a === b
        return 0;
    }
    numbers.sort(compare);
  ```
- 自定义排序
  ```js
    const friends = [
        { name: 'John', age: 30 },
        { name: 'Ana', age: 20 },
        { name: 'Chris', age: 25 }, // ES2017 允许存在尾逗号
    ];
    function comparePerson(a, b) {
        if (a.age < b.age) {
            return -1;
        }
        if (a.age > b.age) {
            return 1;
        }
        return 0;
    }
    console.log(friends.sort(comparePerson));
  ```
- 字符串排序
  ```js
    const names = ['Ana', 'ana', 'john', 'John'];
    //  ["Ana", "ana", "john", "John"]
    console.log(names.sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) {
            return -1;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
            return 1;
        }
        return 0;
    }));
    // - 如果希望小写字母排在前面, 需要使用 localeCompare 方法.
    names.sort((a, b) => a.localeCompare(b));
    // ["ana", "Ana", "john", "John"]
    console.log('names: ', names);
  ```

#### 5.2.6 操作方法
- 主要有 3 个操作方法: (1)`concat()`;  (2)`slice()`; (3)`splice()`
- (1) `concat()` 方法, 主要用于合并数组, 也可以基于当前数组中的所有相创建一个新数组.
  ```js
    let colors = ['red', 'green', 'blue'];
    // - 创建当前 colors 数组的一个副本.
    let copyColors = colors.concat();
    // - 合并数组
    let colors2 = copyColors.concat('yellow', ['black', 'brown']);
    // [ 'red', 'green', 'blue', 'yellow', 'black', 'brown' ]
    console.log(colors2)
  ```
- (2) `slice()`(切片) 方法, 它能够基于当前数组中的一或多个项创建一个新数组.
  `slice()` 方法可以接受一或两个参数, 即要返回项的起始和结束位置.
  在只有一个参数的情况下, `slice()` 返回从该参数指定位置开始到当前数组末尾的所有项. 
  如果有两个参数该方法返回起始和结束位置之间的项——但不包括结束位置的项. 
  注意, `slice()` 方法不会影响原始数组.
  ```js
    var colors = ["red", "green", "blue", "yellow", "purple"];
    var colors2 = colors.slice(1);
    var colors3 = colors.slice(1,4);
    console.log(colors2); // [ 'green', 'blue', 'yellow', 'purple' ]
    console.log(colors3); // [ 'green', 'blue', 'yellow' ]
  ```
  Notice: 如果 `slice()` 方法的参数中有一个负数,
  则用数组长度加上该数来确定相应的位置. 例如: 在一个包含 5 项的数组上调用
  `slice(-2, -1)` 与调用 `slice(3, 4)` 得到的结果相同.
  如果结束位置小于起始位置, 则返回空数组. 
- (3) `splice()`(拼接) 的主要用途是向数组的中部插入项,
  但使用这种方法的方式有如下 3 种. 
    + (1) **删除**: 可以删除任意数量的项, 只需指定 2 个参数:
      *要删除的第一项的位置* 和 *要删除的项数*. 例如: `splice(0,2)`
      会删除数组中的前两项. 
    + (2) **插入**: 可以向指定位置插入任意数量的项, 只需提供 3 个参数:
      *起始位置*、*0(要删除的项数)* 和 *要插入的项*. 如果要插入多个项,
      可以再传入第四、第五, 以至任意多个项. 例如: `splice(2, 0, "red", "green")`
      会从当前数组的位置 2 开始, 删除 0 项, 插入字符串 "red" 和 "green". 
    + (3) **替换**: 可以向指定位置插入任意数量的项, 且同时删除任意数量的项,
      只需指定 3 个参数: 起始位置、要删除的项数 和 要插入的任意数量的项.
      插入的项数不必与删除的项数相等. 例如: `splice(2, 1, "red", "green")`
      会删除当前数组位置 2 的项, 然后再从位置 2 开始插入字符串 "red"和"green". 
  
  `splice()`方法始终都会返回一个数组, 该数组中包含从原始数组中删除的项
  (如果没有删除任何项, 则返回一个空数组). 下面的代码展示了上述 3 种使用
  `splice()` 方法的方式.    
  ```javascript
    let colors = ["red", "green", "blue"];
    let removed = colors.splice(0,1);
    console.log('colors:', colors);    // colors: [ 'green', 'blue' ]
    console.log('removed:', removed);  // removed: [ 'red' ]

    // 从位置 1 开始插入两项
    removed = colors.splice(1, 0, "yellow", "orange");
    console.log(colors)     // [ 'green', 'yellow', 'orange', 'blue' ]
    console.log(removed)    // []

    // 插入两项, 删除一项
    removed = colors.splice(1, 1, "red", "purple");
    console.log(colors);    // [ 'green', 'red', 'purple', 'orange', 'blue' ]
    console.log(removed);   // [ 'yellow' ]
  ```
#### 5.2.7 位置方法
- ES5 为数组实例添加了两个位置方法：`indexOf()` 和 `lastIndexOf()`. 
  这两个方法都接受 2 个参数: (1)是要查找的项 和 (2)(可选的)表示查找起点位置的索引.
  其中, `indexOf()` 方法从数组的开头(位置`0`)开始向后查找, `lastIndexOf()`
  方法则从数组的末尾开始向前查找.
  
  这两个方法都`返回要查找的项在数组中的位置`, 或者在没有的情况下返回 -1.
  ```js
    let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    console.log(numbers.indexOf(4));        // 3
    // - 从后向前查找即为倒数第一个 4, 但我们数索引为从前向后数, 所以索引为 5 
    console.log(numbers.lastIndexOf(4));    // 5

    console.log(numbers.indexOf(4, 4));     // 5
    console.log(numbers.lastIndexOf(4, 4))  // 3

    let person = {name: 'Nicholas'};
    let people = [{name: 'Nicholas'}];
    let morePeople = [person];
    console.log(typeof person);
    console.log(typeof people[0]);
    // - 为什么在 people 内查找 person 返回 -1, 因为 person 和 people
    //   为引用类型类型的值, 它们在堆内存中指向不同的内存地址.
    console.log(people.indexOf(person));        // -1
    console.log(morePeople.indexOf(person));    // 0
  ```
- Tip: 下面为字符串类型的 `indexOf` 方法示例.
  ```js
    const aa = "Hello World!";
    if (aa.indexOf('lo') !== -1) {
        // 找到匹配
    }
    if (aa.indexOf('lo') === -1) {
        // 没找到匹配
    }
  ```
#### 5.2.8 迭代方法
-  ECMAScript 5 为数组定义了 5 个迭代方法. 每个方法都接受 2 个参数: 
    1. 要在每一项上运行的函数;
        - 第一个参数运行的函数接受 3 个参数: 
            + (1) 数组项的值 (item). 
            + (2) 该项在数组种的位置 (index) 
            + (3) 和 数组对象本身. (array)
        - Tip: 根据使用的方法不同, 这个函数执行后的返回值可能会也可能不会影响方法的
          返回值.    
    2. 和（可选的）运行该函数的作用域对象——影响 this 的值. 
- 以下是 5 个迭代方法的作用. : (Note: 下面 5 个方法发都不会修改数组中包含的值)
    + `every()`: 对数组中的每一项运行给定函数, 如果该函数对每一项都返回 true, 则返回 true. 
    + `filter()`: 对数组中的每一项运行给定函数, 返回该函数会返回 true 的项组成的数组.
    + `forEach()`: 对数组中的每一项运行给定函数. 这个方法没有返回值.
    + `map()`: 对数组中的每一项运行给定函数, 返回每次函数调用的结果组成的数组.
    + `some()`:  对数组中的每一项运行给定函数, 如果该函数对任一项返回 true, 则返回 true. 
    ```javascript
        let numbers = [1,2,3,4,5,4,3,2,1];
        let mapResult = numbers.map(function(item, index, array) {
            return item * 2;
        });
        console.log(mapResult); // [2,4,6,8,10,8,6,4,2]
    ```
#### 5.2.9 归并方法
- ES5 还新增了 2 个归并数组的方法: `reduce()` 和 `reduceRight()`.
  这两个方法都会迭代数组的所有项, 然后构建一个最终返回的值. 其中, `reduce()`
  方法从数组的第一项开始, 逐个遍历到最后. 而 `reduceRight()`
  则从数组的最后一项开始, 向前遍历到第一项.
- accumulator(n.累加器); reduce(减少); reducer(n.减速器)

  这两个方法都接受 2 个参数:
    + (1) 一个在每一项上调用的函数 (reducer). reducer 函数接收 4 个参数:
        - (1) Accumulator (acc)(累加器): 上次回调函数返回值/初始值.
        - (2) Current Value (cur): 数组当前值.
        - (3) Current Index (idx): 当前索引. 数组当前项索引.
        - (4) Source Array (src): 源数组, 调用 `reduce` 方法的数组.
        
      `reduce` 函数的返回值分配给累加器, 该返回值在数组的每一次迭代中被记住,
      并最后成为最终的单个结果值.
    + (2) 和 (可选的)作为归并基础的初始值 (initialValue).
      作为第一次调用回调函数时传给 Accumulator 的值
  
  下面是几个示例:
  ```js
    const arr = [11, 22, 33, 44];
    let total = arr.reduce((accumulator, current) => {
        return accumulator + current;
    })
    console.log('total:', total);   // total: 110

    // - (2) 带初始值
    const arr4 = [11, 22, 33, 44];
    let total2 = arr3.reduce(function(acc, cur) {
            //debugger;
            // 第一次输出 acc 为 55
            console.log(acc);
            return acc + cur;
        }
    , 55);
    console.log("total2: ", total2);

    // - (3) 求乘积
    const arr5 = [11, 22, 33, 44];
    // product n.产品, 乘积
    let pro = arr5.reduce((acc, cur) => acc * cur);
    console.log("pro: ", pro);

    // - (4) 求最大值
    const arr6 = [11, 22, 33, 44];
    let max = arr6.reduce((acc, cur) => {
        return acc > cur ? acc : cur;
    });
    console.log("max: ", max);

    // - reduce 方法在数组对象中的运用
    const arrObj = [
        {name: 'brick11'},
        {name: 'brick12'},
        {name: 'brick13'}
    ];
    // brick /brɪk/ n.砖，砖头
    function carryBricks(arr){
        return arr.reduce(function(prev, current, index, array){
            if (index === 0){
                return current.name;
            }
            else if (index === array.length - 1){
                return prev + ' & ' + current.name;
            }
            else {
                return prev + ', ' + current.name;
            }
        }, '');
    }
    // brick11, brick12 & brick13
    console.log(carryBricks(arrObj));
  ```

### 5.3 `Date` 类型
#### 5.3.1 继承的方法 
#### 5.3.2 日期格式化方法
#### 5.3.3 日期/时间组件方法

### 5.4 `RegExp` 类型 [正则表达式 (Regular Expression)]
- 此章节详细笔记见: 
  `DataStructure-Algorithm-Learning/正则表达式/README.MD`
- 更多 `RegExp` 的讲解见:
  `DataStructure-Algorithm-Learning/正则表达式/正则表达式-特殊字符.md`
#### 5.4.1 RegExp 实例属性 
- `RegExp` 的每个`实例`都具有下列属性, 通过这些属性可以取得有关模式的各种信息.
    1. **`global`**: `布尔值`, 表示是否设置了 g 标志.
    1. **`ignoreCase`**: `布尔值`, 表示是否设置了 i 标志.
    1. **`lastIndex`**: `整数`, 表示开始搜索下一个匹配项的字符位置, 从 0 算起.
    1. **`multiline`**: `布尔值`, 表示是否设置了 m 标志.
    1. **`source`**: 正则表达式的字符串表示, 
       按照字面量形式而非传入构造函数中的字符串模式返回.

  通过这些属性可以获知一个正则表达式的各方面信息, 但却没有多大用处, 
  因为这些信息全都包含在模式声明中. 例如:
  ```js
    var pattern1 = /\[bc\]at/i;
    console.log(pattern1.global);       // false
    console.log(pattern1.ignoreCase);   // true
    console.log(pattern1.multiline);    // false
    console.log(pattern1.lastIndex);    // 0
    console.log(pattern1.source);       // "\[bc\]at"

    var pattern2 = new RegExp("\\[bc\\]at", "i");

    console.log(pattern2.global);       // false
    console.log(pattern2.ignoreCase);   // true
    console.log(pattern2.multiline);    // false
    console.log(pattern2.lastIndex);    // 0
    console.log(pattern2.source);       // "\[bc\]at
  ```
  我们注意到, 尽管第一个模式使用的是字面量, 第二个模式使用了 RegExp 构造函数, 
  但它们的 `source` 属性是相同的. 可见, `source` 属性保存的是规范形式的字符串,
  即`字面量`形式所用的字符串.
#### 5.4.2 RegExp 实例方法
#### 5.4.3 RegExp 构造函数属性
#### 5.4.4 模式的局限性


### 5.5 `Function` 类型
- - 在 ECMAScript 中函数实际上是对象. 每个函数都是 Function 类型的实例, 而且都与其他
  引用类型一样具有属性和方法. 由于函数是对象, 因此函数名实际上也是一个指向函数对象的指针, 
  不会与某个函数绑定. 
    + (1)、函数通常使用 **"函数声明"** 语法定义, 如下
      ```javascript
          function sum(num1, num2) {
              return num1 + num2;
          }
      ```
    + (2)、这与下面使用 **"函数表达式"** 定义函数的方式几乎相差无几. 
      ```javascript
          let sum = function(num1, num2) {
              return num1 + num2;
          };
      ```
    + (3)、最后一种定义函数的方式是 **"使用 Function 构造函数"**.  Function 构造函数
      可以接收任意数量的参数, 但最后一个参数始终都被看成是函数体, 而前面的参数则枚举除了
      新函数的参数. 来看下面的例子：
      ```javascript
          // 不推荐, 因为这种语法会导致解析两次代码(第一次是解析常规 ECMAScript 代码, 
          // 第二次是解析传入构造函数中的字符串)从而影响性能. 不过这种语法对于理解 
          // "函数是对象, 函数名是指针" 的概念到时非常直观的. 
          let sum = new Function("num1", "num2", "return num1 + num2"); 
      ```
    + **Tip:通过 函数声明/函数表达式 定义的普通函数应看作是 Function 构造函数的直接实例**
- 立即 调用/(执行) 函数表达式 (Immediately-Invoked Function Expression. IIFE) 
 ```javascript
   // - 这段代码会导致语法错误, 因为 js 将 function 关键字当作一个函数声明的开始, 而函数声明
   //   后面不能跟圆括号. 
   // function(){
      // - 这里是块级作用域
   // }();

   // - 然而, 函数表达式的后面可以跟圆括号. 要将函数声明转换成函数表达式, 只要像下面这样给它加上
   //   一对圆括号即可. 
   (function(){
        // - 这里是块级作用域
   })();

   // - 立即执行的匿名函数声明方式还有
   (function(){
   }());
 ```
#### 5.5.1 没有重载 (深入理解)
#### 5.5.2 函数声明与函数表达式
#### 5.5.3 作为值的函数
#### 5.5.4 函数内部属性
#### 5.5.5 函数属性和方法
- 在 ECMAScript 核心所定义的全部属性中, 最耐人寻味的就要数 `prototype` 属性了. 对于
  ECMAScript 中的引用类型而言,  prototype 是保存它们所有实例方法的真正所在. 换句话说, 
  诸如 `toString()` 和 `valueOf()` 等方法实际上都保存在 prototype 名下, 只不过是通过
  各自对象的实例访问罢了. 在创建自定义引用类型以及实现继承时,  prototype 属性的作用是极为
  重要的（第 6 章将详细介绍）. 在 ECMAScript 5 中,  prototype 属性是不可枚举的, 因此
  使用 `for-in` 无法发现. 
- 每个函数都包含两个非继承而来的方法: `apply()`和 `call()`. 这两个方法的用途是在特定的
  作用域中调用函数, 实际上等于设置函数体内 `this` 对象的值. 
    + apply() 接受2个参数, 
        - 第 1 个参数制定了函数体内 this 对象的指向. 
        - 第 2 个参数为一个带下标的集合, 这个集合可以是数组, 也可以为类数组, 
          apply 方法把这个集合中的元素作为参数传递给被调用的函数. 


### 5.6 基本包装类型
#### 5.6.1 `Boolean` 类型


#### 5.6.2 `Number` 类型
Number 是与数字值对应的引用类型. 要创建 Number 对象, 可以在调用 Number
构造函数时向其中传递相应的数值. 下面是一个例子. 
```js
var numberObject = new Number(10);
```
与 Boolean 类型一样, Number 类型也重写了 `valueOf()`、 `toLocaleString()`
和 `toString()`方法. 重写后的 `valueOf()` 方法返回对象表示的基本类型的数值, 
**另外两个方法则返回字符串形式的数值**. 我们在第 3 章还介绍过, 可以为 `toString()`
方法传递一个表示基数的参数, 告诉它返回几进制数值的字符串形式, 如下面的例子所示:
```js
var num = 10;
alert(num.toString()); //"10"
alert(num.toString(2)); //"1010"
alert(num.toString(8)); //"12"
alert(num.toString(10)); //"10"
alert(num.toString(16)); //"a"
```
除了继承的方法之外, Number 类型还提供了一些用于将数值格式化为字符串的方法. 其中, 
`toFixed()` 方法会按照指定的小数位**返回数值的字符串表示**, 例如:
```js
var num = 10;
alert(num.toFixed(2)); //"10.00"
```
#### 5.6.3 `String` 类型
`String` 类型是字符串的对象包装类型, 可以像下面这样使用 `String` 构造函数来创建.
```js
var stringObject = new String('Hello world');
```
`String` 对象的方法也可以在所有基本的字符串值中访问到. 其中, 继承的 `valueOf()`,
`toLocaleString()` 和 `toString()` 方法, 都返回对象所表示的基本字符串值.

`String` 类型的每个实例都有一个 `length` 属性, 表示字符串中包含多个字符.
来看下面的例子.
```js
var stringValue = "hello world";
console.log(stringValue.length);// "11"
```
这个例子输出了字符串 "hello world" 中的字符数量, 即 "11". 应该注意的是,
即使字符串中包含双字节字符 (不是占一个字节的 `ASCII` 字符), 每个字符也仍然算一个字符.

`String` 类型提供了很多方法, 用于辅助完成对 ECMAScript 中字符串的解析和操作. 
##### (1). 字符方法
2 个用于访问字符串中特定字符的方法: 这两个方法都接收一个参数, 即`基于 0 的字符位置`.

+ (1) `charAt(num)`: 以单字符字符串的形式返回给定位置的那个字符.
  (ES 中没有字符类型) 例如: 
  ```js
    var stringValue = 'Hello world';
    console.log(stringValue.charAt(1)); // "e"
  ```

+ (2) `charCodeAt(num)`: 返回给定位置的字符编码.
  ```js
    var stringValue = 'Hello world';
    console.log(stringValue.charCodeAt(1)); // "101"
  ```
##### (2). 字符串操作方法
+ (a.) `concat()`: 用于拼接一或多个字符串, 返回拼接后的新字符串.
  ```js
    var stringValue = "hello ";
    var result = stringValue.concat("world");
    console.log(result);        // "hello world"
    console.log(stringValue);   // "hello"
  ```
+ (b.) ES 还提供了 3 个基于子字符串创建新字符串的方法: 这 3 个方法都会返回被操作字符串的一个子字符串, 而且都接受 1 或 2 个参数. 第 1 个参数 `指定子字符串的开始位置`, 第 2 个参数 `指定的是子字符串最后一个字符后面的位置.`
    - `slice()`
    - `substr()`
    - `subString()`
##### (3). 字符串位置方法
有 2 个可以从字符串中查找子字符串的方法: 这 2 个方法都是从一个字符串中
`搜索给定的子字符串`, 然后返回子字符串的位置(如果没有找到该子字符串, 则返回 `-1`).
这 2 个方法也可以接受第二个参数, 表示`从字符串中的那个位置开始搜索`.
- `indexOf()`
- `lastIndexOf()`

##### (4). `trim()` 方法

##### (5). 字符串大小写转换方法
+ `toLowerCase()`, `toLocalLowerCase()`
+ `toUpperCase()`, `toLocalUpperCase()`

##### (6). 字符串的模式匹配方法
+ (1) `match()`: 只接受一个参数(正则表达式 / RegExp对象)
+ (2) `search()`: 参数与 match 方法相同.  search()
  方法返回字符串中第一个匹配项的索引; 如果没有返回 -1.
+ (3) `replace()`: 接受2个参数:
    - 第一个为 "正则表示 / RegExp对象", 
    - 第二个参数为 "一个字符串 / 一个函数". 
  
  更多 `replace()` 的使用示例见:
  `DataStructure-Algorithm-Learning/正则表达式/replace方法和正则表达式.md`
+ (4) `split()`: 基于指定的分隔符将一个字符串分割为多个子字符串,
  并将结果放在一个数组中. (Tip: 简短说法: `split()` 方法: 把字符串转换为数组.)
  ```js
    // (1.) match()
    let word = "cot, bot, sot, fot";
    let pattern = /.ot/;
    let matches = word.match(pattern);
    console.log(matches.index);   // 0
    console.log(matches[0]);      // cot
    console.log(pattern.lastIndex);   // 0

    // (2.) search()
    let font = "cat, bat, dat, eat";
    let pos = font.search(/at/);
    console.log(pos);     // 1
    
    // (3.) replace()
    let text = "cat, bat, sat, fat";
    let result = text.replace(/at/g, "ond");
    console.log(result);  // replace 返回的是字符串:  cond, bond, sond, fond
    
    // (4.) split()
    const colorText = "red, blue, green, yellow";
    let colorArr = colorText.split(",");
    console.log(colorArr);  // [ 'red', ' blue', ' green', ' yellow' ]
  ```
##### (7). `localCompare()` 方法
##### (8). `fromCharCode()` 方法
`fromCharCode()`: 接收一或多个字符编码, 然后将它们转换成一个字符串. 
从本质上来看, 这个方法与实例方法 `charCodeAt()` 执行的是相反的操作. 
```js
console.log(String.fromCharCode(104, 101, 108, 108, 111));  // "hello"
```

### 5.7 单体内置对象
#### 5.7.1 `Global` 对象
#### 5.7.2 `Math` 对象

### 小结


# 第 10 章 -- 改进后的数组



## Catalog
1. 创建数组
    + 1.1 Array.of() 方法
    + 1.2 Array.from() 方法
2. 为所有的数组添加的方法
    + 2.1 find() 方法和 findIndex() 方法
    + 2.2 fill() 方法
    + 2.3 copyWithin() 方法
3. 类型化数组(定型数组)
    + 3.1 数值数据类型
    + 3.2 数组缓冲区
    + 3.3 使用视图操作数组缓冲区
        - 3.3.1 获取视图信息
        - 3.3.2 读取与写入数据
        - 3.3.3 类型化数组即为视图
        - 3.3.4 创建特定类型视图
4. 类型化数组与常规数组的相似点
    + 4.1 公共
    + 4.2 相同的迭代器
    + 4.3 of() 方法和 from() 方法
5. 类型化数组与常规数组的区别
    + 5.1 行为差异
    + 5.2 缺失(遗漏)的方法
    + 5.3 附加方法
6. 小结






## New Words







## Content
### 1. 创建数组
- 在 ES6 之前创建数组主要存在两种方式: 
    + (1) Array 构造器
    + (2) 数组字面量.
  
  这两种方式都需要将数组的项分别列出, 并且还要受到其他限制. 将
  **"类数组对象"(即: 拥有数值类型索引与长度属性的对象)**转换为数组也并不自由,
  为了使数组更易创建, ES6 新增了 `Array.of()` 与 `Array.from()` 方法.

  **Additional Info:** "类数组对象" 即: 拥有 "数值类型索引" 和 `length`
  属性的对象.  例如:
  ```js
    // - (1) 最常见的类数组就是函数接受的参数
    function sum() {
        let args = Array.prototype.slice.call(arguments);
        console.log(args);  // [1, 3, 6, 9]
    }
    sum(1, 3, 6, 9);

    // - (2) 另外一种常见的类数组是添加了 length 属性的对象字面量
    var aryLike = {
        0: 'name',
        1: 'age',
        2: 'sex',
        length: 3
    }
    var ary = ['name', 'age', 'sex'];
    console.log(ary[0]);            // name
    console.log(aryLike[0]);        // name
    array[0] = 'new name';
    aryLike[0] = 'new name'; 
     
    console.log(ary.length);        // 3
    console.log(aryLike.length);    // 3

    for(var i = 0, len = ary.length; i < len; i++) {
        // ....
    }
    for (var j = 0, len = aryLike.length; j < len; j++) {
        // ...
    }

    // - 注意: 类数组不可使用数组的方法
    aryLike.push('4');      // error: aryLike.push is not a function

    // - 根据现在的类数组对象, 生成调整后的数组
    let newAry = Array.prototype.map.call(aryLike, (item) {
        return item.toUpperCase();
    });
    console.log(newAry)     // ["NAME", "AGE", "SEX"]

    // - 把类数组转换为数组
    // - (1) slice
    Array.prototype.slice.call(aryLike, 0);
    // - (2) splice
    Array.prototype.splice.call(aryLike, 0);
    // - (3) ES6 Array.from
    Array.from(aryLike);
    // - (4) apply
    Array.prototype.concat.apply([], aryLike); 

    // - 这段代码笔记来自: https://github.com/mqyqingfeng/Blog/issues/14
  ```

#### 1.1 Array.of() 方法
- `Array.of()` 方法总会**创建一个包含所有传入参数的数组**, 而不管参数的数量与类型.
  下面是几个例子:
  ```js
    let items = Array.of(1, 2);
    console.log(items.length);      // 2
    console.log(items[0]);          // 1
    console.log(items[1]);          // 2

    items = Array.of(2);
    console.log(items.length);      // 1
    console.log(items[0]);          // 2

    items = Array.of("2");
    console.log(items.length);      // 1
    console.log(items[0]);      // "2"
  ```
- 如果需要给一个函数传入 Array 的构造函数, 则你可能希望传入 `Array.of()`
  来确保行为一致. 例如:
  ```js
    function createArray(arrayCreator, value) {
        return arrayCreator(value);
    }
    let items2 = createArray(Array.of, value);
  ```
  此代码中的 createArray() 函数接受两个参数: 一个数组创建器 与 一个值,
  并会将后者插入到目标数组中. 
- `Array.of()` 方法不通过 `Symbol.species` 属性(见第9章)确定返回值得类型,
  他使用当前构造函数(也就是 `of()` 方法中的 `this` 值) 来确定正确的返回数据类型.

#### 1.2 Array.from() 方法
- `Array.from()` 方法: 把类数组转换为数组.
  比如函数的参数使用 `Array.from` 转换为数组:
  ```js
    let args = Array.from(args);

    // - 之前在 ES5 中把函数的参数变为数组, 都是这样使用
    function sum() {
        let args = Array.prototype.slice.call(arguments);
    }
  ```
  `Array.from()` 接受可迭代对象或类数组对象作为第一个参数, 最终返回一个数组. 

##### 1.2.1 映射转换
- 如果想要进一步转化数组, 可以提供一个映射函数作为 `Array.from()`
  的第二个参数, 这个函数用来将类数组对象中的每一个值转换成其他形式,
  最后将这些结果存储在结果数组的相应索引中. 例下:
  ```js
    function translate() {
        return Array.from(arguments, (value) => value + 1);
    }

    let numbers = translate(1, 2, 3);
    console.log(numbers);   // [2, 3, 4]
  ```
  此代码将 `(value) => value + 1` 作为映射函数传递给了 `Array.from()` 方法,
  对每个项进行了一次 +1 处理. 如果映射函数需要在对象上工作,
  你可以传递第三个参数给 `Array.from()` 方法, 从而指定映射函数内部的 `this` 值:
  ```js
    let helper = {
        diff: 1,
        add(value) {
            return value + this.diff;
        }
    };
    function translate() {
        return Array.from(arguments, helper.add, helper);
    }
    let numbers = translate(1, 2, 3);
    console.log(numbers);       // [2, 3, 4]
  ```
  这个例子使用了 `helper.add()` 作为映射函数. 由于该函数使用了 `this.diff` 属性,
  你必须向 `Array.from()` 方法传递第三个参数用于指定 `this`. 借助这个参数,
  `Array.from()` 就可以方便地进行数据转换, 而无须调用 `bind()` 方法、
  或用其他方式去指定 `this` 值.
##### 1.2.2 在可迭代对象上使用
- `Array.from()` 方法不仅可用于类数组对象, 也可用于可迭代对象,
  这意味着该方法可以将任意包含 `Symbol.iterator` 属性的对象转换为数组. 例如:
  ```js
    let numbers = [
        *[Symbol.iterator]() {
            yield 1;
            yield 2;
            yield 3;
        }
    ];
    let numbers2 = Array.from(numbers, (value) => value + 1);
    console.log(numbers2);      // [2, 3, 4]
  ```
- Hint: 如果一个对象即是类数组对象, 又是可迭代对象, 那么迭代器就会使用
  `Array.from()` 方法来决定需要转换的值.


### 2. 为所有的数组添加的方法
- ES6 延续了 ES5 的工作, 为数组增加了几个新方法. `find()` 与 `findIndex()`
  方法是为了让开发者能够处理包含任意值的数组, 而 `fill()` 与 `copyWithin()`
  方法则是受到了 **类型化数组(typed arrays)** 的启发. 类型化数组是在 ES6
  中引入的, **只允许包含数值类型的值**.
#### 2.1 find() 方法和 findIndex() 方法
- ES5 添加了 `indexOf()` 和 `lastIndexOf()` 两个方法, 用于在数组中查找特定的值,
  但每次只能查找一个值. 如果想在一系列数字中查找一个偶数, 则必须自己编写代码. 
  
  于是 ES6 引入了 `find()` 和 `findIndex()` 方法来解决这个问题. 
    + `find()` 方法返回查找到的值. 
    + `findIndex()` 方法返回查找到的值的索引. 
  
  这 2 个方法都接受 2 个参数: "一个回调函数", 一个可选值用于指定回调函数内部的
  `this`. 该回调函数可接受 3 个参数:
    + (1) 数组中的某个元素; 
    + (2) 该元素对应的索引位置; 
    + (3) 以及该数组本身.
  
  与传入 `map()` 和 `forEach()` 方法的参数相同.
  该回调函数应当在给定的元素满足你定义的条件时返回 true, 而 `find()` 与
  `findIndex()` 方法均会在会在回调函数第一次返回 true 是停止查找.

  二者唯一的区别是: `find()` 方法会返回匹配的值, 而 `findIndex()`
  方法则会返回匹配位置的索引. 这里有个示例:
  ```js
    let nums = [25, 30, 35, 40, 45];
    console.log(nums.find((n) => n > 33));          // 35
    console.log(nums.findIndex((n) => n > 33));     // 2
  ```
  `find()` 与 `findIndex()` 方法在查找**满足特定条件的数组元素**时非常有用.
  但若想**查找特定值**, 则使用 `indexOf()` 与 `lastIndexOf()` 方法会是更好的选择.

#### 2.2 fill() 方法
- `fill()` 方法: 用指定的值填充一至多个数组元素. 当传入一个值时, `fill()`
  方法会用这个值重写数组中的所有值. 
  ```js
    let numbers = [1, 2, 3, 4];
    numbers.fill(1);
    console.log(numbers.toString()); // 1,1,1,1
  ```
- 如果只想改变数组某一部分的值, 可以传入:
    + (1) 要填充的值
    + (2) 开始索引
    + (3) 结束索引(不包含结束索引当前值)
  ```js
    let nums = [1, 2, 3, 4, 5];
    // - 从索引 2 开始填充 1 到数组末尾
    nums.file(1, 2);
    console.log(nums.toString());       // 1, 2, 1, 1
    
    nums.fill(0, 1, 3);
    console.log(nums.toString());       // 1, 0, 0, 1
  ```
  **Hint:** 如果提供的起始位置或结束位置为负数,
  则它们会被加上数组的长度来算出最终的位置. 例如: 将起始位置指定为 -1 ,
  就等于是 array.length - 1 , 这里的 array 指的是 `fill()` 方法所要处理的数组.

#### 2.3 copyWithin() 方法
- `copyWithin()` 方法与 `fill()` 类似, 可以一次性修改数组的多个元素. 不过,
  与 `fill()` 使用单个值来填充数组不同, `copyWithin()`
  方法允许你在数组内部复制自身元素. 为此你需要传递两个参数给 `copyWithin()` 方法:
    + (1) 从什么位置开始进行填充,
    + (2) 以及被用来复制的数据的起始位置索引.
  
  例如, 将数组的前两个元素复制到数组的最后两个位置, 你可以这么做：
  ```js
    let numbers = [1, 2, 3, 4];
    // 从索引 2 的位置开始粘贴
    // 从数组索引 0 的位置开始复制数据
    numbers.copyWithin(2, 0);
    console.log(numbers.toString()); // 1,2,1,2
  ```
  这段代码从 numbers 数组索引值为 2 的元素开始进行填充, 因此索引值为 2 与 3
  的元素都会被覆盖; 调用 `copyWithin()` 方法时将第二个参数指定为 0,
  表示被复制的数据从索引值为 0 的元素开始, 一直到没有元素可供复制为止.

  默认情况下, `copyWithin()` 方法总是会一直复制到数组末尾,
  不过你还可以提供一个可选参数来限制到底有多少元素会被覆盖.
  这第三个参数指定了复制停止的位置(不包含该位置自身), 这里有个范例:
  ```js
    let numbers = [1, 2, 3, 4];
    // 从索引 2 的位置开始粘贴
    // 从数组索引 0 的位置开始复制数据
    // 在遇到索引 1 时停止复制
    numbers.copyWithin(2, 0, 1);
    console.log(numbers.toString()); // 1,2,1,4
  ```
  在这个例子中, 因为可选的结束位置参数被指定为 1 , 于是只有索引值为 0
  的元素被复制了, 而该数组的最后一个元素并没有被修改.
  **Hint:** 类似于 `fill()` 方法, 如果你向 `copyWithin()` 方法传递负数参数,
  数组的长度会自动被加到该参数的值上, 以便算出正确的索引位置.
- `fill()` 与 `copyWithin()` 方法初看起来不是那么有用,
  因为它们起源于类型化数组的需求, 而出于功能一致性的目的才被添加到常规数组上.
  不过, 接下来的小节你就会学到如何用类型化数组来按位操作数值,
  此时这两个方法就会变得非常有用了.

### 3. 类型化数组(定型数组)
#### 3.1 数值数据类型
#### 3.2 数组缓冲区
#### 3.3 使用视图操作数组缓冲区
##### 3.3.1 获取视图信息
##### 3.3.2 读取与写入数据
##### 3.3.3 类型化数组即为视图
##### 3.3.4 创建特定类型视图


### 4. 类型化数组与常规数组的相似点
#### 4.1 公共
#### 4.2 相同的迭代器
#### 4.3 of() 方法和 from() 方法


### 5. 类型化数组与常规数组的区别
#### 5.1 行为差异
#### 5.2 缺失(遗漏)的方法
#### 5.3 附加方法


### 6. 小结


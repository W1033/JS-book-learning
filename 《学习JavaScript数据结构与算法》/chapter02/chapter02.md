##. 第 2 章: 数组

- 数组是最简单的内存数据机构.

#### 2.1 为什么用数组 
#### 2.2 创建和初始化数组
- ```javascript
    var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", 
        "Saturday", "Sunday"]

    // - 求斐波那契数列的前 20 个数字. 已知斐波那契数列中第一个数字是 1, 第二个是 2,
    //   从第三项开始, 每一项都等于前两项之和.
    let fibonacci = [];
    // - 数组的索引是从 0 开始的, 这里略过了第一项.
    fibonacci[1] = 1;
    fibonacci[2] = 2;
    for (let i = 3; i < 20; i++) {
        fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
    }
    console.log("fibonacci: ", fibonacci);
    for (var i = 1; i < fibonacci.length; i++) {
        console.log(fibonacci[i]);
    }    
  ```
#### 2.3 添加元素
- 2.3.1 使用 push 方法
    + `push` 方法, 把元素添加到数组的末尾.
- 2.3.2 插入元素到数组首位
#### 2.4 删除元素
#### 2.5 在任意位置添加或删除元素
#### 2.6 二维或多维数组
- 2.6.1 迭代二维数组的元素
- 2.6.2 多维数组
#### 2.7 JavaScript 的数组方法参考
- 2.7.1 数组合并
- 2.7.2 迭代器函数
    + 更详细的讲解见 《js 高程》 5.2.8 章
    + 笔记见: 当前仓库(JS-book-learning) 下的 `README.md`
- 2.7.3 ECMAScript 6 和数组的新功能
- 2.7.4 排序元素
- 2.7.5 搜索
- 2.7.6 输出数组为字符串
#### 2.8 类型数组 (使用类数组处理二进制数据)
- 与 C 和 Java 等其他语言不同, JavaScript数组不是强类型的, 因此它可以存储任意类型的数据.
- 而类型数组用于存储单一类型的数据. 它的语法是 `let myArray = new TypedArray(length);`,
  其中 TypedArray 需替换为下表所列之一.
- | 类型数组 | 数据类型 |  
  |:---:|:---:|
  |`Int8Array`| 8 位二进制补码整数|
  |`Uint8Array` (unsigned int 无符号类型)| 8 位无符号整数|
  |`Uint8ClampedArray`|8 位无符号整数|
  |`Int16Array`| 16 位二进制补码整数|
  |`Uint16Array`| 16 位无符号整数|
  |`Int32Array`| 32 位二进制补码整数|
  |`Uint32Array`| 32 位无符号整数|
  |`Float32Array`| 32 位 IEEE 浮点数|
  |`Float64Array`| 64 位 IEEE 浮点数|
- 使用 WebGL API, 进行位操作, 处理文件和图像时, 类数组都可以大展拳脚.
  它用起来和普通数组毫无二致, 文章所学的数组方法和功能都可以用于类型数组.
- ```javascript
    let length = 5;
    let int16 = new Int16Array(length);
    let array16 = [];
    array16.length = length;
    for (let i = 0; i < length; i++) {
        int16[i] = i + 1;
    }
    // int16: {Int16Array(5)} [ 1, 2, 3, 4, 5 ]
    console.log("int16: ", int16);
  ```
#### 2.9 小结
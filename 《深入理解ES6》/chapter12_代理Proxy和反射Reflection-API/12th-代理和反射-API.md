## Chapter 12 -- 代理(Proxy) 和 反射(Reflection) API

## 目录 (Catalog)
1. 数组问题
2. 代理和反射
3. 创建一个简单的代理
4. 使用 `set` 陷阱函数验证属性 
5. 使用 `get` 陷阱函数验证对象结构 (Object Shape)
6. 使用 `has` 陷阱函数隐藏已有属性
7. 使用 `deleteProperty` 陷阱函数防止刪除屬性
8. 原型代理的陷阱函数
9. 对象可扩展性陷阱
10. 属性描述符陷阱
11. ownKeys(自身键) 陷阱函数
12. 函數代理中的 apply 和 construct 陷阱
13. 可被撤销的代理
14. 解决数组的问题
15. 将代理对象用作原型



## 生词 (New Words)
- **exotic [ɪg'zɒtɪk] --ajd.奇异的, 外来的**
- **proxy ['prɒksɪ] --n.代理, 代理人。 --adj.代理的**
- **reflection [rɪ'flekʃ(ə)n] --n.反射, 影子**
- **reflect [rɪ'flekt]  --v.反映, 体现, 思考**
- **extensible [ek'stensɪbl] --adj.扩展, 扩张**
- **extension [ɪk'stenʃ(ə)n] --n.扩展, 延伸**
- **enumerate [ɪ'njuːməreɪt] --vt.列举, 枚举**
- **trap [træp] --vt.陷阱, 圈套**
- **revocable [rɪ'vokəbl] --adj.可撤销的; 可废止的.**
- **revoke [rɪ'vok] --vt.撤销, 取消, 废除**
    + He had his driving license revoked. 他被吊销了驾驶执照.
- **numeric [njuː'merɪk] --n.数字 --adj.数字的**
    + numeric character 数字字符
    + numeric type 数字类型
    + numeric key. 数字键  


## Added:
- `./00-added-Proxy实现数据监听.js`


## 内容 (Content)
- ES6 添加了一些**内建对象**, 赋予开发者更多访问 JS 引擎的能力. 代理 (Proxy)
  是一种可以拦截并改变底层 JavaScript 引擎操作的包装器, 在新语言中通过它暴露内部运作的对象,
  从而让开发者可以创建内建的对象.

### 1.数组问题
- 在 ES6 出现以前, 开发者不能通过自己定义的对象模仿 JS 数组对象的行为方式.
  当给数组的特定元素赋值时, 影响到该数组的 length 属性, 也可以通过 length
  属性修改数组元素. 
  例如: 
  ```js
    let colors = ["red", "green", "blue"];
    console.log(colors.length); // 3
    colors[3] = "black";
    console.log(colors.length); // 4
    console.log(colors[3]); // "black"
    colors.length = 2;
    console.log(colors.length); // 2
    console.log(colors[3]); // undefined
    console.log(colors[2]); // undefined
    console.log(colors[1]); // "green"
  ```
    + colors 数组一开始有 3 个元素, 将 colors[3] 赋值为 'black' 时 length 属性
      会自动增加到 4, 将 length 属性设置为 2 时会移除数组的后 2 个元素而只保留前 2 个.
      在 ECMAScript 5 之前开发者无法自己实现这些行为, 但现在通过代理就可以了.
    + Note: 数值属性和 length 属性具有这种非标准行为, 因而在 ES6 中数组被认为是 
      奇异对象(exotic object, 与普通对象相对。)

### 2.代理和反射
- 通过调用 `new Proxy()` 你可创建一个代理用来替代另一个对象(被称为目标 target),
  这个代理对目标对象进行了虚拟, 所以二者看起来功能一致。
  
  代理(Proxy)可以拦截目标对象上的底层操作, 而这原本是 JS 引擎的内部能力.
  拦截行为使用了一个能响应特定操作的函数 (被称为陷阱函数{trap}).
  
  反射 API 以 Reflect 对象的形式出现, 反射对象中方法的默认特性与相同的底层操作一致
  -- **(1)**;

  而代理 (Proxy) 可以覆写这些操作, 每个代理陷阱对应一个命名和参数都相同的反射方法 
  -- **(2)**. 
  
  (Tip: (1) 和 (2) 为自己添加的注释)
    + (1) "反射对象中方法的默认特性"--就是下表中的第 3 列; "底层操作"
      --就是下表中的第 2 列, 也即 Object 对象上默认使用的操作方法, 比如:
      `delete` 操作符: 删除对象的属性; `Object.keys()`: 返回对象中所有可枚举的属性名; 
      `Object.getOwnPropertyNames()` 不考虑对象中属性的可枚举性一律返回. 等等...
    + (2) 下表中的 第 3 列 Reflect 对象上的方法可以操作对应的内建特性, 而 Proxy
      对象上的各种代理陷阱方法(即下表的第 1 列) 又可以直接覆写第 2 列列出的内建特性, 
      代理陷阱对应一个命名和参数都跟 Reflect 对象相同的方法.
  
  每个陷阱函数都可以重写 JS 对象的(一些内建特性/一个特定内置行为),
  可以用他们拦截并修改这些特性. 如果仍需使用内建特性, 则可以使用相应的反射 API 方法.
  创建代理会让代理和反射 API 的关系变得清楚.
  
  Javascript 中的代理陷阱 表格: 
  
  |代理陷阱(Proxy Trap)|覆写的特性(Overrides the Behavior Of)|默认特性 (Default Behavior)|
  |--------------------------|---------------------------|------------------|
  |`get`                     | 读取一个属性                | `Reflect.get()` |
  |`set`                     | 写入一个属性                | `Reflect.set()` |
  |`has`                     | `in` 操作符                | `Reflect.has()` |
  |`deleteProperty`          | `delete` 操作符            | `Reflect.deleteProperty()` |
  |`getPrototypeOf`          | `Object.getPrototypeOf()` | `Reflect.getPrototypeOf()` |
  |`setPrototypeOf`          | `Object.setPrototypeOf()` | `Reflect.setPrototypeOf()` |
  |`isExtensible`            | `Object.isExtensible()`   | `Reflect.isExtensible()` |
  |`preventExtensions`       | `Object.preventExtensions()` | `Reflect.preventExtensions()` |
  |`getOwnPropertyDescriptor`| `Object.getOwnPropertyDescriptor()` | `Reflect.getOwnPropertyDescriptor()` |
  |`defineProperty`          | `Object.defineProperty()` | `Reflect.defineProperty` |
  |`ownKeys`                 | `Object.keys`, `Object.getOwnPropertyNames()`, `Object.getOwnPropertySymbols()` | `Reflect.ownKeys()` |
  |`apply`                   | 调用一个函数 | `Reflect.apply()` |
  |`construct`               | 用 `new` 调用一个函数 | `Reflect.construct()` |
    + Object.getOwnPropertyNames(): 取得自身(own)属性名
    + Object.getPrototypeOf(): 取得原型
    + Object.setPrototypeOf(): 设置原型
    + Object.getOwnPropertyDescriptor(): 取得自身属性描述符

### 3.创建一个简单的代理
- 用 `Proxy` 构造函数创建代理需要传入 2 个参数: 
    + (1) `目标 (target)` 和
    + (2) `处理程序 (handler)`: 处理程序是定义一个或多个陷阱的对象, 在代理中, 
      除了专门为操作定义的陷阱外, 其余操作均使用默认特性.
      不使用任何陷阱的处理程序等价于简单的转发代理, 就像这样: 
      ```js
        let target = {};
        let proxy = new Proxy(target, {});  // (1)
        proxy.name = 'proxy';
        console.log(proxy.name);    // "proxy"
        console.log(target.name);    // "proxy"

        target.name = 'target';
        console.log(target.name);   // "target"
        console.log(proxy.name);    // "target"
      ```
      Note: `行(1)` 也可以使用这种写法, 
      ```js
        let target = {};
        let handler = {};
        let proxy = new Proxy(target, handler);
      ``` 
      这种写法更常见.

### 4.使用 `set` 陷阱函数验证属性 
- Tip: `set()/get()/has()...` 这些陷阱函数(代理陷阱) 是设置在 
  `new Proxy(target, handler)` 中的 `handler` 处理对象内的.
  
  假设你想创建一个属性值是数字的对象, 对象中每新增一个属性都要加以验证,
  如果不是数字必须抛出错误. 为了实现这个任务, 可以定义一个 set 陷阱来覆写设置值的默认特性. 
  set 陷阱接受 4 个参数:  
    + (1) `trapTarget`:   用于接收属性的对象 (要添加代理陷阱的目标对象).
    + (2) `key`:          要写入的属性键 (字符串 或 Symbol(符号)类型)
    + (3) `value`:        被写入属性的值
    + (4) `receiver`:     操作发生的对象 (通常是代理对象, 
      例如下面示例中的 `let proxy = ... 的 proxy`)
  
  `Reflect.set()` 是 set 陷阱函数对应的反射方法和默认特性, 它和 set
  代理陷阱一样也接受相同的 4 个参数, 以方便在陷阱中使用. 如果属性已设置陷阱应该返回
  true, 如果未设置则返回 false. (Reflect.set() 方法基于操作是否成功来返回恰当的值.)
  
  `set()` 代理陷阱(函数)可以拦截写入属性的操作, get 代理陷阱可以拦截读取属性的操作.  
  
  可以使用 set 并检查传入的值来验证属性值, 例如:
  
  ```javascript
    let tar = {
        name: "target"
    };
    let proxy = new Proxy(tar, {
        // - 4 个从参数见上面的文档解释
        // - receiver (本例中未使用) 等于 proxy.
        set(trapTarget, key, value, receiver) {
            // - 忽略已有属性, 避免影响他们
            if (!trapTarget.hasOwnProperty(key)) {
                if (isNaN(value)) {
                    throw new TypeError("属性必须是数字");
                }
            }
            // 添加属性
            return Reflect.set(trapTarget, key, value, receiver);
        }
    });

    // - 添加一个新属性
    proxy.count = 1;
    console.log(proxy.count);
    console.log(tar.count);

    // - 可以为 name 赋一个非数值类型的值, 因为该属性已经存在. 用于接收属性的
    //   对象上已有的非数字属性仍然可以被操作.
    proxy.name = "proxy";
    console.log(proxy.name);
    console.log(tar.name);

    // 抛出错误
    proxy.anotherName = "proxy";
  ```
  
  这段代码定义了一个代理来验证添加到 target 的新属性, 当执行 proxy.count = 1 时, 
  set 陷阱被调用, 此时 trapTarget 的值等于 target, key 等于 count, value 等于 1
  , receiver (本例中未使用) 等于 proxy. 由于 target 上没有 count 属性,
  因此代理继续将 value 值传入 `isNaN()`, 如果结果是 NaN, 则证明传入的属性值不是数字,
  同时也抛出一个错误. 在这段代码中, count 被设置为 1, 所以代理调用 `Reflect.set()`
  方法并传入陷阱接受的 4 个参数来添加新属性.  

### 5.使用 `get` 陷阱函数验证对象结构 (Object Shape)
- JS 有一个时常令人感到困惑的特殊行为, 即读取不存在的属性时不会抛出错误, 而是用 
  undefined 代替被读取属性的值, 就像下面这个示例一样:
  ```js
    let target = {};
    console.log(target.name);   // undefined
  ```
- 对象结构是指对象中所有可用属性和方法的集合.
- 因为只有当读取属性时才会检验属性, 所以无论对象中是否存在某个属性, 都可以通过 get
  陷阱来检测, 它接受 3 个参数: 
    + (1) `trapTarget`: 被读取属性的源对象 (代理的目标)
    + (2) `key`: 要读取的属性键 (字符串或 Symbol)
    + (3) `receiver`: 操作发生的对象 (通常是代理)
- 由于 get 陷阱不写入值, 所以它复刻了 set 陷阱中除 value 之前的其他 3 个参数, 
  Reflect.get() 也接受同样 3 个参数并返回属性的默认值.
- 如果属性在目标上不存在, 则使用 get 陷阱和 Reflect.get() 时会抛出错误, 就像这样:
  ```js
    let proxy = new Proxy({}, {
        get(trapTarget, key, receiver) {
            if (!(key in receiver)) {
                throw new TypeError('属性 ' + key  + ' 不存在');
            }
            return Reflect.get(trapTarget, key, receiver);
        }
    });
    // - 添加一个属性, 程序仍正常运行
    proxy.name = 'proxy';
    console.log(proxy.name);    // "proxy"
    // - 如果属性不存在, 则抛出错误
    console.log(proxy.age);     // TypeError: 属性 age 不存在
  ```
- 此示例中的 get 陷阱可以拦截属性读取操作, 并通过 in 操作符来判断 receiver 上是否具有
  被读取的属性, 这里之所以用 in 操作符检查 receiver 而不检查 trapTarget, 是为了
  防止 receiver 代理含有 has 陷阱 (下一节讲解). 在这种情况下检查 trapTarget 可能
  会忽略掉 has 陷阱, 从而得到错误结果. 属性如果不存在会抛出一个错误, 否则就是用默认行为.
- 这段代码展示了如何在没有错误的情况下给 proxy 添加新属性 name, 并写入值和读取值. 最后
  一行包含一个输入错误: 由于 age 是一个不存在的属性, 因而抛出错误.  

### 6.使用 `has` 陷阱函数隐藏已有属性
- 可以使用 in 操作符来检测给定对象中是否含有某个属性, 如果自由属性或原型属性匹配这个名称
  或 Symbol 就返回 true. 例如:
  ```js
    let target = {
        value: 42,
    };
    console.log(value in target);   // true
    console.log("toString" in target);  // true
  ```
- value 是一个自有属性, toString 是一个继承自 Object 的原型属性, 二者在对象上都存在,
  所以用 in 操作符检测二者都返回 true, 在代理中使用 has 陷阱可以拦截这些 in 操作并
  返回一个不同的值.
- 每当使用 in 操作符是都会调用 has 陷阱, 并传入 2 个参数:
    + (1) `trapTarget` 读取属性的对象 (代理的目标)
    + (2) `key` 要检查的属性键 (字符串或 Symbol)
- Reflect.has() 方法也接收这些参数并返回 in 操作符的默认响应, 同时使用 has 陷阱和 
  Reflect.has() 可以改变一部分属性被 in 检测时的行为, 并恢复另外一些属性的默认行为.
  例如, 可以像这样隐藏之前实例中的 value 属性: 
  ```js
    let target = {
            name: "target",
            value: 42,
        };
    let proxy = new Proxy(target, {
        has(trapTarget, key) {
            if (key === 'value') {
                return false;
            }
            else {
                return Reflect.has(trapTarget, key);
            }
        }
    });
    console.log('value' in proxy);  // false
    console.log('name' in proxy);   // true
    console.log('toString' in proxy);   // true
  ```
- 代理中的 has 陷阱会检查 key 是否为 'value', 如果是的话返回 false, 若不是则调用
  Reflect.has() 方法返回默认行为. 结果是, 即使 target 上实际存在 value 属性, 但
  用 in 操作符检查还是会返回 false, 而对于 name 和 toString 则正确返回 true.       

### 7.使用 `deleteProperty` 陷阱函数防止刪除屬性
- delete 操作符可以从对象中移除属性, 如果成功则返回 true, 不成功则返回 false. 在
  严格模式下, 如果你尝试删除一个不可配置 (nonconfigurable) 属性则会导致程序抛出错误,
  而在非严格模式下只会返回 false. 这里有一个例子: 
  ```js
    let target = {
        name: 'target',
        value: 42,
    };
    Object.defineProperty(target, 'name', {configurable: false});
    console.log('value' in target);     // true
    let result1 = delete target.value;
    console.log(result1);   // true;
    console.log('value' in target); // false

    // - 注意, 在严格模式下, 下面这行代码会抛出一个错误
    let result2 = delete target.name;
    console.log(result2);   // false
    console.log('name' in target);  // true;
  ```
- 在代理中, 可以通过 deleteProperty 陷阱来改变这个行为.
- 每当通过 delete 操作符删除对象属性时, deleteProperty 陷阱函数都会被调用, 它接受
  2 个参数: 
    + (1) `trapTarget` 要删除属性的对象 (代理的目标)
    + (2) `key` 要删除的属性键 (字符串或 Symbol)
- Reflect.deleteProperty() 方法为 deleteProperty 陷阱提供默认实现, 并且接受
  同样的 2 个参数. 结合二者可以改变 delete 的具体表现行为, 例如可以像这样来确保 value
  属性不被删除:    
  ```js
    let target = {
        name: 'target',
        value: 32
    };

    let proxy = new Proxy(target, {
        deleteProperty: function(trapTarget, key) {
            if (key === 'value') {
                return false
            } else {
                return Reflect.deleteProperty(trapTarget, key)
            }
        }
    });

    // 尝试删除 proxy.value
    console.log('value' in proxy);  // true

    let result1 = delete proxy.value;
    console.log(result1);   // false

    console.log('value' in proxy);  // true

    console.log('name' in proxy);   // true
    // 尝试删除 proxy.name
    let result2 = delete proxy.name;
    console.log(result2);   // true

    console.log('name' in proxy);   // false
  ```
- 这段代码与 has 陷阱函数的例子相似, 在 deleteProperty 陷阱函数中检查 key
  的值是否为 "value". 如果是, 返回 false; 否则通过调用 Reflect.deleteProperty() 
  方法来进行默认的操作。 value 属性是不能被删除的, 因为该操作被 proxy 对象拦截；
  而 name 则能如期被删除。这么做允许你在严格模式下保护属性避免其被删除, 并且不会抛出错误。

### 8.原型代理的陷阱函数
- 第 4 章介绍了 ES6 新增的 Object.setPrototypeOf() 方法, 它被用于作为 ES5中的
  Object.getPrototypeOf() 方法的补充. 通过代理(Proxy)中的 `setPrototypeOf`
  陷阱和 `getPrototypeOf` 陷阱可以拦截这 2 个方法的执行过程, 在这 2 种情形下, 
  Object 上的方法会调用代理中的同名陷阱来改变方法的行为.
    + `Object.getPrototypeOf() 取得原型` 
    + `Object.setPrototypeOf() 设置原型` 
     - 这个方法可以改变任意指定对象的原型, 它接受 2 个参数:
            + (1) 将要被改变原型的对象    
            + (2) 替代第一个参数原型的对象.
    + `Object.getOwnPropertyDescriptor() 取得自身属性描述符`
- 由于存在着 2 个陷阱函数与原型代理相关联, 因此分别有一组方法对应着每个陷阱函数.
  setPrototypeOf 陷阱函数接受 2 个参数: 
    + (1) `trapTarget` 需要设置原型的对象 (即代理的目标对象)
    + (2) `proto` 需要被用作原型的对象.
- Object.setPrototypeOf() 方法与 Reflect.setPrototypeOf() 方法会被传入相同的参数
  . 另一方面, getPrototypeOf 陷阱函数只接受 trapTarget 参数, 
  Object.getPrototypeOf() 方法与 Reflect.getPrototypeOf() 方法也是如此。    
#### 8.1 原型代理的陷阱函数如何工作
- 这些陷阱函数受到一些限制。首先, getPrototypeOf 陷阱函数的返回值必须是一个对象
  或者 null , 其他任何类型的返回值都会引发“运行时”错误。对于返回值的检测确保了
  Object.getPrototypeOf() 会返回预期的结果。类似的, setPrototypeOf 必须在
  操作没有成功的情况下返回 false , 这样会让 Object.setPrototypeOf() 抛出错误；
  而若 setPrototypeOf 的返回值不是 false , 则 Object.setPrototypeOf() 就会
  认为操作已成功。
- 下面这个例子通过返回 null 隐藏了代理对象的原型, 并且使得该原型不可被修改: 
  示例见: `08.1-原型代理的陷阱函数如何工作.js`
#### 8.2 为什么有 2 组方法
- **Tip: 本章的翻译, 个人感觉 `深入理解ES6.pdf` 电子书, 比纸质书翻译的更好**
  **, 接下来的大部分笔记都来自电子书.**
- 关于 Reflect.getPrototypeOf() 与 Reflect.setPrototypeOf(), 它们看起来与
  Object.getPrototypeOf() 和 Object.setPrototypeOf() 非常相似. 然而虽然
  两组方法分别进行着相似的操作, 它们之间仍然存在显著差异.
- 首先, ......
- Reflect.getPrototypeOf() 方法在接收到的参数不是一个对象时会抛出错误,  而
  Object.getPrototypeOf() 则会在操作之前先将参数值转换为一个对象。 如果你分别
  传入一个数值给这两个方法,  会得到截然不同的结果：
  ```js
    let result1 = Object.getPrototypeOf(1);
    console.log(result1 === Number.prototype);  // true
    // - 抛出错误
    // TypeError: Reflect.getPrototypeOf called on non-object
    // Reflect.getPrototypeOf(1);
  ```
- 在上一节 8.1 的第一个例子中, 当 setPrototypeOf 代理陷阱返回 false 时, 它导致
  Object.setPrototypeOf() 方法抛出了错误. 此外, Object.setPrototypeOf() 方法
  会将传入的第一个参数作为自身的返回值, 因此并不适合用来实现 setPrototypeOf 代理陷阱
  的默认行为. 看下面的代码
  ```js
    (function() {
        let target01 = {};
        // - result01 保存的是 target01 对象
        let result01 = Object.setPrototypeOf(target01, {});
        console.log(result01 === target01);     // true
        let target02 = {};
        // - result02 保存 利用 setPrototypeOf() 方法给 target02 设置一个
        //   对象字面量({}) 为其原型的成功值 true
        let result02 = Reflect.setPrototypeOf(target02, {});
        console.log(result02);  // true;
    })();
  ```
- 虽然 Object 对象与 Reflect 对象貌似存在重复的方法, 但在代理陷阱内却必须使用 
  Reflect对象上的方法.
- 在使用代理时, 这两组方法都会调用 getPrototypeOf 与 setPrototypeOf 陷阱函数.  

### 9.对象可扩展性陷阱
- ES5 通过 Object.preventExtensions() 与 Object.isExtensible() 方法给对象增加了
  可扩展性。 而 ES6 则通过 preventExtensions 与 isExtensible 陷阱函数允许代理拦截
  对于底层对象的方法调用。 这两个陷阱函数都接受名为 trapTarget 的单个参数,  此参数代表
  方法在哪个对象上被调用。 isExtensible 陷阱函数必须返回一个布尔值用于表明目标对象
  是否可被扩展,  而 preventExtensions 陷阱函数也需要返回一个布尔值,  用于表明操作
  是否已成功。
- 同时也存在 Reflect.preventExtensions() 与 Reflect.isExtensible() 方法,  用于
  实现默认的行为。 这两个方法都返回布尔值,  因此它们可以在对应的陷阱函数内直接使用。
#### 9.1 两个基础范例
    + 
#### 9.2 重复的可擴展性方法
- Object.isExtensible() 方法和 Reflect.isExtensible() 方法非常相似, 只有当
  传入非对象值是, Object.isExtensible() 返回 false 而 Reflect.isExtensible()
  则抛出一个错误. 例如:
  ```js
    let result01 = Object.isExtensible(2);
    console.log(result01);  // false

    // - 给不存在的属性赋值会抛出错误
    let result02 = Reflect.isExtensible(2);
  ```
- Object.preventExtensions() 方法和 Reflect.preventExtensions() 方法
  同上面 2 个方法非常相似: 
  ```js
    let result01 = Object.preventExtensions(2);
    console.log(result1); // 2

    let target = {};
    let result2 = Reflect.preventExtensions(target);
    console.log(result2); // true

    // 抛出错误
    let result3 = Reflect.preventExtensions(2);
  ```

### 10.属性描述符陷阱
- ES5 最重要的特性之一是可以使用 Object.defineProperty() 方法定义
  **属性特性(property attribute).** 在早期版本的 JS 中无法定义访问器属性, 无法将
  属性设置为只读或不可配置. 知道 Object.defineProperty() 方法出现之后才支持这些功能,
  并且可以通过 `Object.getOwnPropertyDescriptor() 取得自身属性描述符` 方法来获取
  这些属性.
- 在代理中可以分别用 defineProperty 陷阱和 getOwnPropertyDescriptor 陷阱拦截
  Object.defineProperty() 方法和 Object.getOwnPropertyDescriptor() 方法的
  调用. defineProperty 陷阱接受以下参数:
    1. `trapTarget` 要定义属性的对象 (代理的目标对象).
    2. `key` 属性的键 (字符串或 Symbol).
    3. `descriptor` 属性的描述符对象.
- defineProperty 陷阱需要在操作成功后返回 true, 否则返回 false,
  getOwnPropertyDescriptor 陷阱只接受 `trapTarget` 和 `key` 两个参数,
  **最终返回描述符.** Reflect.defineProperty() 方法和 
  Reflect.getOwnPropertyDescriptor() 方法与对应的陷阱接受相同参数。
  这个示例实现的是每个陷阱的默认行为：
  ```js
    let proxy = new Proxy({}, {
        defineProperty(trapTarget, key, descriptor) {
            return Reflect.defineProperty(trapTarget, key, descriptor);
        },
        getOwnPropertyDescriptor(trapTarget, key) {
            return Reflect.getOwnPropertyDescriptor(trapTarget, key);
        }
    });
    Object.defineProperty(proxy, "name", {
        value: "proxy"
    });
    console.log(proxy.name); // "proxy"
    let descriptor = Object.getOwnPropertyDescriptor(proxy, "name");
    console.log(descriptor.value); // "proxy"
  ```
#### 10.1 給 Object.defineProperty() 添加限制
+ defineProperty 陷阱函数要求你返回一个布尔值用于表示操作是否已成功。 当它返回
    true 时,  Object.defineProperty() 会正常执行； 而如果它返回了 false ,  则
    Object.defineProperty() 会抛出错误。 你可以使用该功能来限制哪些属性可以被
    Object.defineProperty() 方法定义。 例如,  如果想阻止定义符号类型的属性,  你
    可以检查传入的键是否为字符串,  若不是则返回 false ,  就像这样:
    ```js
    let proxy = new Proxy({}, {
        defineProperty(trapTarget, key, descriptor) {
            if (typeof key === "symbol") {
                return false;
            } 
            return Reflect.defineProperty(trapTarget, key, descriptor);
        }
    });
    Object.defineProperty(proxy, "name", {
        value: "proxy"
    });

    console.log(proxy.name); // "proxy"

    let nameSymbol = Symbol("name");
    // 抛出错误
    Object.defineProperty(proxy, nameSymbol, {
        value: "proxy"
    });
    ```
+ Note: 你可以让陷阱函数返回 true ,  同时不去调用 Reflect.defineProperty() 
  方法,  这样 Object.defineProperty() 就会静默失败,  如此便可在未实际去定义属性
  的情况下抑制运行错误。  
#### 10.2 描述符对象的限制
+ 为了确保 Object.defineProperty() 与 Object.getOwnPropertyDescriptor() 
  方法的行为一致,  传递给 defineProperty 陷阱函数的描述符对象必须是正规的。 出于
  同一原因, getOwnPropertyDescriptor 陷阱函数返回的对象也始终需要被验证。
+ 任意对象都能作为 Object.defineProperty() 方法的第三个参数; 然而传递给
  defineProperty 陷阱函数的描述符对象参数,  则只有 `enumerable`、`configurable`
  、 `value` 、 `writable` 、 `get` 与 `set` 这些属性是被许可的。 例如：
  ```js
    let proxy = new Proxy({}, {
        defineProperty(trapTarget, key, descriptor) {
            console.log(descriptor.value);  // "proxy"
            console.log(descriptor.name);   // undefined
            return Reflect.defineProperty(trapTarget, key, descriptor);
        }
    });
    Object.defineProperty(proxy, "name", {
        value: "proxy",
        name: "custom"
    });
  ```
+ 此代码中调用 Object.defineProperty() 时,  在第三个参数上使用了一个非标准的 
  name 属性。 当 defineProperty 陷阱函数被调用时,  descriptor 对象不会拥有
  name 属性,  却拥有一个 value 属性。 这是因为 descriptor 对象实际上并不是
  原先传递给 Object.defineProperty() 方法的第三个参数,  而是一个新的对象,  其中
  只包含了被许可的属性 (因此 name 属性被丢弃了). Reflect.defineProperty() 方法
  同样也会忽略描述符上的非标准属性.
+ getOwnPropertyDescriptor 陷阱函数有一个微小差异,  **要求返回值必须是**`null`
  、`undefined` 或者是`一个对象`。 如果返回值是一个对象,  则对象的属性只能是
  `enumerable`、`configurable`、`value`、`writable`、`get` 或 `set`, 在
  返回的对象中使用不被允许的属性会抛出一个错误, 就像这样:
  ```js
    let proxy = new Proxy({}, {
        getOwnPropertyDescriptor(trapTarget, key) {
            return {
                name: "proxy"
            };
        }
    });
    // 抛出错误
    let descriptor = Object.getOwnPropertyDescriptor(proxy, "name");
  ```
+ name 属性在属性描述符中是不被许可的, 因此当 Object.getOwnPropertyDescriptor()
  被调用时,  getOwnPropertyDescriptor 的返回值会触发一个错误。 这个限制保证了
  Object.getOwnPropertyDescriptor() 的返回值总是拥有可信任的结构,  无论是否
  使用了代理。
#### 10.3 重复的描述符方法
- ES6 再次出现了令人困惑的相似方法,  Object.defineProperty() 和
  Object.getOwnPropertyDescriptor() 方法貌似分别与 Reflect.defineProperty()
  和 Reflect.getOwnPropertyDescriptor() 方法相同。 正如本章之前讨论过的那些
  配套方法一样, 这些方法也存在一些微小但重要的差异.
###### 10.3.1 defineProperty() 方法 和 Reflect.defineProperty() 方法
- Object.defineProperty() 方法与 Reflect.defineProperty() 方法几乎一模一样,
  只是返回值有区别。 前者返回第一个参数,  而后者的返回值与操作有关, 成功时返回 true、
  失败时返回false 。 例如：
  ```js
    let target = {};
    let result1 = Object.defineProperty(target, "name", { value: "target"});
    console.log(target === result1); // true
    let result2 = Reflect.defineProperty(target, "name", { value: "reflect" });
    console.log(result2); // true
  ```
- 调用 Object.defineProperty() 时传入 target, 返回值也是 target. 调用
  Reflect.defineProperty()时传入 target, 返回值是 true, 表示操作成功. 由于
  defineProperty 代理陷阱需要返回一个布尔值, 因此必要时最好使用
  Reflect.defineProperty() 来实现默认的行为.
###### 10.3.2 getOwnPropertyDescriptor() 方法和 Reflect.getOwnPropertyDescriptor()
- Object.getOwnPropertyDescriptor() 方法会在接收的第一个参数是一个基本类型值时,
  将该参数转换为一个对象。 另一方面,  Reflect.getOwnPropertyDescriptor() 方法
  则会在第一个参数是基本类型值的时候抛出错误。 下面这个例子展示了二者的特性：
  ```js
    let descriptor1 = Object.getOwnPropertyDescriptor(2, "name");
    console.log(descriptor1); // undefined
    // 抛出错误
    let descriptor2 = Reflect.getOwnPropertyDescriptor(2, "name");
  ```
- 由于 Object.getOwnPropertyDescriptor() 方法将数值 2 强制转换为一个不含 name
  属性的对象, 因此它返回 undefined, 这是当对象中没有指定的 name 属性时的标准行为.
  然而当调用 Reflect.getOwnPropertyDescriptor() 时立即抛出一个错误,  因为该方法
  不接受 基本类型值(原始值) 作为它的第一个参数。  

### 11.ownKeys(自身键) 陷阱函数 (Tip: 这节书本翻译不如电子文档)
- ownKeys 代理陷阱可以拦截内部方法 `[[OwnPropertyKeys]]`(自身属性键), 并允许
  **返回一个数组用于重写默认行为.** 返回的这个数组被用于 4 个方法:  
  (1) `Object.keys()`,  
  (2) `Object.getOwnPropertyNames() 取得自身属性名`,  
  (3) `Object.getOwnPropertySymbols() 取得自身 Symbol 属性`,  
  (4) `Object.assign()`  
  , 其中 Object.assign() 方法会使用该数组来决定哪些属性会被复制.
- ownKeys 陷阱函数的默认行为由 `Reflect.ownKeys()` 方法实现, 
  **它会返回一个由全部自有属性构成的数组, 无论键的类型是字符串还是 Symbol(符号).**
  Object.getOwnPropertyNames() 方法与 Object.keys() 方法会将符号值从该数组中
  过滤出去; 相反, Object.getOwnPropertySymbols() 会将字符串值过滤掉; 而 
  Object.assign() 方法会使用数组中所有的字符串值与 Symbol 值.
- ownKeys 陷阱函数接受 **1 个参数, 即目标对象**, 同时必须返回一个数组或者一个
  类数组对象, 不合要求的返回值会导致错误. 你可以使用 ownKeys 陷阱函数去过滤特定的属性,
  以避免这些属性被 Object.keys(), Object.getOwnPropertyName(), 
  Object.getOwnPropertySymbols(), Object.assign() 方法使用. 假设你不想在结果中
  包含任何以下划线打头的属性 (在 JS 的编码惯例中, 这代表该字段是私有的), 那么可以使用
  ownKeys 陷阱函数来将他们过滤掉, 就像下面这样:
  ```js
    let proxy = new Proxy({}, {
        ownKeys(trapTarget) {
            // - Reflect.ownKeys() 方法来获取目标对象的键列表; 接下来, filter() 方法
            //   被用于将所有下划线打头的字符串类型的键过滤出去
            return Reflect.ownKeys(trapTarget).filter(key => {
                return typeof key !== 'string' || key[0] !== '_';
            });
        }
    });
    // - 向 proxy 对象添加了 3 个属性.
    let nameSymbol = Symbol('name');
    proxy.name = 'proxy';
    proxy._name = 'private';
    proxy[nameSymbol] = 'symbol';

    let names = Object.getOwnPropertyNames(proxy);
    let keys = Object.keys(proxy);
    let symbols = Object.getOwnPropertySymbols(proxy);

    console.log(names.length);  // 1
    console.log(names[0]);      // "name"

    console.log(keys.length);   // 1
    console.log(keys[0]);       // "name"

    console.log(symbols.length);    // 1
    console.log(symbols[0]);    // "Symbol(name)"
  ```
- Note: ownKeys 陷阱函数也能影响 for-in 循环, 因为这种循环调用了陷阱函数来决定哪些值
  能够被用在循环内.

### 12.函數代理中的 apply 和 construct 陷阱
- 在所有的代理陷阱中, **只有`apply`和`construct`要求代理目标对象必须是一个函数**. 
  回忆一下第三章的内容,  函数拥有两个内部方法： [[Call]] 与 [[Construct]] ,  前者
  会在函数被直接调用时执行,  而后者会在函数被使用 new 运算符调用时执行。 apply 与
  construct 陷阱函数对应着这两个内部方法,  并允许你对其进行重写。 
- 当不使用 new 去调用一个函数时, `apply()` 陷阱函数会接收到下列三个参数 
  (`Reflect.apply()` 也会接收这些参数):  
  (1) `trapTarget`: 被执行的函数 (即代理的目标对象);  
  (2) `thisArg`: 调用过程中函数内部的 this 值;  
  (3) `argumentsList`: 被传递给函数的参数数组.  
- 当使用 new 去执行函数时, `construct()` 陷阱函数会被调用并接受到下列 2 个参数:  
  (1) `trapTarget`: 被执行的函数 (即代理的目标对象);  
  (2) `argumentsList`: 被传递给函数的参数数组.
- `Reflect.construct()` 方法同样会接收到这 2 个参数, 还会收到可选的第 3 参数
  `newTarget`, 如果提供了此参数, 则它就指定了函数内部的 `new.target`值.
- apply 与 construct 陷阱函数结合起来就完全控制了任意的代理目标对象函数的行为。 
  为了模拟函数的默认行为,  你可以这么做：
  ```js
    let target = function() {return 42;};
    let proxy = new Proxy(target, {
        apply: function(trapTarget, thisArg, argumentsList) {
            return Reflect.apply(trapTarget, thisArg, argumentsList);
        },
        construct: function(trapTarget, argumentsList) {
            return Reflect.construct(trapTarget, argumentsList);
        },
    });
    // - 使用函数的带来, 其目标对象会被视为函数
    console.log(typeof proxy);  // "function"
    console.log(proxy());   // 42
    let instance01 = new proxy();
    console.log(instance01; instanceOf; proxy;)  // true
    console.log(instance01; instanceOf; target;)    // true
  ```
- 本例中的函数会返回一个数值 42 。 该函数的代理使用了 apply 与 construct 陷阱函数
  来将对应行为分别委托给 Reflect.apply() 与 Reflect.construct() 方法. 最终结果是
  代理函数就像目标函数一样工作, 包括使用 typeof 会将其检测为函数, 并且使用 new 运算符
  调用会产生一个实例对象 instance. instance 对象会被同时判定为 proxy 与 target 
  对象的实例, 是因为 instanceof 运算符使用了原型链来进行推断, 而原型链查找并没有受到
  这个代理的影响,  因此 proxy 对象与 target 对象对于 JS 引擎来说就有同一个原型。  
#### 12.1 验证函数的参数
- apply 与 construct 陷阱函数在函数的执行方式上开启了很多的可能性。 例如, 假设
  你想要保证所有参数都是某个特定类型的,  可使用 apply 陷阱函数来进行验证:
  ```js
    // - 将所有参数相加
    function sum(...values) {
        return values.reduce((previous, current) => previous + current);
    }
    let sumProxy = new Proxy(sum, {
        apply: function(trapTarget, thisArg, argumentsList) {
            argumentsList.forEach((arg) => {
                if (typeof arg !== 'number') {
                    throw new TypeError('All arguments must be numbers.');
                }
            });
            return Reflect.apply(trapTarget, thisArg, argumentsList);
        },
        construct: function(trapTarget, argumentsList) {
            throw new TypeError('This function can\'t be called with new.');
        },
    });
    console.log(sumProxy(1, 2, 3, 4));  // 10
    // - 抛出错误
    console.log(sumProxy(1, '2', 3, 4));
    // - 同样抛出错误
    let result = new sumProxy();
  ```
- 此例使用了 apply 陷阱函数来确保所有的参数都是数值。 sum() 函数会将所有传递进来的
  参数值相加, 如果传入参数的值不是数值类型,  该函数仍然会尝试加法操作, 这样可能会导致
  意外的结果。此代码通过将 sum() 函数封装在 sumProxy() 代理中, 在函数运行之前拦截了
  函数调用, 以保证每个参数都是数值。 出于安全的考虑,  这段代码使用 construct 陷阱
  抛出错误, 以确保该函数不会被使用 new 运算符调用。
- 相反的,  你也可以限制函数必须使用 new 运算符调用,  同时确保它的参数都是数值：
  ```js
    function Numbers(...values) {
        this.values = values;
    }
    let NumbersProxy = new Proxy(Numbers, {
        apply: function(trapTarget, thisArg, argumentsList) {
            throw new TypeError('This function must be called with new'.);
        },
        construct: function(trapTarget, argumentsList) {
            argumentsList.forEach((arg) => {
                if (typeof arg !== 'number') {
                    throw new TypeError('All arguments must be numbers'.);
                }
            });
            return Reflect.construct(trapTarget, argumentsList);
        }
    });
    let instance = new NumbersProxy(1, 2, 3, 4);
    console.log(instance.values);   // [1, 2, 3, 4]

    // - 抛出错误
    NumbersProxy(1, 2, 3, 4);
  ```
- 此代码中的 apply 陷阱函数会抛出错误,  而 construct 陷阱函数则使用了
  Reflect.construct() 方法来验证输入并返回一个新的实例。 当然, 你也可以不必使用代理,
  而是用 new.target 来完成相同的功能。  
#### 12.2 不用 new 调用构造函数
- 第三章曾介绍了 new.target 元属性,  在使用 new 运算符调用函数时,  这个属性就是对
  该函数的一个引用。 这意味着你可以使用 new.target 来判断函数被调用时是否使用了new,
  就像这样:
  ```js
    function Numbers(...values) {
        if (typeof new.target === 'undefined') {
            throw new TypeError('This function must be called with new.');
        }
        this.values = values;
    }
    let instance = new Numbers(1, 2, 3, 4);
    console.log(instance.values);   // [1, 2, 3, 4]

    // - 抛出错误
    Numbers(1, 2, 3, 4);
  ```
- 这个例子在不使用 new 来调用 Numbers 函数的情况下抛出了错误,  与“验证函数的参数”
  那个小节的例子效果一致,  但并没有使用代理。 相对于使用代理,  这种写法更简单,  并且
  若只想阻止不使用 new 来调用函数的行为,  这种写法也更胜一筹。 然而有时你所要修改
  其行为的函数是你所无法控制的,  此时使用代理就有意义了。
- 假设 Numbers 函数是硬编码的,  无法被修改,  已知该代码依赖于 new.target, 而你
  想要在调用函数时避免这个检查。 在“必须使用 new ”这一限制已经确定的情况下,  你可以
  使用 apply 陷阱函数来规避它:
  ```js
    function Numbers(...values) {
        if (typeof new.target === 'undefined') {
            throw new TypeError('This function must be called with new.');
        }
        this.values = values;
    }
    let NumbersProxy = new Proxy(Numbers, {
        apply: function(trapTarget, thisArg, argumentsList) {
            return Reflect.construct(trapTarget, argumentsList);
        }
    });
    let instance = NumbersProxy(1, 2, 3, 4);
    console.log(instance.values);   // [1, 2, 3, 4]
  ```
- NumbersProxy 函数允许你调用 Numbers 而无须使用 new ,  并且让这种调用的效果与
  使用了 new 的情况保持一致。 为此,  apply 陷阱函数使用传给自身的参数去对 
  Reflect.construct() 方法进行了调用,  于是 Numbers 内部的 new.target 就被
  设置为 Numbers, 从而避免抛出错误。 尽管这只是修改 new.target 的一个简单例子,
  但你还可以做得更加直接.
#### 12.3 重写抽象基类构造函数
- 你可以进一步指定 Reflect.construct() 的第三个参数,  用于给 new.target 赋值。
  当函数把 new.target 与已知值进行比较的时候,  例如在创建一个抽象基础类的构造器的场合下
  (参阅第九章), 这么做会很有帮助。 在抽象基础类的构造器中,  new.target 被要求不能是
  构造器自身, 正如这个例子：
  ```js
    class AbstractNumbers {
        constructor(...values) {
            if (new.target === AbstractNumbers) {
                throw new TypeError('This function must be inherited from.');
            }
            this.values = values;
        }
    }
    class Numbers extends AbstractNumbers{}
    let instance = new Numbers(1, 2, 3, 4);
    console.log(instance.values);   // [1, 2, 3, 4]

    // - 抛出错误
    new AbstractNumbers(1, 2, 3, 4);
  ```
- 当 new AbstractNumbers() 被调用时,  new.target 等于 AbstractNumbers, 从而
  抛出了错误; 而调用 new Numbers() 能正常工作,  因为此时 new.target 等于 Numbers,
  你可以使用代理手动指定 new.target 从而绕过这个限制:
  ```js
    class AbstractNumbers {
        constructor(...values) {
            if (new.target === AbstractNumbers) {
                throw new TypeError('This function must be inherited from.');
            }
            this.values = values;
        } 
    }
    let AbstractNumbersProxy = new Proxy(AbstractNumbers, {
        construct: function(trapTarget, argumentsList) {
            return Reflect.construct(trapTarget, argumentsList, function() {});
        }
    });
    let instance = new AbstractNumbersProxy(1, 2, 3, 4);
    console.log(instance.values);   // [1, 2, 3, 4]
  ```
- AbstractNumbersProxy 使用 construct 陷阱函数拦截了对于
  new AbstractNumbersProxy() 方法的调用,  这样陷阱函数就将一个空函数作为第三个参数
  传递给了 Reflect.construct() 方法,  让这个空函数成为构造器内部的 new.target. 
  由于此时 new.target 的值并不等于 AbstractNumbers, 就不会抛出错误,  构造器可以
  执行完成。  
#### 12.4 可被调用的类构造函数
- 第九章说明了构造器必须始终使用 new 来调用,  原因是类构造器的内部方法 [[Call]] 被
  明确要求抛出错误。 然而代理可以拦截对于 [[Call]] 方法的调用,  意味着你可以借助代理
  有效创建一个可被调用的类构造器。 例如,  如果想让类构造器在缺少 new 的情况下能够工作, 
  你可以使用 apply 陷阱函数来创建一个新实例。 这里有个例子:
  ```js
    class Person {
        constructor(name) {
            this.name = name;
        }
    }
    let PersonProxy = new Proxy(Person, {
        apply: function(trapTarget, thisArg, argumentsList) {
            return new trapTarget(...argumentsList);
        }
    });
    let me = PersonProxy('Nicholas');
    console.log(me.name);   // "Nicholas"
    console.log(me instanceof Person);  // true
    console.log(me instanceof PersonProxy); // true
  ```
- PersonProxy 对象是 Person 类构造函数的一个代理. 类构造函数实际上也是函数, 因此在
  使用代理时它的行为就像函数一样. apply 陷阱函数重写了默认的行为, 返回 trapTarget
  (这里等于 Person) 的一个实例, 此代码使用 trapTarget 以保证通用性, 避免了手动指定
  特定的类. 此处还使用了扩展运算符,  将 argumentList 展开并传递给 trapTarget 方法.
  在没有使用 new 的情况下调用 PersonProxy(), 获得了 Person 的一个新实例; 而若
  你试图不使用 new 去调用 Person(), 构造器仍然会抛出错误. 创建一个可被调用的类构造器,
  是只有使用代理才能做到的。

### 13.可被撤销的代理
- 在被创建之后,  代理通常就不能再从目标对象上被解绑。 本章之前的例子都使用了不可被撤
  销的代理,  但有的情况下你可能想撤销一个代理以便让它不能再被使用。 当你想通过公共接
  口向外提供一个安全的对象,  并且要求要随时都能切断对某些功能的访问,  这种情况下可被
  撤销的代理就会非常有用。
- 你可以使用 `Proxy.revocable()` 方法来创建一个可被撤销的代理,  该方法接受的参数
  与 Proxy 构造器的相同： 一个目标对象、 一个代理处理器,  而返回值是包含下列属性的
  一个对象:
    + (1) `proxy`: 可被撤销的代理对象;
    + (2) `revoke`: 用于撤销代理的函数.
- 当 revoke() 函数被调用后,  就不能再对该 proxy 对象进行更多操作,  任何与该代理
  对象交互的意图都会触发代理的陷阱函数,  从而抛出一个错误。 例如:
  ```js
    let target = {
        name: 'target'
    };
    let {proxy, revoke} = Proxy.revocable(target, {});
    console.log(proxy.name);    // "target"
    revoke();
    // - 抛出错误
    console.log(proxy.name);
  ```
- 此示例创建了一个可被撤销的代理, 它使用解构功能将 proxy 和 revoke 变量赋值给
  Proxy.revocable() 方法返回的对象上的同名属性(Tip: 这是正确的描述, 变量赋值是
  从右到左, 但解构赋值却是从左到右的, 解构赋值和 把"值/对象"赋值给变量的原理不同, 
  这个讲解在前面章节有解释). 之后, proxy 对象可以像不可撤销代理对象一样使用. 因此
  proxy.name 返回 "target", 因为它直接传递了 target.name 的值. 然而, 一旦
  revoke() 函数被调用, 代理不再是函数, 尝试访问 proxy.name 会抛出一个错误, 正如
  任何会触发代理上陷阱的其他操作一样.

### 14.解决数组的问题
- 在本章开始时,  我解释了为何在 ES6 之前开发者无法准确模拟 JS 数组的行为。 而代理与
  反射接口则允许你创建这样一种对象： 在属性被添加或删除时,  它的行为与内置数组类型的行
  为相同。 为了刷新你的记忆,  这里有个例子展示了代理所要模拟的行为:
  ```js
    let colors = ['red', 'green', 'blue'];
    console.log(colors.length); // 3
    colors[3] = 'balck';
    console.log(colors.length); // 4
    console.log(colors[3]);     // "black"
    colors.length = 2;
    console.log(colors.length); // 2
    console.log(colors[3]);     // undefined
    console.log(colors[2]);     // undefined
    console.log(colors[1]);     // "green"
  ```
-  这个例子可以体现出两个特别重要的行为特性：
    + (1) 当 colors[3] 被赋值时,  length 属性被自动增加到 4 ；
    + (2) 当 length 属性被设置为 2 时,  数组的最后两个元素被自动移除了
- 当想要重现内置数组的工作方式时,  仅需模拟这两个行为即可。 接下来的几小节将会介绍如
  何正确地将一个对象模拟为数组.
#### 14.1 检测数组的索引
- 必须始终牢记: 对于数组来说, **为整数属性赋值是一种特殊情况**, 不同于对非整数键的处理.
  在如何判断一个属性键是否为数组的索引方面, ES6 规范给出了指南:
- > 对于名为 `p` 的一个字符串属性名来说, 当且仅当 `ToString(ToUint32(p))` 等于 `p`, 
    并且 ToUint32(p) 不等于 $2^{32} - 1$ 时, 它才能被用来作数组的索引.
- 这个操作可以用下述的 JS 代码来实现:
  ```js
    // - toUint32() 使用规范中描述的算法, 将给定值转换为一个无符号的 32 位整数.
    function toUint32(value) {
        // - Math.floor() 对数值执行向下求整
        // - Math.abs() 返回数值的绝对值
        // - `%` 求模(余数)
        // - Math.pow(2, 32) 计算 2 的 32 次方(幂)
        return Math.floor(Math.abs(Number(value))) % Math.pow(2, 32);
    }
    // - isArrayIndex() 首先将键值转换为一个 Uint32 数, 并执行了比较操作来判断该键
    //   是否能够作为数组的索引. 借助这两个工具函数, 便可开始实现一个模拟内建数组的对象.
    function isArrayIndex(key) {
        let numericKey = toUint32(key);
        return String(numericKey) == key && numericKey < (Math.pow(2, 32) - 1);
    }
  ```
#### 14.2 添加新元素时增加 length 的值
- 你可能已经注意到: 数组的上述两个特殊行为都依赖于对属性的赋值,  这就意味着你只需要使用
  set 代理陷阱来达成这两个行为. 首先, 下面的例子实现了第一个行为, 当操作的数组索引大于
  `length - 1` 时, length 属性需要被增加。
  ```js
    const handler = {
        set(trapTarget, key, value) {
            let currentLength = Reflect.get(trapTarget, 'length');  // {1}
            // - 特殊情况: if 判断调用上面的 isArrayIndex() 方法判断 key 是否为数字
            if (isArrayIndex(key)) {
                // - 把 key(键) 通过 Number() 方法转换, 确定是数字
                let numericKey = Number(key);
                // - 判断 numericKay 数字是否大于 currentLength(当前数字的长度),
                //   如果大于, 便执行 Reflect.set() 方法把 trapTarget(代理对象)
                //   的长度 + 1, 这样 length 便实现了增加.
                if (numericKey >= currentLength) {
                    Reflect.set(trapTarget, 'length', numericKey + 1);
                }
            }
            // - 无论键的类型是什么, 都要执行这行代码
            return Reflect.set(trapTarget, key, value);
        }
    };
    function createMyArray(length = 0) {
        // - Tip: {length} = {length: length}
        return new Proxy({length}, handler)
    }
    // - Note: 调用 createMyArray() 函数, 传入一个数字参数 3, createMyArray()
    //   函数内 return 一个 Proxy 构造函数的实例, 实例内的目标对象为 `{length}`,
    //   代理对象为 handler. 
    let colors = createMyArray(3);
    // - 执行对象的默认操作, 获取 length 属性的值
    console.log(colors.length); // 3

    // - 设置属性都会走 set() 陷阱函数
    colors[0] = 'red';
    colors[1] = 'green';
    colors[2] = 'blue';

    console.log(colors.length); // 3
    colors[3] = 'black';
    console.log(colors.length); // 4

  ```
#### 14.3 减少 length 的值来删除元素
- ```js
    const handler = {
        set(trapTarget, key, value) {
            let currentLength = Reflect.get(trapTarget, 'length');  // {1}
            // - 特殊情况: if 判断调用上面的 isArrayIndex() 方法判断 key 是否为数字
            if (isArrayIndex(key)) {
                // - 把 key(键) 通过 Number() 方法转换, 确定是数字
                let numericKey = Number(key);
                // - 判断 numericKay 数字是否大于 currentLength(当前数字的长度),
                //   如果大于, 便执行 Reflect.set() 方法把 trapTarget(代理对象)
                //   的长度 + 1, 这样 length 便实现了增加.
                if (numericKey >= currentLength) {
                    Reflect.set(trapTarget, 'length', numericKey + 1);
                }
            }
            else if (key === 'length') {
                if (value < currentLength) {
                    for (let index = currentLength - 1; index >= value; index--) {
                        Reflect.deleteProperty(trapTarget, index);
                    }
                }
            }
            // - 无论键的类型是什么, 都要执行这行代码
            return Reflect.set(trapTarget, key, value);
        }
    };
    function createMyArray(length = 0) {
        // - Tip: {length} = {length: length}
        return new Proxy({length}, handler)
    }
    // - Note: 调用 createMyArray() 函数, 传入一个数字参数 3, createMyArray()
    //   函数内 return 一个 Proxy 构造函数的实例, 实例内的目标对象为 `{length}`,
    //   代理对象为 handler. 
    let colors = createMyArray(3);
    // - 执行代理对象 handler 通
    console.log(colors.length); // 3

    colors[0] = 'red';
    colors[1] = 'green';
    colors[2] = 'blue';

    console.log(colors.length); // 3
    colors[3] = 'black';
    console.log(colors.length); // 4
    console.log(colors);

    // - 14.3 调用测试
    colors.length = 2;
    console.log(colors.length); // 2
    console.log(colors[3]);     // undefined
    console.log(colors[2]);     // undefined
    console.log(colors[1]);     // "green"
    console.log(colors[0]);     // "red"
    console.log(colors);
  ```
#### 14.4 实现 MyArray 类
- 想要创建使用代理的类, 最简单的方法是像往常一样定义类, 然后在构造函数中返回一个代理,
  那样的话, 当类实例化时返回的对象是代理而不是实例 (构造函数中 this 的值是该实例). 
  实例成为代理的目标, 代理则像原本的实例那样被返回. 实例完全私有化, 除了通过代理间接
  访问外, 无法直接访问它. <br/>
* 下面是从一个类构造函数返回一个代理的简单示例:
  ```js
    class Thing {
        constructor() {
            return new Proxy(this, {});
        }
    }
    let myThing = new Thing();
    console.log(myThing instanceof Thing);  // true
  ```
* 在这个示例中, 类 Thing 从它的构造函数中返回一个代理, 代理的目标是 this, 所以即使
  myThing 是通过调用 Thing 构造函数创建的, 但它实际上是一个代理. 由于代理会将他们的
  特性透传给目标, 因此 myThing 仍然被认为是 Thing 的一个实例, 故对任何使用 Thing 类
  的人来说代理是完全透明的. <br/>
* 从构造函数中可以返回一个代理, 理解这个概念后, 用代理创建一个自定义数组类就相对简单了.
  其代码与之前 "减少 length 的值来删除元素" 一节中的代码大部分是一样的, 你可以使用相同
  的代理代码, 但这次需要把它放在一个类构造函数中, 下面是示例:  
  (Tip: 完整代码见: `14.4-实现myArray类.html`)
  ```js
    class MyArray {
        constructor(length = 0) {
            this.length = length;
            const handler = {
                set(trapTarget, key, value, receiver) {
                    let currentLength = Reflect.get(trapTarget, 'length');
                    if (isArrayIndex(key)) {
                        let numericKey = Number(key);
                        if (numericKey >= currentLength) {
                            Reflect.set(trapTarget, 'length', numericKey + 1);
                        }
                    }
                    else if (key === 'length') {
                        if (value < currentLength) {
                            for (
                                let index = currentLength - 1; 
                                index >= value; 
                                index--
                            ) {
                                Reflect.deleteProperty(trapTarget, index);
                            }
                        }
                    }
                    return Reflect.set(trapTarget, key, value);
                }
            };
            return new Proxy(this, handler)
        }
    }

    let colors = new MyArray(3);
    console.log(colors instanceof MyArray); // true
    console.log(colors.length); // 3
    colors[0] = 'red';
    colors[1] = 'green';
    colors[2] = 'blue';
    colors[3] = 'black';
    console.log(colors.length); // 4

    colors.length = 2;

    colors.length = 2;
    console.log(colors.length); // 2
    console.log(colors[3]);     // undefined
    console.log(colors[2]);     // undefined
    console.log(colors[1]);     // "green"
    console.log(colors[0]);     // "red"
    console.log(colors);
  ```
- 这段代码创建了一个 MyArray 类, 从它的构造函数返回一个代理. length 属性被添加到
  构造函数中, 初始化为传入的值或默认值 0, 然后创建代理并返回. colors 变量看起来好像
  只是 MyArray 的一个实例, 并实现了数组的 2 个关键特性.  
- 虽然从类构造函数返回代理很容易, 但这也意味着每创建一个实例都要创建一个代理. 然而,
  有一种方法可以让所有实例共享一个代理: 将代理对象用作原型. 

### 15.将代理对象用作原型
- 虽然可以把代理当做原型使用, 但这与本章之前的示例相比更复杂一点. **如果代理是原型,**
  **仅当默认操作继续执行到原型上时才会调用代理陷阱, 这会限制代理作为原型的能力.**
  请看下面的实例:
  ```js
    let target = {};
    let newTarget = Object.create(new Proxy(target, {
        // - 永远不会被调用
        defineProperty(trapTarget, name, descriptor){
            // - 如果被调用就会引发错误
            return false;
        }
    }));
    Object.defineProperty(newTarget, 'name', {
        value: 'newTarget',
    });
    console.log(newTarget.name);    // "newTarget"
    console.log(newTarget.hasOwnProperty('name'));  // true
  ```
- 创建 newTarget 对象, 它的原型是一个代理. 由于代理是透明的, 用 target 作为代理的
  目标实际上让 target 成为 newTarget 的原型. 现在, 仅当 newTarget 上的操作
  被透传给目标时才会调用代理陷阱. <br/>
- 调用 Object.defineProperty() 方法并传入 newTarget 来创建一个名为 name 的
  自由属性. **在对象上定义属性的操作不需要操作对象原型**, 所以代理中的 defineProperty
  陷阱永远不会被调用, name 作为自由属性被添加到 newTarget 上. <br/>
- 尽管代理作为原型使用时及其受限, 但有几个陷阱函数却仍然有用, 下面来看看具体细节.
#### 15.1 在原型上使用 get 陷阱
- 当内部方法 [[Get]] 被调用以读取属性时,  该操作首先会查找对象的自有属性； 如果
  指定名称的属性没有找到,  则会继续在对象的原型上进行属性查找； 这个流程会一直持续到
  没有原型可供查找为止。
- 得益于这个流程,  若你设置了一个 get 代理陷阱,  则只有在对象不存在指定名称的自有属性时,
  **该陷阱函数才会在对象的原型上被调用**。 当所访问的属性无法保证存在时,  你可以使用 get
  陷阱函数来阻止预期外的行为。 下例创建了一个对象,  当你尝试去访问一个不存在的属性时, 
  它会抛出错误：
  ```js
    let target = {};
    // - Tip: 即 target.prototype = new Proxy()
    let thing = Object.create(new Proxy(target, {
        get(trapTarget, key, receiver) {
            throw new ReferenceError(`${key} doesn't exist.`);
        }
    }));
    thing.name = 'thing';
    console.log(thing.name);    // "thing"
    // - 抛出错误
    let unknown = thing.unknown;
  ```
- 这段代码创建了一个将代理作为原型的 thing 对象。 当 thing 对象中不存在指定键的时候,
  get 陷阱函数就会抛出错误。 在读取 thing.name 时,  因为该属性存在于 thing 对象中,
  get 陷阱函数没有被调用； 而当读取不存在的 thing.unknown 属性时,  get 陷阱函数
  才被调用了。
- 当最后一行代码执行时,  unknown 并不是 thing 的自有属性,  因此查找操作延续到了
  它的原型上,  于是 get 陷阱函数抛出了一个错误。 这种自定义行为对 JS 来说是非常有用的,
  因为它能够让 JS 像其他语言那样、 在访问不存在的属性时抛出错误,  而不是静默地返回
  undefined 。
- 要明白, 在这个示例中, 理解 trapTarget 和 receiver 是不同的对象很重要. 当代理被用作
  原型时, trapTarget 是原型对象, receiver 是实例对象. 在这种情况下, trapTarget 与
  target 相等, receiver 与 thing 相等.  这就使得你既能访问代理的原始目标对象, 也能
  访问操作将要涉及的对象.
#### 15.2 在原型上使用 set 陷阱
- 内部方法 [[Set]] 同样会查找对象的自有属性,  并在必要时继续对该对象的原型进行查找。
  当你对一个对象属性进行赋值时,  如果指定名称的自有属性存在,  值就会被赋在该属性上；
  而若该自有属性不存在,  则会继续检查对象的原型。 微妙之处在于： 尽管赋值操作在原型上
  继续进行,  但默认情况下它会在对象实例（ 而非原型） 上创建一个新的属性用于赋值,  无论
  同名属性是否存在于原型上。
- 为了更好地了解 set 陷阱函数何时会在原型上被调用、 而何时不会,  可研究下面这个展示了
  默认行为的示例:
  ```js
    let target = {};
    let thing = Object.create(new Proxy(target, {
        set(trapTarget, key, value, receiver) {
            return Reflect.set(trapTarget, key, value, receiver);
        }
    }));
    console.log(thing.hasOwnProperty("name")); // false

    // 触发了 `set` 代理陷阱
    thing.name = "thing";

    console.log(thing.name); // "thing"
    console.log(thing.hasOwnProperty("name")); // true

    // 没有触发 `set` 代理陷阱
    thing.name = "boo";

    console.log(thing.name); // "boo"
  ```
- 在本例中,  target 对象起初未拥有任何自有属性。 thing 对象把一个代理作为自身的原
  型,  并定义了一个 set 陷阱函数来捕获任意创建新属性的操作。 当 thing.name 被赋值为
  "thing" 时,  因为 thing 对象并不存在一个名为 name 的自有属性,  set 代理陷阱就被
  调用。 在 set 陷阱函数中,  trapTarget 参数等于 target ,  而 receiver 参数则等于
  thing 。 你可以将 receiver 作为第四个参数传递给 Reflect.set() 方法来实现默认的行
  为,  最终一个新的属性就在 thing 对象上被创建了。
- 一旦 thing 对象的 name 属性被创建完毕,  将 thing.name 另设为其他值就不会再触发原型
  上 set 代理陷阱,  因为此时 name 变成了自有属性,  [[Set]] 操作便不会再继续查找原型了. 
#### 15.3 在原型上使用 has 陷阱
- 可以回忆一下,  has 陷阱函数会拦截对象上 in 运算符的使用。 in 运算符首先查找对象
  上指定名称的自有属性； 如果不存在同名自有属性,  则会继续查找对象的原型； 如果原型上
  也不存在同名自有属性,  那么就会沿着原型链一直查找下去,  直到找到该属性、 或者没有更
  多原型可供查找时为止。
- has 陷阱函数只在原型链查找触及原型对象的时候才会被调用。 当使用代理作为原型时,  这
  只会在指定名称的自有属性不存在时发生。 例如：
  ```js
    let target = {};
    let thing = Object.create(new Proxy(target, {
        has(trapTarget, key) {
            return Reflect.has(trapTarget, key);
        }
    }));

    // 触发了 `has` 代理陷阱
    console.log("name" in thing); // false

    thing.name = "thing";
    // 没有触发 `has` 代理陷阱
    console.log("name" in thing); // true
  ```
- 此代码在 thing 的原型上创建了一个 has 代理陷阱。 has 陷阱函数并没有像 get 或
  set 陷阱函数那样传递一个 receiver 参数,  因为当 in 运算符被使用时,  对原型的查找是
  自动的。 相反的,  has 陷阱函数只能对 trapTarget 参数进行操作,  该参数等于 target 。
  本例中第一次使用 in 运算符的时候,  由于 thing 并不存在自有属性 name ,  于是 has
  陷阱函数就被调用了。 而当 thing.name 被赋值之后,  再次使用 in 运算符,  has 陷阱函
  数则不会被调用,  因为操作在找到 thing 的自有属性 name 后便已停止。
  这里的原型范例都围绕着使用 Object.create() 方法创建的对象。 然而若你想创建一个以代
  理为原型的对象,  流程会有些不同。
#### 15.4 将代理用作类的原型
- 类不能直接被修改为将代理用作自身的原型,  因为它们的 prototype 属性是不可写入的 (即: 
  类的 prototype 属性不可写)。 然而你可以使用一点变通手段, 利用继承来创建一个把代理
  作为自身原型的类。 首先你需要使用构造器函数创建一个 ES5 风格的类定义。 
  你可以将原型改写为一个代理,  这里有个例子:
  ```js
    function NoSuchProperty() {} 
    NoSuchProperty.prototype = new Proxy({}, {
        get(trapTarget, key, receiver) {
            throw new ReferenceError(`${key} doesn't exist`);
        }
    });
    let thing = new NoSuchProperty();

    // 由于 `get` 代理陷阱而抛出了错误
    let result = thing.name;
  ```
- NoSuchProperty 为将会被用于继承的基础类。 此函数的 prototype 属性不存在任
  何限制,  因此你可以将其改写为一个代理,  其中 get 陷阱函数被用于在属性缺失时抛出错误。
  thing 对象被创建为 NoSuchProperty 类的一个实例,  当访问不存在的 name 属性时, 
  错误就被抛出。
- 下一步是创建一个继承 NoSuchProperty 的类。 你可以简单使用第九章介绍过的 extends 语法
  , 来将代理引入该类的原型链,  就像这样:
  ```js
    function NoSuchProperty() {} 
    NoSuchProperty.prototype = new Proxy({}, {
        get(trapTarget, key, receiver) {
            throw new ReferenceError(`${key} doesn't exist`);
        }
    });
    class Square extends NoSuchProperty {
        constructor(length, width) {
            super();
            this.length = length;
            this.width = width;
        }
    } 
    let shape = new Square(2, 6);
    let area1 = shape.length * shape.width;
    console.log(area1); // 12

    // 由于 "wdth" 不存在而抛出了错误
    let area2 = shape.length * shape.wdth;
  ```
- Square 类继承了 NoSuchProperty 类,  因此该代理就被加入了 Square 类的原型链。 随后
  shape 对象被创建为 Square 类的一个实例,  让它拥有两个属性： length 与 width 。 由
  于 get 陷阱函数永远不会被调用,  因此能够成功读取这两个属性的值。 只有访问 shape 上
  不存在的属性时（ 例如这里的 shape.wdth 拼写错误） ,  才触发了 get 陷阱函数并导致错误
  被抛出。
- 这证明了该代理存在于 shape 的原型链中,  但这可能并不明显,  因为该代理不是 shape 的
  直接原型。 事实上,  该代理需要两步才能从 shape 的原型链上被找到。 你可以修改前面的
  例子来更清晰地领会这一点:
  ```js
    function NoSuchProperty() {} 
    // 对于将要用作原型的代理,  存储对其的一个引用
    let proxy = new Proxy({}, {
        get(trapTarget, key, receiver) {
            throw new ReferenceError(`${key} doesn't exist`);
        }
    });
    NoSuchProperty.prototype = proxy;
    class Square extends NoSuchProperty {
        constructor(length, width) {
            super();
            this.length = length;
            this.width = width;
        }
    } 
    let shape = new Square(2, 6);

    let shapeProto = Object.getPrototypeOf(shape);

    console.log(shapeProto === proxy); // false

    let secondLevelProto = Object.getPrototypeOf(shapeProto);

    console.log(secondLevelProto === proxy); // true
  ```
- 这个版本的代码将代理存储在一个名为 proxy 的变量中,  以便之后可以简单识别。 shape
  的原型是 Shape.prototype ,  它并不是一个代理。 然而 Shape.prototype 的原型却是
  一个从 NoSuchProperty 继承下来的代理。
- 继承行为在原型链上增加了一步,  明白这一点很重要,  因为在 proxy 变量上调用 get 陷阱
  函数的操作也需要多进行一步。 如果欲使用的属性存在于 Shape.prototype 上,  那么这就会
  防止 get 代理陷阱被调用,  正如此例: 
  ```js
    function NoSuchProperty() {} 
    NoSuchProperty.prototype = new Proxy({}, {
        get(trapTarget, key, receiver) {
            throw new ReferenceError(`${key} doesn't exist`);
        }
    });
    class Square extends NoSuchProperty {
        constructor(length, width) {
            super();
            this.length = length;
            this.width = width;
        } 
        getArea() {
        return this.length * this.width;
        }
    } 
    let shape = new Square(2, 6);
    let area1 = shape.length * shape.width;

    console.log(area1); // 12

    let area2 = shape.getArea();
    console.log(area2); // 12

    // 由于 "wdth" 不存在而抛出了错误
    let area3 = shape.length * shape.wdth;
  ```
- 此处的 Square 类拥有一个 getArea() 方法,  该方法被自动添加到 Square.prototype 上,
  因此当 shape.getArea() 被调用时,  对于 getArea() 方法的查找从 shape 实例上开始,  并
  延续到它的原型上。 由于在原型上找到了 getArea() 方法,  查找就停止了,  代理也没有被调用.
  在本例的条件下,  这正是你想要的行为,  而 getArea() 被调用时抛出错误则是不正确的。
- 尽管使用了一点额外的代码来创建一个类,  才让代理存在于该类的原型链上,  但当你确实需要
  这样的功能时,  这种付出仍然是值得的。  
#### 总结
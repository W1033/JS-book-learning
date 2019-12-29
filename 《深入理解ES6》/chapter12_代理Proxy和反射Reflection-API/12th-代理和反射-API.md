## Chapter 12 -- 代理(Proxy) 和 反射(Reflection) API
- ES6 添加了一些**内建对象**, 赋予开发者更多访问 JS 引擎的能力. 代理 (Proxy) 是一种
  可以拦截并改变底层 JavaScript 引擎操作的包装器，在新语言中通过它暴露内部运作的对象,
  从而让开发者可以创建内建的对象.

## 生词**
- **exotic [ɪg'zɒtɪk] --ajd.奇异的，外来的**
- **proxy ['prɒksɪ] --n.代理，代理人。 --adj.代理的**
- **reflection [rɪ'flekʃ(ə)n] --n.反射，影子**
- **reflect [rɪ'flekt]  --v.反映，体现，思考**
- **extensible [ek'stensɪbl] --adj.扩展，扩张**
- **extension [ɪk'stenʃ(ə)n] --n.扩展，延伸**
- **enumerate [ɪ'njuːməreɪt] --vt.列举，枚举**
- **trap [træp] --vt.陷阱，圈套**
- **revocable**
- **revoke**


## 内容 (Content)
#### 1.数组问题
- 在 ES6 出现以前, 开发者不能通过自己定义的对象模仿 JS 数组对象的行为方式. 当给数组的
  特定元素赋值时, 影响到该数组的 length 属性, 也可以通过 length 属性修改数组元素. 
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

#### 2.代理和反射
- 调用 `new Proxy()` 可创建代替其他目标(target)对象的代理，它虚拟化了目标，
  所以二者看起来功能一致。
- 代理(Proxy)可以拦截 JS 引擎内部目标的底层对象操作，这些底层操作被拦截后会触发响应
  特定操作的陷阱函数 (hint: 在陷阱函数内自己实现想要的功能)。
- 反射 API 以 Reflect 对象的形式出现, 反射对象中方法的默认特性与相同的底层操作一致
  -- **(1)**; <br/> 而代理 (Proxy) 可以覆写这些操作, 每个代理陷阱对应一个命名和
  参数都相同的 `Reflect` 方法 -- **(2)**. (Tip: (1) 和 (2) 为自己添加的注释)
    + (1) "反射对象中方法的默认特性"--就是下表中的第 3 列; "底层操作"--就是下表中的
      第 2 列, 也即 Object 对象上默认使用的操作方法, 比如: `delete` 操作符:
      删除对象的属性; `Object.keys()` 返回对象中所有可枚举的属性名; 
      `Object.getOwnPropertyNames()` 不考虑对象中属性的可枚举性一律返回. 等等...
    + (2) 下表中的 第 3 列 Reflect 对象上的方法可以操作对应的内建特性, 而 Proxy 对象
      上的各种代理陷阱方法(即下表的第 1 列) 又可以直接覆写第 2 列列出的内建特性, 
      代理陷阱对应一个命名和参数都跟 Reflect 对象相同的方法.
- 每个陷阱覆写 js 对象的一些内建特性，可以用他们拦截并修改这些特性. 如果仍需使用内建特性,
  则可以使用相应的反射 API 方法. 创建代理会让代理和反射 API 的关系变得清楚.
- Javascript 中的代理陷阱 表格: 
- |代理陷阱(Proxy Trap)|覆写的特性(Overrides the Behavior Of)|默认特性 (Default Behavior)|
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

#### 3.创建一个简单的代理
- 用 `Proxy` 构造函数创建代理需要传入 2 个参数: 
    + (1) `目标 (target)` 和
    + (2) `处理程序 (handler)`: 处理程序是定义一个或多个陷阱的对象, 在代理中, 
      除了专门为操作定义的陷阱外, 其余操作均使用默认特性. 不使用任何陷阱的处理程序
      等价于简单的转发代理, 就像这样: 
      ```js
        let target = {};
        let proxy = new Proxy(target, {});
        proxy.name = 'proxy';
        console.log(proxy.name);    // "proxy"
        console.log(target.name);    // "proxy"

        target.name = 'target';
        console.log(target.name);   // "target"
        console.log(proxy.name);    // "target"
      ```

#### 4.使用 `set` 陷阱函数验证属性 
- Tip: `set()/get()/has()...` 这些陷阱函数(代理陷阱) 是设置在 
  `new Proxy(target, handler)` 中的 `handler` 处理对象内的.
- 假设你想创建一个属性值是数字的对象, 对象中每新增一个属性都要加以验证, 如果不是数字
  必须抛出错误. 为了实现这个任务, 可以定义一个 set 陷阱来覆写设置值的默认特性. 
  set 陷阱接受 4 个参数:  
    + (1) `trapTarget`:   用于接收属性的对象 (要添加代理陷阱的目标).
    + (2) `key`:          要写入的属性键 (字符串 或 Symbol(符号)类型)
    + (3) `value`:        被写入属性的值
    + (4) `receiver`:     操作发生的对象 (通常是代理). {Tip: 这里所说的代理通常
      就是参数 (1) trapTarget: 要添加代理陷阱的对象}
- Reflect.set() 是 set 陷阱函数对应的反射方法和默认特性, 它和 set 代理陷阱一样也接受
  相同的 4 个参数, 以方便在陷阱中使用. 如果属性已设置陷阱应该返回 true, 如果未设置则
  返回 false. (Reflect.set() 方法基于操作是否成功来返回恰当的值.)
- set() 代理陷阱(函数)可以拦截写入属性的操作, get 代理陷阱可以拦截读取属性的操作.  
- 可以使用 set 并检查传入的值来验证属性值, 例如:
- ```javascript
    let tar = {
        name: "target"
    };
    let proxy = new Proxy(tar, {
        // - 4 个从参数见上面的文档解释
        // - receiver (本例中未使用) 等于 proxy.
        set(trapTarget, key, value, receiver) {
            // - 忽略已有属性，避免影响他们
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

    // - 可以为 name 赋一个非数值类型的值，因为该属性已经存在. 用于接收属性的
    //   对象上已有的非数字属性仍然可以被操作.
    proxy.name = "proxy";
    console.log(proxy.name);
    console.log(tar.name);

    // 抛出错误
    proxy.anotherName = "proxy";
  ```
- 这段代码定义了一个代理来验证添加到 target 的新属性, 当执行 proxy.count = 1 时, 
  set 陷阱被调用, 此时 trapTarget 的值等于 target, key 等于 count, value 等于 1
  , receiver (本例中未使用) 等于 proxy. 由于 target 上没有 count 属性, 因此代理
  继续将 value 值传入 isNaN(), 如果结果是 NaN, 则证明传入的属性值不是数字, 同时也抛出
  一个错误. 在这段代码中, count 被设置为 1, 所以代理调用 Reflect.set() 方法并传入
  陷阱接受的 4 个参数来添加新属性.  

#### 5.使用 `get` 陷阱函数验证对象结构 (Object Shape)
- JS 有一个时常令人感到困惑的特殊行为, 即读取不存在的属性时不会抛出错误, 而是用 
  undefined 代替被读取属性的值, 就像下面这个示例一样:
  ```js
    let target = {};
    console.log(target.name);   // undefined
  ```
- 对象结构是指对象中所有可用属性和方法的集合.
- 因为只有当读取属性时才会检验属性, 所以无论对象中是否存在某个属性, 都可以通过 get 陷阱
  来检测, 它接受 3 个参数: 
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

#### 6.使用 `has` 陷阱函数隐藏已有属性
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

#### 7.使用 `deleteProperty` 陷阱函数防止刪除屬性
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
- 这段代码与 has 陷阱函数的例子相似，在 deleteProperty 陷阱函数中检查 key
  的值是否为 "value". 如果是，返回 false; 否则通过调用 Reflect.deleteProperty() 
  方法来进行默认的操作。 value 属性是不能被删除的，因为该操作被 proxy 对象拦截；
  而 name 则能如期被删除。这么做允许你在严格模式下保护属性避免其被删除，并且不会抛出错误。

#### 8.原型代理的陷阱函数
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
- 8.1 原型代理的陷阱函数如何工作
    + 这些陷阱函数受到一些限制。首先，getPrototypeOf 陷阱函数的返回值必须是一个对象
      或者 null ，其他任何类型的返回值都会引发“运行时”错误。对于返回值的检测确保了
      Object.getPrototypeOf() 会返回预期的结果。类似的，setPrototypeOf 必须在
      操作没有成功的情况下返回 false ，这样会让 Object.setPrototypeOf() 抛出错误；
      而若 setPrototypeOf 的返回值不是 false ，则 Object.setPrototypeOf() 就会
      认为操作已成功。
    + 下面这个例子通过返回 null 隐藏了代理对象的原型, 并且使得该原型不可被修改: 
      示例见: `08.1-原型代理的陷阱函数如何工作.js`
- 8.2 为什么有 2 组方法
    + **Tip: 本章的翻译, 个人感觉 `深入理解ES6.pdf` 电子书, 比纸质书翻译的更好**
      **所以, 接下来的所有文字描述的笔记都直接见此电子书.**
    + 关于 Reflect.getPrototypeOf() 与 Reflect.setPrototypeOf(), 它们看起来与
      Object.getPrototypeOf() 和 Object.setPrototypeOf() 非常相似. 然而虽然
      两组方法分别进行着相似的操作, 它们之间仍然存在显著差异.
    + 首先, ......
    + Reflect.getPrototypeOf() 方法在接收到的参数不是一个对象时会抛出错误， 而
      Object.getPrototypeOf() 则会在操作之前先将参数值转换为一个对象。 如果你分别
      传入一个数值给这两个方法， 会得到截然不同的结果：
      ```js
        let result1 = Object.getPrototypeOf(1);
        console.log(result1 === Number.prototype);  // true

        // - 抛出错误
        // TypeError: Reflect.getPrototypeOf called on non-object
        // Reflect.getPrototypeOf(1);
      ```
    + 在上一节 8.1 的第一个例子中, 当 setPrototypeOf 代理陷阱返回 false 时, 它导致
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
            // - result02 保存利用 setPrototypeOf() 方法给 target02 设置一个
            //   对象字面量({}) 为其原型的成功值 true
            let result02 = Reflect.setPrototypeOf(target02, {});
            console.log(result02);  // true;
        })();
      ```
    + 虽然 Object 对象与 Reflect 对象貌似存在重复的方法, 但在代理陷阱内却必须使用 
      Reflect对象上的方法.
    + 在使用代理时, 这两组方法都会调用 getPrototypeOf 与 setPrototypeOf 陷阱函数   

#### 9.对象可扩展性陷阱
- ES5 通过 Object.preventExtensions() 与 Object.isExtensible() 方法给对象增加了
  可扩展性。 而 ES6 则通过 preventExtensions 与 isExtensible 陷阱函数允许代理拦截
  对于底层对象的方法调用。 这两个陷阱函数都接受名为 trapTarget 的单个参数， 此参数代表
  方法在哪个对象上被调用。 isExtensible 陷阱函数必须返回一个布尔值用于表明目标对象
  是否可被扩展， 而 preventExtensions 陷阱函数也需要返回一个布尔值， 用于表明操作
  是否已成功。
- 同时也存在 Reflect.preventExtensions() 与 Reflect.isExtensible() 方法， 用于
  实现默认的行为。 这两个方法都返回布尔值， 因此它们可以在对应的陷阱函数内直接使用。
- 9.1 两个基础范例
  
    + 
- 9.2 重复的可擴展性方法
    + Object.isExtensible() 方法和 Reflect.isExtensible() 方法非常相似, 只有当
      传入非对象值是, Object.isExtensible() 返回 false 而 Reflect.isExtensible()
      则抛出一个错误. 例如:
      ```js
        let result01 = Object.isExtensible(2);
        console.log(result01);  // false

        // - 给不存在的属性赋值会抛出错误
        let result02 = Reflect.isExtensible(2);
      ```
    + Object.preventExtensions() 方法和 Reflect.preventExtensions() 方法
      同上面 2 个方法非常相似: 
      ```js
        let result01 = Object.preventExtension(2);
        console.log(result1); // 2

        let target = {};
        let result2 = Reflect.preventExtensions(target);
        console.log(result2); // true

        // 抛出错误
        let result3 = Reflect.preventExtensions(2);
      ```

#### 10.属性描述符陷阱
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
- defineProperty 陷阱需要在操作成功后返回 true，否则返回 false,
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
##### 10.1 給 Object.defineProperty() 添加限制
+ defineProperty 陷阱函数要求你返回一个布尔值用于表示操作是否已成功。 当它返回
    true 时， Object.defineProperty() 会正常执行； 而如果它返回了 false ， 则
    Object.defineProperty() 会抛出错误。 你可以使用该功能来限制哪些属性可以被
    Object.defineProperty() 方法定义。 例如， 如果想阻止定义符号类型的属性， 你
    可以检查传入的键是否为字符串， 若不是则返回 false ， 就像这样:
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
+ Note: 你可以让陷阱函数返回 true ， 同时不去调用 Reflect.defineProperty() 
    方法， 这样 Object.defineProperty() 就会静默失败， 如此便可在未实际去定义属性
    的情况下抑制运行错误。  
##### 10.2 描述符对象的限制
+ 为了确保 Object.defineProperty() 与 Object.getOwnPropertyDescriptor() 
    方法的行为一致， 传递给 defineProperty 陷阱函数的描述符对象必须是正规的。 出于
    同一原因，getOwnPropertyDescriptor 陷阱函数返回的对象也始终需要被验证。
+ 任意对象都能作为 Object.defineProperty() 方法的第三个参数; 然而传递给
    defineProperty 陷阱函数的描述符对象参数， 则只有 `enumerable`、`configurable`
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
+ 此代码中调用 Object.defineProperty() 时， 在第三个参数上使用了一个非标准的 
    name 属性。 当 defineProperty 陷阱函数被调用时， descriptor 对象不会拥有
    name 属性， 却拥有一个 value 属性。 这是因为 descriptor 对象实际上并不是
    原先传递给 Object.defineProperty() 方法的第三个参数， 而是一个新的对象， 其中
    只包含了被许可的属性 (因此 name 属性被丢弃了). Reflect.defineProperty() 方法
    同样也会忽略描述符上的非标准属性.
+ getOwnPropertyDescriptor 陷阱函数有一个微小差异， **要求返回值必须是**`null`
    、`undefined` 或者是`一个对象`。 如果返回值是一个对象， 则对象的属性只能是
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
    被调用时， getOwnPropertyDescriptor 的返回值会触发一个错误。 这个限制保证了
    Object.getOwnPropertyDescriptor() 的返回值总是拥有可信任的结构， 无论是否
    使用了代理。
### 10.3 重复的描述符方法
- ES6 再次出现了令人困惑的相似方法， Object.defineProperty() 和
  Object.getOwnPropertyDescriptor() 方法貌似分别与 Reflect.defineProperty()
  和 Reflect.getOwnPropertyDescriptor() 方法相同。 正如本章之前讨论过的那些
  配套方法一样，这些方法也存在一些微小但重要的差异.
- *10.3.1 defineProperty() 方法 和 Reflect.defineProperty() 方法*
    + Object.defineProperty() 方法与 Reflect.defineProperty() 方法几乎一模一样,
      只是返回值有区别。 前者返回第一个参数， 而后者的返回值与操作有关, 成功时返回 true、
      失败时返回false 。 例如：
      ```js
        let target = {};
        let result1 = Object.defineProperty(target, "name", { value: "target "});
        console.log(target === result1); // true
        let result2 = Reflect.defineProperty(target, "name", { value: "reflect" });
        console.log(result2); // true
      ```
    + 调用 Object.defineProperty() 时传入 target, 返回值也是 target. 调用
      Reflect.defineProperty()时传入 target，返回值是 true, 表示操作成功. 由于
      defineProperty 代理陷阱需要返回一个布尔值, 因此必要时最好使用
      Reflect.defineProperty() 来实现默认的行为.
+ *10.3.2 getOwnPropertyDescriptor() 方法和 Reflect.getOwnPropertyDescriptor()*
    + Object.getOwnPropertyDescriptor() 方法会在接收的第一个参数是一个基本类型值时,
      将该参数转换为一个对象。 另一方面， Reflect.getOwnPropertyDescriptor() 方法
      则会在第一个参数是基本类型值的时候抛出错误。 下面这个例子展示了二者的特性：
      ```js
        let descriptor1 = Object.getOwnPropertyDescriptor(2, "name");
        console.log(descriptor1); // undefined
        // 抛出错误
        let descriptor2 = Reflect.getOwnPropertyDescriptor(2, "name");
      ```
    + 由于 Object.getOwnPropertyDescriptor() 方法将数值 2 强制转换为一个不含 name
      属性的对象, 因此它返回 undefined, 这是当对象中没有指定的 name 属性时的标准行为.
      然而当调用 Reflect.getOwnPropertyDescriptor() 时立即抛出一个错误， 因为该方法
      不接受 基本类型值(原始值) 作为它的第一个参数。  

#### 11.ownKeys(自身键) 陷阱函数 (Tip: 这节书本翻译不如电子文档)
- ownKeys 代理陷阱可以拦截内部方法 `[[OwnPropertyKeys]]`(自身属性键), 并允许
  **返回一个数组用于重写默认行为.** 返回的这个数组被用于 4 个方法: 
  (1) `Object.key()`.
  (2) `Object.getOwnPropertyNames()` (取得自身属性名).
  (3) `Object.getOwnPropertySymbols()` (取得自身 Symbol 属性)
  (4) `Object.assign()`
  , 其中 Object.assign() 方法会使用该数组来决定哪些属性会被复制.
- ownKeys 陷阱函数的默认行为由 `Reflect.ownKeys()` 方法实现, 
  **它会返回一个由全部自由属性构成的数组, 无论键的类型是字符串还是 Symbol(符号).**
  Object.getOwnPropertyNames() 方法与 Object.keys() 方法会将符号值从该数组中
  过滤出去; 相反, Object.getOwnPropertySymbols() 会将字符串值过滤掉; 而 
  Object.assign() 方法会使用数组中所有的字符串值域 Symbol 值.

#### 12.函數代理中的 apply 和 construct 陷阱
- 12.1 验证函数的参数
- 12.2 不用 new 调用构造函数
- 12.3 覆写抽象基类构造函数
- 12.4 可调用的类构造函数

#### 13.可被撤销的代理

#### 14.解决数组的问题
- 14.1 检测数组的索引
- 14.2 添加新元素时增加 length 的值
- 14.3 减少 length 的值来删除元素
- 14.4 实现 MyArray 类

#### 15.将代理用作原型
- 15.1 在原型上使用 get 陷阱
- 15.2 在原型上使用 set 陷阱
- 15.3 在原型上使用 has 陷阱
- 15.4 将代理用作类的原型

#### 总结
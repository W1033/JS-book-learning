## Chapter 12 -- 代理(Proxy) 和 反射(Reflection) API
- 代理 (Proxy) 是一种可以拦截并改变底层 JavaScript 引擎操作的包装器，在新语言中通过它
  暴露内部运作的对象, 从而让开发者可以创建内建的对象.

## 生词**
- **exotic [ɪg'zɒtɪk] --ajd.奇异的，外来的**
- **proxy ['prɒksɪ] --n.代理，代理人。 --adj.代理的**
- **reflection [rɪ'flekʃ(ə)n] --n.反射，影子**
- **reflect [rɪ'flekt]  --v.反映，体现，思考**
- **extensible [ek'stensɪbl] --adj.扩展，扩张**
- **extension [ɪk'stenʃ(ə)n] --n.扩展，延伸**
- **enumerate [ɪ'njuːməreɪt] --vt.列举，枚举**
- **trap [træp] --vt.陷阱，圈套**


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
      `Object.getOwnPropertyNames()` 不考虑对象的可枚举性一律返回. 等等...
    + (2) 下表中的 第 3 列 Reflect 对象上的方法可以操作对应的内建特性, 而 Proxy 对象
      上的各种代理陷阱方法(即下表的第 1 列) 又可以直接覆写第 2 列列出的内建特性, 
      代理陷阱对应一个命名和参数都跟 Reflect 对象相同的方法.
- 每个陷阱覆写 js 对象的一些内建特性，可以用他们拦截并修改这些特性. 如果仍需使用内建特性,
  则可以使用相应的反射 API 方法. 创建代理会让代理和反射 API 的关系变得清楚.
- Javascript 中的代理陷阱 <br/>
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

#### 4.使用 set 陷阱函数验证属性 
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

#### 5.使用 get 陷阱函数验证对象结构 (Object Shape)
- JS 有一个时常令人感到困惑的特殊行为, 即读取不存在的属性时不会抛出错误, 而是用 
  undefined 代替被读取属性的值, 就像下面这个示例一样:
  ```js
    let target = {};
    console.log(target.name);   // undefined
  ```
- 对象结构是指对象中所有可用属性和方法的集合.
- 因为只有当读取属性时才会检验属性, 所以无论对象中是否存在某个属性, 都可以通过 get 陷阱
  来检测, 它接受 3 个参数: 
    + (1) trapTarget: 被读取属性的源对象 (代理的目标)
    + (2) key: 要读取的属性键 (字符串或 Symbol)
    + (3) receiver: 操作发生的对象 (通常是代理)
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
    })
    // - 添加一个属性, 程序仍正常运行
    proxy.name = 'proxy';
    console.log(proxy.name);    // "proxy"
    // - 如果属性不存在, 则抛出错误
    console.log(proxy.age);     // TypeError: 属性 age 不存在
  ```

#### 6.使用 has 陷阱函数隐藏已有属性

#### 7.使用 deleteProperty 陷阱函数防止刪除屬性
- ```javascript
    let target = {
        name: 'target',
        value: 32
    };

    let proxy = new Proxy(target, {
        // trapTarget: 要删除属性的对象 (代理的目标)
        // key: 要删除的属性键 (字符串或 Symbol)
        deleteProperty: function(trapTarget, key) {
            if (key === 'value') {
                return false
            } else {
                return Reflect.deleteProperty(trapTarget, key)
            }
        }
    });

    // 尝试删除 proxy.value
    console.log('value' in proxy);  // node

    let result1 = delete proxy.value;
    console.log(result1);   // false

    console.log('value' in proxy);  // true

    console.log('name' in proxy);   // true
    // 尝试删除 proxy.name
    let result2 = delete proxy.name;
    console.log(result2);   // true

    console.log('name' in proxy);   // false
  ```

#### 8.原型代理陷阱函数
- 原型代理陷阱的運行機制
- 為什麼有两组方法?

#### 9.对象可扩展性陷阱函数
- 两个基础范例
- 重复的可擴展性方法

#### 10.属性描述符的陷阱函数
- 給 Object.defineProperty() 添加限制
- 描述符对象的限制
- 重复的描述符方法
    + defineProperty() 方法
    + getOwnPropertyDescriptor() 方法

#### 11.ownKeys 陷阱函数

#### 12.函數代理中的 apply 和 construct 陷阱
- 验证函数的参数
- 不用 new 調用構造函數
- 覆蓋抽象基类构造函数
- 可调用的类构造函数

#### 13.可被撤销的代理

#### 14.解决数组的问题
- 检测数组的索引
- 添加新元素时增加 length 的值
- 减少 length 的值来删除元素
- 实现 MyArray 类

#### 15.将代理用作原型
- 在原型上使用 get 陷阱函数
- 在原型上使用 set 陷阱函数
- 在原型上使用 has 陷阱函数
- 将代理用作类的原型

#### 总结
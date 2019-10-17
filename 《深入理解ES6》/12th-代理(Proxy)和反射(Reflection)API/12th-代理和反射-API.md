## Chapter 12 -- 代理(Proxy) 和 反射(Reflection) API
- 代理 (Proxy) 是一种可以拦截并改变底层 JavaScript 引擎操作的包装器，在新语言中通过它
  暴露内部运行的对象。

## 生词**
- **exotic [ɪg'zɒtɪk] --ajd.奇异的，外来的**
- **proxy ['prɒksɪ] --n.代理，代理人。 --adj.代理的**
- **reflection [rɪ'flekʃ(ə)n] --n.反射，影子**
- **reflect [rɪ'flekt]  --v.反映，体现，思考**
- **extensible [ek'stensɪbl] --adj.扩展，扩张**
- **extension [ɪk'stenʃ(ə)n] --n.扩展，延申**
- **enumerate [ɪ'njuːməreɪt] --vt.列举，枚举**
- **trap [træp] --vt.陷阱，圈套**


## 目录 (Catalog)
#### 1.数组问题
- 在 ES6 中数组被认为是 奇异对象(exotic object, 与普通对象相对。)

#### 2.代理和反射
- 通过调用 `new Proxy()` 可创建代替其他目标(target)对象的代理，它虚拟化了目标，
  所以二者看起来功能一致。代理可以拦截 js 引擎内部目标的底层对象操作，这些底层操作被
  拦截后会触发响应特定操作的陷阱函数。
- 反射 API 以 Reflection 对象的形式出现，对象中方法的默认特性与相同的底层操作一致，而
  代理可以覆写这些操作，每个代理陷阱对应一个命名和参数都相同的 `Reflect` 方法。
- Javascript 中的代理陷阱
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
  + 每个陷阱覆写 js 对象的一些内建特性，可以用他们拦截并修改这些特性。
 
#### 3.创建一个简单的代理

#### 4.使用 set 陷阱函数验证属性值
- 假设你想要创建一个对象，并要求其属性值只能是数值，这就意味着该对象的每个新增属性都要被验证，
  并且在属性值不为数值类型时应当抛出错误。为此你需要定义 set 陷阱函数来重写设置属性值时的
  默认行为，该陷阱函数能接受四个参数:
    + (1) trapTarget:   将接受属性的对象 (即代理的目标对象)
    + (2) key:          需要写入的属性的键 (字符串类型或符号类型)
    + (3) value:        将被写入属性的值
    + (4) receiver:     操作发生的对象 (通常是代理对象)
- Reflect.set() 是 set 陷阱函数对应的反射方法，同时也是 set 操作的默认行为。
- Reflect.set() 方法与 set 陷阱函数一样，能接受这四个参数，让该方法能在陷阱函数内部
  被方便使用。该陷阱函数需要在属性被设置完成的情况下返回 true, 否则就要返回 false, 而 Reflect.set() 也会基于操作是否成功而返回相应的结果。
- 你需要使用 set 陷阱函数来拦截传入的 value 值，以便对属性值进行验证。这里有个例子:
- ```javascript
    let tar = {
        name: "target"
    };
    let proxy = new Proxy(tar, {
        // trapTarget 的值等于 tar 对象;
        // key 的值是字符串 "count";
        // value 的值是 1
        // receiver 的值是 proxy (该参数在本例中并没有被使用)
        set(trapTarget, key, value, receiver) {
            // 忽略已有属性，避免影响他们
            if (!trapTarget.hasOwnProperty(key)) {
                if (isNaN(value)) {
                    throw new TypeError("Property must be a number.");
                }
            }
            // 添加属性
            return Reflect.set(trapTarget, key, value, receiver);
        }
    });

    // 添加一个新属性
    proxy.count = 1;
    console.log(proxy.count);
    console.log(tar.count);

    // 你可以为 name 赋一个非数值类型的值，因为该属性已经存在
    proxy.name = "proxy";
    console.log(proxy.name);
    console.log(tar.name);

    // 抛出错误
    proxy.anotherName = "proxy";
  ```

#### 5.使用 get 陷阱函数驗證對象結構 (Object Shape)

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
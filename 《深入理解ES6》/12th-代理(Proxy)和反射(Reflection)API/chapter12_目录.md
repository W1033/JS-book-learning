# 第 12 章 代理 (Proxy) 和 反射 (Reflection) API

- 1.数组问题
- 2.代理和反射
- 3.创建一个简单的代理
- 4.使用 set 陷阱函数验证属性值
- 5.使用 get 陷阱函数驗證對象結構 (Object Shape)
- 6.使用 has 陷阱函数隐藏已有属性
- 7.使用 deleteProperty 陷阱函数防止刪除屬性
- 8.原型代理陷阱函数
    + 原型代理陷阱的運行機制
    + 為什麼有两组方法？
- 9.对象可扩展性陷阱函数
    + 两个基础范例
    + 重复的可擴展性方法
- 10.属性描述符的陷阱函数
    + 給 Object.defineProperty() 添加限制
    + 描述符对象的限制
    + 重复的描述符方法
        + defineProperty() 方法
        + getOwnPropertyDescriptor() 方法
- 11.ownKeys 陷阱函数
- 12.函數代理中的 apply 和 construct 陷阱
    + 验证函数的参数
    + 不用 new 調用構造函數
    + 覆蓋抽象基类构造函数
    + 可调用的类构造函数
- 13.可被撤销的代理
- 14.解决数组的问题
    + 检测数组的索引
    + 添加新元素时增加 length 的值
    + 减少 length 的值来删除元素
    + 实现 MyArray 类
- 15.将代理用作原型
    + 在原型上使用 get 陷阱函数
    + 在原型上使用 set 陷阱函数
    + 在原型上使用 has 陷阱函数
    + 将代理用作类的原型
- 总结



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

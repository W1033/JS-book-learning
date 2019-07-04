/**
 * #  Chapter 12 -- 代理(Proxy) 和 反射(Reflection) API
 *  > 代理 (Proxy) 是一种可以拦截并改变底层 JavaScript 引擎操作的包装器，在新语言中通过它
 *    暴露内部运行的对象。
 */

/*
 * > **生词**
 * - exotic [ɪg'zɒtɪk] ~~~ajd.奇异的，外来的
 * - proxy ['prɒksɪ] ~~~n.代理，代理人。 ~~~adj.代理的
 * - reflection [rɪ'flekʃ(ə)n] ~~~n.反射，影子
 * - reflect [rɪ'flekt] ~~~ v.反映，体现，思考
* - extensible [ek'stensɪbl] ~~~adj.扩展，扩张
 * - extension [ɪk'stenʃ(ə)n] ~~~n.扩展，延申
 * - enumerate [ɪ'njuːməreɪt] ~~~vt.列举，枚举
 * - trap [træp] ~~~vt.陷阱，圈套
 */



/**
 * ### 数组问题
 *  > 在 ES6 中数组被认为是 奇异对象(exotic object, 与普通对象相对。)
 */




/**
 * ### 代理和反射
 *  - 调用 new Proxy() 可创建代替其他目标 (target) 对象的代理，它虚拟化了目标，所以二者看
 *    起来功能一致。
 *  - 代理可以拦截 JavaScript 引擎内部目标的底层对象操作，这些底层操作被拦截后会触发响应特定
 *    操作的陷阱函数。
 *  - 反射 API 以 Reflection 对象的形式出现，对象中方法的默认特性与相同的底层操作一致，而
 *    代理可以覆写这些操作，每个代理陷阱对应一个命名和参数都相同的 Reflect 方法。
 *  - Javascript 中的代理陷阱
 *    |代理陷阱(Proxy Trap)|覆写的特性(Overrides the Behavior Of)|默认特性 (Default Behavior)|
 *    |--------------------------|---------------------------|------------------|
 *    |`get`                     | 读取一个属性                | `Reflect.get()` |
 *    |`set`                     | 写入一个属性                | `Reflect.set()` |
 *    |`has`                     | `in` 操作符                | `Reflect.has()` |
 *    |`deleteProperty`          | `delete` 操作符            | `Reflect.deleteProperty()` |
 *    |`getPrototypeOf`          | `Object.getPrototypeOf()` | `Reflect.getPrototypeOf()` |
 *    |`setPrototypeOf`          | `Object.setPrototypeOf()` | `Reflect.setPrototypeOf()` |
 *    |`isExtensible`            | `Object.isExtensible()`   | `Reflect.isExtensible()` |
 *    |`preventExtensions`       | `Object.preventExtensions()` | `Reflect.preventExtensions()` |
 *    |`getOwnPropertyDescriptor`| `Object.getOwnPropertyDescriptor()` | `Reflect.getOwnPropertyDescriptor()` |
 *    |`defineProperty`          | `Object.defineProperty()` | `Reflect.defineProperty` |
 *    |`ownKeys`                 | `Object.keys`, `Object.getOwnPropertyNames()`, `Object.getOwnPropertySymbols()` | `Reflect.ownKeys()` |
 *    |`apply`                   | 调用一个函数 | `Reflect.apply()` |
 *    |`construct`               | 用 `new` 调用一个函数 | `Reflect.construct()` |
 *    + 每个陷阱覆写 js 对象的一些内建特性，可以用他们拦截并修改这些特性。
 */

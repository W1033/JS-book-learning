## 引言

在上一篇文章中介绍了如何实现一个深拷贝，分别说明了对象、数组、循环引用、引用丢失、`Symbol` 和递归爆栈等情况下的深拷贝实践，今天我们来看看 `Lodash` 如何实现上述之外的函数、正则、Date、Buffer、Map、Set、原型链等情况下的深拷贝实践。本篇文章源码基于 `Lodash` 4.17.11 版本。

更多内容请查看 [GitHub](https://github.com/yygmind/blog)

## 整体流程

### 入口

入口文件是 `cloneDeep.js`，直接调用核心文件 `baseClone.js` 的方法。

```
// 木易杨
const CLONE_DEEP_FLAG = 1
const CLONE_SYMBOLS_FLAG = 4

function cloneDeep(value) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
}
```

第一个参数是需要拷贝的对象，第二个是位掩码（Bitwise），关于位掩码的详细介绍请看下面拓展部分。

### baseClone 方法

然后我们进入 `./.internal/baseClone.js` 路径查看具体方法，主要实现逻辑都在这个方法里。

先介绍下该方法的参数 `baseClone(value, bitmask, customizer, key, object, stack)`

- value：需要拷贝的对象
- bitmask：位掩码，其中 1 是深拷贝，2 拷贝原型链上的属性，4 是拷贝 Symbols 属性
- customizer：定制的 `clone` 函数
- key：传入 value 值的 key
- object：传入 value 值的父对象
- stack：Stack 栈，用来处理循环引用

我将分成以下几部分进行讲解，可以选择自己感兴趣的部分阅读。

- 位掩码
- 定制 `clone` 函数
- 非对象
- 数组 & 正则
- 对象 & 函数
- 循环引用
- Map & Set
- Symbol & 原型链

### baseClone 完整代码

这部分就是核心代码了，各功能分割如下，详细功能实现部分将对各个功能详细解读。

```
// 木易杨
function baseClone(value, bitmask, customizer, key, object, stack) {
    let result

    // 标志位
    const isDeep = bitmask & CLONE_DEEP_FLAG		// 深拷贝，true
    const isFlat = bitmask & CLONE_FLAT_FLAG		// 拷贝原型链，false
    const isFull = bitmask & CLONE_SYMBOLS_FLAG	// 拷贝 Symbol，true

    // 自定义 clone 函数
    if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value)
    }
    if (result !== undefined) {
        return result
    }

    // 非对象  
    if (!isObject(value)) {
        return value
    }
    
    const isArr = Array.isArray(value)
    const tag = getTag(value)
    if (isArr) {
        // 数组
        result = initCloneArray(value)
        if (!isDeep) {
            return copyArray(value, result)
        }
    } else {
        // 对象
        const isFunc = typeof value == 'function'

        if (isBuffer(value)) {
            return cloneBuffer(value, isDeep)
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
            result = (isFlat || isFunc) ? {} : initCloneObject(value)
            if (!isDeep) {
                return isFlat
                    ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
                	: copySymbols(value, Object.assign(result, value))
            }
        } else {
            if (isFunc || !cloneableTags[tag]) {
                return object ? value : {}
            }
            result = initCloneByTag(value, tag, isDeep)
        }
    }
    // 循环引用
    stack || (stack = new Stack)
    const stacked = stack.get(value)
    if (stacked) {
        return stacked
    }
    stack.set(value, result)

    // Map
    if (tag == mapTag) {
        value.forEach((subValue, key) => {
            result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack))
        })
        return result
    }

    // Set
    if (tag == setTag) {
        value.forEach((subValue) => {
            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack))
        })
        return result
    }

    // TypedArray
    if (isTypedArray(value)) {
        return result
    }

    // Symbol & 原型链
    const keysFunc = isFull
    	? (isFlat ? getAllKeysIn : getAllKeys)
    	: (isFlat ? keysIn : keys)

    const props = isArr ? undefined : keysFunc(value)
    
    // 遍历赋值
    arrayEach(props || value, (subValue, key) => {
        if (props) {
            key = subValue
            subValue = value[key]
        }
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
    })
    
    // 返回结果
    return result
}
```

## 详细功能实现

### 位掩码

上面简单介绍了位掩码，参数定义如下。

```
// 木易杨
// 主线代码
const CLONE_DEEP_FLAG = 1		// 1 即 0001，深拷贝标志位
const CLONE_FLAT_FLAG = 2		// 2 即 0010，拷贝原型链标志位，
const CLONE_SYMBOLS_FLAG = 4	// 4 即 0100，拷贝 Symbols 标志位
```

位掩码用于处理同时存在多个布尔选项的情况，其中**掩码中的每个选项的值都等于 2 的幂**。相比直接使用变量来说，优点是可以节省内存（1/32）（来自[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)）

```
// 木易杨
// 主线代码
// cloneDeep.js 添加标志位，1 | 4 即 0001 | 0100 即 0101 即 5
CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG

// baseClone.js 取出标志位
let result // 初始化返回结果，后续代码需要，和位掩码无关
const isDeep = bitmask & CLONE_DEEP_FLAG 	// 5 & 1 即 1 即 true
const isFlat = bitmask & CLONE_FLAT_FLAG	// 5 & 2 即 0 即 false
const isFull = bitmask & CLONE_SYMBOLS_FLAG // 5 & 4 即 4 即 true
```

常用的基本操作如下

- `a | b`：添加标志位 a 和 b
- `mask & a`：取出标志位 a
- `mask & ~a`：清除标志位 a
- `mask ^ a`：取出与 a 的不同部分

```
// 木易杨
var FLAG_A = 1; // 0001
var FLAG_B = 4; // 0100

// 添加标志位 a 和 b => a | b
var mask = FLAG_A | FLAG_B => 0101 => 5

// 取出标志位 a => mask & a
mask & FLAG_A => 0001 => 1
mask & FLAG_B => 0100 => 4

// 清除标记位 a => mask & ~a
mask & ~FLAG_A => 0100 => 4

// 取出与 a 的不同部分 => mask ^ a
mask ^ FLAG_A => 0100 => 4
mask ^ FLAG_B => 0001 => 1
FLAG_A ^ FLAG_B => 0101 => 5
```

### 定制 `clone` 函数

```
// 木易杨
// 主线代码
if (customizer) {
	result = object ? customizer(value, key, object, stack) : customizer(value)
}
if (result !== undefined) {
    return result
}
```

上面代码比较清晰，存在定制 `clone` 函数时，如果存在 value 值的父对象，就传入 `value、key、object、stack` 这些值，不存在父对象直接传入 `value` 执行定制函数。函数返回值 `result` 不为空则返回执行结果。

这部分是为了定制 `clone` 函数暴露出来的方法。

### 非对象

```
// 木易杨
// 主线代码
//判断要拷贝的值是否是对象，非对象直接返回本来的值
if (!isObject(value)) {
    return value;
}

// ../isObject.js
function isObject(value) {
    const type = typeof value;
    return value != null && (type == 'object' || type ='function');
}
```

这里的处理和我在【进阶3-3】的处理一样，有一点不同在于对象的判断中加入了 `function`，对于函数的拷贝详见下面函数部分。

### 数组 & 正则

```
// 木易杨
// 主线代码
const isArr = Array.isArray(value)
const hasOwnProperty = Object.prototype.hasOwnProperty

if (isArr) {
    // 数组
    result = initCloneArray(value)
    if (!isDeep) {
        return copyArray(value, result)
    }
} else {
    ... // 非数组，后面解析
}

// 初始化一个数组
function initCloneArray(array) {
  	const { length } = array
    // 构造相同长度的新数组
  	const result = new array.constructor(length)

  	// 正则 `RegExp#exec` 返回的数组
  	if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
   	 	result.index = array.index
    	result.input = array.input
  	}
  	return result
}
    
// ... 未完待续，最后部分有数组遍历赋值    
```

传入的对象是数组时，构造一个相同长度的数组 `new array.constructor(length)`，这里相当于 `new Array(length)`，因为 `array.constructor === Array`。

```
// 木易杨
var a = [];
a.constructor === Array; // true

var a = new Array;
a.constructor === Array // true
```

如果存在正则 `RegExp#exec` 返回的数组，拷贝属性 `index` 和 `input`。判断逻辑是 1、数组长度大于 0，2、数组第一个元素是字符串类型，3、数组存在 `index` 属性。

```
// 木易杨
if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index
    result.input = array.input
}
```

其中正则表达式 `regexObj.exec(str)` 匹配成功时，返回一个数组，并更新正则表达式对象的属性。返回的数组将完全匹配成功的文本作为第一项，将正则括号里匹配成功的作为数组填充到后面。匹配失败时返回 `null`。

```
// 木易杨
var re = /quick\s(brown).+?(jumps)/ig;
var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
console.log(result);
// [
//	0: "Quick Brown Fox Jumps" 	// 匹配的全部字符串
//	1: "Brown"					// 括号中的分组捕获
//	2: "Jumps"
//	groups: undefined
//	index: 4					// 匹配到的字符位于原始字符串的基于0的索引值
//	input: "The Quick Brown Fox Jumps Over The Lazy Dog" // 原始字符串
//	length: 3
// ]
```

如果不是深拷贝，传入`value` 和 `result`，直接返回浅拷贝后的数组。这里的浅拷贝方式就是循环然后复制。

```
// 木易杨
if (!isDeep) {
	return copyArray(value, result)
}

// 浅拷贝数组
function copyArray(source, array) {
  let index = -1
  const length = source.length
  array || (array = new Array(length))
  while (++index < length) {
    array[index] = source[index]
  }
  return array
}
```

### 对象 & 函数

```
// 木易杨
// 主线代码
const isArr = Array.isArray(value)
const tag = getTag(value)
if (isArr) {
    ... // 数组情况，详见上面解析
} else {
    // 函数
    const isFunc = typeof value == 'function'

    // 如果是 Buffer 对象，拷贝并返回
    if (isBuffer(value)) {
        return cloneBuffer(value, isDeep)
    }
    
    // Object 对象、类数组、或者是函数但没有父对象
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
        // 拷贝原型链或者 value 是函数时，返回 {}，不然初始化对象
        result = (isFlat || isFunc) ? {} : initCloneObject(value)
        if (!isDeep) {
            return isFlat
                ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
            	: copySymbols(value, Object.assign(result, value))
        }
    } else {
        // 在 cloneableTags 中，只有 error 和 weakmap 返回 false
        // 函数或者 error 或者 weakmap 时，
        if (isFunc || !cloneableTags[tag]) {
            // 存在父对象返回value，不然返回空对象 {}
            return object ? value : {}
        }
        // 初始化非常规类型
        result = initCloneByTag(value, tag, isDeep)
    }
}
```

通过上面代码可以发现，函数、`error` 和 `weakmap` 时返回空对象 {}，并不会真正拷贝函数。

`value` 类型是 `Object` 对象和类数组时，调用 `initCloneObject` 初始化对象，最终调用 `Object.create` 生成新对象。

```
// 木易杨
function initCloneObject(object) {
    // 构造函数并且自己不在自己的原型链上
    return (typeof object.constructor == 'function' && !isPrototype(object))
        ? Object.create(Object.getPrototypeOf(object))
    	: {}
}

// 本质上实现了一个instanceof，用来测试自己是否在自己的原型链上
function isPrototype(value) {
    const Ctor = value && value.constructor
    // 寻找对应原型
    const proto = (typeof Ctor == 'function' && Ctor.prototype) || Object.prototype
    return value === proto
}
```

其中 `Object` 的构造函数是一个函数对象。

```
// 木易杨
var obj = new Object();
typeof obj.constructor; 
// 'function'

var obj2 = {};
typeof obj2.constructor;
// 'function'
```

对于非常规类型对象，通过各自类型分别进行初始化。

```
// 木易杨
function initCloneByTag(object, tag, isDeep) {
    const Ctor = object.constructor
    switch (tag) {
        case arrayBufferTag:
            return cloneArrayBuffer(object)

        case boolTag: // 布尔与时间类型
        case dateTag:
            return new Ctor(+object) // + 转换为数字

        case dataViewTag:
            return cloneDataView(object, isDeep)

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
            return cloneTypedArray(object, isDeep)

        case mapTag: // Map 类型
            return new Ctor

        case numberTag: // 数字和字符串类型
        case stringTag:
            return new Ctor(object)

        case regexpTag: // 正则
            return cloneRegExp(object)

        case setTag: // Set 类型
            return new Ctor

        case symbolTag: // Symbol 类型
            return cloneSymbol(object)
    }
}
```

拷贝正则类型

```
// 木易杨
// \w 用于匹配字母，数字或下划线字符，相当于[A-Za-z0-9_]
const reFlags = /\w*$/
function cloneRegExp(regexp) {
    // 返回当前匹配的文本
    const result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
    // 下一次匹配的起始索引
    result.lastIndex = regexp.lastIndex
    return result
}
```

初始化 `Symbol `类型

```
// 木易杨
const symbolValueOf = Symbol.prototype.valueOf
function cloneSymbol(symbol) {
    return Object(symbolValueOf.call(symbol))
}
```

### 循环引用

构造了一个栈用来解决循环引用的问题。

```
// 木易杨
// 主线代码
stack || (stack = new Stack)
const stacked = stack.get(value)
// 已存在
if (stacked) {
    return stacked
}
stack.set(value, result)
```

如果当前需要拷贝的值已存在于栈中，说明有环，直接返回即可。栈中没有该值时保存到栈中，传入 `value` 和 `result`。这里的 `result` 是一个对象引用，后续对 `result` 的修改也会反应到栈中。

### Map & Set

`value` 值是 `Map` 类型时，遍历 `value` 并递归其 `subValue`，遍历完成返回 `result` 结果。

```
// 木易杨
// 主线代码
if (tag == mapTag) {
    value.forEach((subValue, key) => {
        result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack))
    })
    return result
}
```

`value` 值是 `Set` 类型时，遍历 `value` 并递归其 `subValue`，遍历完成返回 `result` 结果。

```
// 木易杨
// 主线代码
if (tag == setTag) {
    value.forEach((subValue) => {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack))
    })
    return result
}
```

上面的区别在于添加元素的 API 不同，即 `Map.set` 和 `Set.add`。

### Symbol & 原型链

这里我们介绍下 `Symbol` 和 原型链属性的拷贝，通过标志位 `isFull` 和 `isFlat` 来控制是否拷贝。

```
// 木易杨
// 主线代码
// 类型化数组对象
if (isTypedArray(value)) {
    return result
}

const keysFunc = isFull // 拷贝 Symbol 标志位
	? (isFlat 			// 拷贝原型链属性标志位
       ? getAllKeysIn 	// 包含自身和原型链上可枚举属性名以及 Symbol
       : getAllKeys)	// 仅包含自身可枚举属性名以及 Symbol
	: (isFlat 
       ? keysIn 		// 包含自身和原型链上可枚举属性名的数组
       : keys)			// 仅包含自身可枚举属性名的数组

const props = isArr ? undefined : keysFunc(value)
arrayEach(props || value, (subValue, key) => {
    if (props) {
        key = subValue
        subValue = value[key]
    }
    // 递归拷贝（易受调用堆栈限制）
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
})
return result
```

我们先来看下怎么获取自身、原型链、Symbol 这几种属性名组成的数组 `keys`。

```
// 木易杨
// 创建一个包含自身和原型链上可枚举属性名以及 Symbol 的数组
// 使用 for...in 遍历
function getAllKeysIn(object) {
    const result = keysIn(object)
    if (!Array.isArray(object)) {
        result.push(...getSymbolsIn(object))
    }
    return result
}

// 创建一个仅包含自身可枚举属性名以及 Symbol 的数组
// 非 ArrayLike 数组使用 Object.keys
function getAllKeys(object) {
    const result = keys(object)
    if (!Array.isArray(object)) {
        result.push(...getSymbols(object))
    }
    return result
}
```

上面通过 `keysIn` 和 `keys` 获取常规可枚举属性，通过 `getSymbolsIn` 和 `getSymbols` 获取 `Symbol` 可枚举属性。

```
// 木易杨
// 创建一个包含自身和原型链上可枚举属性名的数组
// 使用 for...in 遍历
function keysIn(object) {
    const result = []
    for (const key in object) {
        result.push(key)
    }
    return result
}

// 创建一个仅包含自身可枚举属性名的数组
// 非 ArrayLike 数组使用 Object.keys
function keys(object) {
    return isArrayLike(object)
        ? arrayLikeKeys(object)
    	: Object.keys(Object(object))
}

// 测试代码
function Foo() {
  this.a = 1
  this.b = 2
}
Foo.prototype.c = 3

keysIn(new Foo)
// ['a', 'b', 'c'] (迭代顺序无法保证)
     
keys(new Foo)
// ['a', 'b'] (迭代顺序无法保证)
```

常规属性遍历原型链用的是 `for.. in`，那么 `Symbol` 是如何遍历原型链的呢，这里通过循环以及使用 `Object.getPrototypeOf` 获取原型链上的 `Symbol`。

```
// 木易杨
// 创建一个包含自身和原型链上可枚举 Symbol 的数组
// 通过循环和使用 Object.getPrototypeOf 获取原型链上的 Symbol
function getSymbolsIn (object) {
    const result = []
    while (object) { // 循环
        result.push(...getSymbols(object))
        object = Object.getPrototypeOf(Object(object))
    }
    return result
}

// 创建一个仅包含自身可枚举 Symbol 的数组
// 通过 Object.getOwnPropertySymbols 获取 Symbol 属性
const nativeGetSymbols = Object.getOwnPropertySymbols
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable

function getSymbols (object) {
    if (object == null) { // 判空
        return []
    }
    object = Object(object)
    return nativeGetSymbols(object)
        .filter((symbol) => propertyIsEnumerable.call(object, symbol))
}
```

我们回到主线代码，获取到 `keys` 组成的 `props` 数组之后，遍历并递归。

```
// 木易杨
// 主线代码
const props = isArr ? undefined : keysFunc(value)
arrayEach(props || value, (subValue, key) => {
    // props 时替换 key 和 subValue，因为 props 里面的 subValue 只是 value 的 key
    if (props) { 
        key = subValue
        subValue = value[key]
    }
    // 递归拷贝（易受调用堆栈限制）
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
})

// 返回结果，主线结束
return result
```

我们看下 `arrayEach` 的实现，主要实现了一个遍历，并在 `iteratee` 返回为 false 时退出。

```
// 木易杨
// 迭代数组
// iteratee 是每次迭代调用的函数
function arrayEach(array, iteratee) {
    let index = -1
    const length = array.length

    while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
            break
        }
    }
    return array
}
```

我们看下 `assignValue` 的实现，在值不相等情况下，将 value 分配给 `object[key]`。

```
// 木易杨
const hasOwnProperty = Object.prototype.hasOwnProperty

// 如果现有值不相等，则将 value 分配给 object[key]。
function assignValue(object, key, value) {
    const objValue = object[key]

    // 不相等
    if (! (hasOwnProperty.call(object, key) && eq(objValue, value)) ) {
        // 值可用
        if (value !== 0 || (1 / value) == (1 / objValue)) {
            baseAssignValue(object, key, value)
        }
    // 值未定义而且键 key 不在对象中    
    } else if (value === undefined && !(key in object)) {
        baseAssignValue(object, key, value)
    }
}

// 赋值基本实现，其中没有值检查。
function baseAssignValue(object, key, value) {
    if (key == '__proto__') {
        Object.defineProperty(object, key, {
            'configurable': true,
            'enumerable': true,
            'value': value,
            'writable': true
        })
    } else {
        object[key] = value
    }
}

// 比较两个值是否相等
// (value !== value && other !== other) 是为了判断 NaN
function eq(value, other) {
  return value === other || (value !== value && other !== other)
}
```

## 参考

> [lodash](https://github.com/lodash/lodash/)
>
> [lodash深拷贝源码探究](https://github.com/moyui/BlogPosts/blob/master/2018/lodash深拷贝源码探究.md)
>
> [按位操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)
>
> [RegExp.prototype.exec()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)

## 进阶系列目录

- 【进阶1期】 调用堆栈
- 【进阶2期】 作用域闭包
- 【进阶3期】 this全面解析
- 【进阶4期】 深浅拷贝原理
- 【进阶5期】 原型Prototype
- 【进阶6期】 高阶函数
- 【进阶7期】 事件机制
- 【进阶8期】 Event Loop原理
- 【进阶9期】 Promise原理
- 【进阶10期】Async/Await原理
- 【进阶11期】防抖/节流原理
- 【进阶12期】模块化详解
- 【进阶13期】ES6重难点
- 【进阶14期】计算机网络概述
- 【进阶15期】浏览器渲染原理
- 【进阶16期】webpack配置
- 【进阶17期】webpack原理
- 【进阶18期】前端监控
- 【进阶19期】跨域和安全
- 【进阶20期】性能优化
- 【进阶21期】VirtualDom原理
- 【进阶22期】Diff算法
- 【进阶23期】MVVM双向绑定
- 【进阶24期】Vuex原理
- 【进阶25期】Redux原理
- 【进阶26期】路由原理
- 【进阶27期】VueRouter源码解析
- 【进阶28期】ReactRouter源码解析
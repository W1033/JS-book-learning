# Object.entries()

## 目录 (Catalog)
- 语法
- 示例
- 将 `Object` 转换为 `Map`
- Polyfill

## 生词 (New Words)


## 内容 (Content)
- `Object.entries()` 方法返回一个给定对象自身可枚举属性的键值对数组, 其排列与使用 
  `for...in` 循环遍历该对象时返回的顺序一致.(区别在于 `for...in` 循环也枚举原型链
  中的属性.)
 
### 语法
- `Object.entries(obj)`:
    + 参数: `obj` 为返回其可枚举属性键值对的对象.
    + 返回值: 给定对象自身可枚举属性的键值对数组.
    + 描述: `Object.entries()` 返回一个数组, 其元素时与直接在 `object` 上找到的
      可枚举属性键值对相对应的数组. 属性的顺序与通过手动循环对象的属性值所给出的顺序相同.

### 示例
- ```js
    const obj = {0: 'a', 1: 'b', 2: 'c'};
    // [['0', 'a'], ['1', 'b'], ['2', 'c']]
    console.log(Object.entries(obj)); 

    const anObj = {100: 'a', 2: 'b', 7: 'c'};
    // [['2','b'], ['7','c'], ['100','a']]
    console.log(Object.entries(anObj));

    const obje = {a: 5, b: 7, c: 9};
    for (const [key, value] of Object.entries(obj)) {
        // 0 a
        // 1 b
        // 2 c
        console.log(`${key} ${value}`);
    }

    Object.entries(obje).forEach(([key, value]) => {
        // a 5
        // b 7
        // c 9
        console.log(`${key} ${value}`)
    })
  ```

### 将 `Object` 转换为 `Map`
- `new Map()` 构造函数接受一个可迭代的 `entries`. 借助 `Object.entries`
  方法你可以很容易的将 `Object` 换换为 `Map`:
  ```js
    (function() {
        let obj = {foo: 'bar', baz: 42};
        let map = new Map(Object.entries(obj));

        // {'foo' => 'bar', 'baz' => 42}
        console.log(map)
    })();
  ```


### Polyfill
- 你可以使用下面列出的简易 pilyfill.
  ```js
    if (!Object.entries) {
        Object.entires = function(obj) {
            // - `Object.keys()`返回对象中所有可枚举的属性名; 
            let ownProps = Object.keys(obj);
            let l = ownProps.length;
            let resArray = new Array(l);    // prellocate the Array
            while(l--) {
                resArray[l] = [ownProps[l], obj[ownProps[l]]];
            }
            return resArray;
        }
    }
  ```
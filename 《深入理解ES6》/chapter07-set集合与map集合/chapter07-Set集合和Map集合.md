# 第 7 章 -- Set 集合和 Map 集合

## 本章目录 (Catalog)
- ES5 中的 Set 集合与 Map 集合 (Sets and Maps in ECMAScript 5)
- 该解决方案的一些问题 (Problems with Workarounds)
- ES6 中的 Set 集合 (Sets in ECMAScript 6)
    + 创建 Set 集合并添加元素 (Creating Sets and Adding Items)
    + 移除元素 (Removing Values)
    + Set 集合的 forEach() 方法 (The forEach() Method for Sets)
    + 将 Set 集合转换为数组 (Converting a Set an Array)
    + Weak Set 集合 (Weak Sets)
        - 创建 Weak Set 集合 (Creating a Weak Set)
        - 两种 Set 类型的主要区别 (Key Differences Between Set Types)
- ES6 中的 Map 集合 (Maps in ECMAScript 6)
    + Map 集合支持的方法 (Map Methods)
    + Map 集合的初始化方法 (Map Initialization)
    + Map 集合的 forEach() 方法 (The forEach() Method on Maps)
    + Weak Map 集合 (Weak Maps)
        - 使用 Weak Map 集合(Using Weak Maps)
        - Weak Map 集合的初始化方法 (Weak Map Initialization)
        - Weak Map 集合支持的方法 (Weak Map Methods)
        - 私有对象数据 (Private Object Data)
        - Weak Map 集合的使用方式及使用限制 (Weak Map Uses and Limitations)
- 小结


## 生词 (New Words)
- ****


## 提示: 
- Python 中的集合是这样的: 
  ```python
    ''' 集合 (set) '''
    # {1, 2, 5, 6}
    print({1, 2, 3, 4, 5, 6} - {3, 4})
    # {3, 4}
    print({1, 2, 3, 4, 5, 6} & {3, 4})
    # {1, 2, 3, 4, 5, 6, 7}
    print({1, 2, 3, 5, 6} | {4, 7})
  ```
- js 在 ES6 添加的 set 集合类型, 和 python 中并不一样, ES6 中的集合是值的集合, 可以按照
  插入的顺序迭代它的元素. Set 中的元素只会出现一次, 即 Set 中的元素是唯一的.
    + Set 集合结构类似于数组 (但并不是数组, 因为数组只可以用数值型的索引, 但是 Set 集合
      可以用非数值类型的索引, 但是 Set 集合结合 "展开运算符(...)" 可以转换为数组.)
    + Set 集合会自动移除重复的值, 因此可以用来过滤数组中的重复结构
    + Set 集合内的对象是强引用.



## 本章内容 (Contents)
#### ES5 中的 Set 集合与 Map 集合
#### 该解决方案的一些问题
#### ES6 中的 Set 集合
- 创建 Set 集合并添加元素
- 移除元素
- Set 集合的 forEach() 方法
- 将 Set 集合转换为数组
- Weak Set 集合
    + 创建 Weak Set 集合 
    + 两种 Set 类型的主要区别 
#### ES6 中的 Map 集合
- Map 集合支持的方法
- Map 集合的初始化方法
- Map 集合的 forEach() 方法
- Weak Map 集合
    + 使用 Weak Map 集合
    + Weak Map 集合的初始化方法 
    + Weak Map 集合支持的方法
    + 私有对象数据 
    + Weak Map 集合的使用方式及使用限制
#### 小结

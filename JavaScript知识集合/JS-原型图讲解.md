# JS 原型图讲解

- [待看文章](https://ulivz.com/2016/12/20/javascript-prototype/)

## Table Of Contents
1. JS 原型图
2. JS 高程 6.3.1 原型链图
3. 结合 1 和 2 图的代码输出解说


## New Words



## Contents


## JS 原型图
### 1. JS 原型图
<img src="./images-js-knowledge-set/prototype-image.png"
    style="margin-left: 0; border-radius: 4px;
        box-shadow: 1px 1px 3px 2px #e5e5e5">

### 2. JS 高程 6.3.1 原型链图
<img src="./images-js-knowledge-set/6.3.1-prototype.png"
    style="margin-left: 0; border-radius: 4px; width: 90%;
        box-shadow: 1px 1px 3px 2px #e5e5e5">

### 3. 结合 1 和 2 图的代码输出解说
- ```js
    console.log(Object.prototype.__proto__);    // null

    if (Object.__proto__ === Function.prototype) {
        // Object.__proto__  = Function.prototype: true
        console.log('Object.__proto__  = Function.prototype:', true);
    }

    // - Note: Function.prototype.__proto__ 指向 Object.prototype.
    if (Function.prototype.__proto__ === Object.prototype) {
        console.log(true);  // true
    }
  ```
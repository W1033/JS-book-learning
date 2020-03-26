## JS 原型图输出
- 参考图片为: <br/>
  <img src="./images/prototype-image.png" 
        style="width: 90%; margin-left:0; border: 1px solid #ccc;">
  <img src="./images/6.3.1-原型链图.png" 
        style="width: 90%; margin-left:0; border: 1px solid #ccc;">

- ```javascript
    console.log(Object.prototype.__proto__);    // null
    console.log(Function.prototype);    // f() {[native code]}
    console.log(Function.__proto__);    // f() {[native code]}

    // - Note: Function.prototype.__proto__ 指向 Object.prototype.
    //   Object.prototype 通过 constructor 指向 function Object() {}
    //   构造函数; 正常来说我觉得这里应该输出 Object 构造函数的, 但是浏览器中
    //   却只访问到 Object.prototype.
    // - Output:
    // {
    //     constructor: f Object(),
    //     hasOwnProperty: f hasOwnProperty(),
    //     isPropertyOf: f isPropertyOf(),
    //     propertyIsEnumerable: f propertyIsEnumerable(),
    //     toLocaleString: f toLocalString(),
    //     toString: f toString(),
    //     valueOf: f valueOf()
    //     __defineGetter__: f __defineGetter__(),
    //     __defineSetter__: f __defineSetter__(),
    //     __lookupGetter__: f __lookupGetter__(),
    //     __lookupSetter__: f __lookupSetter__(),
    //     get __proto__: f __proto__(),
    //     set __proto__: f __proto__()
    // }
    console.log(Function.prototype.__proto__);
  ```
# JavaScript 的原型模式和 TypeScript 中的类


## Catalog
1. ES5 的构造函数
2. ES6 中的类
3. TypeScript 中的类



## New Words




## Content

  类声明仅仅是基于已有自定义类型声明的语法糖.
  ```js
    class PersonClass {

        // - 等价于 PersonType 构造函数
        constructor(name) {         // {1}
            this.name = name;
        }

        // - 等价于 PersonType.prototype.sayName
        sayName() {
            console.log(this.name);
        }
    }

    let people = new PersonClass("Nicholas");
    person.sayName();                                   // "Nicholas"

    console.log(person instanceof PersonClass);         // true
    console.log(person instanceof Object);              // true

    console.log(typeof PersonClass);                    // "function"
    console.log(typeof PersonClass.prototype.sayName);  // "function"
  ```
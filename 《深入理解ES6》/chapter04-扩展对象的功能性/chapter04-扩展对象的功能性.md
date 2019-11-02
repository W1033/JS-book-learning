# 第 4 章 -- 扩展对象的功能性

## 本章目录 (Catalog)
1. 对象类别
2. 对象字面量语法扩展
    + 属性初始值的简写
    + 对象方法的简写语法
    + 可计算属性名 (Computed Property Name)
3. 新增方法
    + `Object.is()` 方法
    + `Object.assign()` 方法
4. 重复的对象字面量属性
5. 自有属性枚举顺序
6. 增强对象原型
    + 改变对象的原型
    + 简化原型访问的 `Super` 引用
7. 正式的方法定义
8. 小结



## 生词 (New Words)
- Object.getOwnPropertyNames(): 取得自身(own)属性名
- **prototype ['prəʊtətaɪp] --n.原型; 样机; 样板**
- Object.getPrototypeOf(): 取得原型
- Object.setPrototypeOf(): 设置原型


## 本章内容 (Content)
### 1. 对象类别
### 2. 对象字面量语法扩展
- **属性初始值的简写**
- **对象方法的简写语法**
- **可计算属性名 (Computed Property Name)**
### 3. 新增方法
- **`Object.is()` 方法**
- **`Object.assign()` 方法**
### 4. 重复的对象字面量属性
### 5. 自有属性枚举顺序
### 6. 增强对象原型
$\quad$ 原型是 JavaScript 继承的基础, 在早期版本中, JavaScript 严重限制了原型的使用.
于是 ECMAScript 6 针对原型进行了改进.
- **改变对象的原型**
    + 正常情况下, 无论通过构造函数还是 `Object.create()` 方法创建对象, 其原型是在对象
      被创建时指定的. 对象原型在实例化之后保持不变, 直到 ES5 都是 JavaScript 编程最重
      要的设定之一, 虽然在 ES5 中添加了 `Object.getPrototypeOf()`(取得原型: 这个
      方法返回 `[[Prototype]]` 的值) 方法返回任意指定对象的原型, 但仍缺少对象在实例化
      后改变原型的标准方法.
    + 所以在 ES6 中添加了 `Object.setPrototypeOf()` 方法来改变这一现状, 通过这个方法
      可以改变任意指定对象的原型, 它接受 2 个参数:
        - (1) 被改变原型的对象    
        - (2) 替代第一个参数的对象.
      <br/>举个例子: 
      ```javascript
        let person = {
            getGreeting() {
                return "Hello";
            }
        };
        let dog =  {
            getGreeting() {
                return "Woof";
            }
        };
        // - 以 person 对象为原型
        let friend = Object.create(person);
        console.log(friend.getGreeting());  // "Hello"
        console.log(Object.getPrototypeOf(friend) === person);  // true

        // - 将原型设置为 dog
        Object.setPrototypeOf(friend, dog);
        console.log(friend.getGreeting());  // "Woof"
        console.log(Object.getPrototypeOf(friend) === dog); // true
      ```
    + 对象原型的真实值被存储在内部专用属性 `[[Prototype]]` 中, 调用 
      Object.getPrototypeOf() 方法返回储存在其中的值, 调用 Object.setPrototypeOf()
      方法改变其中的值. 然而, 这不是操作 `[[Prototype]]` 值的唯一方法.
- **简化原型访问的 `Super` 引用**
    + ES6 引入了 `Super` 引用的特性, 使用它可以更快捷第访问对象原型. 举个例子, 如果你想
      重写对象实例的方法, 与需要调用与它同名的原型方法, 则在 ES5 中可以这样实现:
      ```javascript
        let person = {
            getGreeting() {
                return "Hello"
            }
        };
        let dog = {
            getGreeting() {
                return "Woof"
            }
        };
        let friend = {
            getGreeting() {
                return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
            }
        };

        // - 将原型设置为 person
        Object.setPrototypeOf(friend, person);
        console.log(friend.getGreeting());  // Hello, hi!
        console.log(Object.getPrototypeOf(friend) === person);  // true

        // - 将原型设置为 dog
        Object.setPrototypeOf(friend, dog);
        console.log(friend.getGreeting());  // "Woof, hi!"
        console.log(Object.getPrototypeOf(friend) === dog); // true
      ```
    + 在这个示例中，friend 对象的 getGreeting() 方法调用了同名的原型方法。
      object.getPrototypeOf() 方法可以确保调用正确的原型，并向输出字符串叠加另一个
      字符串; 后面的 `.call(this)` 可以确保正确设置原型方法中的this值。
    + 要准确记得如何使用 object.getPrototype0f() 方法和 `.call(this)` 方法来调用
      原型上的方法实在有些复杂，所以 ECMAScript 6 引入了 `super` 关键字。简单来说，
      Super 引用相当于指向对象原型的指针，实际上也就是 object. getPrototypeOf(this)
      的值。于是，可以这样简化上面的getGreeting()方法:
      ```javascript
        let friend = {
            // - Note: 必须要在 **简写方法的对象中使用 Super 引用**
            getGreeting() {
                return super.getGreeting() + ", hi";
                // - 上面一行等于上一个示例中的
                // return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
            }
        }
      ```
      <br/>
    + Super 引用在多重继承的情况下非常有用, 因为在这种情况下, 使用 
      Object.getPrototypeOf() 方法将会出现问题. 举个例子:
      ```javascript
        let person = {
            getGreeting() {
                return "Hello"
            }
        };
        let friend = {
            getGreeting() {
                return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
            }
        };
      ```
### 7. 正式的方法定义
### 8. 小结


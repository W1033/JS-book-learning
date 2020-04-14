# 第 13 章 -- 用模块封装代码 (Encapsulating Code With Modules)

## 目录 (Catalog)
1. 什么是模块 (What are Modules?)
2. 导出的基本语法 (Basic Exporting)
3. 导入的基本语法 (Basic Importing)
    + 3.1 导入单个绑定 (Importing a Single Binding)
    + 3.2 导入多个绑定 (Importing Multiple Bindings)
    + 3.3 导入整个模块 (Importing All of a Module)
    + 3.4 导入绑定的一个微妙怪异之处 (A Subtile Quirk of Imported Bindings)
4. 导出和导入时重命名 (Renaming Exports and Imports)
5. 模块的默认值(Default Values in Modules)
    + 5.1 导出默认值 (Exporting Default Values)
    + 5.2 导入默认值 (Importing Default Values)   
6. 重新导出一个绑定 (Re-exporting a Binding)
7. 无绑定导入 (Importing Without Bindings)
8. 加载模板 (Loading Modules)
    + 8.1 在 Web 浏览器中使用模块 (Using Modules in Web Browsers)
        - 8.1.1 在 `<script>` 中使用模块 (Using Modules With `<script>`)
        - 8.1.2 Web 浏览器中的模块加载顺序 (Module Loading Sequence in Web Browsers)
        - 8.1.3 Web 浏览器中的异步模块加载 (Asynchronous Module Loading in Web Browsers)
        - 8.1.4 将模块作为 `.Worker` 加载 (Loading Modules as Workers)
    + 8.2 浏览器模块说明符解析 (Browser Module Specifier Resolution)
9. 小结    


## 生词 (New word)
- **Specifier [] --** 
- **subtile ['sʌbtəl] --adj.微妙的; 狡猾的; 敏锐的**
    + --> question subtile. 微妙的问题.



## 内容 (Content)
### 1. 什么是模块 (What are Modules?)
- 模块是自动运行在严格模式下并且没有办法推出运行的 JavaScript 代码. 模块顶部创建的变量不会
  自动添加到全局共享作用域, 这个变量仅在模块的的顶级作用域中存在, 而且模块必须导出一些外部
  代码可以访问的元素, 如变量或函数. 模块也可以从其他模块导入绑定. 
- 模块的顶部, `this` 的值是 `undefined`; 其次, 模块不支持 HTML 风格的代码注释.

### 2. 导出的基本语法 (Basic Exporting)
- 可以使用 `export` 关键字将一部分已发布的代码暴露给其他模块, 在最简单的勇利用, 可以将
  `export` 放在**任何变量**, **函数** 或 **类声明** 的前面, 以将他们从模块中导出, 
  就像这样:
  ```javascript
    // ## 例如规定导出函数的文件名: export.js

    // - 导出数据
    export var color = "green";
    export let name = "Nicholas";
    export const magicNumber = 7;
    
    // - 导出函数
    export function sum(num1, num2) {
        return num1 + num2;
    }
    
    // - 导出类
    export class Rectangle {
        constructor(length, width) {
            this.length = length;
            this.width = width;
        }
    }
    
    // - 这个函数是私有模块: 任何未显示导出的变量, 函数或类都是模块私有的, 无法从模块外部访问.
    function substract(num1, num2) {
        return num1 - num2
    }
    
    // - 定义一个函数... 
    function multiply(n1, n2) {
        return n1 * n2
    }  
    // - 现在导出上面的multiply
    export {multiply};    
  ```

### 3. 导入的基本语法 (Basic Importing)
- 导入的基本语法: 从模块中导出的功能(代码)可以通过 `import` 关键字在另外一个模块中访问，
  `import` 语句的两个部分分别是:
    + (1) 要导入的标识符。
    + (2) 标识符应当从哪个模块导入。 基本的语法形式：<br/>
        `import { identifier1, identifier2 } from "./export.js"`
        - `import` 后面的大括号标识 "从给定模块导入的绑定(binding)"; 关键字 `from` 
          表示从哪个模块导入给定的绑定，该模块有表示模块路径的字符串制定(被称作模块说明符)。
          浏览器使用的路径格式与传给 `<script>` 元素的相同，也就是说，
          **必须把文件扩展名也加上**。
        - 另一方面, Node.js 则是遵循基于文件系统前缀区分本地文件和包的，和此 form 导入的
          语法不同。为了最好地兼容多个浏览器和 Node.js 环境，一定要在字符串之前包含
          `/, ./ 或 ../` 来表示要导入的文件。
        - 当从模块中导入一个绑定时, 它就好像使用 const 定义的一样. 结果是你无法定义另一个
          同名变量 (包括导入另一个同名绑定), 也无法  
- 3.1 导入单个绑定 (Importing a Single Binding)
    + ```javascript
        import { sum } from "./export.js"    
        console.log(sum(1, 3));    // 4 
        
        // - 抛出一个错误。 不能给导入的绑定重新赋值。  
        sum = 1;    
      ```
- 3.2 导入多个绑定 (Importing Multiple Bindings)
    + ```javascript
        import { sum, multiply, magicNumber } from "./export.js"; 
        console.log(sum(1, magicNumber));     // 8 
        console.log(multiply(1, 2));          // 2  
      ```
- 3.3 导入整个模块 (Importing All of a Module)
    + `import * as example from "./export.js"`
    + 从 `example.js` 中导出的所有绑定被加载到一个被称作 example 的对象中。 指定的导出
      (sum()函数，multiply() 函数和 magicNumber 常量 )之后会作为 example 的属性被
      访问。这种导入格式被称作命名空间导入(namespace import)。因为 example.js 文件中
      不存在 example 对象，故而它作为 example.js 中导出成员的命名空间对象而被调用。  
    + ```javascript
        console.log(example.sum(1, example.magicNumber));   // 8
        console.log(example.multiply(1, 2));                // 2
      ```
- 3.4 导入绑定的一个微妙怪异之处 (A Subtile Quirk of Imported Bindings)
    + ```javascript
        // - export.js
        export var name = "Nicholas";
        export function setName (newName) {
            name = newName;
        }
        // ------
        // - import.js
        import { name, setName } from "./export.js";
        console.log(name);      // "Nicholas"
        // - 此处调用 setName() 函数传参后，可以改变导入文件中的 name 值: 原因调用 
        //   setName("Greg") 时会回到导入 setName() 的模块中去执行, 并将 name 设置为
        //   "Greg". 请注意, 次更改会自动在导入的 name 绑定上体现. 其原因是, name 是
        //   导出的 name 标识符的本地名称.
        setName("Greg");
        console.log(name);      // "Greg"

        // - 本段代码中所使用的 name 和模块中导入的 name 不是同一个. (即: 应该可以理解
        //   为当前 import.js 文件中并没有显示声明  name 变量, 所以无法直接赋值.)
        name = "Nicholas";      // 抛出错误
      ```

### 4. 导出和导入时重命名 (Renaming Exports and Imports)
- 第 1 种方式是导出时设置别名, 导入时直接使用别名:
    + ```javascript
        // - export.js
        function sum(num1, num2) {
            return num1 + num2;
        }
        export {sum as add};
        // ------
        // - import.js
        import {add} from "./export.js";
    
      ```
- 第 2 种方式正常导出, 在导入式使用别名
    + ```javascript
        // - export.js
        function sum(num1, num2) {
            return num1 + num2;
        }
        export {sum};
        // ------
        // - import.js
        import {sum as add} from "./export.js";
      ```

### 5. 模块的默认值(Default Values in Modules)
- 模块的默认值指的是通过 `default` 关键字指定的单个变量、函数 或 类、只能为每个模块设置
  一个默认的导出值。导出时多次使用 default 关键字是一个语法错误。
- 5.1 导出默认值 (Exporting Default Values)
    + ```javascript
        // 1. 由于函数被模块所代表，因而它不需要一个名称。
        export default function (num1, num2) {
            return num1 + num2;
        };
        // ------
        // 2. 导出一个对象
        export default {
            name: "app",
            welcome() {
                return {
                    msg: "Welcome to Your 01-Vue.js App"
                }
            }
        }
        // 3. 导出一个匿名类(即: 导出一个构造函数，构造函数的名字在导入文件中自定义)
        export default class {
            constructor(x,y ) {
                this.x = x;
                this.y = y;
            }
        }
      ```
- 5.2 导入默认值 (Importing Default Values) 
    + ```javascript
        // - Note:(结合上面的 5.1看) 请注意 import 后的 sum 没有使用大括号，与之前的
        //   非默认导入的情况不同。本地名称 sum 用于表示模块导出的任何默认函数，这种语法
        //   是最纯净的。ES6的创建者希望它能够成为 web 上主流的模块导入形式，并且可以
        //   使用已有的对象。
        import sum from "./example.js";     // 导入默认值
        console.log(sum(1,2));
      ```
    + 对于导出默认值 和 一或多个非默认绑定的模块，可以用一条语句导入所有导出的绑定。例如:
        - ```javascript
            // - export.js 
            export let color = "red";
            export default function (num1, num2) {
                return num1 + num2;
            }
            // ------
            // - import.js 
            import sum, {color} from "export.js";
            console.log(sum(1, 2));         // 3
            console.log(color);             // "red"

            // - 与导出默认值一样，也可以在导入默认值时使用重命名语法:
            import { default as sum, color } from "./exports.js";
            console.log(sum(1, 2));         // 3
            console.log(color);             // "red"
          ```

### 6. 重新导出一个绑定 (Re-exporting a Binding)
- 有时候你想重新导出一些你已经导入的模块, 你可以根据本章前面已经讨论过的模式即导入后再导出, 
  代码如下: 
  ```javascript
    import {sum} from "./example.js";
    export {sum};
  ```
- 上面的代码可行, 不过也可以通过一条语句完成同样的任务:
  ```javascript
    // - 当前文件为 import.js : 下面这行代码即表示: 在当前 import.js 中可以不用先使用
    //   import 导入 sum, 即可直接使用 export 导出
    export {sum} from "./example.js";

    // - 也一直使用别名, 例如:
    export {sum as add} from "./example.js";

    // - 如果想导出另一个模块中的所有值, 则可以使用 * 模式:
    export * from "./example.js";
  ```
  

### 7. 无绑定导入 (Importing Without Bindings)
- 某些模块可能不导出任何东西，相反，他们可能只是修改全局作用域中的对象，尽管模块中的顶层变量、
  函数和类不会自动地出现在全局作用域中，但这并不意味着模块无法访问全局作用域。内建对象(如 
  Array 或 Object)的共享定义可以在模块中访问。对这些对象所做的更改将反映在其他模块中。
- 例如, 要向所有数组添加 `pushAll()` 方法，则可以定义如下所示的模块:
  ```javascript
    // - global.js
    // - 没有 export 或 import 的模块代码
    Array.prototype.pushAll = function (items) {
        // - items 必须是一个数组
        if (!Array.isArray(items)) {
            throw new TypeError ("参数必须是一个数组。");
        }
        // - 使用内建的 push() 和展开运算符 (Tips:展开运算符在本书的第三章函数的
        //   <展开运算符>一节有详细讲解.)
        return this.push(...items);
    };
    // ---

    // - 即使没有任何导出或导入的操作，这也是一个有效的模块。这段代码既可以用作模块
    //   也可以用作脚本。由于它不导出任何东西，因而你可以使用简化的导入操作来执行
    //   模块代码，而且不导入任何的绑定:
    // - import.js
    import "./global.js";
    let colors = ["red", "green", "blue"];
    let items = [];
    items.pushAll(colors);
  ```

### 8. 加载模板 (Loading Modules)
- 虽然 ES6 定义了模块的语法，但它并没有定义如何加载这些模块。这正是规范复杂性的一个体现，
  应由不同的实现环境来决定。ES6 没有尝试为所有 javascript 环境创建一套统一的标准，他只
  规范了语法，并将加载机制抽象到一个未定义的内部方法 `HostResolveImportedModule` 中。
  Web 浏览器和 Node.js 开发者可以通过对各自环境的认知来决定如何实现 
  HostResolveImportedModule.
- 8.1 在 Web 浏览器中使用模块 (Using Modules in Web Browsers)
    + 8.1.1 在 `<script>` 中使用模块 (Using Modules With `<script>`)
        - 在 `<script>` 中使用模块 : 将 type 属性的值为 "module" 可让浏览器将所有
          内联代码或包含在 src 指定的文件中的代码按照模块而非脚本的方式加载。
        - ```html
            <!-- 加载一个 Javascript 模块文件 -->
            <script type="module" src="module.js"></script>
            <!-- 内联引入一个模块 -->
            <script type="module">
                import { sum } from "./example.js";
                let result = sum(1, 2);
            </script>
          ```
    + 8.1.2 Web 浏览器中的模块加载顺序 (Module Loading Sequence in Web Browsers)
    + 8.1.3 Web 浏览器中的异步模块加载 (Asynchronous Module Loading in Web Browsers)
        - ```html
            <!--更多讲解见书本 P-->
            <!--在这两个示例中，两个模块文件被异步加载。只是简单地看这个代码判断不出哪个模块
                先执行，如果 module1.js首先完成下载(包括其所有的导入资源)，它将先执行；
                如果 module2.js 首先完成下载，那么它将先执行。-->
            <script type="module" async  src="module1.js"></script>
            <script type="module" async  src="module2.js"></script>
          ```
    + 8.1.4 将模块作为 `.Worker` 加载 (Loading Modules as Workers)
- 8.2 浏览器模块说明符解析 (Browser Module Specifier Resolution)
    + 以 `/` 开头的解析为从根目录开始。
    + 以 `./` 开头的解析为从当前目录开始。
    + 以 `../` 开头的解析为从父目录开始。
    + URL 格式

### 9. 小结    

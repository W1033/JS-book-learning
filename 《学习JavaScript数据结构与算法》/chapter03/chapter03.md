# 第 3 章: 栈 (Stack)


## 本章目录 (Catalog)
- 3.1 栈数据结构 
- 3.2 ECMAScript 6 和 Stack 类
- 3.3 用栈解决问题
- 3.4 小结


## 本章内容 (Content)
- 有 2 种数据结构类似于数组, 但在添加和删除元素时更为可控. 它们就是 `栈` 和 `队列`.
#### 3.1 栈数据结构 
- 3.1.1 创建栈
- 3.1.2 向栈添加元素
- 3.1.3 从栈移除元素
- 3.1.4 查看栈顶元素
- 3.1.5 检查栈是否为空
- 3.1.6 清空和打印栈元素
#### 3.2 ECMAScript 6 和 Stack 类
- 用 ES6 语法声明 Stack 类
    + (1) 用 ES6 的限定作用域 Symbol 实现类
    + (2) 用 ES6 的 WeakMap 实现类
        - 有一种数据类型可以确保属性是私有的, 这就是 WeakMap.我们会在第 8 章深入探讨 Map
          这种数据结构, 现在只需要知道 WeakMap 可以存储键值对, 其中键是对象, 值可以是任意
          数据类型.
        - 如果用 WeakMap 来存储 items 属性 (数组版本), Stack 类就是这样的: 
          ```javascript
            // - 默认 items = [];
            const items = new WeakMap();    // - {1}
            class Stack {
                constructor() {
                    items.set(this, []);    // - {2}
                    
                    // Output: items: WeakMap
                    console.log('items: ', items);
                }
                push(element) {
                    const s = items.get(this);  // - {3}
                    s.push(element);
                }
                pop() {
                    const s = items.get(this); 
                    return s.pop();
                }
                // - 其他方法
            }

            let stack = new Stack();
            stack.push(6);
          ``` 
            + {1}: 声明一个 WeakMap 类型的变量 items.
            + {2}: 在 constructor 中, 以 this (Stack类自己的引用. Tip:即 Stack 
              构造函数的实例) 为键, 把代表栈的数组存入 items.
            + {3}: 从 WeakMap 中取出值, 即以 this 为键 (行 {2} 设置的) 从 items 中取值.
#### 3.3 用栈解决问题
#### 3.4 小结
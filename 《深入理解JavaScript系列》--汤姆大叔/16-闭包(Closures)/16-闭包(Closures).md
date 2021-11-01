# 深入理解 JS 系列（16）： 闭包（Closures）
 
## 目录 (Catalog)


## 生词 (New Words)


## 内容 (Content)
> 文章链接：https://www.cnblogs.com/TomXu/archive/2012/01/31/2330252.html
- 众所周知，在函数式语言中（ECMAScript 也支持这种风格），函数既是数据。就比方说，
  函数可以赋值给变量，也可以当做参数传递给其他函数，还可以从函数里返回等等。这类函数有
  特殊的名字和结构。

- ```js
    // - 这里牵扯到 "12-变量对象(Variable Object).html" 中讲的 '作用域 [[Scope]]'
    //   属性，实际上就是 foo() 函数保存了全局作用域的 '变量/函数/对象'，就是一个链式操作
    let x = 10;
    function foo() {
        console.log("x:", x);
    }
    (function(funArg) {
        let x = 20;
    
        // - 变量 x 在（lexical）上下文中静态保存的，在该函数创建的时候就保存了
        funArg();
    })(foo);
  ```
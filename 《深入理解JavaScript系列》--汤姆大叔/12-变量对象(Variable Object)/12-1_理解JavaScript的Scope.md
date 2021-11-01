## 此笔记来自于这篇文章
- [理解 JavaScript 中的 Scope](https://blog.csdn.net/andy_zhang2007/article/details/80004917)
- 也可见本文件夹中保存的 pdf 文件

### 文章目录
- 作用域介绍：
- 什么是作用域 Scope ？
- 为什么要使用作用域 Scope：最少访问原则
- JavaScript 中的作用域 Scope
    + 全局作用域 （Global Scope）
    + 本地作用域 （Local Scope）
- 语句块（Block Statements）
- 上下文（Context）： 许多开发人员会经常弄混作用域 Scope 和 上下文 Context。 
- 执行上下文（Execution Context）： 说明 "执行上下文中的上下文"一词指的是作用域而不是上下文。  
    + 执行上下文分为 2 个阶段：创建阶段 和 代码执行。
    + 创建阶段：
        - 创建变量对象 Variable(Activation) Object
        - 创建作用域 Scope chain
        - 设置上下文指针 this
- 词法作用域（Lexical Scope）[块级作用域(亦被称为 词法作用域)]
- 闭包（Closure）
- 模块模式（Module Pattern）
- 立即调用函数表达式（IIFE）     
- 使用 .call()、apply() 和 .bind() 改变上下文   
- 英文原文：https://scotch.io/tutorials/understanding-scope-in-javascript         
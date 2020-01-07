# 第 5 章 -- 策略模式

## 本章目录 (Catalog)
- 5.1 使用策略模式计算奖金 
- 5.2 JavaScript 版本的策略模式
- 5.3 多态的策略模式中的体现
- 5.4 使用策略模式实现缓动动画
    + 5.4.1 实现动画效果的原理
    + 5.4.2 思路和一些准备工作
    + 5.4.3 让小球运动起来
- 5.5 更广义的 "算法"
- 5.6 表单校验
    + 5.6.1 表单校验的第一个版本
    + 5.6.2 用策略模式重构表单校验
    + 5.6.3 给某个文本输入框添加多种校验规则
- 5.7 策略模式的优缺点
- 5.8 一等函数对象与策略模式
- 5.9 小结


## 生词 (New Words)
- **performance [pɚ'fɔrməns] --n.性能, 表现, 表演, 履行**
    + calculated performance. 计算性能.
    + performance appraisal. 绩效评估
- **appraisal [ə'prezl] --n.评价, 鉴定, 估价**
    + performance appraisal. 业绩评价, 成绩评价
    + project appraisal. 项目评估
    + appraisal report. 评估报告
    + appraisal theory. 评价理论
- **strategy ['strætɪdʒɪ] --n.战略，策略**
    + option merge strategies  选项合并策略
- **bonus ['bonəs] --n.奖金; 红利**
    + annual bonus. 年终分红
    + year-end bonus. 年终奖金
    + bonus tax. n.奖金税
- **sphere [sfɪə] / [sfɪr] --n.球体, 范围**
- **ease [iz] --n.缓解, 安乐. --vt.使...舒适/放松, 减轻, 缓和. --vi.缓和, 减轻**
    + take one's ease(n). 休息, 安心, 放心.
    + lead [live] a life of ease(n). 过安乐的生活.
    + live in ease(n). 生活安逸.
    + He eased(vt) me of the worry. 他为我排解烦恼.
    + The medicine eased(vt) her pain. 药减轻了她的痛苦.
    + He eased(vi) into the car[a seat]. 他缓慢地坐进车子[椅子].
    + The car eased(vi) out of the garage. 汽车缓慢地驶出车库.
    + He eased(vi) off on the accelerator. 他放松变速器.

## 本章内容 (Content)
- 策略模式的定义是: 定义一系列的算法, 把它们一个个封装起来, 并且使它们可以相互替换.

### 5.1 使用策略模式计算奖金 
- (1) 最初的代码实现
- (2) 使用组合函数重构代码
- (3) 使用策略模式重构代码
    + 策略模式指的是定义一系列的算法, 把他们一个一个封装起来. 
      `将不变的部分和变化的部分隔开是每个设计模式的主题`, 策略模式也不例外, 
      `策略模式的目的就是将算法的使用和算法的实现分离开来`.
    + 一个基于策略模式的程序至少由 2 部分组成.
        - 第 1 个部分是`一组策略类`, 策略类封装了具体的算法, 并负责具体的计算过程.
        - 第 2 个部分是`环境类 Context (上下文)`, Context 接受客户的请求, 随后把
          请求委托给某一个策略类. 要做到这点, 说明 Context 中要维持对某个策略对象的引用.
    + 现在用策略模式来重构上面的代码。第一个版本是模仿传统面向对象语言中的实现。我们先把
      每种绩效的计算规则都封装在对应的策略类里面：
- 传统面向对象语言中策略模式的实现代码:
  ```js
    // - 策略类: 每种绩效的计算规则
    let performanceS = function () {};
    performanceS.prototype.calculate = function (salary) {
        return salary * 4;
    };
    let performanceA = function () {};
    performanceA.prototype.calculate = function (salary) {
        return salary * 3;
    };
    let performanceB = function () {};
    performanceB.prototype.calculate = function (salary) {
        return salary * 2;
    };

    // - 接下来定义 奖金类 Bonus
    let Bonus = function () {
        this.salary = null;     // - 原始工资
        this.strategy = null;   // - 绩效等级对应的策略对象
    };
    // - 设置员工实际薪资
    Bonus.prototype.setSalary = function (salary) {
        this.salary = salary;
    };
    // - 设置员工绩效等级对应的策略对象
    Bonus.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    // - 计算奖金数额
    Bonus.prototype.getBonus = function () {
        // - 把计算奖金的操作委托给对应的策略对象
        return this.strategy.calculate(this.salary);
    };

    // - 调用
    let bonus = new Bonus();

    bonus.setSalary(10000);   // - 传入实际的薪资
    bonus.setStrategy(new performanceS());  // - 传入绩效等级对应的策略对象
    console.log(bonus.getBonus());   // 40000

    bonus.setStrategy(new performanceA());
    console.log(bonus.getBonus());  // 30000
  ```

### 5.2 JavaScript 版本的策略模式
- 在 JS 语言中, 函数也是对象, 所以更简单和直接的做法是把 strategy 直接定义为函数:
  ```js
    let strategies = {
        "S": function (salary) {
            return salary * 4;
        },
        "A": function (salary) {
            return salary * 3;
        },
        "B": function (salary) {
            return salary * 2;
        },
    };
    // - 同样 Context 也没有必要必须用 Bonus 类来表示, 我们依然用 calculateBonus
    //   函数充当 Context 来接受用户的请求, 经过改造, 代码的结构变得更简洁:
    let calculateBonus = function (level, salary) {
        return strategies[level](salary);
    };
    console.log(calculateBonus('S', 20000));    // 80000
    console.log(calculateBonus('A', 10000));    // 30000
  ```  
- 在接下来的缓动动画和表单验证的例子中, 我们用到的都是这种函数形式的策略对象.
- 文件见`5.2-JavaScript版本的策略模式.html`.

### 5.3 多态的策略模式中的体现
- 通过使用策略模式重构代码，我们消除了原程序中大片的条件分支语句。所有跟计算奖金有关的
  逻辑不再放在 Context 中，而是分布在各个策略对象中 [见:
  `5.2-JavaScript版本的策略模式.html` 中的代码]。Context并没有计算奖金的能力，
  而是把这个职责委托给了某个策略对象。每个策略对象负责的算法已被各自封装在对象内部。
  当我们对这些策略对象发出 "计算奖金" 的请求时，它们会返回各自不同的计算结果，这正是
  对象多态性的体现，也是 "它们可以相互替换" 的目的。替换 Context 中当前保存的策略对象,
  便能执行不同的算法来得到我们想要的结果.

### 5.4 使用策略模式实现缓动动画
- 5.4.1 实现动画效果的原理
    + 在 JavaScript中，可以通过连续改变元素的某个 CSS属性，比如 left、top、
      background-position 来实现动画效果。
- 5.4.2 思路和一些准备工作
    + 我们目标是编写一个动画类和一些缓动算法，让小球以各种各样的缓动效果在页面中运动。
      现在来分析实现这个程序的思路。在运动开始之前，需要提前记录一些有用的信息，至少包
      括以下信息：
        - 动画开始时，小球所在的原始位置；
        - 小球移动的目标位置；
        - 动画开始时的准确时间点；
        - 小球运动持续的时间。
    + 随后，我们会用 setInterval 创建一个定时器，定时器每隔 19ms 循环一次。
      在定时器的每一帧里，我们会把动画已消耗的时间、小球原始位置、小球目标位置和动画持续的
      总时间等信息传入缓动算法。该算法会通过这几个参数，计算出小球当前应该所在的位置。最后
      再更新该 div 对应的 CSS 属性，小球就能够顺利地运动起来了。
- 5.4.3 让小球运动起来: 见 `5.4-使用策略模式实现缓动动画.html`

### 5.5 更广义的 "算法"
- 策略模式也可以封装一系列的 "业务规则".

### 5.6 表单校验
- 5.6.1 表单校验的第一个版本
- 5.6.2 用策略模式重构表单校验
- 5.6.3 给某个文本输入框添加多种校验规则

### 5.7 策略模式的优缺点
- 策略模式是一种常用且有效的设计模式，本章提供了计算奖金、缓动动画、表单校验这三个例子
  来加深大家对策略模式的理解。从这三个例子中，我们可以总结出策略模式的一些优点。
    + (1) 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
    + (2) 策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的 strategy 中，
      使得它们易于切换，易于理解，易于扩展。
    + (3) 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
    + (4) 在策略模式中利用组合和委托来让 Context 拥有执行算法的能力，这也是继承的
      一种更轻便的替代方案。
- 当然，策略模式也有一些缺点，但这些缺点并不严重。
- 首先，使用策略模式会在程序中增加许多策略类或者策略对象，但实际上这比把它们负责的逻辑
  堆砌在 Context 中要好。
- 其次，要使用策略模式，必须了解所有的 strategy，必须了解各个 strategy 之间的不同点，
  这样才能选择一个合适的 strategy。比如，我们要选择一种合适的旅游出行路线，必须先了解
  选择飞机、火车、自行车等方案的细节。此时 strategy 要向客户暴露它的所有实现，这是
  违反最少知识原则的。
### 5.8 一等函数对象与策略模式
- 在以类为中心的传统面向对象语言中，不同的算法或者行为被封装在各个策略类中, Context 将
  请求委托给这些策略对象，这些策略对象会根据请求返回不同的执行结果，这样便能表现出对象的多态性。
- Peter Norvig 在他的演讲中曾说过：“在函数作为一等对象的语言中，策略模式是隐形的。
  strategy 就是值为函数的变量。”在 JavaScript 中，除了使用类来封装算法和行为之外，
  使用函数当然也是一种选择。这些“算法”可以被封装到函数中并且四处传递，也就是我们常说的
  “高阶函数”。实际上在 JavaScript 这种将函数作为一等对象的语言里，策略模式已经融入到了
  语言本身当中，我们经常用高阶函数来封装不同的行为，并且把它传递到另一个函数中。当我们对
  这些函数发出“调用”的消息时，不同的函数会返回不同的执行结果。在 JavaScript 中，
  “函数对象的多态性" 来得更简单.
- 在前面的学习中，为了清楚地表示这是一个策略模式，我们特意使用了 strategies 这个名字。
  如果去掉 strategies，我们还能认出这是一个策略模式的实现吗？代码如下：
  ```js
    var S = function( salary ){
        return salary * 4;
    };
    var A = function( salary ){
        return salary * 3;
    };
    var B = function( salary ){
        return salary * 2;
    };
    var calculateBonus = function( func, salary ){
        return func( salary );
    };
    calculateBonus( S, 10000 ); // 输出： 40000
  ```

### 5.9 小结

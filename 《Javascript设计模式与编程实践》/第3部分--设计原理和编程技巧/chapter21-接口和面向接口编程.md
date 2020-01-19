# 第 21 章 -- 接口和面向接口编程

## 本章目录 (Catalog)
- 21.1 回到 Java 的抽象类 
- 21.2 interface
- 21.3 JavaScript 语言是否需要抽象类和 interface
- 21.4 用鸭子类型进行接口检查
- 21.5 用 TypeScript 编写基于 interface 的命令模式


## 生词 (New Words)
- **implement ['ɪmplɪm(ə)nt]  --vt.实现，执行，落实。  --n.工具，设备**
    + How do we implement this? 那我们怎么来执行呢？
    + How do you implement this practice? 您如何执行这个实践?
    + Otherwise, you would have to implement this feature yourself. 
      否则，您就需要自己想办法实现这个特性。


## 本章内容 (Content)
- 当我们谈到接口的时候, 通常会涉及一下几种含义, 下面先简单介绍:
    + (1) 我们经常说一个库或者模块对外提供了某某API接口. 通过主动暴露的接口来通信,
      可以隐藏软件系统内部的工作细节. 这是我们最熟悉的第 1 种接口含义.
    + (2) 第 2 种接口是一些语言提供的关键字, 比如 Java 的 `interface`. 
      **interface 关键字可以产生一个完全抽象的类.** 这个完全抽象的类用来表示一种契约,
      **专门负责建立类与类之间的关系.**
    + (3) 第 3 种接口即是我们谈论的 "面向接口编程" 中的接口, 接口的含义在这里体现得更为抽象.
      用《设计模式》中的话说就是: `接口是对象能响应的请求的集合`.
- 本章主要讨论的是第二种和第三种接口。首先要讲清楚的是，本章的前半部分都是针对 Java 语言的讲解,
  这是因为 JavaScript 并没有从语言层面提供对抽象类(Abstract class)
  或者接口(interface)的支持，我们有必要从一门提供了抽象类和接口的语言开始，
  逐步了解“面向接口编程”在面向对象程序设计中的作用。

### 21.1 回到 Java 的抽象类 
- 我们已经明白，静态类型语言通常设计为可以“向上转型”。当给一个类变量赋值时，
  这个变量的类型既可以使用这个类本身，也可以使用这个类的超类。就像看到天上有只麻雀，
  我们既可以说“一只麻雀在飞”，也可以说“一只鸟在飞”，甚至可以说成“一只动物在飞”。
  通过向上转型，对象的具体类型被隐藏在“超类型”身后。当对象类型之间的耦合关系被解除之后，
  这些对象才能在类型检查系统的监视下相互替换使用，这样才能看到对象的多态性。
- 所以如果想让鸡也叫唤起来，必须先把 duck 对象和 chicken 对象都向上转型为它们的超类型Animal 类，
  进行向上转型的工具就是**抽象类**或者 **interface** 。我们即将使用的是抽象类:
- 先创建一个 Animal 抽象类  
  ```java
    public abstract class Animal {
        abstract void makeSound();  // - 抽象方法
    }

    // - 然后让 Duck 类和 Chicken 类都继承自抽象类 Animal:
    public class Chicken extends Animal {
        public void makeSound() {
            // - 在Java语言中，标准输入输出流使用 `println`(print line).
            // - C 语言 中 "stdio.h" 库中的标准函数 "printf()" (print format)
            System.out.println('咯咯咯');
        }
    }
    public class Duck extends Animal {
        public void makeSound() {
            System.out.println('嘎嘎嘎');
        }
    }

    // - 也可以把 Animal 定义为一个具体类而不是抽象类，但一般不这么做。Scott Meyers曾指出，
    //   只要有可能，不要从具体类继承。
    // - 现在剩下的就是让 AnimalSound 类的 makeSound 方法接收 Animal 类型的参数，
    //   而不是具体的 Duck 类型或者 Chicken 类型：
    public class AnimalSound {
        // -接收 Animal 类型的参数, 而非 Duck 类型或 Chicken 类型
        public void makeSound(Animal animal) {
            animal.makeSound();
        }
    }
    public class Test {
        public static void main(String args[]) {
            AnimalSound animalSound = new AnimalSound();
            Animal duck = new Duck();       // - 向上转型
            Animal chicken = new Chicken(); // - 向上转型
            animalSound.makeSound(duck);    // 输出: 嘎嘎嘎
            animalSound.makeSound(chicken); // 输出: 咯咯咯
        }
    }
  ```
- 本节通过抽象类完成了一个体现对象多态性的例子。但目前的重点并非讲解多态，而是在于说明抽象类。
  抽象类在这里主要有以下两个作用。  
    + (1) 向上转型。让 Duck 对象和 Chicken 对象的类型都隐藏在 Animal 类型身后，
      隐藏对象的具体类型之后， duck 对象和 chicken 对象才能被交换使用，
      这是让对象表现出多态性的必经之路。
    + (2) 建立一些契约。继承自抽象类的具体类都会继承抽象类里的 abstract 方法，
      并且要求覆写它们。这些契约在实际编程中非常重要，可以帮助我们编写可靠性更高的代码。
- 总而言之，不关注对象的具体类型，而仅仅针对超类型中的“契约方法”来编写程序，可以产生可靠性高的程序，
  也可以极大地减少子系统实现之间的相互依赖关系，这就是我们本章要讨论的主题:  
  **面向接口编程，而不是面向实现编程。**  
- 奇怪的是，本节我们一直讨论的是抽象类，跟接口又有什么关系呢？实际上这里的接口并不是指 interface，
  而是一个抽象的概念。
- 从过程上来看，"面向接口编程" 其实是 "面向超类型编程"。当对象的具体类型被隐藏在超类型身后时，
  这些对象就可以相互替换使用，我们的关注点才能从对象的类型上转移到对象的行为上。
  “面向接口编程” 也可以看成面向抽象编程，即针对超类型中的 `abstract` 方法编程，
  接口在这里被当成 abstract 方法中约定的契约行为。
  这些契约行为暴露了一个类或者对象能够做什么，但是不关心具体如何去做。

### 21.2 interface
- 除了用抽象类来完成面向接口编程之外, 使用 `interface` 也可以达到同样的效果. 
  虽然很多人在实际使用中可以区分抽象类和 interface, 但使用 interface 实际上也是继承的一种方式,
  叫作**接口继承**.
- 相较于单继承的抽象类, 一个类可以实现多个 interface. 抽象类中除了 abstract 方法之外,
  还可以有一些供子类公用的具体方法. interface 使抽象的概念更进一步, 
  `它产生一个完全抽象的类, 不提供任何具体实现和方法体`(Java 8 已经提供实现方法的 interface),
  但允许该 interface 的创建者确定方法名, 参数列表和返回类型, 这相当于提供一些行为上的约定, 
  但不关心该行为的具体实现过程.
- interface 同样可以用于向上转型，这也是让对象表现出多态性的一条途径，
  实现了同一个接口的两个类就可以被相互替换使用。
- 再回到用抽象类实现让鸭子和鸡发出叫声的故事。这个故事得以完美收场的关键是让抽象类 Animal 给
  duck 和 chicken 进行向上转型。但此时也引入了一个限制，抽象类是基于单继承的，
  也就是说我们不可能让 Duck 和 Chicken 再继承自另一个家禽类。如果使用 interface ，
  可以仅仅针对发出叫声这个行为来编写程序，同时一个类也可以实现多个 interface 。
- 下面用 interface 来改写基于抽象类的代码. 我们先定义 Animal 接口,
  所有实现了 Animal 接口的动物类都将拥有 Animal 接口中约定的行为:
  ```java
    // - interface 接口只声明成员方法, 不做实现.
    public interface Animal {
        abstract void makeSound();
    }
    public class Duck implements Animal {
        // - 重写 Animal 接口的 makeSound 抽象方法
        public void makeSound() {
            System.out.println('嘎嘎嘎');
        }
    }
    public class Chicken implements Animal {
        // - 重写 Animal 接口的 makeSound 抽象方法
        public void makeSound() {
            System.out.println('咯咯咯');
        }
    }
    public class AnimalSound {
        public void makeSound(Animal animal) {
            animal.makeSound();
        }
    }
    public class Test {
        public static void main(String args[]) {
            Animal duck = new Duck();
            Animal chicken = new Chicken();
            AnimalSound animalSound = new AnimalSound();
            animalSound.makeSound(duck);    // 输出: 嘎嘎嘎
            animalSound.makeSound(chicken); // 输出: 咯咯咯
        }
    }
  ```

### 21.3 JavaScript 语言是否需要抽象类和 interface

### 21.4 用鸭子类型进行接口检查

### 21.5 用 TypeScript 编写基于 interface 的命令模式

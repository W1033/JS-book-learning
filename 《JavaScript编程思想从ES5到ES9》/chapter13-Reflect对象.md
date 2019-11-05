# 第 13 章 -- Reflect 对象


### 13.1 Reflect 对象介绍（ES6)
- 13-1_Reflect-object.js
  ```javascript
        let candy_amount = {
        durian: 30,
        strawberry: 55,
        cranberry: 10,
        blueberry: 13,
        cherry: 60,
        orange: 18,
        lemon: 10
    };

    Object.defineProperty(candy_amount, 'apple', {
        value: 17,
        writable: true,
        enumerable: true,
        configurable: true
    });

    candy_amount.watermelon = 33;

    // 初始化数据为内含字符串 'mixed' 的 Symbol 对象实例
    let symbol01 = Symbol('mixed');

    candy_amount[symbol01] = 5;

    // 内置函数 Reflect.ownKeys() 可使 candy_amount 对象中的各个属性组成一个数组
    // [
    //   'durian',     'strawberry',
    //   'cranberry',  'blueberry',
    //   'cherry',     'orange',
    //   'lemon',      'apple',
    //   'watermelon', Symbol(mixed)
    // ]
    console.log(Reflect.ownKeys(candy_amount));
    console.log('');

    console.log(candy_amount.orange);
    console.log(candy_amount.watermelon);
    console.log('');

    // .mixed/['mixed'] 都返回一个 undefined 表示在 candy_amount 中不存在属性 mixed
    console.log(candy_amount.mixed);
    console.log(candy_amount['mixed']);
    console.log('');

    // 返回对象中标识符为 Symbol('mixed') 的属性
    console.log(candy_amount[symbol01]);

  ```


### 13.2 间接应用特定函数（ES6)
- 通过函数 Reflect.apply(), 可以传入多个数据，至即将被间接应用的其他函数。
## JS集锦

#### 考查 var、let、const:
- ```javascript
    function sayHi() {
        console.log(name); // undefined
        console.log(age); // 报错
        var name = 'Jettech';
        let age = 21;
    }
  ```

#### for 循环和异步执行
- ```javascript
    for (let i = 0; i < 3; i++) {
        setTimeout(()=> {console.log(i);}, 1);
    }
    console.log("i: ", i);

    for (var j =0; j < 3; j++) {
        setTimeout(()=> {console.log(j);}, 1)
    }   
    console.log("j: ", j);
  ```

#### 判断是否相等:
- ```javascript
    var a;
    var b = null;
    var c = NaN;
    console.log("a==b: ", a == b);
    console.log("a!=b: ", a != b);
    console.log("a==c: ", a == c);
    console.log("a!=c: ", a != c);
    console.log("b==c: ", b == c);
    console.log("b!=c: ", b != c);
    console.log("c==c: ", c == c);
    console.log("c!=c: ", c != c);
  ```

#### break / continue 使用:
- ```javascript
    for (let i = 1; i < 5; i++) {
        if (i === 3) {
            continue
        }
        console.log(i); // 1, 2, 4
    }
  ```     

#### String 知识点
- ```javascript
    String.prototype.giveLydiaPizza = () => {
        return 'Just give...';
    };
    const name = new String('Lydia');
    console.log(name.giveLydiaPizza()); //
  ```     

#### Array.prototype.reduce() 方法考查
+ ```javascript
    let arr = [
        [0, 1],
        [2, 3]
    ].reduce((acc, cur) => {
        return acc.concat(cur)
    }, [1, 2]);
    console.log(arr); // [1, 2, 0, 1, 2, 3]
  ```    

#### this 知识点 (全部)
+ ```javascript
    const shape = {
        radius: 10,
        diameter() {
            return this.radius * 2;
        },
        perimeter: () => {
            return 2 * Math.PI * this.radius;
        }
    };
    console.log("shape.diameter(): ", shape.diameter()); // 20
    console.log("shape.perimeter(): ", shape.perimeter()); // NaN
  ```


#### 公用代码结构xxxx
- ```javascript

  ```


#### 公用代码结构xxxx
- ```javascript

  ```







### 算法

#### JavaScript 实现冒泡排序
-  [参考文章:](https://segmentfault.com/a/1190000014175918)
- ```javascript
    // - 冒泡排序实现原理: 
    //   + 数组中有 n 个数，比较每相邻两个数，如果前者大于后者，就把 2 个数交换
    //     位置；这样一来，第一轮就可以选出一个最大的数放在最后面；那么经过 n-1
    //     (数组的 length -1) 轮，就完成了所有数的排序。

    // - (1)先来实现找数组中的最大数，并把它放在数组最后。
    let arr = [2, 4, 3, 7, 9, 1, 6];
    // - 遍历数组，索引从 0 开始所以，数组长度 -1 
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            let temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }
    console.log("arr: ", arr); // arr:  (7) [2, 3, 4, 7, 1, 6, 9]
  ```


#### 公用代码结构xxxx
- ```javascript

  ```




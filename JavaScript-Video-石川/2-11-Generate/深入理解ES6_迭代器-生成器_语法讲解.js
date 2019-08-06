// 单独使用迭代器的示例 iterator

/**
 * ## 什么是迭代器(iterator)?:
 * - 迭代器是一种特殊对象，它具有一些专门为迭代过程设计的专有接口。所有的迭代对象都有一个
 *   next() 方法，每次调用都返回一个结果对象。结果对象有2个属性:
 *      + (1) 一个是 value, 表示下一个将要返回的值。
 *      + (2) 另一个是 done, 它是一个布尔类型的值，当没有更多可返回数据时返回 true。
 * - 迭代器还会保存一个内部指针，用来指向当前集合中值的位置，每调用一次 next() 方法，都会返
 *   回下一个可用的值。
 */
(function() {
    function createIterator(items) {
        let i = 0;
        return {
            next: function() {
                let done = (i >= items.length);
                let value = !done ? items[i++] : undefined;
                return {
                    value: value,
                    done: done
                }
            }
        }
    }

    let iterator = createIterator([3, 6, 9]);
    console.log(iterator.next());   // { value: 3, done: false }
    console.log(iterator.next());   // { value: 6, done: false }
    console.log(iterator.next());   // { value: 6, done: false }
    console.log(iterator.next());   // { value: undefined, done: true }
})();


// - 何为生成器 (generator) ？ A: 生成器是能返回一个迭代器的函数。生成器函数由放在
//   function 关键字之后的一个星号 (*) 来表示，并能使用新的 yield 关键字。
(function() {
    function *createIterator(items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i]
        }
    }

    let iterator = createIterator([3, 6, 9]);
    console.log(iterator.next());   // { value: 3, done: false }
    console.log(iterator.next());   // { value: 6, done: false }
    console.log(iterator.next());   // { value: 6, done: false }
    console.log(iterator.next());   // { value: undefined, done: true }
})();


// - 迭代器高级功能 -- 传递参数给迭代器
(function() {
    function *createIterator() {
        let first = yield 1;
        let second = yield first + 2;
        yield second + 3;
    }
    let iterator = createIterator();

    // - (1)
    console.log(iterator.next());
    // - (2)
    console.log(iterator.next(4));
    // - (3)
    console.log(iterator.next(5));

    /**
     * - (1). 我们可以通过 next() 方法向迭代器传递参数。当一个参数被传递给 next 方法时，
     *   该参数就会成为生成器内部 yield 语句的值。但对于 next() 的首次调用是一个特殊情况，
     *   传递给它的任意参数都会被忽略。由于传递给 next() 的参数会成为 yield 语句的值，该
     *   yield 语句指的是上次生成器中断执行处的语句；而 next() 方法第一次被调用时，生成器
     *   函数才刚刚开始执行，没有所谓的 "上一次中断处的 yield 语句" 可供复制。因此在第一次
     *   调用 next() 时，不存在任何向其传递参数的理由。
     *
     * - (2). 第 2 次调用 next() 时， 4 作为参数被传递进去，这个 4 最终被复制给了生成器
     *   函数内部的 first 变量。在包含赋值操作的第一个 yield 语句中，表达式右侧在第一次
     *   调用 next() 时被计算，而表达式左侧则在第二次调用 next() 方法时、并在生成器函数
     *   继续执行前被计算。由于第二次调用 next() 传入了 4， 这个值就被赋给了 first 变量，
     *   之后生成器继续执行。
     *
     * - (3). 第 2 个 yield 使用了第一个 yield 的结果并加上了 2，也就是返回了一个 6. 当
     *   next() 第 3 次被调用时，传入了参数 5. 这个值被赋给了 second 变量，并随后用在了
     *   第 3 个 yield 语句中，返回了 8。
     *
     */

})();
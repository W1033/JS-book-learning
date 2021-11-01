/** 
 * ### 3.2.4 高阶函数的其他应用 -- 1.函数柯里化（function currying） 
 * - currying 又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后，
 *   该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存
 *   起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。
 */

// "use strict";

// - 假设我们要编写一个计算每月开销的函数。在每天结束之前，我们都要记录今天花掉了多少钱。
//   如果在每个月的前 29 天，我们都只是保存好当天的开销，直到第 30 天才进行求值计算，
//   这样就达到了我们的要求。虽然下面的 cost 函数还不是一个 currying 函数的完整实现，
//   但有助于我们了解其思想。
(function() {
    let cost = (function () {
        let args = [];
        return function () {
            // - 为 cost 传入的参数: cost() 调用传入的参数在函数形成的闭包中被保存起来。
            if (arguments.length === 0) {
                let money = 0;
                for (let i = 0, l = args.length; i < l; i++) {
                    money += args[i];
                }
                return money;
            } else {
                // 利用 apply() 方法 給 args 數組推入一项 (arguments)
                [].push.apply(args, arguments)
            }
        }
    
    })();
    
    cost(100);      // 未真正求值
    cost( 200 );    // 未真正求值
    cost( 300 );    // 未真正求值
    
    console.log( cost() );  // 求值并输出
})();


// 接下来我们编写一个通用的 function currying() {}, 此函数接受一个参数，即将要被
// currying 的函数。在这个例子中，这个函数的作用遍历本月每天的开销并求出它们的总和。
// 代码如下。
(function() {
    let currying = function(fn) {
        let args = [];
        return function() {
            if (arguments.length === 0) {
                return fn.apply(this, args);
            } else {
                [].push.apply(args, arguments);
                // - 《js高程》7.1：arguments.callee 是一个指向正在执行的函数的指针。
                //   但在严格模式下（即在js文件头部添加："use strict"）访问他会导致错误.
                return arguments.callee;
            }
        }
    };

    let cost = (function() {
        let money = 0;
        return function() {
            for (let i = 0, l = arguments.length; i < l; i++) {
                money += arguments[i];
            }
            return money;
        }
    })();

    // 转化成 currying 函数
    // Tips: 把自执行的 cost 函数传入到 currying 函数的闭包内，以供最后调用 const() 
    // 参数为空时遍历本月每天的开销并求它们的总和。
    cost = currying(cost);

    cost(100);  // 未真正求值
    cost(300);  // 未真正求值
    cost(600);  // 未真正求值
    console.log(cost());    // 求值并输出
})();
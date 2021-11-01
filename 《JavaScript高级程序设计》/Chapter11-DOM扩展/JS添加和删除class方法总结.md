# JavaScript 添加和删除 class 方法总结

## Table Of Contents
1. 兼容 IE9, IE10 的写法
2. HTML5(IE10+) 添加和删除 class 


## New Words
- **toggle ['tɒg(ə)l] --vt.切换, 转换  --n.触发器**
    + You can toggle it while running a game by using the "F5" key.
        你可以在游戏运行时按 F5 切换是否使用此功能. 


## Content
### 1. 兼容 IE9, IE10 的写法
- ```html
    <div id="container" class="typo">
        <button class="toggle-render">Toggle render</button>
        <p class="box v-enter v-enter-active">box: CSS transition(过渡)</p>
    </div>
  ```
  ```js
    // - 取得 id 名为 'xxx' 的元素
    const getId = function(id) {
        return typeof id === 'string' ? document.getElementById(id): id;
    };
    // - 取得 class 名为 'xxx' 的所有元素
    const getClassName = function(cls, parent) {
        let obj = parent || document;
        return obj.getElementsByClassName(cls);
    };
    // - 判断一个元素是否含有判断的 class
    const hasClass = function(ele, cls){
        // - String.split(): 基于制定的分隔符将一个字符串分割成多个子字符串,
        //   并将结果放在一个数组中.
        let names = ele.className.split(/\s+/);
        if (arrIndexOf(names, cls) >= 0) {
            return true;
        } else {
            return false;
        }
    };
    // - 添加 class
    const addClass = function(ele, cls) {
        if (hasClass(ele, cls)) {
            return null;
        }
        ele.className = (ele.className || '') + ' ' + cls;
    };
    // - 移除 class
    const removeClass = function(ele, cls) {
        var names = ele.className.split(/\s+/);
        var i = 0,
            len = names.length,
            arr = [];
        for (; i < len; i++) {
            if (names[i] !== cls) {
                arr.push(names[i])
            }
        }
        ele.className = arr.join(' ');
    };
    // - 取得元素在数组中的索引
    const arrIndexOf = function(arr, item) {
        if (typeof arr.indexOf === 'function') {
            return arr.indexOf(item);
        }
        var i = 0;
            len = arr.length;
        for (; i < len; i++) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    };
    const box = getClassName('box')[0];
    removeClass(box, 'v-enter');
    addClass(box, 'v-enter-to');
  ```

### 2. HTML5(IE10+) 添加和删除 class 
- 我们直接给一个使用原生 JS 来简单实现 Vue 过渡效果的示例:
  ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="../../../CSS-grocery/typo.css">
        <style type="text/css">
            #container {
                margin: 10px;
                height: 200px;
                width: 620px;
                padding: 10px;
                background: #33cc99;
                overflow: hidden;
            }
            .toggle-render {
                min-width: 66px;
                line-height: 26px;
                padding: 3px 6px;
                margin: 10px;
                cursor: pointer;
                border-radius: 4px;
                text-align: center;
                background-color: #fafafa;
                border: none;
            }
            .box {
                line-height: 20px;
            }
            .v-leave {
                transform: translateX(0);
                opacity: 1;
            }
            .v-leave-active {
                transition: all .6s linear;
            }
            /* - 注意: 此处的 v-leave-to 和 下面的 v-enter 样式定义一样. */
            .v-leave-to {
                transform: translateX(16px);
                opacity: 0;
            }

            .v-enter {
                transform: translateX(16px);
                opacity: 0;
            }
            .v-enter-active {
                /* - 注意这里的执行时间 transition-duration 和上面的
                *   v-leave-active 内的不同. */
                transition: all .4s linear;
            }
            /* - 注意 v-leave 和当前 v-enter-to 样式一样 */
            .v-enter-to {
                transform: translateX(0);
                opacity: 1;
            }
        </style>
    </head>
    <body>
        <div id="container" class="typo">
            <button class="toggle-render">Toggle render</button>
            <p class="box">box: CSS transition(过渡)</p>
        </div>
        
        <script>
            // - IE10+ 浏览器版本的写法, 直接使用 HTML5 的 classList 属性
            (function() {
                const toggleRender = document.querySelector('.toggle-render');
                const box = document.querySelector('.box');

                let show = true;

                // - window.requestAnimationFrame(): 告诉浏览器 -- 你希望执行一个动画,
                //   并且要求浏览器在下次重绘之前调用指定的回调函数更新动画.
                //   该方法需要传入一个回调函数作为参数, 该回到函数会在浏览器下一次重绘之前执行.
                // - Tip: 这里是参考 Vue 源码中的写法
                const raf = window.requestAnimationFrame;

                const leave = function() {
                    // - 首先判断 show 的 boolean(布尔值)
                    if (show === true) {
                        // - 判断 show 为 true 后, 第一步就是给 box 添加 `v-leave`
                        //   和 `v-leave-active` 即初始化默认的 transition(过渡样式).
                        box.classList.add('v-leave');
                        box.classList.add('v-leave-active');

                        // - 我们添加了 `v-leave` 后需要设置一个很短的时间,
                        //   这个时间过后, 就要移除 `v-leave` 立即添加 `v-leave-to`
                        //   样式, 设置固定时间后执行代码, 第一感觉是 `setTimeout()`,
                        //   不过 `setTimeout` 是一个异步的宏任务, 当执行 setTimeout
                        //   时是将回调函数在指定的事件之后放入到宏任务队列的.
                        //   但如果此时主线程有很多同步代码在等待执行, 或者微任务队列
                        //   以及当前宏任务队列之前还有很多任务在排队等待执行,
                        //   那么要等它们执行完之后 `setTimeout` 的回调函数才会被执行,
                        //   因此并不能保证在 setTimeout 中指定的时间过后回调函数就会被执行.
                        // - 但是问题就来了, `requestAnimationFrame` 就好于
                        //   `setTimeout`? A: 理论上来说是的, 虽然 `requestAnimationFrame`
                        //   也是属于异步宏任务, 但是 `requestAnimationFrame`
                        //   会把每一帧的所有 DOM 操作集中起来, 在一次重绘或回流中就完成,
                        //   并且重绘或回流的事件间隔紧紧跟随浏览器的刷新频率, 一般来说,
                        //   这个频率为每秒 60 帧(1s = 1000ms. 1fps =  60fps / 1000
                        //   = 60ms). 但在大多数遵循 W3C 建议的浏览器中,
                        //   回调函数执行次数通常与浏览器屏幕刷新次数相匹配.
                        // - 更多 `requestAnimationFrame` 的介绍见:
                        //   `../JavaScript-集锦/JS-集锦.md`    
                        raf(function() {
                            box.classList.remove('v-leave');
                            box.classList.add('v-leave-to');
                            // - 使用 transitionend 事件, 在过渡执行完毕之后, 移除 box
                            //   上添加的样式.
                            box.addEventListener('transitionend', remove, false);
                            function remove() {
                                box.classList.remove('v-leave');
                                box.classList.remove('v-leave-active');
                                // - v-leave-active 此处还不能移除,
                                //   如果此时移除 box 便会显现.
                                // box.classList.remove('v-leave-to');
                                show = false;
                            }
                        });
                    }

                    if (show === false) {
                        if (box.classList.contains('v-leave-to')) {
                            box.classList.remove('v-leave-to');
                        }
                        box.classList.add('v-enter');
                        box.classList.add('v-enter-active');
                        raf(function() {
                            box.classList.remove('v-enter');
                            box.classList.add('v-enter-to');
                            box.addEventListener('transitionend', remove, false);
                            function remove() {
                                box.classList.remove('v-enter');
                                box.classList.remove('v-enter-active');
                                box.classList.remove('v-enter-to');
                                show = true;
                            }
                        });
                    }
                };
                toggleRender.addEventListener('click', leave, false);
            })();
        </script>
    </body>
    </html>
  ```

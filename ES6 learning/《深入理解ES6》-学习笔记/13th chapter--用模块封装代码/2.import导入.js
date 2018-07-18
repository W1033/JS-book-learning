// Created: 20180513

// ( ./: 当前目录。 ../: 父级目录。 /: 根目录。  )
/**
 * 导入函数的基本语法:  import + {要导入的标识符}  + from + 标识符应当从那个模块导入。
 * 注: import 后的大括号表示从给定模块导入的绑定( binding )
 * import { identifier1, identifier2 } from "./example.js"
 * */

import {sum} from "./1.export导出.js";

console.log(sum(1, 2));   // 2


// 导入多个绑定
import {color, name, Rectangle, multiply} from "./1.export导出"

console.log(color);
console.log(multiply(3, 4));


// 导入整个模块
import * as example from "./1.export导出.js";

console.log(example.color);
console.log(example.sum(1, 3));


/** 导入默认值: 此语法对应 "1.export导出.js" 中的 导出默认值:
 *  请注意，这里没 import 后的 defaultSum (名称自定义) 没有使用大括号，这与上面非默认导入的情况不同。
 *  ECMAScript 6 的创建者希望它能够称为 Web 上主流的模块导入形式，并且可以使用已有的对象。
 **/
import defaultSum from "./1.export导出";

console.log(defaultSum(2, 6));

// 对于普通的导出 或 导出默认值 的情况， 也可以再导入时用一条语句解决.
import defaSum, {name} from "./1.export导出";

console.log(name);
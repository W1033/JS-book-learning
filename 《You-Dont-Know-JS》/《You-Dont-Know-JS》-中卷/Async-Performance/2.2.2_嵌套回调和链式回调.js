let doA = () => console.log("我是 doA 返回值");
let doB = () => console.log("我是 doB 返回值");
let doC = () => console.log("我是 doC 返回值");
let doD = () => console.log("我是 doD 返回值");
let doE = () => console.log("我是 doE 返回值");
let doF = () => console.log("我是 doF 返回值");

doA(setTimeout(function() {
    doB();
    doC(setTimeout(function() {
        doD();
    }, 200));

    doE();
}, 200));

doF();

// 上面调用的正确顺序为: doA, doF, doB, doC, doE, doD

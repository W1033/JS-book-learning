

/**
 * > 5.2 运算符优先级
 *
 */
const aa = 42;
const bb = 'foo';
const cc = [1, 2, 3];
console.log("aa && bb || cc: ", aa && bb || cc);    // foo
console.log("aa || bb && cc: ", aa || bb && cc);    // 42

console.log("**********************" + '\n');


function foo() {
    try {
        console.log(42);
        return 52;
    }
    finally {
        console.log("Hello");
    }
    console.log("Never runs");
}
// 42
// Hello
// 52
console.log(foo());

console.log("**********************" + '\n');

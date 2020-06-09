// - [vue系列--响应式原理实现及Observer源码解析(七)]
//   (https://www.cnblogs.com/tugenhua0707/p/11754291.html)

// ### 基本的 Demo
// const target = {
//     'name': 'kongzhi',
// };
// const handler = {
//     get: function(trapTarget, key) {
//         console.log('getter 函数被调用');
//         return trapTarget[key];
//     },
//     set: function(trapTarget, key, value) {
//         console.log('setter 函数被调用');
//         target[key] = value;
//     }
// };
// const testObj = new Proxy(target, handler);
// // - 先打印: 'getter 函数被调用', 后打印: 'kongzhi'
// console.log(testObj.name);

// // - 先打印: 'setter 函数被调用', 然后更新 name 属性
// testObj.name = '11222';
// // - 打印: 'getter 函数被调用', 然后打印: '11222'
// console.log(testObj.name);


// ### 看一个使用 Proxy 代理对象的 Demo
function render() {
    console.log('render 函数被调用了');
} 
const obj = {
    name: 'Wang',
    love: {
        book: ['Node.js', 'JavaScript', 'CSS', 'HTML'],
        favorite: 'read'
    },
    arrs: [1, 2, 3]
};
const han = {
    get: function(trapTarget, key) {
        // - 如果 target[key] 存在, 并且 target[key] 是对象类型, 就直接返回一个代理,
        //   代理的第一个参数: 目标对象为 trapTarget[key], 处理程序(handler) 还是
        //   当前处理程序(han)
        if (trapTarget[key] && typeof trapTarget[key] === 'object') {
            return new Proxy(trapTarget[key], han);
        }
        return Reflect.get(trapTarget, key);
    },
    set: function(trapTarget, key, value){
        render();
        return Reflect.set(trapTarget, key, value)
    }
}

let prox = new Proxy(obj, han);

// render 函数被调用了
prox.name = 'tugenhua';
// tugenhua
console.log(prox.name);

// - 会输出: render 函数被调用了
// - 但是在上一行的输出之前, getter 中的 if 会执行一次, 因为 love 是对象
prox.love.favorite = 'listen to music';

// render 函数被调用了
prox.arrs[0] = 4;
// 4
console.log(prox.arrs[0]);

// 打印 3 但不会调用 set 函数
console.log(prox.arrs.length);
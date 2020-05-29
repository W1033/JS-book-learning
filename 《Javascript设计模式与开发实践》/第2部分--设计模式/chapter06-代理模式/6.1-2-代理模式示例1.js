// 6.1 - 6.2 代理模式示例 1
let Flower = function() {};

// const xiaoming = {
//     sendFlower = function(target) {
//         let flower = new Flower();
//         target.receiverFlower(flower);
//     }
// };
const B = {
    receiverFlower(flower) {
        // - 监听 A 的好心情
        A.listenGoodMod(function() {
            // - 延迟创建 flower 对象
            let flower = new Flower();
            A.receiverFlower(flower);
        })
    }
};

var A = {
    receiverFlower(flower) {
        console.log('收到花' + flower);
    },
    listenGoodMod(fn) {
        setTimeout(function() {
            // - 假设 2 秒之后 A 的心情变好
            fn();
        }, 2000)
    }
};
B.receiverFlower();
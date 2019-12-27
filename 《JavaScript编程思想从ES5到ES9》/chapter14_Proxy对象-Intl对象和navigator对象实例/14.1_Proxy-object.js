// ## 生词
// - impossibly [im'pɔsəbli] --adv.不可能地, 难以相信地, 极端地
//     + an impossibly difficult problem. 很难以应付的难题
//     + an impossibly cold morning. 极为寒冷的早上


function getValue(obj, attr) {
    return attr in obj ? obj[attr] : 'N/A';
}
function setValue(obj, attr, value) {
    let newValue;
    switch (attr) {
        case 'age':
            if (value > 150) {
                newValue = 'Impossibly old...';
            }
        break;
        case 'gender':
            if (!(value in ['male', 'female'])) {
                newValue = 'Impossibly gender...';
            }
        break;
        default:
            newValue = value;
    }
    obj[attr] = newValue;
}
let curObj = {
    name: 'Daisy',
    gender: 'female',
    age: 30,
};
let proxyHandler = {
    get: getValue,
    set: setValue
};
let proxy01 = new Proxy(curObj, proxyHandler);
proxy01.department = 'finance';
proxy01.position = 'manager';

// proxy01: {
//   name: 'Daisy',
//   gender: 'female',
//   age: 30,
//   department: 'finance',
//   position: 'manager'
// }
console.log('proxy01:', proxy01);
let obj = {};
Object.defineProperty(obj, 'school', {
    configurable: true,
    // writable: true,
    // enumerable: true,
    // value: 'zfpx',
    get() {
        return 'zfpx';
    },
    set(newVal) {
        console.log(newVal);
    }
});

obj.school = 'university';
console.log("obj.school: ", obj.school);
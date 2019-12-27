(function() {
    function  num(x = 1, y = 2, z = 3) {
        console.log(x, y, z);
    }
    num(6, 7);  // output: 6 7 3
    
    // - 如果想让某个参数使用默认值,我们可以使用 undefined 进行赋值, 例如
    num(6, undefined, 7);   // Output: 6 2 7

    // 使用 null 代替默认值
    num(9, null, 12);   // 9 null 12

    // - 参数运算
    function sum(x = 1, y = 2, z = x + y) {
        console.log(x, y, z);
    }
    sum(6, 7);  // 6 7 13
})();


(function() {
    let people = ((name) => {
        return {
            getName: function () {
                return name;
            }
        }
    })("Nicholas");
    console.log(people.getName());  // Nicholas
})();


(function() {
    function Person(name) {
        this.name = name;
    }
    var person = new Person("Nicholas");
    var notAPersion = Person("Nicholas");
    console.log(person);
    console.log(notAPersion)
})();
// 命名私有属性时前面加个下划线 `_`
function fn1() {
    this._firstName = 'Panda';
}


/**--------------------------*/

// 当保存对 `this` 的引用时使用 `_this`.
function curThis() {
    var _this = this;
    return function () {
        console.log(_this);
    };
}


/**--------------------------*/

// 可以创建get()和set()函数，但是要保持一致
function Jedi(options) {
    options || (options = {});
    var lightsaber = options.lightsaber || 'blue';
    this.set('lightsaber', lightsaber);
}

Jedi.prototype.set = function (key, val) {
    this[key] = val;
};

Jedi.prototype.get = function (key) {
    return this[key];
};


// 方法可以返回 `this` 帮助方法可链。
Jedi.prototype.jump = function () {
    this.jumping = true;
    return this;
};

Jedi.prototype.setHeight = function (height) {
    this.height = height;
    return this;
};

var luke = new Jedi();

luke.jump().setHeight(20);


/**--------------------------*/

// 可以写一个自定义的toString()方法，但是确保它工作正常并且不会有副作用。
function Airbnb(options) {
    options || (options = {});
    this.name = options.name || 'no name';
}

Jedi.prototype.getName = function getName() {
    return this.name;
};

Jedi.prototype.toString = function toString() {
    return 'Airbnb // - ' + this.getName();
};
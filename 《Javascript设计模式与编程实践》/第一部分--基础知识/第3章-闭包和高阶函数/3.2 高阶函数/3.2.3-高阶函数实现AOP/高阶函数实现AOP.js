
Function.prototype.before = function (beforefn) {
    const _self = this;
    return function () {
        beforefn.apply(this, arguments);
        return _self.apply(this, arguments);
    }
};

Function.prototype.after = function (afterfn) {
    const _self = this;
    return function () {
        let ret = _self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};
let func = function () {console.log(2);};

func = func
    .before(function () {
        console.log(1);
    })
    .after(function () {
        console.log(3);
    });
func();

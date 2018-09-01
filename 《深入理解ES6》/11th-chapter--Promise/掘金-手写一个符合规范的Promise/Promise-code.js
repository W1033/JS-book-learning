// executor /ɪg'zekjʊtə/  n.执行者
function Promise(executor) {
    let _this = this;
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;

    executor(resolve, reject);

    this.onFulfilledFunc = [];

    this.onRejectedFunc = [];

    function resolve(value) {
        // 当前状态为 pending 时再做更新
        if (_this.state === "pending") {
            // 保存成功结果
            _this.value = value;
            _this.state = "resolve";
        }
    }

    function reject(reason) {
        // 当前状态为 pending 时再做更新
        if (_this.state === "pending") {
            _this.reason = reason;
            _this.state = reject;
        }
    }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    if (this.state === "resolved") {
        // 判断参数类型，是函数执行之
        if (typeof onFulfilled === "function") {
            onFulfilled(this.value);
        }
    }
    if (this.state === "rejected") {
        if (typeof onRejected === "function") {
            onRejected(this.reason);
        }
    }

};

module.exports = Promise;
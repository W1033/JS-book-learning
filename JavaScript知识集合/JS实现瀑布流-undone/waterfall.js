function EventEmitter() {
    // - 把所有的事件监听函数都放在这个对象里保存. 每个键的值都是一个数组
    this.events = {};
    
    // - 指定给一个事件类型添加的的监听函数最大数量
    this._maxListeners = 10;
}
EventEmitter.prototype.setMaxListeners = function(maxListeners) {
    this._maxListeners = maxListeners;
}
EventEmitter.prototype.listeners = function(event) {
    return this.events[event];
}
// - 给指定的事件绑定事件处理函数, 第一个参数是事件类型; 第二个参数是事件监听函数
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(type, listener) {
    if (this.events[type]) {
        // - 若此类型的 type 事件已经存在, 那么直接通过 push 把后续的事件推入到数组中.
        this.events[type].push(listener);
        // - 添加超过最大监听函数数量的警告
        if (this_maxListeners != 0
            && this.events[type].length > this._maxListeners) {
            console.log("Maximum number exceeded!")
        }
    } else {
        // - 若之前未添加此事件的监听函数, 把监听函数推入到数组中.
        // - Tip: 只有第一次添加事件时, 才走此判断.
        this.events[type] = [listener];
        console.log('listener:', [listener]);
    }
}
EventEmitter.prototype.once = function(type, listener) {
    // - 用完即焚
    // - ...rest 为 ES6 语法, 剩余参数.
    let wrapper = (...rest) => {
        // - 先让当前的监听函数执行.
        listener.apply(this, rest);

        // - 然后再移除自己
        this.removeListener(type, wrapper);
    };
    this.on(type, wrapper);
}
EventEmitter.prototype.removeListener = function(type, listener) {
    if (this.events[type]) {
        // - 利用 filter() 方法返回除 wrapper 函数之外的所有回调函数.
        // - filter(): 对数组中的每一项运行给定函数, 返回有 true 的项组成的数组
        this.events[type] = this.events[type].filter((l) => l !== listener);
    }
}
EventEmitter.prototype.emit = function(type, ...rest) {
    this.events[type] && this.events[type].forEach((listener) => {
        listener.apply(this, rest);
    })
}

// - 注意: Node 中这个继承只是继承了父构造函数的方法,
//   如果子构造函数项继承父构造函数的属性.
//   仍然需要在其构造函数内调用父构造函数 (EventEmitter.call(this),
//   因为父构造函数不需要接受参数, 所以只传 this (指定函数体内 this 对象的指向.))
function inherits(ctor, superCtor) {
    return Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}
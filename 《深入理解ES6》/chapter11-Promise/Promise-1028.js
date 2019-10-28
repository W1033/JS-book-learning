
// ## 生词
// - executor [ɪg'zekjʊtə] --n.执行器, 执行者
// - execute ['eksɪkjuːt] --vt.执行，实施，履行


const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// - 创建 Promise 类
class Promise {
    // - 我们把创建构造函数的实例 [new Promise(function(resolve, reject) {})];
    //   传入的匿名函数称为 "执行器 (executor)"
    constructor(executor) {
        // - 确定 executor 是一个函数
        if (executor && typeof executor !== 'function') {
            throw new Error(`Promise resolve ${executor} is noe a function`);
        }
        this.state = PENDING;
        this.data = undefined;
        // - 定义一个保存回调函数的数组
        if (typeof(executor) === 'function') {
            // - 调用 执行器 (call Executor)
            this.callExecutor(executor);
        }
    }

    // - 定义 运行"执行器方法" (call Executor)
    callExecutor(executor) {
        const that = this;
        let cb = false;

        // - onResolve / onReject 只会执行一个, 在下面 try...catch  中被调用, 
        const onResolve = function() {};

        const onReject = function() {};
    }
}
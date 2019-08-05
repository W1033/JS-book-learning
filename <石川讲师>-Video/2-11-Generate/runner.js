// - 一个基本的任务运行器 （基本的 async 用法的封装）

// - 由于 yield 能停止运行，并在重新开始运行前等待 next() 方法被调用，你就可以
//   在没有回到函数的情况下实现异步调用。首先，你需要一个能够调用生成器并启动
//   迭代器的函数，如下：

// - 传入一个 generator 生成器函数
function runner(_gen) {
    return new Promise((resolve, reject) => {
        let gen = _gen();

        _next();

        function _next(_last_res) {
            let res = gen.next(_last_res);

            if (!res.done) {
                let obj = res.value;

                if (obj.then) {
                    obj.then((res) => {
                        _next(res);
                    }, (err) => {
                        reject(err);
                    })
                } else if (typeof obj === 'function') {
                    if (obj.constructor.toString().startsWith(
                        'function GeneratorFunction()')) {
                        runner(obj).then(res => _next(res), reject);
                    } else {
                        _next(obj());
                    }
                } else {
                    resolve(res, value);
                }
            }
        }
    })
}
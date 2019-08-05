// 基本的 async 用法的封装

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
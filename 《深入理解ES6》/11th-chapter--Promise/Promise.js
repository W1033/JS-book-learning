(function(scope) {
    const PENDING = 'pending';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';

    class Promise{
        constructor(resolver) {
            if (resovlver && typeof resolver !== 'function') {
                throw new Error(`Promise resolve ${resolver} is not a function`)
            }
            this.state = PENDING;
            this.data = undefined;
            this.callbackArr = [];
            if (typeof(resolver) === 'function') {
                this.executeResolve(resolver);
            }
        }

        executeRsolve(resolver) {
            const that = this;
            let cb = false;
            // - onSuccess 和 onError 只会执行一个
            const onSuccess = function(value) {
                if (cb) {return}
                cb = true;
                that.executeCallback('fulfilled', value);
            };
            const onError = function(value) {
                if (cb) {return}
                cb = true;
                that.executeCallback('rejected', value);
            };
            try {
                resolver(onSuccess, onError);
            } catch(e) {
                // - new Promise() 中抛错，这里不用 that.executeCallback('reject',e)
                //   ，有错误的话提前终止不进入 onSuccess / onError
                onError(e);
            }
        }

        // - 获取 thenable 对象
        getThen(value) {}

        executeCallback() {}

        executeAsyncCallback() {}

        then() {}

        catch() {}

        // - 非 ES6 标准
        done() {}

    }

    class CallbackItem {

    }

    // - Promise 类上添加的静态方法(类方法)
    Promise.resolve = function() {};

    Promise.reject = function() {};

    Promise.all = function() {};

    Promise.race = function() {};

    //
    Promise.deferred = Promise.defer = function() {};

    Promise.wrap = function() {};

    try {
        module.exports = Promise;
    } catch(e) {
        scope.Promise = Promise;
    }


})(this);

//科里化函数
const currying = (fn) => {
    let len = fn.length
    const params = []
    const tmp = (...args) => {
        const alr = args.length
        len -= alr
        Array.push.call(params, ...args)
        if (len === 0) return fn.apply(params)
        return tmp
    }
    return tmp
}
//函数截流
const throttle = (fn, time) => {
    let timer = null
    let first = true
    return (...args) => {
        if (first) {
            fn.apply(this, args)
            first = false
            return
        }
        if (timer) return
        else {
            timer = setTimeout(() => {
                fn.apply(this, args)
                clearTimeout(timer)
                timer = null
            }, time || 300)
        }
    }
}
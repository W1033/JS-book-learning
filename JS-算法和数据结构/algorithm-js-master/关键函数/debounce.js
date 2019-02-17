//函数防抖
const debounce = (fn, time) => {
    const previous = null
    const timer = null
    return (...args) => {
        const now = +new Date()
        if (!previous) previous = now
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
            clearTimeout(timer)
            timer = null
        }, time || 300)
    }
}
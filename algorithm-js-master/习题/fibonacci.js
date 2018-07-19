//斐波那契数列
function fibonacci1(n) {
    if (n === 1 || n === 2) return 1
    return fibonacci1(n - 1) + fibonacci1(n - 2)
}

function fibonacci2(n) {
    let n1 = 1
    n2 = 1
    sum = 1
    for (let i = 3; i <= n; i++) {
        sum = n1 + n2
        n1 = n2
        n2 = sum
    }
    return sum
}

//尾递归调用
function fibonacci3(n) {
    return function (fn) {
        return fn(n, 0, 1, fn)
    }((n, ret1, ret2, f) => {
        if (n === 0) return ret1
        return f(n - 1, ret2, ret1 + ret2, f)
    })
}

console.log(fibonacci1(10))
console.log(fibonacci2(10))
console.log(fibonacci3(10))
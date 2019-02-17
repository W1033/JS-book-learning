//希尔排序
const shellSort = (arr, step) => {
    step = (typeof(step) == 'number' && step < arr.length) ? step : Math.floor(arr.length / 2)
    return (fn => {
        return fn(arr, step)
    })((arr, step) => {
        const len = arr.length
        while (step > 0) {
            for (let i = 0; i < step; i++) {
                let current = i + step
                let index = i
                while (current < len) {
                    if (arr[index] > arr[current]) {
                        [arr[index], arr[current]] = [arr[current], arr[index]]
                    }
                    index = current
                    current += step
                }
            }
            step = Math.floor(step / 2)
        }
        return arr
    })
}

console.log(shellSort([1, 3, 2, 5, 3, 7, 4]))
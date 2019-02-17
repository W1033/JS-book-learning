//归并排序
function mergeSort(arr) {
    if (arr.length <= 1) return arr
    arr = [...arr]
    const num = parseInt(arr.length / 2)
    const left = mergeSort(arr.slice(0, num))
    const right = mergeSort(arr.slice(num))
    return ((f) => f(left, right))(
        (left, right) => {
            let result = [],
                r = 0,
                l = 0
            while (l < left.length && r < right.length) {
                if (left[l] <= right [r]) {
                    result.push(left[l])
                    l++
                } else {
                    result.push(right[r])
                    r++
                }
            }
            return [...result, ...left.slice(l), ...right.slice(r)]
        })
}

console.log(mergeSort([2, 1, 4, 6, 5, 3]))
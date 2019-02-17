//选择排序
const selectSort = (arr) => {
    return ((fn) => fn(arr))((arr) => {
        arr = [...arr]
        const len = arr.length
        let index = 0
        while (index < len) {
            let [min, minIndex] = [arr[index], index]
            for (let i = index; i < len; i++) {
                if (arr[i] < min) {
                    [min, minIndex] = [arr[i], i]
                }
            }
            [arr[index], arr[minIndex]] = [arr[minIndex], arr[index]]
            index++
        }
        return arr
    })
}

console.log(selectSort([2, 1, 4, 6, 5, 3]))
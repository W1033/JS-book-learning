//直接插入排序
const insertSort = (arr) => {
    if (!arr || arr.length < 2) return arr
    return ((fn) => fn(arr))(arr => {
        for (let i = 1; i < arr.length; i++) {
            for (let j = i; j > 0; j--) {
                if (arr[j] < arr[j - 1]) {
                    [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
                    continue
                }
                break
            }
        }
        return arr
    })
}

console.log(insertSort([2, 1, 4, 6, 5, 3]))
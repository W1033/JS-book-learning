//快速排序
const quickSort = (arr, low, high) => {
    let l = low,
        h = high,
        key = arr[low]
    if (l >= h) return arr
    while (h > l) {
        while (h > l && arr[h] >= key) {
            h--
        }
        arr[l] = arr[h]
        while (h > l && arr[l] <= key) {
            l++
        }
        arr[h] = arr[l]
    }
    arr[l] = key
    quickSort(arr, low, l - 1)
    quickSort(arr, l + 1, high)
    return arr
}

const arr = [2, 3, 1, 4, 545, 3, 2, 6, 5]
console.log(quickSort(arr, 0, arr.length - 1))
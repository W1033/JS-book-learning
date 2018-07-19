//二分查找
function binarySearch1(arr) {
    return (data) => {
        let low = 0,
            high = arr.length - 1
        while (low <= high) {
            const middle = parseInt((high + low) / 2)
            if (arr[middle] > data) {
                high = middle
            } else if (arr[middle] < data) {
                low = middle
            } else {
                return middle
            }
        }
        return
    }
}

console.log(binarySearch1([1, 2, 3, 4, 5, 6, 7])(3))

//递归
function binarySearch2(arr, data, low = 0, high) {
    if (typeof(high) != 'number') high = arr.length - 1
    const middle = parseInt((low + high) / 2)
    if (arr[middle] == data) return middle
    if (arr[middle] > data) return binarySearch2(arr, data, low, middle)
    if (arr[middle] < data) return binarySearch2(arr, data, middle, high)
}

console.log(binarySearch2([1, 2, 3, 4, 5, 6, 7], 3))
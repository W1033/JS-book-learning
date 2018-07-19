//从已排好序的数组中取出第n大值
const maxnumber1 = (array1, array2) => {
    return ((fn) => {
        return fn(array1, array2)
    })((array1, array2) => {
        const cacheArray = [...array1, ...array2].sort((a, b) => parseInt(b) - parseInt(a))
        return (n) => {
            return cacheArray[n - 1]
        }
    })
}
console.log(maxnumber1([1, 2, 3], [5, 6, 7])(3))

const maxnumber2 = (array1, array2) => {
    return ((fn) => {
        return fn(array1, array2)
    })((array1, array2) => {
        return (n) => {
            let count = 1,
                index1 = array1.length - 1,
                index2 = array2.length - 1
            if (n > index2 + index1 + 1) return
            while (true) {
                if (count == n) return Math.max(array1[index1], array2[index2])
                if (array1[index1] > array2[index2]) index1--
                else index2--
                count++
            }

        }
    })
}
console.log(maxnumber2([1, 2, 3], [5, 6, 7, 8, 9])(3))
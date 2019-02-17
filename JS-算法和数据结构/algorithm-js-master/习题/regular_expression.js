//用正则实现string.trim
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
}

console.log(trim('  asd  '))

//正则实现去重 aaeeerrrxxxaa
function removeRepeat(str) {
    return str.replace(/(.)(?=\1)/g, '')
}

console.log(removeRepeat('sssfffeessaxx'))

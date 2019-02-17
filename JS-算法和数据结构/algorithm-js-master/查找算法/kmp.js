/**
 * KMP算法(看毛片)
 * @parma s 原字符串
 * @parma w 匹配串
 * @return {number} 匹配索引
 */

function kmp(s, w) {
    let i = 0,
        j = 0
    const _next = next(w)
    console.log(_next)
    while (i < s.length) {
        if (j !== -1 && s[i] !== w[j]) {
            j = _next[j]
        } else if (j == w.length - 1) {
            return i
        } else {
            i++
            j++
        }
    }
    return -1
}

function next(w) {
    const _next = [-1, 0]
    let pos = 2, cnd = 0
    while (pos < w.length) {
        if (w[pos - 1] === w[cnd]) {
            cnd = cnd + 1
            _next[pos] = cnd
            pos += 1
        } else if (cnd > 0) {
            cnd = _next[cnd]
        } else {
            _next[pos] = 0
            pos += 1
        }
    }
    return _next
}

console.log(kmp('ABC ABCDAB ABCDABCDABDE', 'ABCDABD'))
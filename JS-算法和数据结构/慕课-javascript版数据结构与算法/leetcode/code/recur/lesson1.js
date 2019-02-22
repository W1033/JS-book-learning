export default (str) => {
  // 保存所有符合条件的IP地址
  let r = []
  // 分四步递归处理ip分段
  let search = (cur, sub) => {
    // 边界条件
    if (cur.length === 4 && cur.join('') === str) {
      r.push(cur.join('.'))
    } else {
      // 正常的处理过程
      for (let i = 0, len = Math.min(3, sub.length), tmp; i < len; i++) {
        tmp = sub.substr(0, i + 1)
        if (tmp < 256) {
          search(cur.concat([tmp]), sub.substr(i + 1))
        }
      }
    }
  }
  search([], str)
  return r
}

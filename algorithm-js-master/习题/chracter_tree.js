//26个字母组成树形结构
function Node(value) {
    this.data = value
    this.left = null
    this.right = null
}

const chs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

function buildTree(chs) {
    if (chs.length == 0) return null
    const index = parseInt(chs.length / 2)
    const n = new Node(chs[index])
    n.left = buildTree(chs.slice(0, index))
    n.right = buildTree(chs.slice(index + 1))
    return n
}

const res = buildTree(chs)
console.log(res)
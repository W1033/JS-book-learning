//二叉树层级遍历
function treeTraverse1(root, level) {
    if (root) {
        console.log(`${level}:root.data`)
    } else {
        return
    }
    treeTraverse(root.left, level + 1)
    treeTraverse(root.right, level + 1)
}

function treeTraverse2(root) {
    let queue = [],
        level = 0
    queue.push(root)
    while (queue.length > 0) {
        const temp = queue.unshift()
        queue = []
        level++
        temp.forEach((item) => {
            console.log(`${level}:item`)
            if (item.left) queue.push(item.left)
            if (item.right) queue.push(item.right)
        })
    }
}
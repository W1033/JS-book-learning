//翻转二叉树
function invertBinaryTree(root) {
    if (!root) return
    if (root.left) invertBinaryTree(root.left)
    if (root.right) invertBinaryTree(root.right)
        [node.left, node.right] = [node.right, node.left]
}

function invertBinaryTree(root) {
    const queue = []
    queue.push(root)
    while (queue.length > 0) {
        const node = queue.shift()
        if (node.left) queue.push(node.left)
        if (node.right) queue.push(node.right)
            [node.left, node.right] = [node.right, node.left]
    }
}
// 节点类
class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

// 树结构类
class Tree {
  constructor() {
    // 根节点
    this.root = null
  }

  // 插入
  insert(key) {
    // 创建节点
    const node = new Node(key)
    // 根节点为null
    if (this.root === null) {
      this.root = node
    } else {
      // 根节点已存在
      this.insertNode(this.root, node)
    }
  }

  // 递归插入节点
  insertNode(node, newNode) {
    // 已存在的节点值大于插入节点值
    if (node.key > newNode.key) {
      // 往左插入
      // 1. 左节点为null
      if (node.left === null) {
        node.left = newNode
      } else {
        // 递归
        this.insertNode(node.left, newNode)
      }
    } else {
      // 往右插入
      // 1. 右节点为null
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  // 最大值
  max() {
    let head = this.root
    while (head.right != null) {
      head = head.right
    }
    return head.key
  }

  // 最小值
  min() {
    let head = this.root
    while (head.left != null) {
      head = head.left
    }
    return head.key
  }

  // 查找
  search(key) {
    let res = false

    // 递归查找node节点
    function searchNode(node, key) {
      if (node !== null) {
        if (node.key === key) {
          res = true
        } else if (node.key > key) {
          searchNode(node.left, key)
        } else {
          searchNode(node.right, key)
        }
      } else {
        return false
      }
    }

    if (this.root !== null) {
      searchNode(this.root, key)
      return res
    } else {
      return false
    }
  }

  // 删除
  remove(key) {
    // 先找到要删除的节点
    let current = this.root
    let parent = null
    while (current != null) {
      // current的父节点
      parent = current
      if (current.key > key) {
        current = current.left
      } else {
        current = current.right
      }
    }

    // 找到要删除的节点
    if (current) {
      // 如果删除的是叶子结点
      if ((current.left == null) & (current.right == null)) {
        current = null
        return true
      }
      // 只有右节点是空
      else if (current.right == null) {
        current = current.left
      }
      // 只有左节点为空
      else if (current.left == null) {
        current = current.right
      }
    } else {
      return false
    }
  }

  // 中序遍历(由小到大)
  inorderTraversal(callback) {
    this.inorderTraversalNode(this.root, callback)
  }
  inorderTraversalNode(node, callback) {
    if (node !== null) {
      // 处理左节点
      this.inorderTraversalNode(node.left, callback)
      // 处理节点
      callback(node.key)
      // 处理右节点
      this.inorderTraversalNode(node.right, callback)
    }
  }

  // 先序遍历
  preorderTraversal(callback) {
    this.preorderTraversalNode(this.root, callback)
  }
  preorderTraversalNode(node, callback) {
    if (node !== null) {
      // 处理节点
      callback(node.key)
      // 处理左节点
      this.preorderTraversalNode(node.left, callback)
      // 处理右节点
      this.preorderTraversalNode(node.right, callback)
    }
  }

  // 后续遍历
  postorderTraversal(callback) {
    this.postorderTraversalNode(this.root, callback)
  }
  postorderTraversalNode(node, callback) {
    if (node !== null) {
      // 处理左节点
      this.postorderTraversalNode(node.left, callback)
      // 处理右节点
      this.postorderTraversalNode(node.right, callback)
      // 处理节点
      callback(node.key)
    }
  }
}

// 测试
const tree = new Tree()

tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(9)
tree.insert(13)
tree.insert(20)
tree.insert(6)
tree.insert(3)
tree.insert(10)
tree.insert(8)
tree.insert(12)
tree.insert(14)
tree.insert(18)
tree.insert(25)

let arr = []
tree.preorderTraversal((key) => {
  arr.push(key)
})
console.log("先序遍历", arr)

arr = []
tree.inorderTraversal((key) => {
  arr.push(key)
})
console.log("中序遍历", arr)

arr = []
tree.postorderTraversal((key) => {
  arr.push(key)
})
console.log("后续序遍历", arr)

// console.log(tree.min())
// console.log(tree.max())

console.log(tree.search(20))

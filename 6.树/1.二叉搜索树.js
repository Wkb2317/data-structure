const Queue = require("../2.队列/1.数组实现队列");

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
		let node = new Node(key)
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
		let isLeft = false

		// 找到要删除的节点
		while (current.key !== key) {
			// current的父节点
			parent = current
			if (current.key > key) {
				current = current.left
				isLeft = true
			} else {
				current = current.right
				isLeft = false
			}
			if (current === null) {
				return false
			}
		}

		if (current) {
			// 如果删除的是叶子结点
			if (current.left === null && current.right === null) {
				if (current === this.root) {
					this.root = null
				} else if (isLeft) {
					parent.left = null
				} else {
					parent.right = null
				}
			}
			// 只有右节点是空
			else if (current.right == null) {
				if (current === this.root) {
					this.root = current.left
				} else if (isLeft) {
					parent.left = current.left
				} else {
					parent.right = current.left
				}
			}
			// 只有左节点为空
			else if (current.left == null) {
				if (current === this.root) {
					this.root = current.right
				} else if (isLeft) {
					parent.left = current.right
				} else {
					parent.right = current.right
				}
			}
			// 3、删除的是有两个子节点的节点
			else {
				// 找到后驱节点
				const successor = this.getSuccessor(current)

				// 如果是根节点
				if (current === this.root) {
					this.root = successor
				} else if (isLeft) {
					parent.left = successor
				} else {
					parent.right = successor
				}

				// 将后续左节点改为被删除的左节点
				successor.left = current.left
			}
		}
	}

	// 自己实现
	removeByWkb(key) {
		let current = this.root   // 当前节点的指向
		let parent = null         // 当前节点的父节点
		let isLefe = false        // 当前节点是不是父节点的左节点
		// 找到要删除的元素
		while (current !== null) {
			if (current.key === key) {
				// 找到了，退出循环
				break
			}
			parent = current
			if (current.key < key) {
				current = current.right
				isLefe = false
			} else {
				current = current.left
				isLefe = true
			}
		}
		// 判断有没有找到要删除的节点
		if (current === null) {
			return false
		}

		// 1. 删除的是叶子节点
		if (current.left === null && current.right === null) {
			// 删除的节点直接为null
			current = null
			if(isLefe) {
				parent.left = null
			} else {
				parent.right = null
			}
		}
			// 2. 删除的节点只有一个子节点
		//  把要删除节点的子节点连接到要删除节点的父节点
		else if (current.left === null) {
			if (isLefe) {
				parent.left = current.right
			} else {
				parent.right = current.left
			}
		} else if (current.right === null) {
			if (isLefe) {
				parent.left = current.left
			} else {
				parent.right = current.right
			}
		}
		// 3. 删除的节点有两个子节点
		else {
			//	先找要删除节点的后继节点
			let {subsequent, parentSubsequent} = this.getSubsequent(current)

			// 处理后继节点
			if(parentSubsequent === null){
			//	如果后继节点的父节点为null
			//	则代表后继节点为要删除节点的右节点
				parentSubsequent = current
			}
			// 后继节点，肯定没有左节点
			// 右节点也为null
			if (subsequent.right === null) {
				current.key = subsequent.key
				if(parentSubsequent.left === subsequent){
					parentSubsequent.left = null
				}else {
					parentSubsequent.right = null
				}
				// 这里不能只用subsequent = null
				// 因为这只是一个指向问题，subsequent不再指向节点了，开始指向null了，但原本的节点还存在
				subsequent = null
			}
			// 右节点不为null
			else {
				if (parentSubsequent.left === subsequent) {
					parentSubsequent.left = subsequent.right
				} else {
					parentSubsequent.right = subsequent.right
				}
				current.key = subsequent.key
				subsequent = null
			}
		}
	}

	// 寻找后继节点
	getSubsequent(node) {
		// 右节点为null,则没有后继节点
		if (node.right === null) {
			return null
		}
		let parentSubsequent = null
		let subsequent = node.right
		while (subsequent.left !== null) {
			parentSubsequent = subsequent
			subsequent = subsequent.left
		}
		return {subsequent, parentSubsequent}
	}


	// 获取后继
	getSuccessor(delNode) {
		// 保存临时节点
		let successorParent = delNode
		let successor = delNode
		let current = delNode.right

		// 寻找后驱节点（比删除元素大一点点的节点）
		while (current !== null) {
			successorParent = successor
			successor = current
			// 一直往左边找
			current = current.left
		}

		// 如果后续节点不是删除节点的右节点
		if (successor !== delNode.right) {
			successorParent.left = successor.right
			successor.right = delNode.right
		}

		return successor
	}

	/*
	*  深度优先遍历
	* */

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

	/*
	*  广度优先遍历
	* */
	// 层序遍历
	// 使用队列结构存储节点
	levelOrderTraversal(callback) {
		// 如果根节点为null
		if (this.root == null) {
			return null
		}
		const queue = new Queue()
		this.levelOrderTraversalNode(this.root, queue, callback)
	}

	levelOrderTraversalNode(node, queue, callback) {
		// 节点入队列
		queue.enqueue(node)
		// 当队列不为空时
		while (!queue.isEmpty()) {
			const popNode = queue.dequeue()
			callback(popNode.key)

			if (popNode.left !== null) {
				queue.enqueue(popNode.left)
			}
			if (popNode.right !== null) {
				queue.enqueue(popNode.right)
			}
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
// tree.preorderTraversal((key) => {
// 	arr.push(key)
// })
// console.log("先序遍历", arr)
//
// arr = []
// tree.inorderTraversal((key) => {
// 	arr.push(key)
// })
// console.log("中序遍历", arr)

arr = []
tree.inorderTraversal((key) => {
	arr.push(key)
})
console.log("后续序遍历", arr)

tree.removeByWkb(9)
tree.removeByWkb(7)
tree.removeByWkb(15)

arr = []
tree.inorderTraversal((key) => {
	arr.push(key)
})
console.log("删除后的节点", arr)

//
// arr = []
// tree.levelOrderTraversal((key) => {
// 	arr.push(key)
// })
// console.log('层序遍历：', arr)

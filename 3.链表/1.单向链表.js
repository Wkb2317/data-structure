// 节点类
class Node {
	constructor(val,next) {
		this.val = val
		this.next = next
	}
}

// 链表类
class LinkNode {
	constructor() {
		this.length = 0
		this.head = null
	}

	// 1. 添加节点方法
	append(data) {
		const node = new Node(data)
		// 如果链表为空
		if(this.length === 0){
			this.head = node
		} else {
			// 链表不为空
			let current = this.head
			// 取到最后的节点
			while(current.next){
				current = current.next
			}
			current.next = node
		}
		this.length += 1
	}

	// 2. toString
	toString(){
		let string = ''
		let current = this.head
		while(current){
			string += current.val + ' '
			current = current.next
		}
		return string
	}
}

const links = new LinkNode()
links.append(1)
links.append(3)
links.append(2)
console.log(links.toString())


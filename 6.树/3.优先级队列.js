/**
 * 优先级队列的实现方式：二叉堆
 *  1. 入队列的时候，插入到最后一个节点，然后上浮调整
 *  2. 出队列的时候，永远删除头节点，然后把最后一个元素补到头结点，下浮调整
 */

class priorityQueue {
  constructor() {
    // 对列存储数组
    this.queue = []
  }

  // 入队列
  enqueue(val) {
    this.queue.push(val)
    // 判断最后一个节点是否需要上浮调整
    let childIndex = this.queue.length - 1
    let parentIndex
    if (childIndex % 2 === 0) {
      // 右子节点
      parentIndex = (childIndex - 2) / 2
    } else {
      // 左子节点
      parentIndex = (childIndex - 1) / 2
    }

    const temp = this.queue[childIndex]

    while (childIndex > 0 && temp > this.queue[parentIndex]) {
      // 把比子节点小与父节点交换位置
      this.queue[childIndex] = this.queue[parentIndex]
      childIndex = parentIndex
      if (childIndex % 2 === 0) {
        // 右子节点
        parentIndex = (childIndex - 2) / 2
      } else {
        // 左子节点
        parentIndex = (childIndex - 1) / 2
      }
    }
    // 把最后的元素赋值到正确的位置
    this.queue[childIndex] = temp
  }

  // 出队列
  dequeue() {
    if (this.queue.length <= 0) {
      return false
    }
    const val = this.queue[0]
    // 出队列后，如果队列为空
    if (this.length !== 0) {
      // 还有子元素
      // 最后一个元素补到头结点
      this.queue[0] = this.queue.pop()
      // 对第一个元素做下浮调整
      this.downAdjustBetter(0, this.queue.length)
    }
    return val
  }

  // * 下浮优化版本
  downAdjustBetter(parentIndex, length) {
    let temp = this.queue[parentIndex]
    let childIndex = parentIndex * 2 + 1

    while (childIndex < length) {
      // 如果有右孩子，且大于左孩子，则定位到右节点
      if (
        childIndex < length - 1 &&
        this.queue[childIndex + 1] > this.queue[childIndex]
      ) {
        childIndex++
      }
      // 不存在右节点
      if (temp >= this.queue[childIndex]) {
        // 父节点大于左子节点，则符合二叉堆
        break
      }

      // 做交换
      this.queue[parentIndex] = this.queue[childIndex]
      parentIndex = childIndex
      childIndex = parentIndex * 2 + 1
    }
    this.queue[parentIndex] = temp
  }
}

const queue = new priorityQueue()

queue.enqueue(23)
queue.enqueue(3)
queue.enqueue(12)
queue.enqueue(5)
queue.enqueue(21)
queue.enqueue(10)
queue.enqueue(1)

console.log(queue.queue)

console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())

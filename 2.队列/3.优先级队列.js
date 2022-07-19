class PriorityQueue {
  constructor() {
    this.queue = [];
  }
  // 进队列
  enqueue(element, priorty) {
    // 1. 如果队列为空
    if (this.isEmpty()) {
      this.queue.unshift({
        element,
        priorty,
      });
    } else {
      // 2. 有比放入的优先级大的
      for (let i = 0; i < this.queue.length; i++) {
        if (priorty < this.queue[i].priorty) {
          this.queue.splice(i, 0, { element, priorty });
          return;
        }
      }
      // 3. 没有比放入的优先级大
      this.queue.push({ element, priorty });
    }
  }
  // 出队列
  dequeue() {
    return this.queue.pop();
  }
  // 查看队列的大小
  size() {
    return this.queue.length;
  }
  // 查看队列是不是空的
  isEmpty() {
    return this.queue.length === 0;
  }
  // 返回队列第一个元素
  front() {
    return this.queue[this.queue.length - 1];
  }
  // 返回队列
  getQueue() {
    return this.queue;
  }
}

const queue = new PriorityQueue();
queue.enqueue("aaa", 100);
queue.enqueue("bbb", 120);
queue.enqueue("ccc", 90);
queue.enqueue("ddd", 200);

console.log(queue.getQueue());

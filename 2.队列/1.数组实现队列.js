class Queue {
  constructor() {
    this.queue = [];
  }
  // 进队列
  enqueue(element) {
    this.queue.unshift(element);
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
}

module.exports =  Queue

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);

// console.log(queue.size());
queue.dequeue();
// console.log(queue.front());
// console.log(queue.isEmpty());


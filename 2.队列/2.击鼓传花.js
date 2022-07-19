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

// 击鼓传花
// 约瑟夫环
function passGame(nameList, num) {
  // 创建队列
  const queue = new Queue();
  // 数据入队列
  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }

  // 留下最后一人
  while (queue.size() > 1) {
    // 遍历到约定的num之前一位
    for (let i = 0; i < num - 1; i++) {
      // 把队列的头部重新入队列
      queue.enqueue(queue.dequeue());
    }
    // 删除num元素
    queue.dequeue();
  }

  console.log("最后留下的人是:", queue.front());
  console.log("索引是：", nameList.indexOf(queue.front()));
}

passGame(["小花", "小兰", "小绿", "小红", "小明"], 3);

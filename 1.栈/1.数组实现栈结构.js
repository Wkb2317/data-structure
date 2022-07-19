class Stack {
  constructor() {
    this.stack = [];
  }

  // 入栈
  put(item) {
    this.stack.push(item);
  }

  // 出栈
  pop() {
    return this.stack.pop();
  }

  // 栈大小
  size() {
    return this.stack.length;
  }

  // 查看栈顶元素
  peak() {
    return this.stack[this.stack.length - 1];
  }

  // 清空栈
  clear() {
    this.stack = [];
  }
}

let stack = new Stack();

stack.put(1);
stack.put(2);
stack.put(3);

console.log(stack.size());
console.log(stack.peak());
console.log(stack.pop());
console.log(stack.peak());
console.log(stack.size());

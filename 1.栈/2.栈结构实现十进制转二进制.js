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

function dec2Bin(number) {
  const stack = new Stack();
  // 遍历
  while (number > 0) {
    // 取除二的余数
    let remain = number % 2;
    // 入栈
    stack.put(remain);
    // 进行下一次遍历
    number = Math.floor(number / 2);
  }

  let string = "";
  while (stack.size()) {
    string += stack.pop();
  }
  console.log(string);
}

dec2Bin(4);

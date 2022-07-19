// 节点类
class Node {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

// 链表类
class LinkNode {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  // 1. 添加节点方法
  append(data) {
    const node = new Node(data);
    // 如果链表为空
    if (this.length === 0) {
      this.head = node;
    } else {
      // 链表不为空
      let current = this.head;
      // 取到最后的节点
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length += 1;
  }

  // 2. toString
  toString() {
    let string = "";
    let current = this.head;
    while (current) {
      string += current.val + " ";
      current = current.next;
    }
    return string;
  }

  // 3.insert
  insert(position, val) {
    // 校验要插入的位置
    if (position < 0 || position > this.length) {
      return false;
    }

    const node = new Node(val);
    // 链表为空
    if (!this.head) {
      this.head = node;
    } else {
      // 链表不为空
      // 1.position = 0
      if (position === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        // 2. 后面的任意位置
        let current = this.head;
        let previous = null;
        let index = 0;
        // 找到目标位置和目标位置的前一个元素
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        // 插入
        node.next = current;
        previous.next = node;
      }
    }
  }
}

const links = new LinkNode();
links.append(1);
links.append(3);
links.append(2);
links.insert(3, 10);
console.log(links.toString());

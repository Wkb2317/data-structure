// 节点类
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class LinksNode {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // append(val)
  append(val) {
    const node = new Node(val);
    // 链表为空
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    // 链表长度+1
    this.length += 1;
  }

  // insert(position,val)
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
        this.head.prev = node;
        this.head = node;
      } else {
        // 后面的任意位置;
        let current = this.head;
        let index = 0;
        // 找到目标位置和目标位置的前一个元素
        while (index < position) {
          current = current.next;
          index++;
        }
        // 插入
        // 存贮要插入节点的前一个元素
        const previos = current.prev;
        // 处理插入节点和后面节点的关系
        node.next = current;
        current.prev = node;
        // 处理前一个元素与插入节点的关系
        previos.next = node;
        node.prev = previos;
        // 如果是最后一个节点
        if (this.tail.next === node) {
          this.tail = node;
        }
      }
    }
    this.length += 1;
  }

  // get(position)
  get(position) {
    if (position < 0 || position >= this.length) {
      return false;
    }
    let current = this.head;
    let index = 0;
    while (index < position) {
      current = current.next;
      index += 1;
    }
    return current.val;
  }

  // indexOf(val)
  indexOf(val) {
    let current = this.head;
    let index = 0;
    while (index < this.length) {
      if (current.val === val) {
        return index;
      } else {
        current = current.next;
        index++;
      }
    }
    return -1;
  }

  // update(position,val)
  update(position, val) {
    if (position < 0 || position >= this.length) {
      return false;
    }

    let current = this.head;
    let index = 0;
    while (index < position) {
      current = current.next;
      index += 1;
    }
    current.val = val;
  }

  // removeAt(position)
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return false;
    }
    let current = this.head;
    let index = 0;
    // 当删除的是第一个元素时
    if (position === 0) {
      this.head = current.next;
      current.next.prev = null;
    } else if (position === this.length - 1) {
      while (index < position) {
        current = current.next;
        index++;
      }
      this.tail = current.prev;
      current.prev.next = null;
      this.tail.next = null;
    } else {
      while (index < position) {
        console.log(current);
        current = current.next;
        index++;
      }
      // 存储上一个元素
      const previous = current.prev;
      // 删除
      previous.next = current.next;
      current.next.prev = previous;
    }

    this.length -= 1;
    return true;
  }

  // remove(val)
  remove(val) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.val === val) {
        // 头结点
        if (current === this.head) {
          this.head = current.next;
          current.next.prev = null;
          return true;
        } else if (current === this.tail) {
          // 尾节点
          this.tail = current.prev;
          current.prev.next = null;
          this.tail.next = null;
          return true;
        } else {
          // 存储上一个元素
          const previous = current.prev;
          // 删除
          previous.next = current.next;
          current.next.prev = previous;
          return true;
        }
      }
      current = current.next;
    }

    return false;
  }

  // isEmpty()
  isEmpty() {
    return this.length === 0;
  }

  // size()
  size() {
    return this.length;
  }

  // toString()
  toString() {
    let str = "";
    let current = this.head;
    while (current) {
      str += current.val + " ";
      current = current.next;
    }
    return str;
  }

  // forwardString()
  forwardString() {
    let str = "";
    let current = this.head;
    while (current) {
      str += current.val + " ";
      current = current.next;
    }
    return str;
  }

  // backwardString()
  backwardString() {
    let str = "";
    let current = this.tail;
    while (current) {
      str += current.val + " ";
      current = current.prev;
    }
    return str;
  }
}

const link = new LinksNode();

// append 测试
link.append(1);
link.append(5);
link.append(3);
link.append(2);
// console.log(link.toString());

// insert测试
link.insert(0, 10);
link.insert(2, 10);
link.insert(5, 10);
console.log(link.toString());

// get测试
// console.log(link.get(1));
// console.log(link.get(3));
// console.log(link.get(5));

// indexOf测试
// console.log(link.indexOf(10));
// console.log(link.indexOf(5));
// console.log(link.indexOf(11));

// removeAt
// link.removeAt(0);
// link.removeAt(2);
// link.removeAt(6);

// remove
link.remove(10);
link.remove(2);
link.remove(5);
console.log(link.forwardString());
console.log(link.backwardString());

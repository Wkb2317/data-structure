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
        this.length += 1;
      }
    }
  }

  // 4. get
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

  // 5.indexOf(val)
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
  // 6.update(position,val)
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
  // 7.removeAt(position)
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return false;
    }
    let current = this.head;
    let previous = null;
    let index = 0;
    if (position === 0) {
      this.head = this.head.next;
    } else {
      while (index < position) {
        previous = current;
        current = current.next;
        index += 1;
      }
      // 移除
      previous.next = current.next;
      this.length -= 1;
    }

    return current.val;
  }
  // 8.remove(val)
  remove(val) {
    let current = this.head;
    let previous = null;
    while (current) {
      if (current.val === val) {
        this.length -= 1;
        // 如果删除的不是第一个元素
        if (previous) {
          previous.next = current.next;
        } else {
          // 删除的是第一个元素
          this.head = current.next;
        }

        return true;
      }
      previous = current;
      current = current.next;
    }
    return false;
  }
  // 9.isEmpty()
  isEmpty() {
    return this.length === 0;
  }
  // 10. size()
  size() {
    return this.length;
  }
}

const links = new LinkNode();
links.append(1);
links.append(3);
links.append(2);
links.insert(3, 10);
console.log(links.toString());

// get测试
// console.log(links.get(2));
// console.log(links.get(3));

// indexof测试
// console.log(links.indexOf(10));
// console.log(links.indexOf(3));

// update测试
// links.update(3, 11);
// links.update(1, 6);
// console.log(links.toString());

// removeAt测试
// console.log(links.removeAt(0));
// console.log(links.removeAt(2));
// console.log(links.toString());

// remove 测试
// console.log(links.remove(1));
// console.log(links.toString());

// isempty,size测试
console.log(links.isEmpty());
console.log(links.size());

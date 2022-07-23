class HashTable {
  constructor() {
    this.storage = []; // 存储
    this.count = 0; // 数组元素个数
    this.limit = 7; // 数组长度限制
  }

  // 哈希函数
  hashFunc(str, size) {
    let hashCode = 0;

    // 霍纳算法计算hashcode
    for (let i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i);
    }

    // 取余
    let index = hashCode % size;
    return index;
  }

  // 插入修改函数
  put(key, value) {
    // 通过key获取索引
    const index = this.hashFunc(key, this.limit);

    // 拿到存储的元素
    let bucket = this.storage[index];

    // 判断元素是不是为null
    if (bucket == null) {
      bucket = [];
      bucket.push([key, value]);
      this.storage[index] = bucket;
      this.count++;
    } else {
      // 判断是不是要修改
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          // key相同，更新value
          bucket[i][1] = value;
          return;
        }
      }
      // 存入
      bucket.push([key, value]);

      // 需要扩容
      if (this.count > this.limit * 0.75) {
        this.resize(this.getPrime(this.limit * 2));
      }
      this.count++;
    }
  }

  // 获取
  get(key, value) {
    // 根据key获取索引
    const index = this.hashFunc(key, this.limit);
    const bucket = this.storage[index];

    // 如果bucket为null
    if (bucket == null) {
      return null;
    } else {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return bucket[i][1];
        }
      }
      return null;
    }
  }

  // 删除
  delete(key, value) {
    // 根据key获取索引
    const index = this.hashFunc(key, this.limit);
    const bucket = this.storage[index];

    // 如果bucket为null
    if (bucket == null) {
      return false;
    } else {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          // 删除元素
          bucket.splice(i, 1);

          // 需要减少容量
          if (this.count < this.limit * 0.25) {
            this.resize(this.getPrime(Math.floor(this.limit / 2)));
          }
          this.count--;
          return true;
        }
      }
      return false;
    }
  }

  // 哈希表大小
  size() {
    return this.count;
  }

  // 是否为空
  isEmpty() {
    return this.count === 0;
  }

  // 重置长度
  resize(newSize) {
    const oldStorage = this.storage;
    // 重置
    this.count = 0;
    this.limit = newSize;
    this.storage = [];

    // 把之前元素重新计算hashcode后put进新数组
    for (let bucket of oldStorage) {
      if (bucket == null) {
        continue;
      } else {
        for (let item of bucket) {
          this.put(item[0], item[1]);
          this.count++;
        }
      }
    }
  }

  // 判断是不是质数
  isPrimeFast(number) {
    const count = parseInt(Math.sqrt(number));
    for (let i = 2; i <= count; i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return true;
  }

  // 获取质数
  getPrime(number) {
    while (!this.isPrimeFast(numebr)) {
      number++;
    }
    return number;
  }
}

const table = new HashTable();

table.put("abc", 1);
table.put("nba", 2);
table.put("mba", 3);
table.put("aaa", 4);

// get测试
// console.log(table.get("aaa"));
// console.log(table.get("abc"));
// console.log(table.get("nba"));
// console.log(table.get("mba"));

// 更新测试
// table.put("aaa", 111);
// console.log(table.get("aaa"));

// 删除测试
table.delete("aaa");
console.log(table.get("aaa"));
console.log(table.get("mba"));

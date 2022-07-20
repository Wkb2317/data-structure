class Set {
  constructor() {
    this.items = {};
  }

  has(value) {
    return this.items.hasOwnProperty(value);
  }

  add(value) {
    if (this.has(value)) {
      return false;
    }
    this.items[value] = value;
    return true;
  }

  remove(value) {
    if (!this.has(value)) {
      return false;
    }
    delete this.items[value];
    return true;
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.values(this.items).length;
  }

  values() {
    return Object.values(this.items);
  }

  // 并集
  union(other) {
    const set = new Set();
    this.values().forEach((item) => {
      set.add(item);
    });

    other.values().forEach((item) => {
      set.add(item);
    });

    return set;
  }

  // 交集
  intersection(b) {
    const set = new Set();
    this.values().forEach((item) => {
      b.has(item) ? set.add(item) : "";
    });
    return set;
  }

  // 差集
  difference(b) {
    const set = new Set();
    this.values().forEach((item) => {
      b.has(item) ? "" : set.add(item);
    });
    return set;
  }

  // 子集
  isChild(b) {
    this.values().forEach((item) => {
      if (!b.has(item)) {
        return false;
      }
    });
    return true;
  }
}

// 差集
function differenceSet(def, arrays = []) {}

const a = new Set();
a.add("aaa");

const b = new Set();
b.add("aaa");
b.add("ddd");
b.add("eee");

console.log(a.intersection(b));
console.log(a.difference(b));
console.log(a.isChild(b));

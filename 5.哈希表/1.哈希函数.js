// 哈希函数

// 1. 将字符串转换成比较大的数字：hashcode
// 2. 将大的数字hashcode压缩到数组范围之内
function hashFunc(str, size) {
  let hashCode = 0;

  // 霍纳算法计算hashcode
  for (let i = 0; i < str.length; i++) {
    hashCode = 37 * hashCode + str.charCodeAt(i);
  }

  // 取余
  let index = hashCode % size;
  return index;
}

// 测试
console.log(hashFunc("aaa", 7));
console.log(hashFunc("abc", 7));
console.log(hashFunc("nbc", 7));
console.log(hashFunc("mbc", 7));

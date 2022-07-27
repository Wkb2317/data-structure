// 冒泡排序
// 双层for循环
// 每一次遍历都是当前元素与下一个元素大小进行比较
// 最好情况O(n)
// 最坏情况O(n2)
function bubbleSort(arr) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}

console.log(bubbleSort([11, 33, 22, 55, 12, 56, 76, 23, 223]))

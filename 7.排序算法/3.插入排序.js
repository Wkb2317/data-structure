// 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
// 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

// 最好最坏情况与冒泡排序相同
function insertSort(arr) {
  const len = arr.length
  let current = null
  for (let i = 0; i < len; i++) {
    // 当前需要插入的元素
    current = arr[i]

    for (let j = i - 1; j >= 0; j--) {
      // 这里为啥不能直接用arr[i]来比较？
      // 因为如果前一个比arr[i]大，那就会把arr[i]替换成arr[i-1]
      if (arr[j] > current) {
        // 交换
        arr[j + 1] = arr[j]
        arr[j] = current
      } else {
        arr[j + 1] = current
        break
      }
    }
  }
  return arr
}

console.log(insertSort([11, 33, 22, 55, 12, 56, 76, 223, 23]))

// 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
// 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
// 重复第二步，直到所有元素均排序完毕。
// 时间复杂度始终为O(n2)
function selectSort(arr) {
  const len = arr.length
  let minIndex = 0
  for (let i = 0; i < len - 1; i++) {
    // 当前最小值得索引为i
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      // 遍历i后的元素
      if (arr[j] < arr[minIndex]) {
        // 找出最小的下标
        minIndex = j
      }
    }

    // 找到最小的下标后,与i的下标元素进行替换
    let temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }

  return arr
}

console.log(selectSort([11, 33, 22, 55, 12, 56, 76, 23, 223]))

// 快速排序
// 分治法

// 交换
function swap(arr, left, right) {
  let temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp
}

function quickSort(arr, left, right) {
  if(left >= right ){
    return
  }
  // 取第一个头节点
  let point = arr[left]
  let i = left
  let j = right
  // 当左索引小于右索引，退出
  while (i !=  j) {
    // 从右边找第一个小于point的元素
    while (i <  j && arr[j] > point) {
      j--
    }
    // 从左边开始，找第一个大于point的元素
    while (i < j && arr[i] <= point) {
      i++
    }

    // 交换左右节点
    if(i < j){
      swap(arr, i, j)
    }
  }
  // i j 重合. 交换重叠索引和point
  swap(arr, left, i)

  // 数组左边递归
  quickSort(arr,left, j)
  // 数组右边递归
  quickSort(arr, j + 1, arr.length - 1)
}

const arr = [4, 7, 6, 5, 3, 2, 8, 1]
quickSort(arr,0,arr.length - 1)

console.log(arr)

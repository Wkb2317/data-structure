// 1. 把无序数组构建成二叉堆。
// 2. 循环删除堆顶元素，移到集合尾部，调节堆产生新的堆顶。

/**
 *  插入节点，上浮调整
 */
function upAdjust(array) {
  // 判断最后一个节点是否需要上浮调整
  let childIndex = array.length - 1
  let parentIndex
  if (childIndex % 2 === 0) {
    // 右子节点
    parentIndex = (childIndex - 2) / 2
  } else {
    // 左子节点
    parentIndex = (childIndex - 1) / 2
  }
  const temp = array[childIndex]

  while (childIndex > 0 && temp < array[parentIndex]) {
    // 把比子节点大与父节点交换位置
    array[childIndex] = array[parentIndex]
    childIndex = parentIndex
    if (childIndex % 2 === 0) {
      // 右子节点
      parentIndex = (childIndex - 2) / 2
    } else {
      // 左子节点
      parentIndex = (childIndex - 1) / 2
    }
  }
  // 把最后的元素赋值到正确的位置
  array[childIndex] = temp
}

// * 下浮优化版本
function downAdjustBetter(array, parentIndex, length) {
  let temp = array[parentIndex]
  let childIndex = parentIndex * 2 + 1

  while (childIndex < length) {
    // 如果有右孩子，且小于左孩子，则定位到右节点
    if (childIndex < length - 1 && array[childIndex + 1] > array[childIndex]) {
      childIndex++
    }
    // 不存在右节点
    if (temp >= array[childIndex]) {
      // 父节点大于左子节点，则符合二叉堆
      break
    }

    // 做交换
    array[parentIndex] = array[childIndex]
    parentIndex = childIndex
    childIndex = parentIndex * 2 + 1
  }
  array[parentIndex] = temp
}

/**
 *  构建二叉堆
 * */
function buildHeap(array) {
  // 从最后一个非叶子节点开始，依次下沉调整
  for (let i = parseInt((array.length - 2) / 2); i >= 0; i--) {
    downAdjustBetter(array, i, array.length)
  }
  // 构建完二叉堆后开始排序
  // 2. 循环删除堆顶元素，移到集合尾部，调节堆产生新的堆顶。
  for (let i = array.length - 1; i > 0; i--) {
    const temp = array[0]
    array[0] = array[i]
    array[i] = temp
    downAdjustBetter(array, 0, i)
  }
}

const arr = [23, 3, 12, 5, 21, 10, 1]
buildHeap(arr)
console.log(arr)

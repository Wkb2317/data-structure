// 最小堆和最大对堆
// 数组结构存储
//  最大堆：每个父节点大于子节点
// 假设父节点的下标是parent，那么它的左孩子下标就是 2*parent+1；它的右孩子下标就是  2*parent+2
/**
 * 1. 插入节点
 *   往二叉树的最后一个元素插入，则插入到数组的最后一个，然后上浮调整
 * 2. 删除节点
 *   删除一个节点，把最后一个节点补到删除节点的位置，然后下浮调整
 * 3. 构建二叉堆
 *   构建二叉堆，也就是把一个无序的完全二叉树调整为二叉堆，本质上就是让所有非叶子节点依次下沉。
 * */

//* 以实现最小堆为例

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

/**
 *  下浮调整
 *  @params array 堆
 *  @params parentIndex 要下浮的父节点索引
 * */
function downAdjust(array, parentIndex) {
  // 要下浮的元素，等最后赋值
  const temp = array[parentIndex]
  // 左子节点,不一定有右节点
  let leftChildIndex = 2 * parentIndex + 1
  while (leftChildIndex < array.length) {
    if (leftChildIndex === array.length - 1) {
      // 1. 不存在右节点
      //  1.1 如果父节点大于左节点，直接转换
      if (array[leftChildIndex] < temp) {
        array[parentIndex] = array[leftChildIndex]
        parentIndex = leftChildIndex
        leftChildIndex = parentIndex * 2 + 1
      } else {
        //  1.2 父节点小于左节点，则退出
        break
      }
    } else {
      // 2. 存在右节点
      const min = Math.min(array[leftChildIndex], array[leftChildIndex + 1])
      if (min > temp) {
        //  2.2 如果最小的元素都大于父节点，则退出
        break
      }
      //  2.1 取出最小的元素与父节点比，如果小于父节点，则转换
      let childIndex = leftChildIndex + 1
      if (array[leftChildIndex] === min) {
        childIndex = leftChildIndex
      }
      // 下浮
      array[parentIndex] = array[childIndex]
      parentIndex = childIndex
      leftChildIndex = parentIndex * 2 + 1
    }
  }
  array[parentIndex] = temp
}

// * 下浮优化版本
function downAdjustBetter(array, parentIndex, length) {
  let temp = array[parentIndex]
  let childIndex = parentIndex * 2 + 1

  while (childIndex < length) {
    // 如果有右孩子，且小于左孩子，则定位到右节点
    if (childIndex < length - 1 && array[childIndex + 1] < array[childIndex]) {
      childIndex++
    }
    // 不存在右节点
    if (temp <= array[childIndex]) {
      // 父节点还小于左子节点，则符合二叉堆
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
  for (let i = parseInt(array.length / 2); i >= 0; i--) {
    console.log(array[i])
    downAdjustBetter(array, i, array.length)
  }
}

const arr = [23, 3, 12, 5, 21, 10, 1]
buildHeap(arr)
console.log(arr)

arr.push(2)
upAdjust(arr)
console.log(arr)

// 1. 首先定义一个增量
// 2. 以增量为间隔进行分组
// 3. 组内进行排序
// 4. 增量变为原来的二分之一，重复执行
// 5. 直到增量小于一

function shellSort(arr) {
  const len = arr.length
  let gap = Math.floor(len / 2)
  let current = null
  while (gap > 0) {
    // 进行分组插入排序
    for (let i = gap; i < len; i++) {
      current = arr[i]

      // for (var j = i - gap; j >= 0 && arr[j] > current; j = j - gap) {
      //   arr[j + gap] = arr[j]
      // }
      // arr[j + gap] = current

      for (let j = i - gap; j >= 0; j = j - gap) {
        if (arr[j] > current) {
          arr[j + gap] = arr[j]
          arr[j] = current
        } else {
          arr[j + gap] = current
          break
        }
      }
    }

    // 开始下一个循环
    gap = Math.floor(gap / 2)
  }

  return arr
}

console.log(shellSort([11, 33, 22, 55, 12, 76, 223, 56, 23]))

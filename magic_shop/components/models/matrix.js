class matrix {
  m
  constructor(m) {
    // 接收二维数组
    this.m = m
  }
  row() {
    return this.m.length
  }
  col() {
    return this.m[0].length
  }
  // 用回调函数将element,i,j传递出去
  forEach(cb) {
    for (let j = 0; j < this.col(); j++) {
      for (let i = 0; i < this.row(); i++) {
        const element = this.m[i][j]
        cb(element, i, j)
      }
    }
  }
  // 矩阵转置
  transpose() {
    let desArray = []
    for (let j = 0; j < this.col(); j++) {
      // 定义行数组
      desArray[j] = []
      for (let i = 0; i < this.row(); i++) {
        // 行数组元素 和原来的i，j位置互换
        desArray[j][i] = this.m[i][j]
      }
    }
    console.log(desArray)
    return desArray
  }
}
export { matrix }

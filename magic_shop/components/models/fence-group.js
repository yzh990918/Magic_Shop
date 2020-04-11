import { matrix } from './matrix'
import {Fence} from './fence'
class FenceGroup {
  // 抽离出一个矩阵
  spu
  skuList = []
  fences = []
  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }
  // 获取matix对象
  _createMatrix() {
    const m = []
    this.skuList.forEach((item) => {
      m.push(item.specs)
    })
    return new matrix(m)
  }
  // // 遍历拿到所有的element 然后初始化fence
  // initFence() {
  //   const matrix = this._createMatrix(this.skuList)
  //   let CurrentJ = -1
  //   const fences = []
  //   matrix.forEach((element, i, j) => {
  //     // 首先判断当前列是否与currentJ相等
  //     if (CurrentJ !== j) {
  //       // 零列开始  然后将每列元素赋给fences 列变为行
  //       CurrentJ = j
  //       // 创建fence对象
  //       const fence = new Fence()
  //       fences[CurrentJ] = fence
  //     }
  //     // 将fence对象的title传入数组
  //     fences[CurrentJ].pushValuetitles(element.value)
  //   })
  //   console.log(fences);
  // }

  initFence(){
    const matrix =this._createMatrix(this.skuList)
    const fences = []
    // 拿到转置矩阵
    const AT = matrix.transpose()
    // 将矩阵的元素赋给对象属性
    AT.forEach(specs=>{
      const fence =new Fence(specs)
      // 实例化Cell对象 插入到Cells属性中
      fence.init()
      // 置于fences中
      fences.push(fence)
    })
    this.fences = fences
    console.log(fences);
  }
}
export { FenceGroup }

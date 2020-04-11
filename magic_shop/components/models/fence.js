import {Cell} from './cell'
class Fence {
  Cells = []
  specs
  title
  title_id
  constructor(specs) {
    this.specs = specs
    this.title = specs[0].key
    this.title_id = specs[0].key_id
  }
  init() {
    this.specs.forEach((spec) => {
      // 实例化对象 传入Cell
      
      // 去重cell  some，every 区别是some只要有一个条件满足表达式返回true every需要全部的元素
      const existed = this.Cells.some(c=>{
        return c.id === spec.value_id
      })
      if(existed){
        return 
      }
      const cell = new Cell(spec)
      this.Cells.push(cell)
    })
  }
}
export{
  Fence
}

import { Cell } from './cell'
import { Joiner } from '../../utils/joiner'

class SkuPending {
  pending = [] //存放每一行已选中元素
  size
  constructor(size) {
    this.size = size
  }
  insertCell(cell, x) {
    this.pending[x] = cell
  }
  removeCell(x) {
    this.pending[x] = null
  }
  findSelectedCell(x) {
    return this.pending[x]
  }
  isSelected(cell, x) {
    const selectCell = this.pending[x]
    if (!selectCell) {
      return
    }
    return cell.id === selectCell.id
  }
  // 初始化默认
  init(sku) {
    for (let i = 0; i < sku.specs.length; i++) {
      const cell = new Cell(sku.specs[i])
      this.insertCell(cell, i)
    }
  }

  // 判断是否是完整的路径
  isIntact() {
    // size 默认情况下的规格个数
    if (this.size !== this.pending.length) {
      return false
    }
    // 可能存在pending数组部分元素是undefined 所以判断一下
    for (let i = 0; i < this.pending.length; i++) {
      if (this._isEmptyPart(i)) {
        return false
      }
    }
    return true
  }
  _isEmptyPart(index) {
    return this.pending[index] ? false : true
  }
  // 获取skucode 可能是不完整的code码
  getSkuCode(){
    const joiner = new Joiner('#')
    this.pending.forEach((cell)=>{
      const cellCode = cell._getCellCode()
      joiner.join(cellCode)
    })
    return joiner.getStr()
  }

  // 获取当前确定的sku的value 返回的还是数组不需要处理格式
  getCurrentSpecValue(){
    const value = this.pending.map(cell=>{
      // 可能为undefined,就用三元表达式
      return cell? cell.spec.value:null
    })
    return value
  }
  // 获取缺失的key的下标数组
  getMissingSpecKeyIndex(){
    let keyIndex = []
    for (let i = 0; i < this.size; i++) {
     if(!this.pending[i]){
      keyIndex.push(i)
     }
    }
    return keyIndex
  }
}

export { SkuPending }

import { Cell } from './cell'

class SkuPending {
  pending = [] //存放每一行已选中元素
  constructor() {}
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
      this.insertCell(cell,i)
    }
  }
}

export { SkuPending }

class SkuPending {
  pending = [] //存放每一行已选中元素
  constructor() {}
  insertCell(cell, x) {
    this.pending[x] = cell
  }
  removeCell(x) {
    this.pending[x] = null
  }
  findSelectedCell(x){
    return this.pending[x]
  }
  isSelected(cell,x){
    const selectCell = this.pending[x]
    if(!selectCell){
      return
    }
    return cell.id === selectCell.id
  }
}

export { SkuPending }

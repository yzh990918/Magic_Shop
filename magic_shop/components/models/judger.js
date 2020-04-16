import { Code } from './sku-code'
import { CellStatus } from '../../core/enum'
import { SkuPending } from './sku-pending'
import { Joiner } from '../../utils/joiner'

class judger {
  fenceGroup
  pathDirt = []
  SkuPending
  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup
    this._initpathDirt()
    this._initSkuPending()
  }

  // 初始化默认选中的sku
  _initSkuPending() {
    this.SkuPending = new SkuPending(this.fenceGroup.fences.length)
    // 获取默认的sku 然后插入pending
    const defaultSku = this.fenceGroup.getDefaultSku()
    if (!defaultSku) {
      return
    }
    this.SkuPending.init(defaultSku)
    this._setdefaultSkuStatus()
    this.judge(null, null, null, true)
  }
  // 返回所有的字典的路径
  _initpathDirt() {
    this.fenceGroup.spu.sku_list.forEach((s) => {
      const SkuCode = new Code(s.code)
      this.pathDirt = this.pathDirt.concat(SkuCode.seqments)
    })
  }
  // 初始化已选中的cell状态
  _setdefaultSkuStatus() {
    this.SkuPending.pending.forEach((cell) => {
      this.fenceGroup.eachCell((c) => {
        if (c.id === cell.id) {
          c.status = 'selected'
        }
      })
    })
  }
  // 改变当前状态和改变其他元素状态的方法
  judge(cell, x, y, isinit = false) {
    if (!isinit) {
      this.changeCurrentCellStatus(cell, x, y)
    }
    this.fenceGroup.eachCell((cell, x, y) => {
      // 在遍历所有节点的回调中拿到潜在路径 九个节点遍历循环九次 每次都去寻找该节点的潜在路径
      const path = this._findPotentialPath(cell, x, y)
      if (!path) {
        // 不去更改当前行已选元素的状态
        return
      }
      const isIn = this.pathDirt.includes(path)
      // 如果存在 就置为waiting 否则禁用 如果是当前行的已选元素就不用去查找
      if (isIn) {
        this.fenceGroup.fences[x].Cells[y].status = CellStatus.WAITING
      } else {
        this.fenceGroup.fences[x].Cells[y].status = CellStatus.FORBIDDEN
      }
    })
  }
  // 当前元素状态改变 并且已选择元素推入pending数组记录
  changeCurrentCellStatus(cell, x, y) {
    if (cell.status === CellStatus.WAITING) {
      this.fenceGroup.fences[x].Cells[y].status = CellStatus.SELECTED
      // pending数组添加一个规格
      this.SkuPending.insertCell(cell, x)
    } else {
      if (cell.status === CellStatus.SELECTED) {
        this.fenceGroup.fences[x].Cells[y].status = CellStatus.WAITING
        this.SkuPending.removeCell(x)
      }
    }
  }
  _findPotentialPath(cell, x, y) {
    // 查找潜在路径
    //* 1.获取当前行已选元素的潜在路径
    const joiner = new Joiner('#')
    for (let i = 0; i < this.fenceGroup.fences.length; i++) {
      const selected = this.SkuPending.findSelectedCell(i)
      // 当前行的潜在路径 0 1 2
      if (x === i) {
        // 如果当前行的元素已经被选中 就不做任何处理  该判断存在bug，可能同行会存在几个已选元素
        if (this.SkuPending.isSelected(cell, x)) {
          return
        }
        const cellCode = this._getCellCode(cell.spec)
        // 拼接器
        joiner.join(cellCode)
      } else {
        // 其他行
        if (selected) {
          // 如果其他行有选中的，就拼接当前行的和其他行已选中的路径
          const selectedCode = this._getCellCode(selected.spec)
          joiner.join(selectedCode)
        }
      }
    }
    return joiner.getStr()
  }
  _getCellCode(spec) {
    return spec.key_id + '-' + spec.value_id
  }
  // 通过确定的SkuCode确定Sku
  getDetermineSku() {
    const SkuCode = this.SkuPending.getSkuCode()
    const sku = this.fenceGroup.getSkuBySkuCode(SkuCode)
    return sku
  }

// 获取缺失的Spec的keystitle
       getMissingKeys(){
         const MissingKeysIndex = this.SkuPending.getMissingSpecKeyIndex()
         // 返回title数组
         return MissingKeysIndex.map(index=>{
           return this.fenceGroup.fences[index].title
         })
       }
}
export { judger }

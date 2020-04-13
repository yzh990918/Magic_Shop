import { Code } from './sku-code'
import { CellStatus } from '../../core/enum'

class judger {
  fenceGroup
  pathDirt = []
  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup
    this._initpathDirt()
  }
  _initpathDirt() {
    this.fenceGroup.spu.sku_list.forEach((s) => {
      const SkuCode = new Code(s.code)
      this.pathDirt = this.pathDirt.concat(SkuCode.seqments)
    })
    console.log(this.pathDirt)
  }
  judge(cell,x,y) {
    this.changeCellStatus(cell,x,y)
  }
  changeCellStatus(cell,x,y) {
    if (cell.status === CellStatus.WAITING) {
      this.fenceGroup.fences[x].Cells[y].status = CellStatus.SELECTED
    } else {
      if (cell.status === CellStatus.SELECTED) {
        this.fenceGroup.fences[x].Cells[y].status  = CellStatus.WAITING
      }
    }
  }
}
export { judger }

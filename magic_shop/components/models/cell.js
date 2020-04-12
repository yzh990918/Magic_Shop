import {CellStatus} from '../../core/enum'
class Cell{
  title
  id
  status = CellStatus.WAITING
  constructor(spec) {
    // 赋值给Cell的title
    this.title = spec.value
    this.id = spec.value_id
  }
}
export{
  Cell
}

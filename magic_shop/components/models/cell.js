/*
 * @Author: 努力中的杨先生
 * @Date: 2020-04-11 17:11:45
 * @Descripttion: 
 * @version: 
 */
import {CellStatus} from '../../core/enum'
class Cell{
  title
  id
  status = CellStatus.WAITING
  spec
  constructor(spec) {
    // 设置属性
    this.title = spec.value
    this.id = spec.value_id
    this.spec = spec
  }

  /**
   * @name: 
   * @msg: 
   * @param {String} 
   * @return: 
   */  
  _getCellCode() {
    return this.spec.key_id + '-' + this.spec.value_id
  }
}
export{
  Cell
}

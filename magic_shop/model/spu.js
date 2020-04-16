import { Http } from "../utils/http";

class Spu {
  // 判断无规格
  static isNoSpec(spu){
    if(spu.sku_list.length ===1 && spu.sku_list[0].specs.length ===0){
      return true
    }else{
      return false
    }
  }
  static async getSpudetail(id){
    const res = await Http.request({
      url:`/spu/id/${id}/detail`
    })
    return res.data
  }
}
export{
  Spu
}

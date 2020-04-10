import { Http } from "../utils/http";

class Spu {
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

import { Http } from "../utils/http";

class SpuInstruction{
   static async getSpuInstruction(){
    const res = await Http.request({
      url:'/sale_explain/fixed'
    })
    return res.data
  }
}
export{
  SpuInstruction
}

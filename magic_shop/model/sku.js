import { Http } from "../utils/http";

class Sku{
  static async getSkubySKuIds(Ids){
    const data = await Http.request({
      url:`/sku?ids=${Ids}`
    })
    return data.data
  }
}

export{
  Sku
}

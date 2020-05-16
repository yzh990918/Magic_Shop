import { Http } from "../utils/http";

class Coupon{
  constructor(){}
  static async CollectCoupon(id){
    const res = await Http.request({
      url:`/coupon/collect/${id}`,
      method:"POST"
    })
    return res
  }
}

export{
  Coupon
}

import { getSlashYMD } from "../../utils/date"

class CouponDate{
  startTime
  endTime
  status
  constructor(coupon){
    // 拷贝对象
    Object.assign(this,coupon)
    this.startTime = getSlashYMD(coupon.start_time)
    this.endTime = getSlashYMD(coupon.end_time)
  }
}

export{
  CouponDate
}

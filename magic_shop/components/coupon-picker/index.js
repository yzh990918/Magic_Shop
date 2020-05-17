import {getSlashYMD} from '../../utils/date'
import {PickType} from '../../core/enum'
// components/coupon-picker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    counBoList:Array
  },
  observers:{
    counBoList:function(counBoList){
      // 获取可使用的优惠券数量
      const satisfatcionLength = this.getSatisfactionCouponLength(counBoList)
      // 获取格式化并排序的优惠券数组
      const CouponsView = this.CouponView(counBoList)
      this.setData({
        satisfatcionLength,
        _counpList:CouponsView
      })
    }
  },
  data: {
    _counpList:Array,
    satisfatcionLength:Number,
    currentKey:null
  },
  methods: {
    CouponView(coupons){
      // 格式化数组
      const couponsView = coupons.map((coupon)=>{
        return {
          id: coupon.id,
          title: coupon.title,
          // 格式化时间
          startTime: getSlashYMD(coupon.startTime),
          endTime: getSlashYMD(coupon.endTime),
          satisfaction: coupon.satisfaction
        }
      })
      // 排序
      couponsView.sort((a,b)=>{
        // 如果满足使用就置顶该元素 返回排序的index
        if(a.satisfaction){
          return -1
        }
      })
      return couponsView
    },
// 获取数量
    getSatisfactionCouponLength(counBoList){
      let count = 0
      counBoList.forEach((item)=>{
        if(item.satisfaction){
          count = count+1
        }
      })
      return count
    },
     // 监听点击事件
  onCheckRadio(event){
    const currentKey = event.detail.currentKey
    // 获取绑定的key 也就是优惠券id 反选使用
    const key = event.detail.currentKey
    const currentCoupon = this._findCurrentCoupon(currentKey,key)
    // 判断正选还是反选
    const option = this.pickOptionType(currentKey)
    this.setData({
      currentKey
    })
    // 向外抛出选中事件
    this.triggerEvent('checked',{
      currentCoupon,
      option
    })
    

  },

  pickOptionType(currentKey){
    if(currentKey){
      return PickType.PICK
    }else{
      return PickType.UNPICK
    }

  },
  _findCurrentCoupon(currentKey,key){
    if (currentKey === null) {
      return this.properties.counBoList.find(coupon => coupon.id == key)
  }
  return this.properties.counBoList.find(coupon => coupon.id == currentKey)
  }
  }

 
})

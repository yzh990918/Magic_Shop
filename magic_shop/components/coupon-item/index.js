import { CouponStatus } from "../../core/enum";
import { CouponDate } from "./coupon-date";
import { Coupon } from "../../model/coupon";

// components/coupon-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coupon:Object,
    status:{
      type:Number,
      value:CouponStatus.CAN_COLLECT
    }
  },

  observers:{
    // 监听传过来的is_collected 修改优惠券状态
    status:function(status){
      this.setData({
        _status:status === 1 ? CouponStatus.AVALIABLE:CouponStatus.CAN_COLLECT
      })
      
    },
    coupon:function(coupon){
      if(!coupon){
        return
      }
      // 实例化转换时间戳的对象
      this.setData({
        _coupon:new CouponDate(coupon)
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _coupon:null,
    _status:CouponStatus.CAN_COLLECT,
    HasCoupon:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击右侧获取优惠券或者使用逻辑
    async onGetCoupon(event){
      //* 判断是否已经领取优惠券，已领取跳转分类，未领取 调用方法领取，捕获异常绑定数据

      // 已获取
      if(this.data.HasCoupon || this.data._status === CouponStatus.AVALIABLE){
        wx.switchTab({
          url:"/pages/category/index"
        })
        return
      }
      // 领取优惠券
      const couponId = event.currentTarget.dataset.id 
      // 防止重复领取
      let msg 
      try{
      msg = await Coupon.CollectCoupon(couponId)  
      }catch(e){
        // 已经领取 获取异常错误码
        if(e.errCode === 40006){
          this.seUserCollected()
          wx.showToast({
            title: '已经领取过这张优惠券了',
            icon: 'none',
            duration:2000
          })
        }
        return
      }
      // 领取成功
      if(msg.code === 0){
        this.seUserCollected()
        wx.showToast({
          title: '领取成功,在"我的优惠券"中查看',
          icon: 'none',
          duration:2000
        })
      }

    },
    seUserCollected(){
      this.setData({
        HasCoupon:true,
        _status:CouponStatus.AVALIABLE
      })
    }

  }
})

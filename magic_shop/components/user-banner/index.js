import { User } from "../models/user"
import { promisic } from "../../miniprogram_npm/lin-ui/utils/util"

// components/user-banner/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coupons:Number
  },
  lifetimes:{
    async attached(){
      const AuthorStatus = await this.hasAuthorizedUserInfo()
      if(!AuthorStatus){
        this.setData({
          showLoginBtn:true
        })
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo:{},
    showLoginBtn:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async hasAuthorizedUserInfo(){
      const setting = await promisic(wx.getSetting)()
      const Usersetting = setting.authSetting ['scope.userInfo']
      return !!Usersetting
    },
   async onAuthUserInfo(event){
    if (event.detail.userInfo) {
      User.setLocalUser(event.detail.userInfo)
      this.setData({
          showLoginBtn:false,
          userInfo:event.detail.userInfo
      })
  }
     
    },
    toCoupon(){
      wx.navigateTo({
        url: '/pages/my-coupon/index'
      })
    }

  }
})

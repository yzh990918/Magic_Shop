import { promisic } from "../../miniprogram_npm/lin-ui/utils/util"
import { AuthorizedStatus } from "../../core/enum"
import { Address } from "../../model/address"

// components/adderss/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   
  },
  lifetimes:{
    attached(){
      const address = Address.getLoaclAdd()
      if(address){
        this.setData({
          hasChosen:true,
          address
        })
        this.triggerEvent("address",{
          address
        })
      }
    }

  },
  

  /**
   * 组件的初始数据
   */
  data: {
    hasChosen:false,
    address:{},
    showDialog:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 判断用户授权
    async hasAuthorizedAddress(){
      const setting = await promisic(wx.getSetting)()
      // 拿到结果
      const address = setting.authSetting ['scope.address']
      if(address === undefined){
        return AuthorizedStatus.UNAUTHORIZED
      }
      if(address === true){
        return AuthorizedStatus.AUTHORIZED
      }
      if(address === false){
        return AuthorizedStatus.DENY
      }
    },

    async addAddresss(){
        const AuthorizedState = await this.hasAuthorizedAddress()
        // 判断是否是undefined 说明没有经过过授权
        if(AuthorizedState === AuthorizedStatus.DENY){
          this.setData({
            showDialog:true
          })
          return 
        }
        this.getUserAddress()
    },

    // dialog 打开用户设置授权获取地址
    onDialogConfirm(){
      wx.openSetting()
    },
    
    async getUserAddress(){
      let res 
      try{
        res = await promisic(wx.chooseAddress)()

      }catch(e){
        //TODO handle the exception
        console.log(e)
      }
      if(res){
        this.setData({
          hasChosen:true,
          address:res
        })
        Address.serLocalAdd(res)
        this.triggerEvent("address",{
          address:res
        })
      }

    }
  }
})

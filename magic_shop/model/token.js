import {promisic} from '../miniprogram_npm/lin-ui/utils/util'
import {config} from '../config/config'

class Token{
  constructor(){}
  async getTokenFromServer(){
    // 获取code
    const Loginres = await promisic(wx.login)()
    const code = Loginres.code
    // 获取token 保存本地 
    const res = await promisic(wx.request)({
      url:config.prodURL+"/token",
      data:{
        account:code,
        type:0
      },
      method:"POST"
    })
    const token = res.data.token
    wx.setStorageSync("token", token)
    return token
  }

  // 获取token 如果本地没有获取 有则校验
  async verify(){
    const token = wx.getStorageSync('token')
    if(!token){
      this.getTokenFromServer()
    }else{
      this._verifyToken(token)
    }
  }

  async _verifyToken(token){
    const res = await promisic(wx.request)({
      url:config.prodURL+"/token/verify",
      data:{
        token
      },
      method:"POST"
    })
    const isValid = res.data.is_valid
    if(!isValid){
      this.getTokenFromServer()
    }
  }
}
export{
  Token
}

import {promisic} from '../miniprogram_npm/lin-ui/utils/util'
import {config} from '../config/config'

class Http {
   static async request({url,data,method='GET'}){
    // 封装小程序的wx.request方法 转为promise
    return await promisic(wx.request)({
      url:`${config.mobelURL}${url}`,
      data,
      method,
      header:{
        appkey:config.appkey
      }
    })
  }
}
export{
  Http
}

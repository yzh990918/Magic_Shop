import {promisic} from '../miniprogram_npm/lin-ui/utils/util'
import {config} from '../config/config'

class Http {
   static async request({url,data,method='GET'}){
    // 封装小程序的wx.request方法 转为promise
    const res =  await promisic(wx.request)({
      url:`${config.prodURL}${url}`,
      data,
      method,
      header:{
        appkey:config.appkey
      }
    })
    return res.data
  }
}
export{
  Http
}

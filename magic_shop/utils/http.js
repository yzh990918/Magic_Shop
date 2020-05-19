import {promisic} from '../miniprogram_npm/lin-ui/utils/util'
import {config} from '../config/config'
import {HttpExceptionCode} from '../core/enum'
import { HttpException } from '../core/http-exception'
import { Token } from '../model/token'

class Http {
  //  static async request({url,data,method='GET'}){
  //   // 封装小程序的wx.request方法 转为promise
  //   const res =  await promisic(wx.request)({
  //     url:`${config.prodURL}${url}`,
  //     data,
  //     method,
  //     header:{
  //       appkey:config.appkey
  //     }
  //   })
  //   return res.data
  // }

  // * refetch 是否开启二次重刷token throwError 是否抛出异常
  static async request({
    url,
    data = {},
    method="GET",
    noRefetch = false,
    throwError = false
  }){
    let res
    try{
      res = await promisic(wx.request)({
        url:`${config.prodURL}${url}`,
        data,
        method,
        header:{
          "content-type":"application/json",
          // 头部携带token令牌
          'authorization':`Bearer ${wx.getStorageSync('token')}`
        }
      })
    }catch(e){
      // 检测网络异常
      if(throwError){
        throw new HttpException(-1,HttpExceptionCode[-1],null)
      }
      Http.showError(-1)
      return null
    }
    // 检测HTTP code码的异常 通常有401 403 404
    // 获取回调返回的状态码
    const HttpCode = res.statusCode.toString()
    if(HttpCode.startsWith("2")){
      return res.data
    }else{
      if(HttpCode === '401'){
        // 触发二次重刷token
          if (!noRefetch) {
            return Http._refetch({
              url,
              data,
              method,
            })
          }
      }else{
        if(throwError){
          // 后端抛出异常返回数据 赋给HttpException
          throw new HttpException(res.data.code,res.data.message,HttpCode)
        }
        if(HttpCode === '404'){
          // 通常404 不会抛出异常
          return isArray ? []:null
        }

        //*  异常抛出时(这里是前端的error_code码 并不是后端的code码) 加入提示 
        const error_code = res.data.error_code
        Http.showError(error_code,res.data)
      }
    }
    
  }
  // 二次重刷
  static async _refetch(data){
    const token = new Token()
    await token.getTokenFromServer()
    data.refetch = false
    return await Http.request(data)
  }

  // 提示气泡  : 默认气泡 config定义有气泡提示 没有的气泡提示
  // error_code 错误码 error_data 抛出异常返回的data
 static showError(error_code,error_data){
    let tip
    if(!error_code){
      tip = HttpExceptionCode[9999]
    }else{
      if(HttpExceptionCode[error_code]){
        tip = HttpExceptionCode[error_code]
      }else{
        tip = error_data.message
      }
    }
    wx.showToast({
      title: tip,
      icon: 'none',
      duration:3000
    })
  }
}
export{
  Http
}

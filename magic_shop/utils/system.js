import { promisic, px2rpx } from "../miniprogram_npm/lin-ui/utils/util"

const getSystemHeight =async function(){
  const res = await promisic(wx.getSystemInfo
  )()
  return {
    // 可视区域 除去tabbar和导航条
    windowHeight: res.windowHeight,
    windowWidth: res.windowWidth,
    // 设备屏幕高宽
    screenHeight: res.screenHeight,
    screenWidth: res.screenWidth
  }
}
// 获取可用高度 并转换为rpx
const getWindowHeight = async function(){
  const res = await getSystemHeight()
  const windowHeight = px2rpx(res.windowHeight)
  return windowHeight 
}

export{
  getSystemHeight,
  getWindowHeight
}

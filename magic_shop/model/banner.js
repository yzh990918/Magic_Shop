import {Http} from '../utils/http'
import { BannerType } from '../core/enum'
class Banner{
  static async getHomeBannerTop(){
    const res = await Http.request({
      url:'/banner/name/b-1',  
    })
    return res.data
  }
  static async getHomeBannerMiddle(){
    const res = await Http.request({
      url:'/banner/name/b-2',  
    })
    return res.data
  }
  static async OnGotoBanner(keyword,type){
    switch (type){
      case BannerType.SPU:
        wx.navigateTo({
          url: `/pages/detail/index?pid=${keyword}`
        })
        break;
      
      case BannerType.THEME:
        wx.navigateTo({
          url: `/pages/theme/index?tName=${keyword}`
        })
        break;

      case BannerType.SPU_LIST:
        wx.navigateTo({
          url: `/pages/spu-list/index?cid=${keyword}`
        })
        break;
      default:
        break;
    }
    
  }
}

export{
  Banner
}

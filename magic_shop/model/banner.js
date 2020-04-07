import {Http} from '../utils/http'
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
}

export{
  Banner
}

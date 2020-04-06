import {Http} from '../utils/http'
class Banner{
  static async getHomeBanner(){
    const res = await Http.request({
      url:'/banner/name/b-1',  
    })
    return res.data
  }
}

export{
  Banner
}

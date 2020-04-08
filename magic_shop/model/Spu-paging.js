import { Paging } from "../utils/paging"

class SpuPaging {
  static getLatestPaging(){
    // 获取Paging对象 传递参数
    return new Paging({
      url:'/spu/latest'
    },5)
  }
}
export{
  SpuPaging
}

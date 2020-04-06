import { Http } from "../utils/http";

class Category {
  static async getHomeCategory(){
   const res = await Http.request({
      url:'/category/grid/all'
    })
    return res.data
  }
  
}

export{
  Category
}

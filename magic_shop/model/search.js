import { Http } from "../utils/http";
import { Paging } from "../utils/paging";

class Search{
    static async gethotSearchTags(){
      const res = await Http.request({
        url:'/tag/type/1'
      })
      return res.data
    }
    static searchKeywords(keyword){
      return new Paging({
        url:`/spu/search?q=${keyword}`
      })
    }
}
export{
  Search
}

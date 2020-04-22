import { Http } from "../utils/http";

class Categories {
  roots = []
  subs = []
  async getHomeCategory(){
   const res = await Http.request({
      url:'/category/all'
    })
    this.roots = res.data.roots
    this.subs = res.data.subs
  }
  // 获取roots
  getCategoryRoots(){
    return this.roots
  }
  // 根据rootID获取subs
  getSubsByRootID(rootID){
    // 切换时传递的ID是字符型 需要转换一下类型
    return this.subs.filter(sub=>sub.parent_id == rootID)
  }
  // 根据rootID获取root
  getRootByRootID(rooID){
    return this.roots.find(root=>root.id == rooID)
  }
}

export{
  Categories
}

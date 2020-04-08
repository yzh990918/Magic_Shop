import { Http } from "./http"

class Paging {
  // target: 类对象能够实现 请求下一页操作 并且没有数据返回没有更多数据 正在加载数据 返回锁
    url
    locker = false
    start
    count
    req
    moreData = true
    accumulator = []
    //* 1.初始化加载
    constructor(req,count=10,start=0){
      this.url = req.url // 原始的url
      this.count = count
      this.start =start
      this.req =req
    }
    // * 2.定义业务过程
    async getMoreData(){
      if(!this.moreData){
        return
      }
      // getLocker request releaseLocker
      if(!this._getLocker()){
        return
      }
     const data = await this._GetData()
      this._releaseLocker()
      return data
    }
  // * 3.封装获取数据方法
   async _GetData(){
      const req = this._getCurrentReq()
      let pagging =await Http.request(req)
      if(!pagging.data){
        return null
      }
      // 根据返回的数据 返回一个包数据结构(是否为空 items 是否有更多数据 历史请求的数据)的对象
      
      // 空数据
      if(pagging.data.total === 0 || !this.moreData){
        return {
          empty:true,
          items:[],
          moreData:false,
          accumulator:[]
        }
      }
      this.moreData = this._getMoreData(pagging.data.total_page,pagging.data.page)
      // 如果还有更多 start累加
      if(this.moreData){
        this.start += this.count
      }
      this._accumulatrItems(pagging.data.items)
      return {
        empty:false,
        items:pagging.data.items,
        moreData:this.moreData,
        accumulator:this.accumulator
      }
    }
    _accumulatrItems(items){
      this.accumulator = this.accumulator.concat(items)
    }
    _getMoreData(totalPage,page){
      // 是否还有更多数据
      return page < totalPage-1
    }

    _getCurrentReq(){
      let url = this.url
      const params = `start=${this.start}&count=${this.count}`
      if(url.includes('?')){
        url =url+ '&'+ params
      }else{
        url =url+ '?' + params
      }
      this.req.url = url
      return this.req
    }
    // 请求中 锁住 请求完 放锁
    //* 方法中不要多次使用if else 多用return
    _getLocker(){
      if(this.locker){
        return false
      }
      this.locker = true
      return true
    }
    _releaseLocker(){
      this.locker = false
    }
    
  
}
export{
  Paging
}

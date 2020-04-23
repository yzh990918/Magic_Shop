class HistoryKeywords{
  maxLength = 15
  keywords = []
  key = 'keywords'
  constructor(){
    this.keywords = this.getLocalKeywords()
    // 使用单例模式 防止再次进入时 keywords会重新置位空 因为每次都会new新的对象
    if(typeof HistoryKeywords.instance === 'object'){
      return HistoryKeywords.instance
    }
    HistoryKeywords.instance = this
    return this
  }
  save(keyword){
    // 去重
    const oldKeyword = this.keywords.filter(k=>k === keyword)
    if(oldKeyword.length > 0){
      return
    }
    // 长度限制
    if(this.keywords.length>this.maxLength){
      this.keywords.pop()
    }
    this.keywords.unshift(keyword)
    // 刷新缓存
    this.refreshLocalKeywords()
  }
  get(){
    return this.keywords
  }
  clear(){
    this.keywords = []
    this.refreshLocalKeywords()
  }
  // 刷新缓存
  refreshLocalKeywords(){
    wx.setStorageSync(this.key,this.keywords)
  }
  // 缓存获取keywords
  getLocalKeywords(){
    const keywords = wx.getStorageSync(this.key)
    if(!keywords){
      wx.setStorageSync(this.key,[])
      return []
    }
    return keywords
  }
}
export{
  HistoryKeywords
}

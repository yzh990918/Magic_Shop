import { HistoryKeywords } from "../../model/history-keywords"
import { Search } from "../../model/search"
const history = new HistoryKeywords()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    historytags:[],
    hottags:[],
    items:[],
    search:false,
    value:'',
    status:false
  },
  //todo: History-keywords类 热门搜索 搜索历史 搜索bar 搜索结果展示
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const historytags = history.get()
    const hottags = await Search.gethotSearchTags()
    this.setData({
      historytags,
      hottags
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  async onConfirm(event){
    this.setData({
      search:true
    })
    const keyword = event.detail.value || event.detail.name
    if(keyword === event.detail.name){
      this.setData({
        value:keyword
      })
    }
    if(!keyword){
      wx.showToast({
        title: '请输入关键词',
        icon: 'none',
        duration:2000
      })
      return 
    }
    if(!keyword.trim()){
      console.log('全是空格')
      wx.showToast({
        title: '请输入正确的关键词',
        icon: 'none',
        duration:2000
      })
      return
    }
    // 保存历史
    history.save(keyword)
    this.setData({
      historytags:history.get()
    })
    wx.lin.showLoading({
      type:'flip',
      color:'#157658',
      fullScreen:true
    })
    // 搜索
    const SearchPaging = Search.searchKeywords(keyword)
    const data = await SearchPaging.getMoreData()
    if(!data){
      return
    }
    wx.lin.renderWaterFlow(data.items)
    if(!data.items.length){
      this.setData({
        status:true
      })
    }
    wx.lin.hideLoading()
  },
    
  onCancel(){
   this.setData({
     search:false,
     value:'',
     status:false
   })
  },
  deleteHistory(){
    wx.lin.showDialog({
      type:"confirm",     
      title:"提示",
      content:"是否要清空历史记录" ,
      confirmColor:"#157658",
      success: (res) => {
        if (res.confirm) {
          history.clear()
          this.setData({
            historytags:[]
          })
        } else if (res.cancel) {
          return
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

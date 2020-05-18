import { Categories } from "../../model/categories"

// pages/spu-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryPaging:null,
    showLoading:true,
    status:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const cid = options.cid
    const is_root= options.isroot
    console.log(cid,is_root)
    if(is_root == undefined){
      is_root = true
    }
    const categoryPaging = Categories.getSpuCategoryPaging(cid,is_root)
    const data = await categoryPaging.getMoreData()
    if(!data.items.length){
      this.setData({
        status:true
      })
      return 
    }
    if(!data){
      return
    }
    this.setData({
      categoryPaging,
      showLoading:false
    })
    wx.lin.renderWaterFlow(data.items)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  onReachBottom: async function () {
    const data = await this.data.categoryPaging.getMoreData()
    if(!data){
      return
    }
    wx.lin.renderWaterFlow(data.items)
    if(!data.moreData){
      return
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

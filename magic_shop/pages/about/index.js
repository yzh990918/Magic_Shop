// pages/about/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clipborardData:[
      "https://github.com/251205668",
      "Ynulinulizainuli0918",
      "悦读ECUT(东理悦读)",
      "http://music.yangxiansheng.top/#/recommend",
      "http://restaurant.yangxiansheng.top",
      "https://github.com/251205668/Node_review",
      "https://github.com/251205668/Koa-template",
      "https://blog.yangxiansheng.top/"
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onCopyGit(event){
    const index = event.currentTarget.dataset.index
    wx.setClipboardData({
      data: this.data.clipborardData[index]
  })

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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

import { Coupon } from "../../model/coupon"
import { Address } from "../../model/address"
import { promisic } from "../../miniprogram_npm/lin-ui/utils/util"
import { AuthorizedStatus } from "../../core/enum"

// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponsNums:0,
    showDialog:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const coupons = await Coupon.getMyAviableCoupons()
    this.setData({
      couponsNums:coupons.length
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  async toAddress(){
    const setting = await promisic(wx.getSetting)()
    const address = setting.authSetting['scope.address']
    if(address === false){
      this.setData({
        showDialog:true
      })
    }
    console.log("chooseAddress")
    await promisic(wx.chooseAddress)()
  },
  onDialogConfirm(){
    wx.openSetting()
  },

  toMyCoupon(){
    wx.navigateTo({
      url: '/pages/my-coupon/index'
    })

  },

  toOrderDetail(){
    wx.navigateTo({
      url: '/pages/my-order/index?key=0'
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

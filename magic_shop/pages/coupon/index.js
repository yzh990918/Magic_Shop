import { CouponType } from "../../core/enum"
import { Activity } from "../../model/activity"

// pages/coupon/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 判断传递的type和活动名
    const type = options.type
    const activityName = options.aName
    if(type === CouponType.ACITYITY){
      const coupons = await Activity.getCounponsByActivityName(activityName)
      this.setData({
        coupons:coupons.coupons
      })
      
    }

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

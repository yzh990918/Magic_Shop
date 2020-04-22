import { Spu } from "../../model/spu"
import { SpuInstruction } from "../../model/Spu-instruction"
import { getWindowHeight } from "../../utils/system"

// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spu:null,
    showFlag:false,
    tags:[],
    spec:null,
    instaruction:[],
    h:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 获取路由参数
    const pid = options.pid
    const spu = await Spu.getSpudetail(pid)
    this.setData({
      spu
    })
    this.setTags()
    this.getSpuInstruction()
    this.setScrollViewHeight()
  },
  async setScrollViewHeight(){
    const height = await getWindowHeight() - 100
    this.setData({
      h:height
    })
  },
  async getSpuInstruction(){
    const data=await SpuInstruction.getSpuInstruction()
    const instaruction = data.map(item=>item.text)
    this.setData({
      instaruction
    })
  },
  setTags(){
    const spu = this.data.spu
    if(!spu){
      return
    }
    if(!spu.tags){
      return
    }
    const tags = spu.tags.split('$')
    this.setData({
      tags
    })
  },
  backHome(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  toCart(){
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },
  showRealm(){
    this.setData({
      showFlag:true,
      orderWay:'cart'
    })
  },
  specChange(event){
    const spec = event.detail
    console.log(spec)
    this.setData({
      spec
    })
  },
  buygoods(){
    this.setData({
      showFlag:true,
      orderWay:'buy'
    })
  },
  showRealm(){
    this.setData({
      showFlag:true,
      orderWay:'cart'
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

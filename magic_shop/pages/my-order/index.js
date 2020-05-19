import { Order } from '../../model/order'
import { OrderType } from '../../core/enum'

// pages/my-order/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultKey: 1,
    orderItems: [],
    dataPaging:null,
    showTag:false,
    activeKey:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const key = options.key
    // 如果是未支付
    if(key == 'unpaid'){
      await this.initUnpaidData()
      return 
    }
    if(key !== 'unpaid'){
      await this.initData(parseInt(key))
      console.log(this.data.activeKey)
      return
    }
    // 点击全部订单
    await this.initData(OrderType.ALL)
  },
  async initData(status) {
    const OrderPaging = Order.getOrderPaging(status)
    const data = await OrderPaging.getMoreData()
    if(!data.accumulator.length){
      this.setData({
        showTag:true
      })
    }else{
      this.setData({
        showTag:false
      })
    }
    this.setData({
      orderItems: data.accumulator,
      dataPaging:OrderPaging,
      activeKey:status+1
    })
  },

  async initUnpaidData(){
    const OrderPAging = Order.getUnpaidPaging()
    const data = await OrderPAging.getMoreData()
    if(!data.accumulator.length){
      this.setData({
        showTag:true
      })
    }
    this.setData({
      orderItems: data.accumulator,
      dataPaging:OrderPAging,
      activeKey:2
    })
  },

  async changeTabs(event) {
    const index = event.detail.currentIndex
    switch (index) {
      case 0:
        await this.initData(OrderType.ALL)
        break
      case 1:
       await this.initUnpaidData()
        break
      case 2:
        await this.initData(OrderType.UNSHIPPED)
        break
      case 3:
        await this.initData(OrderType.SHIPED)
        break
      case 4:
        await this.initData(OrderType.FINISH)
        break
      default:
        break
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const dataPaging = this.data.dataPaging
    if(!dataPaging.moreData){
      return
    }
    const data = await dataPaging.getMoreData()
    this.setData({
      orderItems: data.accumulator
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})

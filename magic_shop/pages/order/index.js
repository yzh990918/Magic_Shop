import { Cart } from "../../model/cart"
import { OrderItem } from "../../model/order-item"
import { Order } from "../../model/order"
import { Sku } from "../../model/sku"
const cart = new Cart()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let orderItems
    let localOrdernum
    // 本地获取选中商品数组 服务器获取数据并实例化订单数组 检测异常
    const skuIds = cart.getCheckedSkuIds()
    localOrdernum = skuIds.length

    orderItems =await this.getServerOrderItems(skuIds)
    const order = new Order(orderItems,localOrdernum)
    console.log(order)
    try{
      order.checkOrderIsOk()
    }catch(e){
      console.log(e)
      return 
    }
  },

  async getServerOrderItems(skuIds){
    const skus = await Sku.getSkubySKuIds(skuIds)
    const orderItems = skus.map((sku)=>{
      // 实例化order子项 需要传入选中的sku数量
      const count = cart.getSkuCountBySkuId(sku.id)
      return new OrderItem(sku,count)
    })
    return orderItems
  },

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

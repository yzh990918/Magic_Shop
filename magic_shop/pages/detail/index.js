import { Spu } from '../../model/spu'
import { SpuInstruction } from '../../model/Spu-instruction'
import { getWindowHeight } from '../../utils/system'
import { cartItem } from '../../model/cart-item'
import { Cart } from '../../model/cart'
// pages/detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    spu: null,
    showFlag: false,
    tags: [],
    spec: null,
    instaruction: [],
    h: 0,
    cartItemsCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 获取路由参数
    const pid = options.pid
    const spu = await Spu.getSpudetail(pid)
    this.setData({
      spu,
    })
    this.setTags()
    this.getSpuInstruction()
    this.setScrollViewHeight()
  },
  async setScrollViewHeight() {
    const height = (await getWindowHeight()) - 100
    const cart = new Cart()
    this.setData({
      h: height,
      cartItemsCount: cart.getCartSkuNums(),
    })
  },
  async getSpuInstruction() {
    const data = await SpuInstruction.getSpuInstruction()
    const instaruction = data.map((item) => item.text)
    this.setData({
      instaruction,
    })
  },
  setTags() {
    const spu = this.data.spu
    if (!spu) {
      return
    }
    if (!spu.tags) {
      return
    }
    const tags = spu.tags.split('$')
    this.setData({
      tags,
    })
  },
  backHome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  toCart() {
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  showRealm() {
    this.setData({
      showFlag: true,
      orderWay: 'cart',
    })
  },
  specChange(event) {
    const spec = event.detail
    this.setData({
      spec,
    })
  },
  buygoods() {
    this.setData({
      showFlag: true,
      orderWay: 'buy',
    })
  },
  showRealm() {
    this.setData({
      showFlag: true,
      orderWay: 'cart',
    })
  },
  previewImage(event) {
    const cursrc=event.currentTarget.dataset.cursrc
    const ImagList = this.data.spu.spu_img_list.map(item=>item.img)
    wx.previewImage({
      current: cursrc, // 当前显示图片的http链接
      urls:ImagList // 需要预览的图片http链接列表
    })
  },

  // 接收控制器传来的商品信息
  onShopping(event) {
    if (event.detail.orderWay === 'cart') {
      const CartItem = new cartItem(event.detail.sku, event.detail.skuCount)
      const cart = new Cart()
      cart.addItem(CartItem)
      this.setData({
        showFlag: false,
      })
      this.refreshNum()
      wx.lin.showToast({
        title: '加入购物车成功~',
        icon: 'success',
        success: (res) => {
          console.log(res)
        },
      })
    }
    if (event.detail.orderWay === 'buy') {
      const skuId = event.detail.sku.id
      const count = event.detail.skuCount
      const orderWay = event.detail.orderWay
      wx.navigateTo({
        url: `/pages/order/index?skuId=${skuId}&count=${count}&orderWay=${orderWay}`,
      })
    }
  },

  refreshNum() {
    const cart = new Cart()
    console.log(cart.getCartSkuNums())
    this.setData({
      cartItemsCount: cart.getCartSkuNums(),
    })
  },
})

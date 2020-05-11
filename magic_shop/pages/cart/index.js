import { Cart } from '../../model/cart'
const cart = new Cart()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    allChecked: null,
    isEmpty: false,
    totalPrice: 0,
    totalCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if (cart.isEmpty()) {
      this.isEmpty()
      return
    }
    await cart.getServerCartData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const cartItems = cart.getLocalCartData().items
    console.log(cart.isEmpty())
    if (cart.isEmpty()) {
      this.isEmpty()
      return
    }
    this.setData({
      cartItems,
    })
    this.isnotEmpty()
    this.isAllChecked()
    cart._calCheckedPrice()
    this.refreshData()
  },
  //重新计算
  refreshData() {
    this.setData({
      totalPrice: cart.checkedPrice,
      totalCount: cart.checkedCount,
    })
  },
  // 空操作
  isEmpty() {
    this.setData({
      isEmpty: true,
    })
    wx.hideTabBarRedDot({
      index: 2,
    })
  },
  // 非空操作
  isnotEmpty() {
    this.setData({
      isEmpty: false,
    })
    wx.showTabBarRedDot({
      index: 2,
    })
  },
  // 删除购物车的回调
  deleteCartItem() {
    if (cart.isEmpty()) {
      this.isEmpty()
    }
    this.isAllChecked()
    this.refreshData()
  },

  // 选中购物车商品的回调
  checkCartItem() {
    this.isAllChecked()
    this.refreshData()
  },

  // 改变购物车商品数量的回调
  changeCartItemCount() {
    this.refreshData()
  },

  // 判断是否全选
  isAllChecked(){
    if (cart.isAllChecked()) {
      this.setData({
        allChecked: true,
      })
    } else {
      this.setData({
        allChecked: false,
      })
    }
  },
  checkAll(event) {
    const checked = event.detail.checked
    this.setData({
      allChecked: checked,
    })
    cart.checkALl(checked)
    this.setData({
      cartItems: this.data.cartItems,
      totalPrice: cart.checkedPrice,
      totalCount: cart.checkedCount,
    })
  },
})

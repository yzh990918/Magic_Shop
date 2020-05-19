// components/order-panel/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    OnToOrderDetail(event){
      const key = event.currentTarget.dataset.key
      wx.navigateTo({
        url: `/pages/my-order/index?key=${key}`
      })
    }

  }
})

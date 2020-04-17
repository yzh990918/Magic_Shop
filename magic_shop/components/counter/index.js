import { Cart } from '../models/cart'

// components/counter/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: Cart.MIN_LENGTH
    },
    min: {
      type: Number,
      value: Cart.MIN_LENGTH
    },
    max: {
      type: Number,
      value: Cart.MAX_LENGTH
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onOverStep(event) {
      // type值为overflow_min、overflow_max
      const type = event.detail.type
      if (type === 'overflow_min') {
        wx.showToast({
          title: '不能再少了，亲',
          icon: 'none',
          duration: 3000,
        })
      }
      if (type === 'overflow_max') {
        wx.showToast({
          title: '手下留情,在下实在没有那么多货了',
          icon: 'none',
          durantion: 3000,
        })
      }
    }
  },
})

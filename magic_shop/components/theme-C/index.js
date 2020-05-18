// components/theme-C/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    theme: Object,
  },
  observers: {
  },
  /**
   * 组件的初始数据
   */
  data: {
    tags: Array,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(event){
      const pid = event.currentTarget.dataset.pid
      wx.navigateTo({
        url: `/pages/detail/index?pid=${pid}`
      })
    }
  },
})

// components/theme-E/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    theme:Object
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
    GotoDetail(event){
      const pid = event.currentTarget.dataset.pid
      wx.navigateTo({
        url: `/pages/detail/index?pid=${pid}`
      })
    }

  }
})

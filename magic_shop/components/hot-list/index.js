// components/hot-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotlist:Object
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
    ToThemeE(event){
      wx.navigateTo({
        url: `/pages/theme/index?tName=t-5`
      })
    },
    GotoDetail(event){
      const pid = event.currentTarget.dataset.pid
      wx.navigateTo({
        url: `/pages/detail/index?pid=${pid}`
      })
    }


  }
})

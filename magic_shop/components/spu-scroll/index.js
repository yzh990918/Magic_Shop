// components/spu-scroll/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    theme:Object,
    spuList:Array
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
    toThemeB(event){
      const tName  = event.currentTarget.dataset.tname 
      wx.navigateTo({
        url: `/pages/theme/index?tName=${tName}`
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

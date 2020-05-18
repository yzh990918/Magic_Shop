// components/category-sub/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subs:Array,
    bannerImg:String
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
    onGotoSpuList(event){
      const cid = event.currentTarget.dataset.cid
      wx.navigateTo({
        url: `/pages/spu-list/index?cid=${cid}&isroot=false`
      })

    }

  }
})

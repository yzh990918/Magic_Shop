// components/theme-B/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    theme:Object
  },
  observers:{
    theme:function(theme){
      if(!theme){
        return
      }
      const desc = theme.description.split("#")
      this.setData({
        textA:desc[0],
        textB:desc[1],
        textC:desc[2]
      })
      console.log(theme.spu_list)
      wx.lin.renderWaterFlow(theme.spu_list, true)
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    textA:"",
    textB:"",
    textC:""
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

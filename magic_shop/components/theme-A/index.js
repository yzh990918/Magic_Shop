// components/theme-A/index.js
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
        spuList:theme.spu_list,
        textA:desc[0],
        textB:desc[1]
       
      })
    }


  },
  /**
   * 组件的初始数据
   */
  data: {
    spuList:[],
    textA:"",
    textB:"",
    textC:""
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

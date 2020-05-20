// components/theme-D/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    theme: Object,
  },
  observers:{
    theme:function(theme){
      if(!theme){
        return
      }
      this.setData({
        random:this.getRandomArray(theme.spu_list.length)
      })
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    random: Array
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getRandomArray(size) {
      let randomArray = []
      for (let index = 0; index < size; index++) {
        let random = Math.random()
        if (random < 0.5) {
          randomArray.push(-1)
        }else{
          randomArray.push(1)
        }
      }
      return randomArray
    },
    GotoDetail(event){
      const pid = event.currentTarget.dataset.pid
      wx.navigateTo({
        url: `/pages/detail/index?pid=${pid}`
      })
    }
  },
  
})

// components/emptyPage/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:String,
    showBtn:Boolean,
    btnText:String
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
    onTap(){
     wx.switchTab({
       url:"/pages/category/index"
     })
    }

  }
})

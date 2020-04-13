// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Cell:Object,
    x:Number,
    y:Number
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
    selectCell(){
      // 越组件传递事件
      this.triggerEvent('cellTap',{cell:this.properties.Cell,x:this.properties.x,y:this.properties.y},{bubbles:true,composed:true})
    }
  }
})

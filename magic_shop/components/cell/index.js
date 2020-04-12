// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Cell:Object
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
    selectCell(event){
      this.triggerEvent('SelectCell',{})
    }
  }
})

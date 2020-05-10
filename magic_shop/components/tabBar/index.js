// components/tabBar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartItemsCount:Number
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
    BackToHome(){
      this.triggerEvent('onBackHome',{})
    },
    ToShopCart(){
      this.triggerEvent('ToCart',{})
    },
    showRealm(){
      this.triggerEvent('ShowRealm',{})
    },
    buyGoods(){
      this.triggerEvent('buyGoods')
    }

  }
})

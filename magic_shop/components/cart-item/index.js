import { parseSpecValue } from "../../utils/sku"
import { Cart } from "../../model/cart"

// components/car-item/index.js
const cart = new Cart()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartItem:Object
  },
  observers:{
    cartItem:function(cartItem){
      if(!cartItem){
        return
      }
      const specStr = parseSpecValue(cartItem.sku.specs)
      const discount = cartItem.sku.discount_price ?true:false
      const soldOut = cart.isSoldOut(cartItem)
      const online = cart.isOnline(cartItem)
      this.setData({
        specStr,
        discount,
        soldOut,
        online,
        stock: cartItem.sku.stock,
        skuCount: cartItem.count,
        isChecked:cartItem.checked
      })

    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    specStr:String,
    discount:Boolean,
    soldOut:Boolean,
    online:Boolean,
    stock: 99,
    skuCount:1,
    isChecked:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete(){
      const skuId = this.properties.cartItem.skuId
      cart.removeItem(skuId)
      this.setData({
        cartItem:null
      })
      this.triggerEvent("deleteItem",{skuId})
    },
    selectCheckBox(e){
      const checked = e.detail.checked
      this.setData({
        isChecked:checked
      })
      cart.checkItem(this.properties.cartItem.skuId)
      this.triggerEvent("checkItem",{})
    },
    onChangeCount(e){
      const count = e.detail.count 
      const skuId = this.properties.cartItem.skuId
      cart.replcaSkuCount(skuId,count)
      this.triggerEvent("changeCount",{
        count
      })
    },
    todetail(){
      const spuId = this.properties.cartItem.sku.spu_id
      wx.navigateTo({
        url: `/pages/detail/index?pid=${spuId}`
      })
    }
  }
})

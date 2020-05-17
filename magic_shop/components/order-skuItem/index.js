// components/order-skuItem/index.js
import {parseSpecValue} from '../../utils/sku'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderItem:Object
  },

  observers:{
    orderItem:function(orderItem){
      if(!orderItem){
        return
      }
      const specValues = orderItem.spec_values
      this.setData({
        specValuesText:specValues?parseSpecValueArray(specValues):parseSpecValue(orderItem.specs)
      })
    }
  },
  data: {
    specValuesText:String
  }
})

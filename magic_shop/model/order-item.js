import { Cart } from './cart'
import { accMultiply } from '../utils/Number'
import { OrderException } from '../core/order-exception'
import {OrderExceptionType} from '../core/enum'

class OrderItem {
  title
  img
  skuId
  stock
  online
  specs
  count
  rootCategoryId
  categoryId
  cart = new Cart()

  finalPrice
  singleFinalPrice

  // 传入sku count初始化订单子项
  constructor(sku, count) {
    this.title = sku.title
    this.img = sku.img
    this.skuId = sku.id
    this.stock = sku.stock
    this.online = sku.online
    this.categoryId = sku.category_id
    this.rootCategoryId = sku.root_catgory_id
    this.specs = sku.specs

    this.count = count

    this.singleFinalPrice = this._ensureSingleFinalPrice(sku)
    // 最后价格
    this.finalPrice = accMultiply(this.count, this.singleFinalPrice)
  }

  _ensureSingleFinalPrice(sku) {
    if (sku.discount_price) {
      return sku.discount_price
    }
    return sku.price
  }
  // 订单商品库存和数量检测
  checkOrderItemIsOK(){
    this._stockIsOk()
    this._countIsOk()
  }
  _stockIsOk(){
    if(this.stock === 0){
     throw new OrderException("商品已经售完",OrderExceptionType.SOLD_OUT)
    }
    if(this.count > this.stock){
      throw new OrderException("购买商品数量超过库存",OrderExceptionType.BEYOND_STOCK)
    }
  }
  _countIsOk(){
    if(this.count > Cart.SKU_MAXCOUNT){
      throw new OrderException("购买商品数量超过购物车最大值",OrderExceptionType.BEYOND_SKU_MAX_COUNT)
    }
  }
}

export{
  OrderItem
}

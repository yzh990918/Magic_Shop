import { OrderException } from "../core/order-exception"
import { OrderExceptionType } from "../core/enum"
import { accAdd } from "../utils/Number"
import { Paging } from "../utils/paging"

class Order{
  orderItems
  localOrdernum
  constructor(orderItems,localOrdernum){
    this.orderItems = orderItems
    this.localOrdernum = localOrdernum
  }
  checkOrderIsOk(){
    // 子项检查异常
    this.orderItems.forEach((item)=>{
      item.checkOrderItemIsOK()
    })
    // 订单数组检查异常
    this._orderIsOk()
  }

  //* 需要检查 空订单 购物车订单数与服务器订单数不同处理
  _orderIsOk(){
    this._isEmptyOrder()
    this._containNotSaleItem()
  }

  _isEmptyOrder(){
    if(this.orderItems.length === 0){
      throw new OrderException("订单中没有商品",OrderExceptionType.EMPTY)
    }
  }
  _containNotSaleItem(){
    if(this.localOrdernum !== this.orderItems.length){
      throw new OrderException("商品数量核验不正确，可能商品下架",OrderExceptionType.NOT_ON_SALE)
    }
  }

  // 计算总价
  getOrderTotalPrice(){
    return this.orderItems.reduce((prev,orderItem)=>{
      const price = accAdd(prev,orderItem.finalPrice)
      return price
    },0)
  }

  // 计算各个分类优惠券下订单总价格
  // reduce 参数 ： prev 上一次回调结果 curr 正在处理元素 index 下标 后面加个0 设置初始值
  getTotalPriceByCategoryList(categoryList){
    if(categoryList.length === 0){
      return 0
    }
    const price = categoryList.reduce((prev,cur)=>{
      // 计算单个分类的订单价格
      this._getEachPriceByCategory(cur)
      return accAdd(prev,  this._getEachPriceByCategory(cur))

    },0)
    return price
  }

  _getEachPriceByCategory(categoryId){
    const price = this.orderItems.reduce((prev,orderItem)=>{
    const isIn = this._IsItemInCategories(orderItem,categoryId)
    if(isIn){
      return accAdd(prev,orderItem.finalPrice)
    }
    return prev
    },0)
    return price
  }

  // 判断order的分类id是否和优惠券的categoryId匹
  _IsItemInCategories(orderItem,categoryId){
    if(orderItem.categoryId === categoryId || orderItem.rootCategoryId === categoryId){
      return true
    }else{
      return false
    }
  }

  // 获取全部  未发货 已发货 以完成的订单信息
  static getOrderPaging(status){
    return new Paging({
      url:`/order/by/status/${status}`
    },10)
  }
  //未支付 
  static getUnpaidPaging(){
    return new Paging({
      url:`/order/status/unpaid`
    },10)
  }
}


export{
  Order
}

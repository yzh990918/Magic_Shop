import { OrderException } from "../core/order-exception"
import { OrderExceptionType } from "../core/enum"

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
}


export{
  Order
}

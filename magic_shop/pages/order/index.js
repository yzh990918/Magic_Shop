import { Cart } from "../../model/cart"
import { OrderItem } from "../../model/order-item"
import { Order } from "../../model/order"
import { Sku } from "../../model/sku"
import { Coupon } from "../../model/coupon"
import { CouponBO } from "../../model/couponBo"
import { PickType } from "../../core/enum"
const cart = new Cart()
Page({
  data: {
    order:null,
    counBoList:[],
    finalTotalPrice: 0,
    discountMoney: 0,
    totalPrice: 0,
    orderItems: []
  },
  onLoad: async function (options) {

    // 分为 立即购买 购物车计算两种方式初始化
    const orderWay = options.orderWay
    const skuId = options.skuId
    const count = options.count

    let orderItems
    let localOrdernum
    if(orderWay === 'buy'){
      localOrdernum = 1
      orderItems = await this.getSingalOrderItem(skuId,count)
    }else{


  //* 本地获取选中商品数组 服务器获取数据并实例化订单数组 检测异常
    const skuIds = cart.getCheckedSkuIds()
    localOrdernum = skuIds.length
    orderItems =await this.getServerOrderItems(skuIds)
    }
    const order = new Order(orderItems,localOrdernum)
    try{
      order.checkOrderIsOk()
    }catch(e){
      console.log(e)
      return 
    }

    // 获取优惠券业务对象数组
    const coupons = await Coupon.getMyAviableCoupons()
    const counBoList = this.packageCouponBoList(coupons,order)
    console.log(counBoList)
    this.initData(order,counBoList)
  },

  // 绑定数据
  initData(order,counBoList){
    this.setData({
      order,
      orderItems:order.orderItems,
      counBoList,
      finalTotalPrice:order.getOrderTotalPrice(),
      totalPrice:order.getOrderTotalPrice()
    })
  },

  //* 监听优惠券选择事件
  onChecked(event){
    const currentCoupon = event.detail.currentCoupon
    const option = event.detail.option
    if(option === PickType.PICK){
      // 获取优惠券业务对象处理后的价格对象
      const Priceobj = CouponBO.getFinalPrice(this.data.order.getOrderTotalPrice(),currentCoupon)
      // 绑定数据
      this.setData({
        finalTotalPrice:Priceobj.finalPrice,
        discountMoney:Priceobj.discountMoney
      })
    }else{
      this.setData({
        finalTotalPrice:this.data.order.getOrderTotalPrice(),
        discountMoney:0
      })
    }
    console.log(this.data.finalTotalPrice,this.data.discountMoney)

  },

  // 服务端获取skus 然后初始化orderItem
  async getServerOrderItems(skuIds){
    const skus = await Sku.getSkubySKuIds(skuIds)
    const orderItems = skus.map((sku)=>{
      // 实例化order子项 需要传入选中的sku数量
      const count = cart.getSkuCountBySkuId(sku.id)
      return new OrderItem(sku,count)
    })
    return orderItems
  },

  // 获取单个商品订单对象
  async getSingalOrderItem(skuId,count){
    const skus = await Sku.getSkubySKuIds(skuId)
    const sku = skus[0]
    return new OrderItem(sku,count)
  },

  //* 初始化优惠券的业务对象 传入当前的订单数组实例化对象
  packageCouponBoList(coupons,order){
    return coupons.map((coupon)=>{
      const couponbo = new CouponBO(coupon)
      couponbo.meetCondition(order)
      return couponbo
    }) 
  }
})

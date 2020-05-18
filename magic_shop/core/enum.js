const CellStatus = {
  FORBIDDEN: 'forbidden',
  SELECTED: 'selected',
  WAITING: 'waiting',
}

const AuthorizedStatus = {
  AUTHORIZED: 'authorized',
  DENY: 'deny',
  UNAUTHORIZED: 'unauthorized',
}

const OrderExceptionType = {
  // 超过库存
  BEYOND_STOCK: 'beyond_stock',
  // 超过购物车数量限制
  BEYOND_SKU_MAX_COUNT: 'beyond_sku_max_count',
  //
  BEYOND_ITEM_MAX_COUNT: 'beyond_item_max_count',
  // 卖完
  SOLD_OUT: 'sold_out',
  // 没有上架
  NOT_ON_SALE: 'not_on_sale',
  // 空
  EMPTY: 'empty',
}

// 用于异常处理的code码
const HttpExceptionCode = {
  '-1': '网络中断、超时或其他异常',
  9999: '抱歉，server_error',
  777: '抱歉，no_codes',
  30001: '优惠券没找到',
  10001: '参数异常',
  // 30002
  40006: '您已经领取过该优惠券',
}

//  优惠券的入口
const CouponType = {
  ACITYITY: 'activity',
  CATEGORY: 'category',
}

// 优惠券状态
const CouponStatus ={
  CAN_COLLECT : 0,
  AVALIABLE: 1,
  USED: 2,
  OVERDUE:3
}

// 优惠券类型
const CouponsType = {
  FULL_MINUS: 1,
  FULL_OFF: 2,
  NO_THRESHOLD_MINUS: 3
}

// picker 正选或反选

const PickType = {
  PICK:'pick',
  UNPICK:"unpick"
}

// banner类型
const BannerType= {
  SPU:1,
  THEME:3,
  SPU_LIST:2
  
}
export {
  CellStatus,
  AuthorizedStatus,
  OrderExceptionType,
  HttpExceptionCode,
  CouponType,
  CouponStatus,
  CouponsType,
  PickType,
  BannerType
}

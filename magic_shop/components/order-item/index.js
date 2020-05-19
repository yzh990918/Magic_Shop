import { GetSlashYMDHMS } from '../../utils/date'

// components/order-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order: Object,
  },
  observers: {
    order: function (order) {
      if (!order) {
        return
      }
      const OrderView = this.getOrderview(order)
      this.setData({
        OrderView,
      })
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    OrderView: Object,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getOrderview(order) {
      const paid_time = GetSlashYMDHMS(order.placed_time)
      const OrderView = {
        paid_time,
        title: order.snap_title,
        order_no: order.order_no,
        price: order.final_total_price,
        count: order.total_count,
        img: order.snap_img,
        status: this.getStausTextByStatus(order.status),
      }
      return OrderView
    },
    getStausTextByStatus(status) {
      if(status === 1){
        return "未支付"
      }
      if(status === 2){
        return "未发货"
      }
      if(status === 3){
        return "已发货"
      }
      if(status === 4){
        return "已完成"
      }
    },
  },
})

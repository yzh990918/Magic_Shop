// components/relame/index.js
import { FenceGroup } from '../models/fence-group'
import { judger } from '../models/judger'
import { Cell } from '../models/cell'
import { Spu } from '../../model/spu'
import { Cart } from '../models/cart'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    orderWay:String
  },
  observers: {
    spu: function (spu) {
      if (!spu) {
        return
      }
      // 判断是否是无规格，如果是无规格就不用往下执行
      if (Spu.isNoSpec(spu)) {
        this.processNoSpec(spu)
      } else {
        this.prcessHasSpec(spu)
      }
      this.triggerSpec()
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger: Object,
    fenceGroup: Object,
    title: String,
    img: String,
    price: String,
    discountPrice: String,
    stock: String,
    count:Cart.MIN_LENGTH
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择联动
    triggerSpec(){
      const NoSpec = Spu.isNoSpec(this.properties.spu)
      if(NoSpec){
        this.triggerEvent('specchange',{
          NoSpec
        })
      }else{
        this.triggerEvent('specchange',{
          NoSpec,
          isSkuIntact: this.data.judger.SkuPending.isIntact(),
          CurrentValues: this.data.judger.SkuPending.getCurrentSpecValue(),
          MissingKeys: this.data.judger.getMissingKeys(),
        })
      }
    },
    // 点击加入购物车按钮或者立即购买
    shopping() {
      if(Spu.isNoSpec(this.properties.spu)){
        const sku = this.properties.spu.sku_list[0]
        this.triggerSpuEvent(sku)
        return
      }
        this.shopingHasSpec()
    },

// 辅助函数 抛出添加购物车的商品信息
triggerSpuEvent (sku) {
  this.triggerEvent("shopping",{
    orderWay:this.properties.orderWay,
    spuID: this.properties.spu.id,
    sku,
    skuCount:this.data.count
  })
},
// 购买与规格商品
shopingHasSpec(){
  if(!this.data.isSkuIntact){
    const missKeys = this.data.judger.getMissingKeys()
    wx.showToast({
      title: `请选择${missKeys.join(',')}`,
      icon: 'none',
      duration:3000
    })
    return
  }
  this.triggerSpuEvent(this.data.judger.getDetermineSku())
},


    // 判断是否无货
    onTapcount(e){
      const count = e.detail.count
      if(this.data.judger.SkuPending.isIntact()){
        this.setOutOfStock(this.data.judger.getDetermineSku().stock,count)
      }
      this.setData({
        count
      })
    },
    isoutOfStock(stock, count) {
      return stock < count
    },
    setOutOfStock(stock,count){
      this.setData({
        outStock:this.isoutOfStock(stock,count)
      })

    },
    // 无规格
    processNoSpec(spu) {
      this.setData({
        NoSpec: true,
      })
      // 无规格情况下只有一个sku
      this.bindSku(spu.sku_list[0])
      this.setOutOfStock(spu.sku_list[0].stock,this.data.count)
      return
    },
    // 有规格
    prcessHasSpec(spu) {
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFence()
      const Judger = new judger(fenceGroup)
      this.setData({ judger: Judger })
      const defaultSku = fenceGroup.getDefaultSku()
      // 如果有默认的sku
      if (defaultSku) {
        this.bindSku(defaultSku)
        this.bindTipData()
        this.setOutOfStock(defaultSku.stock,this.data.count)
      } else {
        this.bindSpu()
        this.bindTipData()
      }
      this.getFences(fenceGroup)
    },
    bindSku(sku) {
      this.setData({
        title: sku.title,
        img: sku.img,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock,
      })
    },
    bindSpu() {
      const spu = this.properties.spu
      this.setData({
        title: spu.title,
        img: spu.img,
        price: spu.price,
        discountPrice: spu.discount_price,
      })
    },
    //如果是完整的sku
    bindTipData() {
      this.setData({
        isSkuIntact: this.data.judger.SkuPending.isIntact(),
        CurrentValues: this.data.judger.SkuPending.getCurrentSpecValue(),
        MissingKeys: this.data.judger.getMissingKeys(),
      })
    },
    // judge改变状态后将fences传回cell
    getFences(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
      })
    },
    // 监听cell点击事件
    oncellTap(e) {
      const data = e.detail.cell
      const x = e.detail.x
      const y = e.detail.y
      const cell = new Cell(data.spec)
      cell.status = data.status

      const judger = this.data.judger
      // 一定要传入cell模型对象保证Skupending的数组里是模型对象 不能传入propeties数组参数
      judger.judge(cell, x, y)

      // 如果是完整的sku路径 就重新绑定sku
      const SkuIntact = judger.SkuPending.isIntact()
      if (SkuIntact) {
        const currentSku = judger.getDetermineSku()
        this.bindSku(currentSku)
        this.setOutOfStock(currentSku.stock,this.data.count)
      }
      this.bindTipData()
      // 重新渲染数据
      this.getFences(judger.fenceGroup)
      this.triggerSpec()
    },
  },
})

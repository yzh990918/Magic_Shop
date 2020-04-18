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
    // 监听点击事件
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
    },
  },
})

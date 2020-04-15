// components/relame/index.js
import {FenceGroup} from '../models/fence-group';
import { judger } from '../models/judger';
import { Cell } from '../models/cell';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu:Object
  },
  observers:{
    'spu':function(spu){
      if(!spu){
        return
      }
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFence()
      const Judger = new judger(fenceGroup)
      const defaultSku = fenceGroup.getDefaultSku()
      if(defaultSku){
        this.bindSku(defaultSku)
      }else{
        this.bindSpu()
      }
      this.setData({judger:Judger})
      this.getFences(fenceGroup)
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger:Object,
    fenceGroup:Object,
    title:String,
    img:String,
    price:String,
    discountPrice:String,
    stock:String
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindSku(sku){
      this.setData({
        title:sku.title,
        img:sku.img,
        price:sku.price,
        discountPrice:sku.discount_price,
        stock:sku.stock
      })
    },
    bindSpu(){
      const spu = this.properties.spu
      this.setData({
        title:spu.title,
        img:spu.img,
        price:spu.price,
        discountPrice:spu.discount_price
      })
    },
    getFences(fenceGroup){
      this.setData({
        fences:fenceGroup.fences
      })
    },
    oncellTap(e){
      const data = e.detail.cell
      const x =e.detail.x
      const y =e.detail.y
      const cell = new Cell(data.spec)
      cell.status = data.status

      const judger = this.data.judger
      judger.judge(cell,x,y)
      this.setData({
        fences:judger.fenceGroup.fences
      })
  }}
})

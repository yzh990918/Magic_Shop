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
      this.getFences(fenceGroup)
      const Judger = new judger(fenceGroup)
      this.setData({judger:Judger})
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger:Object,
    fenceGroup:Object
  },

  /**
   * 组件的方法列表
   */
  methods: {
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

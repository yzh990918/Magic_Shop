// components/relame/index.js
import {FenceGroup} from '../models/fence-group';
import { judger } from '../models/judger';
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
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getFences(fenceGroup){
      this.setData({
        fences:fenceGroup.fences
      })
    }

  }
})

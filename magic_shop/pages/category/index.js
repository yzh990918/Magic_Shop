import {Categories} from '../../model/categories'
import { getWindowHeight } from '../../utils/system'
// pages/category/index.js
Page({

  data: {
    categories:null,
    defaultID:2
  },
  //finished: scroll-view的滚动条问题 segement的高度问题隐藏页面滚动条 category模型方法 加载初始化二级分类 监听切换的事件更换二级分类

  onLoad: function (options) {
    this.initCategoryData()
  },

  async initCategoryData(){
    const categories = new Categories()
   this.data.categories = categories
    await categories.getHomeCategory()
    const roots = categories.getCategoryRoots()
    // 获取默认的一级分类 和二级分类
    const defaultRoot = this.getDefaultRoot(roots)
    const defaultSubs = categories.getSubsByRootID(defaultRoot.id)
    this.setData({
      roots,
      currentSubs:defaultSubs,
      currentBannerImd:defaultRoot.img
    })
    this.setSegementHeight()
  },
  getDefaultRoot(roots){
    let defaultRoot = roots.find(r => r.id === this.data.defaultID)
    if (!defaultRoot) {
      defaultRoot = roots[0]
    }
    return defaultRoot
  },
  // 设置segement的高度 高度为可用高度减去搜索框 再减去padding
   async setSegementHeight(){
    const segementHeight =  await getWindowHeight()-82
    this.setData({
      segementHeight:segementHeight
    })
  },
  // 切换选项卡
  changeTabs(event){
    // 监听事件拿到key
    const key = event.detail.activeKey
    const currentRoot = this.data.categories.getRootByRootID(key)
    const currentSubs = this.data.categories.getSubsByRootID(currentRoot.id)
    this.setData({
      currentSubs,
      currentBannerImd:currentRoot.img
    })
  },
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  onReady: function () {

  },

  onShow: function () {

  },
  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})

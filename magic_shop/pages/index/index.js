import {Theme} from '../../model/theme'
Page({
  data: {
    topThemeImg:null
  },
  onLoad: async function() {
    const data = await Theme.getHomeLoactionA()
    this.setData({
      topThemeImg:data.data[0]
    })
  },
  onReady: function() {
    //Do some when page ready.
    
  },
  onShow: function() {
    //Do some when page show.
    
  },
  onHide: function() {
    //Do some when page hide.
    
  },
  onUnload: function() {
    //Do some when page unload.
    
  },
  onPullDownRefresh: function() {
    //Do some when page pull down.
    
  }
})

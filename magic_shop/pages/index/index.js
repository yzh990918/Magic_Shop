import { Theme } from '../../model/theme'
import { Category } from '../../model/category'
import { Banner } from '../../model/banner'
import { Activity } from '../../model/activity'
Page({
  data: {
    topThemeImg: null,
    banner: null,
    grid: [],
    activity: null,
    themeB: null,
  },
  onLoad: async function () {
    this.getAllData()
  },
  async getAllData() {
    const theme = new Theme()
    await theme.getHomeThemes()
    const themeA = await theme.getThemeA()
    const themeB = await theme.getThemeB()
    const grid = await Category.getHomeCategory()
    const banner = await Banner.getHomeBanner()
    const activity = await Activity.getLocationD()
    this.setData({
      topThemeImg: themeA,
      grid,
      banner,
      activity,
      themeB,
    })
  },
  onReady: function () {
    //Do some when page ready.
  },
  onShow: function () {
    //Do some when page show.
  },
  onHide: function () {
    //Do some when page hide.
  },
  onUnload: function () {
    //Do some when page unload.
  },
  onPullDownRefresh: function () {
    //Do some when page pull down.
  },
})

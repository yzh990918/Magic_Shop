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
    themeC:null,
    themeD:null
  },
  onLoad: async function () {
    this.getAllData()
  },
  async getAllData() {
    const theme = new Theme()
    await theme.getHomeThemes()
    // 获取 三个主题入口
    const themeA = await theme.getThemeA()
    const themeB = await theme.getThemeB()
    const themeC = await theme.getThemeC()
    const themeD = await theme.getThemeD()
    // 获取B主题的spu
    let ThemeBSpuList = []
    if(themeB.online){
     let data =await Theme.getHomeLocationESpu()
      ThemeBSpuList = data.spu_list.slice(0,8)
    }
    // 获取六宫格
    const grid = await Category.getHomeCategory()
    // 获取轮播
    const banner = await Banner.getHomeBannerTop()
    const hotList = await Banner.getHomeBannerMiddle()
    // 获取活动
    const activity = await Activity.getLocationD()
    this.setData({
      topThemeImg: themeA,
      grid,
      banner,
      activity,
      themeB,
      ThemeBSpuList,
      themeC,
      hotList,
      themeD
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

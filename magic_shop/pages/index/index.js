import { Theme } from '../../model/theme'
import { Category } from '../../model/category'
import { Banner } from '../../model/banner'
import { Activity } from '../../model/activity'
import { SpuPaging } from '../../model/Spu-paging'
import { CouponType } from '../../core/enum'
Page({
  data: {
    topThemeImg: null,
    banner: null,
    grid: [],
    activity: null,
    themeB: null,
    themeC: null,
    themeD: null,
    //保存之前的spuPaging对象
    SPaging: null,
    LoadingType: 'loading',
  },
  onLoad: async function () {
    this.getAllData()
    this.initBottomSpulist()
  },
  // 初始化底部数据
  async initBottomSpulist() {
    const Paging = SpuPaging.getLatestPaging()
    this.data.SPaging = Paging
    const data = await Paging.getMoreData()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
  },

  // 获取所有数据
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
    // 上架
    if (themeB.online) {
      let data = await Theme.getHomeLocationESpu()
      ThemeBSpuList = data.spu_list.slice(0, 8)
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
      themeD,
    })
  },
  // 触底触发
  async onReachBottom() {
    const data = await this.data.SPaging.getMoreData()
    // 如果没数据了 type=end
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
    if (!data.moreData) {
      this.setData({
        LoadingType: 'end',
      })
    }
  },
  OnToCoupon(event){
    const aName = event.currentTarget.dataset.aname
    console.log(aName)
    wx.navigateTo({
      url: `/pages/coupon/index?aName=${aName}&type=${CouponType.ACITYITY}`
    })
  },
  onUnload: function () {
    //Do some when page unload.
  },
  onPullDownRefresh: function () {
    //Do some when page pull down.
  },
})

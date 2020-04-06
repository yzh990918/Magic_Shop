import {Http} from '../utils/http'
class Theme {
  static ThemeA ='t-1'
  static ThemeB = 't-2'
  static ThemeC = 't-3'
  static ThemeD = 't-4'
  // 用类对象存储数据 改写方法  避免请求多次服务
  themes = []
    async getHomeThemes(){
    const res = await Http.request({
      url:'/theme/by/names',
      data:{
        names:`${Theme.ThemeA},${Theme.ThemeB},${Theme.ThemeC},${Theme.ThemeD}`
      }
    })
    this.themes =res.data
  }
  // 直接获取locationA LocationB 保证调用方的请求代码简洁
  async getThemeA(){
    return this.themes.find(t=>t.name===Theme.ThemeA)
  }
  async getThemeB(){
    return this.themes.find(t=>t.name===Theme.ThemeB)
  }
  async getThemeC(){
    return this.themes.find(t=>t.name===Theme.ThemeC)
  }
  async getThemeD(){
    return this.themes.find(t=>t.name===Theme.ThemeD)
  }
}

export{
  Theme
}

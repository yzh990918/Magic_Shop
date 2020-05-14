class User{
  constructor(){}
  static USER_KEY = "user"
  static getLocalUser(){
    const userinfo = wx.getStorageSync(User.USER_KEY)
    return userinfo?userinfo:null
  }
  static setLocalUser(userinfo){
    wx.setStorageSync(User.USER_KEY, userinfo)
  }
}
export{
  User
}

class Address{
  static ADDRESS_KEY = 'address'
  constructor(){

  }
  static getLoaclAdd(){
    const address = wx.getStorageSync(Address.ADDRESS_KEY)
    return address ? address:null
  }
  static serLocalAdd(address){
    wx.setStorageSync(Address.ADDRESS_KEY,address)
  }
}

export{
  Address
}

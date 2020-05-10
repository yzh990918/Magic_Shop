import { accMultiply, accAdd } from '../utils/Number'
import { Sku } from './sku'

class Cart {
  static SKU_MIN_COUNT = 1
  static SKU_MAXCOUNT = 99
  static STORAGEKEY = 'cart'
  _cartData = null
  checkedPrice = 0
  checkedCount = 0

  // 保证单例模式
  constructor() {
    if (typeof Cart.instance === "object") {
        return Cart.instance
    }
    Cart.instance = this
    return this
}


  _initCarDataStorage() {
    const cartData = {
      items: [],
    }
    wx.setStorageSync(Cart.STORAGEKEY, cartData)
    return cartData
  }

  // 类中获取缓存数据 并把_cartData绑定在cartData上 cartData改变 _cartData改变
  _getCartData() {
    // 如果有数据，直接返回 如果没有，初始化数据
    if (this._cartData !== null) {
      return this._cartData
    }
    // *判断是否有缓存数据 初始化 _cartData
    let cartData = wx.getStorageSync(Cart.STORAGEKEY)
    if (!cartData) {
      cartData = this._initCarDataStorage()
    }
    this._cartData = cartData
    return cartData
  }

  //! 核心方法

  // 加入购物车
  addItem(newItem) {
    if (this._beyondCartStock()) {
      throw Error('超过购物车最大数额，请删除部分商品')
    }
    this._pushItem(newItem)
    this._calCheckedPrice()
    this._refreshCartData()
  }

  // 删除购物车商品
  removeItem(skuId) {
    const cartData = this._getCartData()
    const oldItemIndex = this._findEqualItemIndex(skuId)
    cartData.items.splice(oldItemIndex, 1)
    this._calCheckedPrice()
    this._refreshCartData()
  }

  _beyondCartStock() {
    const cartData = this._getCartData()
    return cartData.items.length > Cart.SKU_MAXCOUNT
  }
  _pushItem(newItem) {
    const cartData = this._getCartData()
    // 找出之前存在的缓存中的sku数组第一个sku
    const oldItem = this._findEqualItem(newItem.skuId)
    if (!oldItem) {
       cartData.items.unshift(newItem)
    } else {
      // 添加之前存在商品的数量
      this._addSkucount(oldItem, newItem)
    }
  }

  _findEqualItem(newSkuId) {
    const cartData = this._getCartData()
    const oldItems = cartData.items.filter((item) => item.skuId === newSkuId)
    if (!oldItems.length) {
      return null
    }
    return oldItems[0]
  }
  // 添加原有的sku数量
  _addSkucount(oldItem, newItem) {
    oldItem.count += newItem.count
    if (oldItem.count >= Cart.SKU_MAXCOUNT) {
      item.count = Cart.SKU_MAXCOUNT
    }
  }

  // 计算选中的sku的总价格
  /*
  拿到选中的数组 遍历数组，算出折扣价格和或者价格和
  */
  _calCheckedPrice() {
    const CheckedItems = this.getCheckedItems()
    if (CheckedItems.length === 0) {
      this.checkedCount = 0
      this.checkedPrice = 0
      return
    }
    this.checkedCount = 0
    this.checkedPrice = 0
    let partPrice = 0
    for (let Item of CheckedItems) {
      if (Item.sku.discount_price) {
        partPrice = accMultiply(Item.count, Item.sku.discount_price)
      } else {
        partPrice = accMultiply(Item.count, Item.sku.price)
      }
      this.checkedPrice = accAdd(this.checkedPrice, partPrice)
      this.checkedCount = accAdd(this.checkedCount, Item.count)
    }
    console.log(this.checkedCount, this.checkedPrice)
  }

  _refreshCartData() {
    wx.setStorageSync(Cart.STORAGEKEY, this._cartData)
  }
  _findEqualItemIndex(skuId) {
    const cartData = this._getCartData()
    return cartData.items.findIndex((item) => item.skuId === skuId)
  }

  //! 辅助方法

  // 获取选中的商品
  getCheckedItems() {
    const cartData = this._getCartData()
    const checkedItems = []
    cartData.items.forEach((item) => {
      if (item.checked) {
        checkedItems.push(item)
      }
    })
    return checkedItems
  }

  // 判断是否全选
  isAllChecked() {
    let allchecked = true
    const cartData = this._getCartData()
    for (let item of cartData.items) {
      if(item.checked === false){
        allchecked = false
        break
      }
    }
    return allchecked
  }

  // 全选操作(每次操作都要进行计算价格和刷新数据)
  checkALl(checked) {
    const cartData = this._getCartData()
    cartData.items.forEach((item) => {
      item.checked = checked
    })
    this._calCheckedPrice()
    this._refreshCartData()
  }

  // 选中单个元素 改变状态即可
  checkItem(skuId) {
    const oldItem = this._findEqualItem(skuId)
    oldItem.checked = !oldItem.checked
    this._calCheckedPrice()
    this._refreshCartData()
  }

  // 更新sku商品的数量
  replcaSkuCount(skuId, newCount) {
    // 判断极端情况 1.没有找到已存在的商品 2.商品数量小于1 3.商品的数量超过最大限制
    const oldItem = this._findEqualItem(skuId)
    if (oldItem) {
      console.error('异常情况，缓存中找不到该商品')
    }
    if (newCount < 1) {
      console.error('数量不能少于一件')
    }
    oldItem.count = newCount
    if (oldItem.count >= Cart.SKU_MAXCOUNT) {
      oldItem.count = Cart.SKU_MAXCOUNT
    }
    this._calCheckedPrice()
    this._refreshCartData()
  }

  // 判断购物车为空
  isEmpty() {
    const cartData = this._getCartData()
    return cartData.items.length === 0 ? true : false
  }

  // 判断是否售空
  static isSoldOut(item) {
    return item.sku.stock === 0
  }
  // 判断上架
  static isOnline(item) {
    return item.sku.online
  }
  // 本地获取购物车数据
  getLocalCartData() {
    return this._getCartData()
  }

  // 服务端获取购物车数据 先获取数据,再更新数据,再返回
  async getServerCartData() {
    let Ids = this.getSkuIds()
    const serverData = await Sku.getSkubySKuIds(Ids)
    const cartData = this._getCartData()
    if(!cartData.items.length){
      return null
    }
    this._refreshByServerData(serverData)
    this._calCheckedPrice()
    this._refreshByServerData()
    return this._getCartData()
  }
  // 更新原有的购物车数据
  _refreshByServerData(serverData){
    const cartData = this._getCartData()
    cartData.items.forEach(item=>{
      this._setLatestCartItem(item,serverData)
    })
  }
  _setLatestCartItem(item,serverData){
    // 更新单个数据的sku
    serverData.forEach(sku=>{
      if(sku.id === item.skuId){
        item.sku = sku
      }
    })
  }

 
  // 获取购物车skuId组成的数组
  getSkuIds(){
    const cartData = this._getCartData()
    if(!cartData.items.length){
      return []
    }
    return cartData.items.map(item=>item.skuId)
  }

  // 获取购物车数量
  getCartSkuNums(){
    const cartData = this._getCartData()
    return cartData.items.length
  }

  // 获取选中的商品的skuIds
  getCheckedSkuIds() {
    const cartData = this._getCartData()
    if (cartData.items.length == 0) {
        return []
    }
    const skuId = []
    cartData.items.forEach(item => {
        if (item.checked) {
            skuId.push(item.sku.id)
        }
    })
    return skuId
}
// 通过skuId获取购物车该商品数量
getSkuCountBySkuId(skuId) {
    const cartData = this._getCartData()
    const item = cartData.items.find(item => item.skuId === skuId)
    if (!item) {
        console.error('在订单里寻找CartItem时不应当出现找不到的情况')
    }
    return item.count
}
}

export{
  Cart
}

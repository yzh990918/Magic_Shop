class cartItem{
 
  checked = true
  skuId = null
  sku =null
  count = 0
  constructor(sku,count){
    this.skuId = sku.id
    this.sku = sku
    this.count = count
  }
}
export{
  cartItem
}

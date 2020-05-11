//app.js
import { Cart } from './model/cart'
App({
  onLaunch() {
    const cart = new Cart()
    if (!cart.isEmpty()) {
      wx.showTabBarRedDot({
        index: 2,
      })
    }
  },
})

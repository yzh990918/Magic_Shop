//app.js
import { Cart } from './model/cart'
import { Token } from './model/token'
App({
  onLaunch() {
    const token = new Token()
    token.verify()
    const cart = new Cart()
    if (!cart.isEmpty()) {
      wx.showTabBarRedDot({
        index: 2,
      })
    }
  },
})

import Vue from 'vue'
import store from './store/index'
import App from './App'
// import MpvueRouterPatch from 'mpvue-router-patch'
import '../static/weui/weui.css'

Vue.config.productionTip = false
// Vue.use(MpvueRouterPatch)
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/logs/main',
      'pages/form/main',
      'pages/card/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0094b8',
      navigationBarTitleText: 'Bruce的文字识别Demo',
      navigationBarTextStyle: 'white'
    }/* ,
    tabBar: {
      color: '#000000',
      selectedColor: '#0094b8',
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/form/index',
        text: '表格识别',
        iconPath: 'static/assets/form.png',
        selectedIconPath: 'static/assets/form_active.png'
      }, {
        pagePath: 'pages/card/index',
        text: '名片识别',
        iconPath: 'static/assets/card.png',
        selectedIconPath: 'static/assets/card_active.png'
      }]
    } */
  }
}

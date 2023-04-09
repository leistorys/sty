import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from '@/store'
import '@/api/mock'
import 'default-passive-events'
import Cookie from 'js-cookie'

Vue.config.productionTip = false

Vue.use(ElementUI)

// Vue.use(Button)
// Vue.use(Select)

// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  // 如果token不存在，说明当前用户未登录，应该跳转至登陆页面
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') { // token存在，说明用户已登陆，此时跳转至首页
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')

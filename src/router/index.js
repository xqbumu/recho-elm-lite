/**
 * Created by zzmhot on 2017/3/23.
 *
 * 路由Map
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'

// import user from './user'
import charts from './charts'
import table from './table'

Vue.use(VueRouter)

// 使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [
  {
    path: '/home',
    name: 'home',
    components: {
      default: require('pages/home'),
      menuView: require('components/leftSlide')
    },
    meta: { title: '主页', auth: true }
  },
  {
    path: '/user/login',
    name: 'login',
    components: {
      fullView: require('pages/user/login')
    }
  },
  ...charts,
  ...table,
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '*',
    name: 'notPage',
    components: {
      fullView: require('pages/error/404')
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash', // default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

// 全局路由配置
// 路由开始之前的操作
router.beforeEach((to, from, next) => {
  console.log(to)
  let toName = to.name
  // let fromName = from.name
  let isLogin = store.state.user_login
  if (isLogin && toName === 'login') {
    router.replace({path: '/'})
  }
  if (to.matched.some(record => record.meta.auth)) {
    if (!isLogin) {
      router.replace({name: 'login'})
    } else {
      next()
    }
  } else {
    next()
  }
})

// 路由完成之后的操作
router.afterEach(route => {

})

export default router

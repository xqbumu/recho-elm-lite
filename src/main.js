/**
 * Created by zzmhot on 2017/3/23.
 *
 * 主程序入口
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:19
 * @Copyright(©) 2017 by zzmhot.
 *
 */

// 导入样式
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/scss/font-awesome.scss'
// 导入Vue框架
import Vue from 'vue'
// 导入组件
import router from './router'
import VueResource from 'vue-resource'
import NProgress from 'vue-nprogress'
// 导入状态管理器
import store from 'store'
// 导入自定义插件
import Plugins from 'plugins'
// 导入接口地址
import {portUser, portCode} from 'common/port_uri'
// 导入主视图文件
import App from './App'

const dispatch = store.dispatch

// 使用自定义插件
Vue.use(Plugins)

// 使用element-ui
Vue.use(ElementUI)

// 使用vue-resource
Vue.use(VueResource)

// 使用vue-nprogress
Vue.use(NProgress, {
  latencyThreshold: 100, // Number of ms before progressbar starts showing, default: 100,
  router: true, // Show progressbar when navigating routes, default: true
  http: false // Show progressbar when doing Vue.http, default: true
})

// vue-resource 请求发送前的处理逻辑
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    let _code = response.body.code
    let _msg = response.body.msg
    if (_code === portCode.unlogin) {
      dispatch('set_user_info', {
        user: null,
        is_login: false
      })
      router.replace({name: 'login'})
      Vue.prototype.$message({
        message: _msg,
        type: 'warning'
      })
      return false
    }
    if (_code === portCode.error) {
      Vue.prototype.$message({
        message: _msg,
        type: 'error'
      })
      return false
    }
    if (_code === portCode.success) {
      return response
    }
  })
})

Vue.http.options.emulateJSON = true

Vue.config.productionTip = false

// 为避免登录延迟，先获取用户信息
Vue.http.get(portUser.info)
  .then(({data: {data, code, msg}}) => {
    if (code === portCode.success) {
      dispatch('set_user_info', {
        user: data,
        is_login: true
      })
    }
    new Vue({
      router,
      store,
      nprogress: new NProgress({parent: '.nprogress-container'}),
      ...App
    }).$mount('mainbody')
  })
  .catch(({status, statusText}) => {
    this.$message({
      message: '操作失败！错误原因 ' + statusText + ' 状态码 ' + status,
      type: 'error'
    })
  })


import login from 'pages/user/login'
import emptyView from 'pages/common/empty-view'

const prefix = 'user'

const router = [
  {
    path: '/' + prefix,
    name: prefix + 'Index',
    redirect: '/' + prefix + '/login',
    components: { default: emptyView },
    meta: { title: '用户页面', auth: true },
    children: [
      {
        path: 'login',
        name: prefix + 'Login',
        components: { default: login },
        meta: { title: '登录' }
      }
    ]
  }
]

export default router

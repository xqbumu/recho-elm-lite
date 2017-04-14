import bar from 'pages/charts/bar'
import emptyView from 'pages/common/empty-view'
import leftSlide from 'components/leftSlide'

const prefix = 'charts'

const router = [
  {
    path: '/' + prefix,
    name: prefix + 'Index',
    redirect: '/' + prefix + '/bar',
    components: { default: emptyView, menuView: leftSlide },
    meta: { title: '基本图表', auth: true },
    children: [
      {
        path: 'bar',
        name: prefix + 'Bar',
        components: { default: bar },
        meta: { title: '柱状图表' }
      }
    ]
  }
]

export default router

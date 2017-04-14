import base from 'pages/table/base'
import sort from 'pages/table/sort'
import save from 'pages/table/save'
import emptyView from 'pages/common/empty-view'
import leftSlide from 'components/leftSlide'

const prefix = 'table'

const router = [
  {
    path: '/' + prefix,
    name: prefix + 'Index',
    redirect: '/' + prefix + '/base',
    components: { default: emptyView, menuView: leftSlide },
    meta: { title: '基本表格', auth: true },
    children: [
      {
        path: 'base',
        name: prefix + 'Base',
        components: { default: base },
        meta: { title: '排序表格' }
      },
      {
        path: 'sort',
        name: prefix + 'Sort',
        components: { default: sort },
        meta: { title: '排序表格' }
      }, {
        path: 'update/:id',
        name: prefix + 'Update',
        components: { default: save },
        meta: { title: '数据修改' }
      }, {
        path: 'add',
        name: prefix + 'Add',
        components: { default: save },
        meta: { title: '添加数据' }
      }
    ]
  }
]

export default router

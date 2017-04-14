/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 10:55
 * @Copyright(©) 2017 by zzmhot.
 *
 */

var Mock = require('mockjs')
var portCode = require('../../src/common/port_uri').portCode

var userInfo = {
  'name': '@cname',
  'avatar': 'https://avatars0.githubusercontent.com/u/16893554?v=3&s=240',
  'age|20-25': 20,
  'desc': '@csentence()'
}

var isLogin = Math.random() >= 0.5

exports.login = Mock.mock({
  code: portCode.success,
  msg: '登录成功',
  data: userInfo
})
exports.logout = Mock.mock({
  code: portCode.success,
  msg: '退出成功'
})

exports.info = Mock.mock({
  code: isLogin ? portCode.success : portCode.unlogin,
  msg: isLogin ? '获取成功' : '您还没有登录，请登录！',
  data: isLogin ? userInfo : null,
  isLogin: isLogin
})

import Router from 'koa-router'
import Redis from 'koa-redis'
// import nodeMail from 'nodeMailer'
import User from '../dbs/models/users'
// import Email from '../dbs/config'
// import Passport from './utils/passport'
import axios from './utils/axios'

const router = new Router({
  // 设置一个文件内的全局路劲
  prefix: '/users'
})

const Store = new Redis().client

router.post('/signup', async ctx => {
  const { username, password, email, code } = ctx.request.body

  if (code) {
    const saveCode = await Store.hget(`nodeemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodeemail:${username}`, 'expire')

    if (saveCode === code) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期， 请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }

  const user = await User.find({
    username
  })

  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户名已注册'
    }

    return false
  }

  // 将数据插入表中
  const nuser = await User.create({
    username,
    password,
    email
  })

  if (nuser) {
    // 手动调用接口
    const res = await axios.post('/users/signin', {
      username,
      password
    })

    // 判断返回值
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

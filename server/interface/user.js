const Router = require('koa-router')
const Redis = require('koa-redis')
const nodeMailer = require('nodeMailer')
const User = require('../dbs/models/users')
const Email = require('../dbs/config')
const Passport = require('./utils/passport')
const axios = require('./utils/axios')

const router = new Router({
  // 设置一个文件内的全局路劲
  prefix: '/users'
})

const Store = new Redis().client

// 注册接口
router.post('/signup', async ctx => {
  const { username, password, email, code } = ctx.request.body

  if (code) {
    // 从redis中获取存储的验证码和有效时间
    const saveCode = await Store.hget(`nodeemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodeemail:${username}`, 'expire')

    // 判断验证码是否正确
    if (saveCode === code) {
      // 判断验证码是否过期，当前时间减去设置的时间大于零是表示未过期
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

// 登录接口
router.post('/signin', (ctx, next) => {
  // 调用passport接口进行数据的校验，需要定义为立即执行函数
  return Passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else if (user) {
      ctx.body = {
        code: 0,
        msg: '登录成功',
        user
      }

      return ctx.login(user)
    } else {
      ctx.body = {
        code: 1,
        msg: info
      }
    }
  })(ctx, next)
})

// 验证码接口
router.post('/verify', async (ctx, next) => {
  // no-console
  console.log(ctx)
  const username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁'
    }

    return false
  }

  // 创建一个用于发送邮件的对象，设置邮件服务的地址、端口号、发送方的邮箱和密码
  const transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })

  // 这里是要发送的验证码、验证码的有效期、接受方的邮箱和用户名
  const ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  // 配置发送邮件内容 from: 发送方邮箱地址、to：接受方邮箱地址、subject: 邮件主题、html: 邮件内容
  const mailOption = {
    from: `认证邮件 <${Email.smtp.user}>`,
    to: ko.email,
    subject: '高仿美团的注册码',
    html: `亲爱的${ctx.request.body.username}:
    欢迎注册我们的网站，您的验证码是
    ${ko.code}
    `
  }

  // 发送邮件
  await transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      return window.console.log('error')
    } else {
      // 发撒成功后、将内容存储redis中
      Store.hmset(
        `nodemail: ${ko.user}`,
        'code',
        ko.code,
        'expire',
        ko.expire,
        'email',
        ko.email
      )

      ctx.body = {
        code: 0,
        msg: '验证码已发送'
      }
    }
  })
})

// 退出
router.get('/exit', async (ctx, next) => {
  await ctx.logut()
  // 检查当前时候为登录状态
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户名
router.get('/getUser', ctx => {
  if (ctx.isAuthenticated()) {
    // 从session中获取用户信息
    const { username, email } = ctx.session.password.user

    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

module.exports = router

import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import User from '../../dbs/models/users'

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const where = {
      username
    }
    const result = await User.findOne(where)

    if (result != null) {
      if (result.password === password) {
        return done(null, result)
      } else {
        return done(null, false, '密码错误')
      }
    } else {
      return done(null, false, '用户不存在')
    }
  })
)

// 序列化 将用户信息存入session中
passport.serializeUser((user, done) => {
  done(null, user)
})

// 反序列化 如果session中有user数据，则进行判断
passport.deserializeUser((user, done) => {
  return done(null, user)
})

export default passport

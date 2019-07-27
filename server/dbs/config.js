module.exports = {
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  smtp: {
    get host() {
      // 使用腾讯的邮箱服务
      return 'smtp.qq.com'
    },
    get user() {
      return 'cjiao100@foxmail.com'
    },
    get pass() {
      return 'ddbwwwehamaqegib'
    },
    get code() {
      return () => {
        // 生成一个4位的随机数
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase()
      }
    },
    get expire() {
      return () => {
        // 验证码有效时间为一分钟，即设置当前时间+1分钟，当验证时直接比较即可
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}

<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <span class="login">
          <em class="bold">已有美团账号</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="cpwd">
          <el-button type="primary" @click="register">
            同意一下协议并注册
          </el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            href="http://www.meituan.com/about/terms"
            class="f1"
            target="_blank"
          >
            《美团网用户协议》
          </a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
// 用于加密的包
import CryptoJS from 'crypto-js'
// import qs from 'qs'
export default {
  layout: 'blank',
  data() {
    const validator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确定密码'))
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error('两次输入密码不一样'))
      } else {
        callback()
      }
    }
    return {
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        cpwd: [
          {
            required: true,
            message: '请确认密码',
            trigger: 'blur'
          },
          {
            validator,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    sendMsg() {
      let namePass, emailPass
      if (this.timerid) {
        return false
      }
      // 判断用户输入是否通过校验
      this.$refs.ruleForm.validateField('name', valid => {
        namePass = valid
      })

      this.statusMsg = ''
      if (namePass) {
        return false
      }
      this.$refs.ruleForm.validateField('email', valid => {
        emailPass = valid
      })

      if (!namePass && !emailPass) {
        this.$axios
          .post('/users/verify', {
            username: encodeURIComponent(this.ruleForm.name),
            email: this.ruleForm.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60
              this.timerid = setInterval(() => {
                this.statusMsg = `验证码已发送，剩余${count--}秒`
                if (count === 0) {
                  clearInterval(this.timerid)
                  this.statusMsg = ''
                }
              }, 1000)
            } else {
              this.statusMsg = data.msg
            }
          })
      }
    },
    register() {
      // 检查是否通过检验，通过时 valid 为 true
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          window.console.log(this.ruleForm)
          this.$axios
            .post('/users/signup', {
              username: encodeURIComponent(this.ruleForm.name),
              password: CryptoJS.MD5(this.ruleForm.pwd).toString(),
              email: this.ruleForm.email,
              code: this.ruleForm.code
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = '/login'
                } else {
                  window.console.log(data.msg)
                  this.error = data.msg
                }
              } else {
                window.console.log(data.msg)
                this.error = `服务器出错，错误码：${status}`
              }
              // 一段时间后自动清空错误信息，以免造成误解
              setTimeout(() => {
                this.error = ''
              }, 1500)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/register/index.scss';
</style>

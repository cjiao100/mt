<template>
  <div class="page-login">
    <article class="login-header">
      <div class="logo"></div>
    </article>
    <section class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          alt="美团网"
        />
      </div>
      <div class="form">
        <h4 class="tip">{{ error }}</h4>
        <p><span>账号登录</span></p>
        <el-input v-model="username" prefix-icon="profile" />
        <el-input v-model="password" prefix-icon="password" />
        <div class="foot">
          <el-checkbox v-model="checked">7天自动登录</el-checkbox>
          <b>忘记密码？</b>
        </div>
        <el-button class="btn-login" type="success" size="mini" @click="login">
          登录
        </el-button>
      </div>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  layout: 'blank',
  data() {
    return {
      error: '',
      username: '',
      password: '',
      checked: ''
    }
  },
  methods: {
    login() {
      this.$axios
        .post('/users/signin', {
          username: encodeURIComponent(this.username),
          password: CryptoJS.MD5(this.password).toString()
        })
        .then(({ status, data }) => {
          window.console.log(status, data)
        })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/login/index.scss';
</style>

<template>
  <div class="m-life">
    <el-row>
      <el-col :span="14">
        <slide />
      </el-col>
      <el-col :span="4">
        <div class="m-life-pic"></div>
      </el-col>
      <el-col :span="6">
        <div class="m-life-login">
          <template v-if="isLogin"></template>
          <template v-else>
            <h4>
              <img
                src="https://s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg"
                alt="请登录"
              />
              <p class="m-life-login-name">Hi！你好</p>
            </h4>
            <el-button round>注册</el-button>
            <el-button round>立即登录</el-button>
          </template>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="m-life-hotel"></div>
      </el-col>
      <el-col :span="7">
        <div class="m-life-music"></div>
      </el-col>
      <el-col :span="4">
        <div class="m-life-coop"></div>
      </el-col>
      <el-col :span="6">
        <div class="m-life-downapp">
          <img
            src="https://s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png"
            alt="美团APP"
          />
          <p>美团APP手机版</p>
          <h4><span>1元起</span>吃喝玩乐</h4>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Slide from './slide'
export default {
  components: {
    Slide
  },
  data() {
    return {
      isLogin: false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/index/life.scss';
</style>

<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img
          src="https://s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团"
        />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button class="el-button el-button--primary">
            <i class="el-icon-search"></i>
          </button>
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in hotPlace" :key="index">{{ item }}</dd>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item, index) in searchList" :key="index">{{ item }}</dd>
          </dl>
        </div>
        <p class="suggest">
          <a
            href="https://www.meituan.com/s/%E5%8C%97%E4%BA%AC%E5%8A%A8%E7%89%A9%E5%9B%AD"
          >
            北京动物园
          </a>
          <a
            href="https://www.meituan.com/s/%E5%8D%81%E6%B8%A1%E8%B9%A6%E6%9E%81%E4%BF%B1%E4%B9%90%E9%83%A8"
          >
            十渡蹦极俱乐部
          </a>
          <a
            href="https://www.meituan.com/s/%E6%AC%A2%E4%B9%90%E6%B0%B4%E9%AD%94%E6%96%B9%E6%B0%B4%E4%B8%8A%E4%B9%90%E5%9B%AD"
          >
            欢乐水魔方水上乐园
          </a>
          <a
            href="https://www.meituan.com/s/%E5%8C%97%E4%BA%AC%E6%AC%A2%E4%B9%90%E8%B0%B7"
          >
            北京欢乐谷
          </a>
          <a
            href="https://www.meituan.com/s/%E6%95%85%E5%AE%AB%E5%8D%9A%E7%89%A9%E9%99%A2%20%E6%95%85%E5%AE%AB"
          >
            故宫博物院 故宫
          </a>
          <a
            href="https://www.meituan.com/s/%E5%85%AB%E8%BE%BE%E5%B2%AD%E9%95%BF%E5%9F%8E"
          >
            八达岭长城
          </a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/t" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/t" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/t" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/t" class="apartment">民宿／公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/t" class="business">商家入驻</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/t" class="takeout">美团公益</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="4" class="right">
        <ul class="security">
          <li>
            <i class="refund"></i>
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"></i>
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"></i>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否聚焦
      isFocus: false,
      // 是否是搜索状态，通过判断用户是否输入来实现
      search: '',
      hotPlace: [
        '北京动物园',
        '十渡蹦极俱乐部',
        '欢乐水魔方水上乐园',
        '北京欢乐谷'
      ],
      searchList: [
        '北京动物园',
        '十渡蹦极俱乐部',
        '欢乐水魔方水上乐园',
        '北京欢乐谷'
      ]
    }
  },
  computed: {
    isHotPlace() {
      return this.isFocus && !this.search
    },
    isSearchList() {
      return this.isFocus && this.search
    }
  },
  methods: {
    focus() {
      this.isFocus = true
    },
    blur() {
      // 处理点击热门推荐时，推荐块提前收起导致无法触发点击事件
      setTimeout(() => {
        this.isFocus = false
      }, 200)
    },
    input() {
      window.console.log(this.search)
    }
  }
}
</script>

<style lang="scss"></style>

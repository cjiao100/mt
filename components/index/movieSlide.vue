<template>
  <el-carousel indicator-position="outside" height="330px" :autoplay="false">
    <el-carousel-item v-for="slide in count" :key="slide">
      <div
        v-for="(item, index) in movie(slide)"
        :key="index"
        class="slide-item"
      >
        <img :src="item.img" :alt="item.title" class="movie-img" />
        <img :src="item.icon || ''" class="icon-img" />
        <div class="slide-item-info">
          <div class="item-star">
            <template v-if="item.isStar">
              观众评
              <span>{{ item.number }}</span>
            </template>
            <template v-else>
              <span>{{ item.number }}</span>
              人想看
            </template>
          </div>
          <p class="movie-name">{{ item.title }}</p>
          <span class="movie-buy">{{ item.info }}</span>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: {
    kind: {
      type: String,
      default: 'hot'
    }
  },
  data() {
    return {
      hotMovieList: [
        {
          title: '银河补习班',
          info: '购票',
          isStar: true,
          number: 9.5,
          img:
            '//p1.meituan.net/movie/bb9f75599bfbb2c4cf77ad9abae1b95c1376927.jpg@214w_297h_1e_1c',
          icon: '//s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax.png'
        },
        {
          title: '跳舞吧！大象',
          info: '预售',
          isStar: false,
          number: 31823,
          img:
            '//p1.meituan.net/movie/1890a564c74d8865750bb1b19b9fc72a1935745.jpg@214w_297h_1e_1c'
        },
        {
          title: '银河补习班',
          info: '购票',
          isStar: true,
          number: 9.5,
          img:
            '//p1.meituan.net/movie/bb9f75599bfbb2c4cf77ad9abae1b95c1376927.jpg@214w_297h_1e_1c',
          icon: '//s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax.png'
        },
        {
          title: '银河补习班',
          info: '购票',
          isStar: true,
          number: 9.5,
          img:
            '//p1.meituan.net/movie/bb9f75599bfbb2c4cf77ad9abae1b95c1376927.jpg@214w_297h_1e_1c',
          icon: '//s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax.png'
        },
        {
          title: '银河补习班',
          info: '购票',
          isStar: true,
          number: 9.5,
          img:
            '//p1.meituan.net/movie/bb9f75599bfbb2c4cf77ad9abae1b95c1376927.jpg@214w_297h_1e_1c',
          icon: '//s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax.png'
        },
        {
          title: '跳舞吧！大象',
          info: '预售',
          isStar: false,
          number: 31823,
          img:
            '//p1.meituan.net/movie/1890a564c74d8865750bb1b19b9fc72a1935745.jpg@214w_297h_1e_1c'
        },
        {
          title: '跳舞吧！大象',
          info: '预售',
          isStar: false,
          number: 31823,
          img:
            '//p1.meituan.net/movie/1890a564c74d8865750bb1b19b9fc72a1935745.jpg@214w_297h_1e_1c'
        },
        {
          title: '跳舞吧！大象',
          info: '预售',
          isStar: false,
          number: 31823,
          img:
            '//p1.meituan.net/movie/1890a564c74d8865750bb1b19b9fc72a1935745.jpg@214w_297h_1e_1c'
        }
      ],
      soonMovieList: [
        {
          title: '跳舞吧！大象',
          info: '预售',
          isStar: false,
          number: 31823,
          img:
            '//p1.meituan.net/movie/1890a564c74d8865750bb1b19b9fc72a1935745.jpg@214w_297h_1e_1c'
        }
      ]
    }
  },
  computed: {
    count() {
      return Math.ceil(this.movieList.length / 5)
    },
    movieList() {
      return this.kind === 'hot' ? this.hotMovieList : this.soonMovieList
    }
  },
  methods: {
    movie(count) {
      count = (count - 1) * 5
      return this.movieList.slice(count, count + 5)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel {
  margin-bottom: 40px;
}
.el-carousel__item {
  display: flex;
  padding: 20px;
  padding-bottom: 0;
  background-color: #fff;
  border-width: 0 1px 1px;
  border-color: #e4e4e4;
  border-style: solid;
  overflow: hidden;
}
.slide-item {
  width: 214px;
  height: 297px;
  margin-right: 20px;
  position: relative;

  .movie-img {
    border-radius: 5px;
  }

  .icon-img {
    height: 20px;
    position: absolute;
    top: 10px;
    left: -10px;
  }

  .slide-item-info {
    position: absolute;
    bottom: 0;
    color: #fff;
    background: linear-gradient(
      to top,
      rgba(29, 45, 55, 0.8),
      rgba(0, 0, 0, 0)
    );
    width: 100%;
    height: 100px;
    font-size: 16px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .item-star {
      margin-top: 50px;
      font-size: 12px;
      font-weight: bold;
      padding-left: 10px;

      span {
        color: #fd972b;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .movie-name {
      width: 60%;
      word-spacing: normal;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-left: 10px;
    }

    .movie-buy {
      position: absolute;
      right: 10px;
      bottom: 10px;
      background-color: #ff4a4a;
      padding: 5px 8px;
      border-radius: 20px;
    }
  }
}
</style>

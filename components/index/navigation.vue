<template>
  <dl class="nav">
    <el-row>
      <template v-for="(item, idx) in navList">
        <el-col :span="4" class="nav-title" :key="idx">
          <dt>{{ item.name }}</dt>
        </el-col>
        <el-col :span="20" class="nav-content" :key="idx">
          <dd
            v-for="(child, index) in item.childList"
            :key="index"
            class="nav-content-item"
          >
            {{ child }}
          </dd>
        </el-col>
      </template>
    </el-row>
  </dl>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          type: 'city',
          name: '热门城市',
          childList: [
            '青岛',
            '石家庄',
            '福州',
            '东莞',
            '成都',
            '郑州',
            '广州',
            '太原',
            '昆明',
            '宁波',
            '重庆',
            '长春',
            '杭州',
            '上海',
            '南京',
            '深圳',
            '济南',
            '苏州',
            '南宁',
            '武汉'
          ]
        },
        {
          type: 'sort',
          name: '热门分类',
          childList: [
            '酒店',
            '美食',
            '休闲娱乐',
            '运动健身',
            '生活服务',
            '上门服务',
            '购物',
            '时尚购',
            '本地购物',
            '结婚',
            '摄影写真',
            '宴会',
            '丽人',
            '母婴亲子',
            '学习培训',
            '家装',
            '汽车服务',
            '医疗',
            '宠物'
          ]
        },
        {
          type: 'rim',
          name: '周边热门',
          childList: [
            '门头沟区酒店',
            '廊坊美食',
            '廊坊休闲娱乐',
            '廊坊运动健身',
            '廊坊生活服务',
            '廊坊上门服务',
            '大厂回族自治县购物',
            '大厂回族自治县时尚购',
            '大厂回族自治县本地购物',
            '大厂回族自治县结婚',
            '门头沟区摄影写真',
            '大厂回族自治县宴会',
            '门头沟区丽人',
            '大厂回族自治县母婴亲子',
            '大厂回族自治县学习培训',
            '门头沟区家装',
            '大厂回族自治县汽车服务',
            '大厂回族自治县医疗',
            '廊坊宠物'
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.nav {
  .nav-title {
    font-size: 14px;
    color: #222;
  }

  .nav-content {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

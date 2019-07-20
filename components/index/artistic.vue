<template>
  <div class="m-istyle">
    <div v-for="(sort, idx) in sorts" :key="idx">
      <dl :class="`line${idx + 1}`" @mouseover="over">
        <dt>{{ sort.title }}</dt>
        <dd
          v-for="(child, i) in sort.child"
          :key="i"
          :data-kind="child.type"
          :data-index="idx"
          :class="{ active: sort.kind === child.type }"
        >
          {{ child.title }}
        </dd>
      </dl>
      <ul v-if="sort.id !== 'movie'" class="ibody">
        <li
          v-for="(item, index) in currend(sort.id, sort.kind)"
          :key="index"
          :class="{ 'ceap-card': item.boolean }"
        >
          <el-card shadow="never">
            <img :src="item.img" :alt="item.title" />
            <ul class="cbody">
              <li class="title">{{ item.title }}</li>
              <li class="pos">
                <span>{{ item.pos }}</span>
              </li>
              <li v-if="item.boolean" class="tags-wrapper"></li>
              <li class="price">
                <em>{{ item.price }}</em>
                <span class="old-price">{{ item.oldPrice }}</span>
                <span class="bottom-right-info">{{ item.info }}</span>
              </li>
            </ul>
          </el-card>
        </li>
      </ul>
      <template v-else>
        <movie-slide :kind="sort.kind" />
      </template>
    </div>
  </div>
</template>

<script>
import movieSlide from '@/components/index/movieSlide'
export default {
  components: {
    movieSlide
  },
  data() {
    return {
      sorts: [
        {
          id: 'style',
          title: '有格调',
          kind: 'styleAll',
          child: [
            { type: 'styleAll', title: '全部' },
            { type: 'part', title: '约会聚餐' },
            { type: 'spa', title: '丽人SPA' },
            { type: 'movie', title: '电影演出' },
            { type: 'travel', title: '品质出游' }
          ]
        },
        {
          id: 'offer',
          title: '狠优惠',
          kind: 'offerAll',
          child: [
            { type: 'offerAll', title: '全部' },
            { type: 'food', title: '美食' },
            { type: 'lei', title: '休闲' }
          ]
        },
        {
          id: 'movie',
          title: '猫眼电影',
          kind: 'hot',
          child: [
            { type: 'hot', title: '正在热映' },
            { type: 'soon', title: '即将上映' }
          ]
        },
        {
          id: 'hotel',
          title: '推荐民宿',
          kind: 'tj',
          child: [
            { type: 'tj', title: '天津' },
            { type: 'jn', title: '济南' },
            { type: 'dl', title: '大连' },
            { type: 'ty', title: '太原' },
            { type: 'sjz', title: '石家庄' },
            { type: 'qht', title: '秦皇岛' },
            { type: 'hhht', title: '呼和浩特' },
            { type: 'wf', title: '潍坊' },
            { type: 'ts', title: '唐山' },
            { type: 'ta', title: '泰安' }
          ]
        }
      ],
      lists: {
        style: {
          styleAll: [
            {
              img:
                '//p0.meituan.net/msmerchant/808d531552463e68d8cbc51032dd3269109403.jpg@368w_208h_1e_1c',
              title: '中央电视塔空中观景旋转餐厅',
              pos: '午餐+观光',
              price: 248,
              oldPrice: '门市价￥268',
              info: '航天桥'
            },
            {
              img:
                '//p1.meituan.net/msmerchant/1c448ca93f236d37fede7cc7029a19bd91074.jpg@368w_208h_1e_1c',
              title: '峨嵋酒家（王府井店）',
              pos: '店内推荐三人B餐',
              price: 203,
              oldPrice: '门市价￥231',
              info: '王府井/东单'
            },
            {
              img:
                '//p0.meituan.net/msmerchant/1a8aaac8cfcf76fae83c2ecd6405bd4c1457315.jpg@368w_208h_1e_1c',
              title: '北京饭店阳光咖啡厅',
              pos: '特价自助晚餐',
              price: 238,
              oldPrice: '门市价￥298',
              info: '王府井/东单'
            }
          ],
          part: [
            {
              img:
                '//p1.meituan.net/deal/de1c18d7b91c3c3828e51175274e5070385142.jpg@368w_208h_1e_1c',
              title: '老根山庄（北京总店）',
              pos: '特色六人餐，提供免费WiFi',
              price: 366,
              oldPrice: '门市价¥483',
              info: '王府井/前门'
            },
            {
              img:
                '//p0.meituan.net/msmerchant/5103240e4d28028981c5b3188328e83d982425.jpg@368w_208h_1e_1c',
              title: '羲和小馆（王府中環店）',
              pos: '张氏狮子头1位，提供免费WiFi',
              price: 9.9,
              oldPrice: '门市价¥25',
              info: '王府井/东单'
            },
            {
              img:
                '//p1.meituan.net/msmerchant/88086b1ff4213faced665cce03c31af11638516.jpg@368w_208h_1e_1c',
              title: '奥华餐厅·老张记',
              pos: '6-8人套餐，提供免费WiFi',
              price: 288,
              oldPrice: '门市价¥373',
              info: '崇文门'
            }
          ],
          spa: [],
          movie: [],
          travel: []
        },
        offer: {
          offerAll: [
            {
              img:
                '//p1.meituan.net/dpmerchantalbum/c8d1eb36f135d6e7f27ab48e3a068286396696.jpg@213w_120h_1e_1c',
              title: '爱之裳鲜花（望京店）',
              pos: '[望京]【精品单枝】可随意定制520/365/999等10枝起订',
              price: 25,
              oldPrice: '门市价¥9999999',
              info: '已售570',
              boolean: true
            },
            {
              img:
                '//p0.meituan.net/deal/0226a49df1da3969745bc78e5c24648e1286236.jpg@0_474_5033_3051a%7C388h_640w_2e_90Q%7C213w_120h_1e_1c',
              title: 'Rodeo西部牛仔主题餐吧',
              pos: "[团结湖/朝阳公园]一款特制鸡尾酒畅饮Lady's Night1份",
              price: 1,
              oldPrice: '美团价¥234',
              info: '已售114',
              boolean: true
            }
          ]
        },
        hotel: {
          tj: [
            {
              img:
                '//img.meituan.net/phoenix/616a6d4ce456f28e8cd44cc41de2344a164798.jpg@740w_416h_1e_1c',
              title:
                '空调凉爽！朴宿.芙蓉居 浪漫温馨欧式精装修纱幔一居室，洪楼山大旁，大明湖趵突泉宽厚里芙蓉街3公里',
              pos: '整套1居室·可住2人 | 洪家楼',
              price: 128
            }
          ]
        }
      }
    }
  },
  methods: {
    over(e) {
      const data = e.target.dataset
      const index = data.index

      if (!index) return

      const kind = data.kind ? data.kind : this.sorts[index].kind

      this.sorts[index].kind = kind
    },
    currend(id, kind) {
      return this.lists[id][kind] || ''
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/index/artistic.scss';
</style>

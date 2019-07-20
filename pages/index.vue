<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu />
      </el-col>
      <el-col :span="19">
        <eleft />
      </el-col>
    </el-row>
    <el-row :span="24">
      <eartidtic />
    </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/index/menu'
import Eleft from '@/components/index/life'
import Eartidtic from '@/components/index/artistic'
export default {
  components: {
    Emenu,
    Eleft,
    Eartidtic
  }
}
</script>

<style lang="scss">
@import '@/assets/css/index/index.scss';
</style>

<template>
  <div>
    <el-row>
      <el-col :span="14">
        <slide />
      </el-col>
      <el-col :span="4">2</el-col>
      <el-col :span="6">3</el-col>
    </el-row>
  </div>
</template>

<script>
import Slide from './slide'
export default {
  components: {
    Slide
  }
}
</script>

<style></style>


<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
  <hr>

  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
  <hr>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main1111</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
  <el-button>测试</el-button>
  111
</template>
<script setup lang="ts">
  import ElButton from '/@/components/button/elbutton.vue'
</script>
<style lang="scss" scoped>
body {
  width: 1000px;
  margin: 10px auto;
}

/* .el-header,
.el-footer {
  ..设置额外的css样式
} */
</style>
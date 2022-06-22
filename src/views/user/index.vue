<template>
  <div>113333</div>
  <button @click="handleHome">跳转首页</button>
</template>

<script lang="ts" setup>
import { useGo } from '/@/hooks/web/usePage';
import bus from '/@/common/vue.bus'

bus.$on('test', () => {
  console.log('11111 :>> ', 11111);
})

bus.getList()
const go = useGo()

const handleHome = () => {
  go({
    path: '/'
  })
}

</script>

<style lang="less" scoped>
</style>
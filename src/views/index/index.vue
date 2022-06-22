<template>
  <div>1111</div>
  <button @click="handleTest">跳转用户</button>
  <button @click="handleBus">触发bus</button>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from "vue"
import { useGo } from "/@/hooks/web/usePage"
import bus from '/@/common/vue.bus'

const test = () => {
  console.log('11113333 :>> ', 11113333);
}

onMounted(() => {
  console.log('1111 :>> ', 1111);
  bus.$on('test', test)
})


// onBeforeUnmount(() => {
//   bus.$on('test', test)
//   console.log(bus.getList());
// })

bus.getList()
const go = useGo()

const handleTest = () => {
  go('/user')
}

const handleBus = () => {
  bus.$off('test', test)
  bus.getList()
}
</script>

<style lang="less" scoped>
</style>
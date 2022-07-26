<template>
  <div>113333</div>
  <a href="">1111</a>
  <button @click="handleHome">跳转首页</button>
</template>

<script lang="ts" setup>
import { useGo } from '/@/hooks/web/usePage'
import { useUserStoreWithOut } from '/@/store/modules/user'

const userStore = useUserStoreWithOut()

console.log('userStore.getToekn :>> ', userStore.getToken, userStore)

userStore.$patch({
  lastUpdateTime: 111
})

console.log('userStore.getL :>> ', userStore.getLastUpdateTime)


const go = useGo()

const handleHome = () => {
  go({
    path: '/'
  })
}

</script>

<style lang="less" scoped>
</style>
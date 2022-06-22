<template>
  layout
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useUserStoreWithOut } from "/@/store/modules/user"

const userStore = useUserStoreWithOut()

console.log('11111', userStore.getToekn)
</script>

<style lang="less" scoped>
</style>
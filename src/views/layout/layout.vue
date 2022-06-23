<template>
  <div class="page-wrap">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { useUserStoreWithOut } from "/@/store/modules/user"

const userStore = useUserStoreWithOut()

</script>

<style lang="less" scoped>
.page-wrap {
  width: 100%;
  height: 100%;

}
</style>
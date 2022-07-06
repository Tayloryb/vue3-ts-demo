<template>
  <div class="page-wrap flex flex-column">
    <div class="header flex-shink-0">
      <LayoutHeader></LayoutHeader>
    </div>
    <div class="content flex-1 flex">
      <LayoutMenu></LayoutMenu>
      <LayoutContent></LayoutContent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStoreWithOut } from '/@/store/modules/user'
import LayoutHeader from './LayoutHeader.vue';
import LayoutMenu from './LayoutMenu.vue';
import LayoutContent from './LayoutContent.vue';

const userStore = useUserStoreWithOut()

</script>

<style lang="less" scoped>
.page-wrap {
  width: 100%;
  height: 100%;
}
</style>
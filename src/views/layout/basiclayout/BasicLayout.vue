<template>
  <div class="page-wrap flex flex-column el-container is-vertical">
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
import LayoutHeader from './LayoutHeader.vue'
import LayoutMenu from './LayoutMenu.vue'
import LayoutContent from './LayoutContent.vue'

const userStore = useUserStoreWithOut()

console.log('userStore :>> ', userStore)


</script>

<style lang="scss" scoped>
.page-wrap {
  width: 100%;
  height: 100%;
}

@include b(container) {
  // display: flex;
  // flex-direction: row;
  // flex: 1;
  // flex-basis: auto;
  // box-sizing: border-box;
  // min-width: 0;
  background-color: #f00;

  @include is(vertical) {
    // flex-direction: column;
    background-color: $info;
  }
}
</style>
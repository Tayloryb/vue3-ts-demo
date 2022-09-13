
<template>
  <aside class="el-aside" :style="{ width }">
    <slot />
  </aside>
</template>

<script lang="ts">
export default {
  name: 'ElAside'
}
</script>
<script setup lang="ts">
import { withDefaults } from 'vue'

interface Props {
  width?: string
}
withDefaults(defineProps<Props>(), {
  width: '200px'
})

</script>

<style lang="scss">
@import '/@/assets/css/components/container/index.scss';

@include b(aside) {
  padding: $--aside-padding;
  box-sizing: border-box;
  background-color: $--aside-bgc;
  flex-shrink: 0;
}
</style>
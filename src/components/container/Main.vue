
<template>
  <section class="el-main">
    <slot />
  </section>
</template>

<script lang="ts">
export default {
  name: 'ElMain'
}
</script>
<script setup lang="ts">
import { withDefaults } from 'vue'

interface Props {
  height?: string
}
withDefaults(defineProps<Props>(), {
  height: '60px'
})

</script>

<style lang="scss">
@import '/@/assets/css/components/container/index.scss';

@include b(main) {
  padding: $--main-padding;
  box-sizing: border-box;
  width: 100%;
  background-color: $--main-bgc;
  flex-shrink: 0;
}
</style>
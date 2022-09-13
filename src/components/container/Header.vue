
<template>
  <header class="el-header" :style="{ height }">
    <slot />
  </header>
</template>

<script lang="ts">
export default {
  name: 'ElHeader'
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

@include b(header) {
  padding: $--header-padding;
  background-color: #b5c0cf;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
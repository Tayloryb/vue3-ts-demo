
<template>
  <button class="el-button" :class="[size ? `el-button--${size}` : '',]">
    <slot />
  </button>
</template>
<script setup lang="ts">

import { withDefaults } from 'vue'
interface Props {
  size?: '' | 'small' | 'medium' | 'large'
}
withDefaults(defineProps<Props>(), {
  size: ''
})

// console.log('props :>> ', props)
</script>

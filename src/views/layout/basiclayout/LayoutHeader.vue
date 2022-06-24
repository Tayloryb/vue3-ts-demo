<template>
  <div class="layout-header pd-20">this is header</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  name: 'BasicLayoutHeader',
  setup() {
    return {}
  }
})
</script>
<style lang="less">
.layout-header {
  height: 56px;
}
</style>
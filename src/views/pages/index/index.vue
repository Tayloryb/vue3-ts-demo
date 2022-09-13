<template>
  <!-- <div>1111</div> -->
  <button @click="handleTest">跳转用户</button>
  <!-- <button @click="handleBus">触发bus</button> -->
  <!-- <DatePicker></DatePicker> -->
  <a-button type="primary">Primary Button</a-button>
</template>

<script lang="ts" setup>
// import { Button, DatePicker } from "ant-design-vue"
import { useGo } from '/@/hooks/web/usePage'
import { useUserStoreWithOut } from '/@/store/modules/user'
import { buildUUID } from '/@/utils/uuid'

const userStore = useUserStoreWithOut()
const go = useGo()

userStore.setToken(buildUUID())

const handleTest = () => {
  go('/user')
}

</script>

<style lang="scss" scoped>
</style>
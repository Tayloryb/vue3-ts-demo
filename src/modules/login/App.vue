<script lang="ts" setup>
import { getCurrentInstance } from "vue"

const internalInstance = getCurrentInstance()
console.log('internalInstance :>> ', internalInstance);


</script>


<template>
  <div>this is login page</div>
</template>
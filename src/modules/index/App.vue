<script lang="ts" setup>
  import logo from "/@/assets/logo.png"
  const html:string = '<h1>测试</h1>'
  const handleChange = () => {
    console.log('1111 :>> ', 1111);
  }
</script>

<template>
  <div>this is index page </div>
  <img :src="logo" alt="" width="100" height="100"/>
  <div v-html="html"></div>
  <button @click="handleChange">跳转</button>
  <router-view></router-view>
</template>
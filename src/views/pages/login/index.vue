<template>
  <div class="login-page w-100 h-100 flex justify-center align-center">
    <LoginForm></LoginForm>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from './LoginForm.vue'

export default defineComponent({
  components: {
    LoginForm
  },
  name: 'Login',
  setup() {
    return {}
  }
})
</script>
<style lang="scss">
.login-page {
  background-color: #f4f8fa;
}
</style>
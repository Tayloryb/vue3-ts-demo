<template>
  <div class="login-form">
    <a-form :model="formState" name="basic" autocomplete="off" layout="vertical" @finish="onFinish"
      @finishFailed="onFinishFailed" :rules="formRules">
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="密码" name="password" :wrapper-col="{ span: 32 }">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ span: 16 }">
        <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" class="w-100">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'

interface formState {
  username: string,
  password: string,
  remember: boolean
}

export default defineComponent({
  components: {},
  name: 'LoginForm',
  setup() {
    const formState = ref<formState>(
      {
        username: '',
        password: '',
        remember: false
      }
    )
    const validatePass = (_rule: Rule, value: string) => {
      if (!value.length) {
        return Promise.reject('密码不能为空')
      }
      return Promise.resolve()
    }

    const formRules: Record<string, Rule[]> = {
      password: [{
        validator: validatePass,
        trigger: 'change'
      }]
    }
    const onFinish = (values: any) => {
      console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }

    return {
      formState,
      formRules,
      onFinish,
      onFinishFailed
    }
  }
})
</script>
<style lang="scss">
.login-form {
  padding: 40px;
  background-color: #fff;
}
</style>
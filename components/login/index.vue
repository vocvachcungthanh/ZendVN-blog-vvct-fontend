<template>
  <form action="">
    <Field for-html="userName" label-name="Tên tài khoản">
      <Input placeholder="Nhập tên tài khoản ..." name="userName" />
    </Field>
    <Field for-html="password" label-name="Mật khẩu">
      <i class="toggle-password ion-eye"></i>
      <Input placeholder="Nhập mật khẩu ..." name="password" />
    </Field>

    <div class="d-flex tcl-jc-between tcl-ais-center">
      <LoginSubmit />
      <LoginRegister />
    </div>
  </form>
</template>

<script>
import LoginSubmit from '@/components/login/LoginSubmit.vue'
import LoginRegister from '@/components/login/LoginRegister.vue'
import { Field, Input } from '@/components/common'

export default {
  name: 'PageLogin',

  components: {
    LoginSubmit,
    LoginRegister,
    Field,
    Input,
  },
}
</script>

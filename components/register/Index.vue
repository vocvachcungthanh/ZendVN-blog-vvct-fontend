<template>
  <form>
    <Field for-html="userName" label-name="Tên tài khoản">
      <Input
        placeholder="Nhập tên tài khoản ..."
        name="username"
        :value="username"
        @onChange="handleChange"
      />
    </Field>
    <Field for-html="email" label-name="Email">
      <Input
        placeholder="Nhập email ..."
        name="email"
        :value="email"
        @onChange="handleChange"
      />
    </Field>
    <Field for-html="NickName" label-name="NickName">
      <Input
        placeholder="Nhập nickName ..."
        name="nickname"
        :value="nickname"
        @onChange="handleChange"
      />
    </Field>
    <Field for-html="password" label-name="Mật khẩu">
      <i
        class="toggle-password"
        :class="togglePassword"
        @click="handleShowPassword"
      ></i>
      <Input
        placeholder="Nhập mật khẩu ..."
        name="password"
        :type="typePassword"
        :value="password"
        @onChange="handleChange"
      />
    </Field>

    <div class="d-flex tcl-jc-between tcl-ais-center">
      <RegisterSubmit @click.native="handleSubmit" />
      <RegisterLogin />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

import RegisterSubmit from '@/components/register/RegisterSubmit.vue'
import RegisterLogin from '@/components/register/RegisterLogin.vue'
import { Field, Input } from '@/components/common'
import { getUrlHome } from '@/helpers'

export default {
  name: 'RegisterIndex',

  components: {
    RegisterSubmit,
    RegisterLogin,
    Field,
    Input,
  },

  middleware: 'notAuthenticated',

  data() {
    return {
      isLoading: false,
      email: '',
      username: '',
      password: '',
      nickname: '',
      isShowPassword: false,
    }
  },

  computed: {
    typePassword() {
      if (this.isShowPassword) {
        return 'text'
      }

      return 'password'
    },

    togglePassword() {
      return {
        'ion-eye': !this.isShowPassword,
        'ion-eye-disabled': this.isShowPassword,
      }
    },
  },

  methods: {
    ...mapActions({
      actFetchRegister: 'author/actFetchRegister',
    }),

    handleSubmit(e) {
      e.preventDefault()
      this.isLoading = true

      if (this.username && this.password) {
        this.actFetchRegister({
          email: this.email,
          username: this.username,
          password: this.password,
          nickname: this.nickname,
        }).then((res) => {
          // eslint-disable-next-line no-console
          console.log('[res]', res)
          if (res.ok) {
            this.$router.push(getUrlHome())
          } else {
            alert(res.error)
          }
        })
      }

      this.isLoading = false
    },

    handleShowPassword() {
      return (this.isShowPassword = !this.isShowPassword)
    },

    handleChange(e) {
      const filed = e.target.name
      const value = e.target.value

      this[filed] = value
    },
  },
}
</script>

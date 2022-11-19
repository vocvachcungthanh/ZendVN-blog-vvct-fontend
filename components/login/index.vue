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
      <LoginSubmit @click.native="handleSubmit" />
      <LoginRegister />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

import LoginSubmit from '@/components/login/LoginSubmit.vue'
import LoginRegister from '@/components/login/LoginRegister.vue'
import { Field, Input } from '@/components/common'
import { getUrlHome } from '@/helpers'

export default {
  name: 'LoginIndex',

  components: {
    LoginSubmit,
    LoginRegister,
    Field,
    Input,
  },

  middleware: 'notAuthenticated',

  data() {
    return {
      isLoading: false,
      username: '',
      password: '',
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
      actFetchLogin: 'author/actFetchLogin',
    }),

    handleSubmit(e) {
      e.preventDefault()

      if (this.username && this.password) {
        this.actFetchLogin({
          username: this.username,
          password: this.password,
        }).then((res) => {
          if (res.ok) {
            this.$router.push(getUrlHome())
          } else {
            alert('Đăng nhập thất bại')
          }
        })
      }
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

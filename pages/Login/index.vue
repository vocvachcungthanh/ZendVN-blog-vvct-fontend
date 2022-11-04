<template>
  <main class="login">
    <div class="spacing"></div>
    <div class="tcl-container">
      <div class="tcl-row">
        <div class="tcl-col-12 tcl-col-sm-6 block-center">
          <h1 class="form-title text-center">Đăng nhập</h1>
          <div class="form-login-register">
            <index />
          </div>
        </div>
      </div>
    </div>
    <div class="spacing"></div>
  </main>
</template>

<script>
import index from '@/components/login'

export default {
  name: 'PageLogin',

  components: {
    index,
  },

  head() {
    return {
      title: 'Đăng nhập',
    }
  },
}
</script>

<style>
@import url('~/assets/css/login.css');
</style>

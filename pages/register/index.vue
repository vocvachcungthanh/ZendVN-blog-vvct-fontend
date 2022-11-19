<template>
  <main class="login">
    <div class="spacing"></div>
    <div class="tcl-container">
      <div class="tcl-row">
        <div class="tcl-col-12 tcl-col-sm-6 block-center">
          <h1 class="form-title text-center">Đăng ký</h1>
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
import index from '@/components/register'

export default {
  name: 'PageRegister',

  components: {
    index,
  },

  layout: 'LayoutLogin',

  middleware: 'notAuthenticated',

  head() {
    return {
      title: 'Đăng ký',
    }
  },
}
</script>

<style>
@import url('~/assets/css/login.css');
</style>

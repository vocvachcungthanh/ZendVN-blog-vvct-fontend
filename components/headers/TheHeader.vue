<template>
  <header id="header">
    <div class="tcl-container">
      <div class="tcl-row tcl-no-gutters header">
        <LogoHeader />
        <SearchHeader />
        <div class="tcl-col-6">
          <!-- Nav -->
          <div class="header-nav">
            <MenuHeader />
            <LoginHeader />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {
  LogoHeader,
  SearchHeader,
  LoginHeader,
  MenuHeader,
} from '~/components/headers'

export default {
  components: {
    LogoHeader,
    SearchHeader,
    LoginHeader,
    MenuHeader,
  },
}
</script>

<style>
@import url('@/assets/css/header.css');
</style>

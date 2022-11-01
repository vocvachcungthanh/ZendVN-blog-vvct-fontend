<template>
  <div class="wrapper-content">
    <div id="fb-root"></div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '~/components/headers'
import { TheFooter } from '~/components/common'

export default {
  name: 'LayoutDefault',

  components: {
    TheHeader,
    TheFooter,
  },
}
</script>

<style>
@import url('@/assets/css/libs/bootstrap4/bootstrap-tcl.css');
@import url('@/assets/css/main.css');
</style>

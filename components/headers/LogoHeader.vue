<template>
  <div class="tcl-col-2">
    <!-- Logo -->
    <div class="header-logo">
      <AppButton :href="getHref" class-names="link__home">
        <img :src="getLogo" alt="Go to homepage" />
      </AppButton>
    </div>
  </div>
</template>

<script>
import { AppButton } from '@/components/common'
import { getUrlHome } from '~/helpers'

export default {
  name: 'LogoHeader',

  components: {
    AppButton,
  },

  computed: {
    getHref() {
      return getUrlHome()
    },

    getLogo() {
      return '/assets/images/logo.png'
    },
  },
}
</script>

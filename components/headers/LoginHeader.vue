<template>
  <ul class="header-nav__lists">
    <li class="user">
      <AppButton :href="getLogin" class-names="author"
        ><i class="icons ion-person"></i> Tài khoản</AppButton
      >
    </li>
  </ul>
</template>

<script>
import { AppButton } from '@/components/common'
import { getUrlLogin } from '~/helpers'

export default {
  name: 'LoginHeader',

  components: {
    AppButton,
  },

  computed: {
    getLogin() {
      return getUrlLogin('login')
    },
  },
}
</script>

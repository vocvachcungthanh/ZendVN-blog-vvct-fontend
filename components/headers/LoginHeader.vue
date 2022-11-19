<template>
  <ul class="header-nav__lists">
    <li v-if="isLogin" class="user">
      <AppButton :href="getDashboard" class-names="author">
        <i class="icons ion-person"></i> {{ currentUser.name }}
      </AppButton>

      <LogoutHeader />
    </li>

    <li v-else class="user">
      <AppButton :href="getLogin" class-names="author"> Tài khoản </AppButton>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import LogoutHeader from './LogoutHeader.vue'
import { AppButton } from '@/components/common'
import { getUrlLogin, getUrlDashboard } from '~/helpers'

export default {
  name: 'LoginHeader',

  components: {
    AppButton,
    LogoutHeader,
  },

  computed: {
    ...mapGetters({
      isLogin: 'author/isLogin',
    }),

    ...mapState({
      currentUser: (state) => state.author.currentUser,
    }),

    getLogin() {
      return getUrlLogin()
    },

    getDashboard() {
      return getUrlDashboard()
    },
  },
}
</script>

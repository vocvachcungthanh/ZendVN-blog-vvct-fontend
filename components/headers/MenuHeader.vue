<template>
  <MainMenu :menus="menus" :is-root="true" />
</template>

<script>
import { mapGetters } from 'vuex'

import MainMenu from '~/components/menus'

export default {
  name: 'MenuHeader',
  components: {
    MainMenu,
  },

  computed: {
    ...mapGetters({
      menus: 'mainMenuItems',
    }),
  },
}
</script>

<template>
  <ul>
    <li>
      <AppButton class-names="link-logout" @click.native="handleLogout">
        Đăng xuất
      </AppButton>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
import { AppButton } from '@/components/common'

export default {
  components: { AppButton },

  methods: {
    ...mapActions({
      actLogout: 'author/actLogout',
    }),
    handleLogout() {
      this.actLogout()
    },
  },
}
</script>

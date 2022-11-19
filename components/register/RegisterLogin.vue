<template>
  <AppButton :href="getLink" class-names="btn-register">Đăng nhập</AppButton>
</template>

<script>
import { AppButton } from '@/components/common'
import { getUrlLogin } from '~/helpers'

export default {
  components: {
    AppButton,
  },

  computed: {
    getLink() {
      return getUrlLogin()
    },
  },
}
</script>

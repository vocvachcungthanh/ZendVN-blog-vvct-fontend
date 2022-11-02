<template>
  <AppButton :href="getLink" class-names="btn-register">Đăng ký</AppButton>
</template>

<script>
import { AppButton } from '@/components/common'
import { getUrlRegister } from '~/helpers'

export default {
  components: {
    AppButton,
  },

  computed: {
    getLink() {
      return getUrlRegister()
    },
  },
}
</script>

<template>
  <ChangePassword />
</template>

<script>
import ChangePassword from '~/components/dashboard/ChangePassword.vue'
import { messages } from '~/constants'

export default {
  name: 'PagePassword',

  components: { ChangePassword },

  layout: 'admin',

  head() {
    return {
      title: messages.HEAD_TITLE_PASSWORD,
    }
  },
}
</script>

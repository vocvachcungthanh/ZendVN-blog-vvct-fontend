<template>
  <AppButton
    class-names="btn btn-reply comments__section--reply"
    :title="title"
  >
    <i class="ion-reply"></i>
  </AppButton>
</template>

<script>
import { AppButton } from '~/components/common'

export default {
  components: {
    AppButton,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

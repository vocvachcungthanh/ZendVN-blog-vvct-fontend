<template>
  <h1>Dashboard > Password</h1>
</template>

<script>
import { messages } from '~/constants'

export default {
  name: 'PagePassword',

  layout: 'admin',

  head() {
    return {
      title: messages.HEAD_TITLE_PASSWORD,
    }
  },
}
</script>

<template>
  <Index />
</template>

<script>
import Index from '~/components/dashboard'

export default {
  name: 'PageDashboard',

  components: {
    Index,
  },

  layout: 'admin',
  middleware: 'Authenticated',
}
</script>

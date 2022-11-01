<template>
  <h2 class="article-item__title">
    <nuxt-link :to="slug">
      {{ title }}
    </nuxt-link>
  </h2>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },

    slug: {
      type: String,
      default: '',
    },
  },
}
</script>

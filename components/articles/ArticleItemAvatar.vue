<template>
  <div class="article-item__author-image">
    <nuxt-link aria-label="John Doe" :to="`/detail/${slug}`">
      <img :src="authorAvatar" alt="john-doe" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    authorAvatar: {
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

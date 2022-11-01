<template>
  <div class="article-item__thumbnail">
    <nuxt-link :to="slug">
      <img :src="thumbnail" :alt="slug" :class="getClassNames" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    thumbnail: {
      type: String,
      default: '',
    },

    slug: {
      type: String,
      default: '',
    },

    isImage: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getClassNames() {
      return {
        'image-latest': this.isImage,
      }
    },
  },
}
</script>

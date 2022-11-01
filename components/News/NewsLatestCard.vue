<template>
  <div class="latest-news__card">
    <ArticleItem
      :is-style-card="isStyleCard"
      :is-author-avatar="true"
      :is-image="true"
      :post="post"
    />
  </div>
</template>

<script>
import { ArticleItem } from '~/components/articles/'

export default {
  components: {
    ArticleItem,
  },

  props: {
    isStyleCard: {
      type: Boolean,
      default: false,
    },

    post: {
      type: Object,
      default: Object,
    },
  },
}
</script>

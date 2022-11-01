<template>
  <div v-if="post" class="popular-news__list--card">
    <ArticleItem
      :is-style-card="isStyleCard"
      :is-style-row="isStyleRow"
      :is-author-avatar="true"
      :is-desc="true"
      :is-categories="true"
      :is-view="true"
      :post="post"
    />
  </div>
</template>

<script>
import { ArticleItem } from '~/components/articles'

export default {
  components: {
    ArticleItem,
  },

  props: {
    isStyleCard: {
      type: Boolean,
      default: false,
    },

    isStyleRow: {
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

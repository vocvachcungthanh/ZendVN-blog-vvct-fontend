<template>
  <div class="related-post">
    <h2 class="related-post__head">Bài viết liên quan</h2>
    <template v-if="posts.length !== 0">
      <PostRelatedCard
        v-for="item in posts"
        :key="item.id"
        :post-id="postId"
        :post="item"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import PostRelatedCard from './PostRelatedCard.vue'

export default {
  components: {
    PostRelatedCard,
  },

  props: {
    postId: {
      type: Number,
      default: Number,
    },
  },

  computed: {
    ...mapState({
      posts: (state) => state.posts.postRelatedPost,
    }),
  },
}
</script>

<style>
@import url('@/assets/css/related-posts.css');
</style>

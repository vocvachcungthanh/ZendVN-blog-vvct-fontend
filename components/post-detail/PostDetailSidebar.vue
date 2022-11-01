<template>
  <div class="post-detail__side">
    <PostDetailAuthor :post-author="postAuthor" />
    <div class="spacing"></div>
    <PostRelatedAuthor />
  </div>
</template>

<script>
import PostDetailAuthor from './PostDetailAuthor.vue'
import PostRelatedAuthor from './PostRelatedAuthor'

export default {
  components: {
    PostDetailAuthor,
    PostRelatedAuthor,
  },

  props: {
    postAuthor: {
      type: Object,
      default: Object,
    },
  },
}
</script>

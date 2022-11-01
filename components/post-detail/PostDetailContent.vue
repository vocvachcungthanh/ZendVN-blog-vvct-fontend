<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="post-detail__content">
    <template v-if="post">
      <div class="thumbnail">
        <img :src="post.images" alt="blog-title" />
      </div>
      <div class="content-padding">
        <div class="ret" v-html="getComment"></div>

        <PostDetailTags :tags="post.tags" />
        <IndexComment
          :post-comment-count="post.commentCount"
          :post-id="post.id"
        />
      </div>
    </template>
  </div>
</template>

<script>
import PostDetailTags from './PostDetailTags.vue'
import IndexComment from './comments'

export default {
  components: {
    PostDetailTags,
    IndexComment,
  },

  props: {
    post: {
      type: Object,
      default: null,
    },
  },

  computed: {
    getComment() {
      return this.post.content.rendered
    },
  },
}
</script>

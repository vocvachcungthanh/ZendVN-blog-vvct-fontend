<template>
  <div class="post-detail__comments">
    <PostFromComment />
    <template v-if="hasCommentCount">
      <PostCommentTotal :post-comment-count="postCommentCount" />

      <PostCommentBlock v-if="hasComments" :comments="commentLists.comments" />

      <LoadMoreComment
        v-if="hasLoadMore"
        :cur-page="commentLists.curPage"
        :wp-total-pages="commentLists.wpTotalPages"
        :post-id="postId"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import {
  PostCommentBlock,
  PostCommentTotal,
  PostFromComment,
  LoadMoreComment,
} from '@/components/post-detail/comments'

export default {
  components: {
    PostCommentBlock,
    PostCommentTotal,
    PostFromComment,
    LoadMoreComment,
  },

  props: {
    postCommentCount: {
      type: Number,
      default: 0,
    },

    postId: {
      type: Number,
      default: Number,
    },
  },

  computed: {
    ...mapState({
      commentLists: (state) => state.comments.commentsPaging,
    }),

    hasLoadMore() {
      return this.commentLists.wpTotalPages > this.commentLists.curPage
    },

    hasCommentCount() {
      return this.postCommentCount > 0
    },

    hasComments() {
      return this.commentLists.comments.length > 0
    },
  },
}
</script>

<style>
@import url('@/assets/css/comments.css');
</style>

<template>
  <ul class="comments">
    <PostCommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment-item="comment"
      :is-parent="true"
    />
  </ul>
</template>

<script>
import PostCommentItem from './PostCommentItem.vue'

export default {
  name: 'PostCommentBlock',

  components: {
    PostCommentItem,
  },

  props: {
    comments: {
      type: Array,
      default: Array,
    },
  },

  methods: {
    hasCommentReplyCount(replyCount) {
      return replyCount > 0
    },
  },
}
</script>

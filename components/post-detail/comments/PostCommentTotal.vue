<template>
  <p>{{ postCommentCount }} Bình luận</p>
</template>

<script>
export default {
  props: {
    postCommentCount: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<template>
  <div class="comments__hidden">
    <AppButton class-names="btn-link" @click.native="handleShowAnswer">
      <i class="icons ion-ios-undo"></i> Xem thêm {{ commentReplyCount }} câu
      trả lời
    </AppButton>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { AppButton } from '~/components/common'

export default {
  components: {
    AppButton,
  },

  props: {
    commentReplyCount: {
      type: Number,
      default: 0,
    },

    commentReplyPaging: {
      type: Object,
      default: Object,
    },

    parentId: {
      type: Number,
      default: Number,
    },

    post: {
      type: Number,
      default: Number,
    },
  },

  data() {
    return {
      isLoading: false,
    }
  },

  methods: {
    ...mapActions({
      actFetchCommentsList: 'comments/actFetchCommentsList',
    }),

    handleShowAnswer() {
      this.isLoading = true

      this.actFetchCommentsList({
        ...this.commentReplyPaging,
        parent: this.parentId,
        post: this.post,
      })
    },
  },
}
</script>

<!-- eslint-disable no-prototype-builtins -->
<template>
  <li class="item">
    <PostCommentSection
      :comment-item="commentItem"
      :is-parent="isParent"
      :is-form-reply="isFormReply"
      @onButtonReply="handleButtonReply"
    />

    <ul v-if="isCheckCommentReply" class="comments">
      <post-comment-item
        v-for="comment in commentReplyPaging.commentsReply"
        :key="comment.id"
        :comment-item="comment"
      />
    </ul>

    <PostCommentAnswer
      v-if="
        hasCommentReplyCount(commentItem.commentReplyCount) &&
        commentReplyCount > 0
      "
      :comment-reply-count="commentReplyCount"
      :post="commentItem.post"
      :parent-id="parentId"
      :comment-reply-paging="commentReplyPaging"
    />

    <!-- Reply form -->
    <PostFromComment
      v-if="isFormReply"
      :placeholder="getPlaceholder"
      @onChange="handleChangeReply"
    />
  </li>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import PostCommentSection from './PostCommentSection.vue'
import PostFromComment from './PostFromComment.vue'
import PostCommentAnswer from './PostCommentAnswer.vue'

export default {
  name: 'PostCommentItem',

  components: {
    PostCommentSection,
    PostFromComment,
    PostCommentAnswer,
  },

  props: {
    commentItem: {
      type: Object,
      default: Object,
    },

    isParent: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isFormReply: false,
    }
  },

  computed: {
    ...mapState({
      hasCommentReplyPaging: (state) => state.comments.hasCommentReplyPaging,
    }),

    parentId() {
      return this.commentItem.id
    },

    commentReplyPaging() {
      if (this.parentId === 0) {
        return null
      }

      const key = `reply-parent-${this.parentId}`

      const hasCommentReplyPaging = this.hasCommentReplyPaging

      if (
        Object.keys(hasCommentReplyPaging).length > 0 &&
        Object.prototype.hasOwnProperty.call(hasCommentReplyPaging, key)
      ) {
        const replyPaging = this.hasCommentReplyPaging[key]

        return {
          ...replyPaging,
          curPage: replyPaging.curPage + 1,
        }
      }

      return {
        curPage: 1,
        wpTotal: 0,
        wpTotalPages: 0,
        commentsReply: [],
      }
    },

    isCheckCommentReply() {
      if (
        Object.keys(this.hasCommentReplyPaging).length > 0 &&
        this.commentReplyPaging.commentsReply?.length > 0
      ) {
        return true
      }

      return false
    },

    commentReplyCount() {
      const commentReplyCount = this.commentItem.commentReplyCount

      const commentReplyCountNumber =
        this.commentReplyPaging.commentsReply?.length

      if (
        Object.keys(this.hasCommentReplyPaging).length > 0 &&
        commentReplyCountNumber > 0
      ) {
        return commentReplyCount - commentReplyCountNumber
      }

      return commentReplyCount
    },

    getAuthorName() {
      return this.commentItem.authorData?.nickName
    },

    getPlaceholder() {
      return `Trả lời bình luận của ${this.getAuthorName} ...`
    },
  },

  methods: {
    ...mapActions({
      actFetchPostCommentList: 'comments/actFetchPostNewComment',
    }),

    hasCommentReplyCount(replyCount) {
      return replyCount > 0
    },

    hasComments() {
      return this.commentReplyPaging.commentsReply.length > 0
    },

    handleButtonReply(e) {
      return (this.isFormReply = e)
    },

    handleChangeReply({ message, callback }) {
      this.actFetchPostCommentList({
        post: this.commentItem.post,
        content: message,
        parent: this.parentId,
      }).then((res) => {
        callback()
        if (res.ok) {
          this.commentExclude.push(res.comment.id)
        } else {
          alert(res.error)
        }
      })
    },
  },
}
</script>

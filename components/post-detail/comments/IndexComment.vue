<template>
  <div class="post-detail__comments">
    <PostFromComment v-if="isLogin" @onChange="handleChange" />

    <div v-else class="comments__info--link">
      Vui lòng
      <AppButton :href="getLinkLogin" class-names="link-login">
        Đăng nhập
      </AppButton>
      để đăng bình luận mới
    </div>
    <template v-if="hasCommentCount">
      <PostCommentTotal :post-comment-count="postCommentCount" />

      <PostCommentBlock v-if="hasComments" :comments="commentLists.comments" />

      <LoadMoreComment
        v-if="hasLoadMore"
        :cur-page="commentLists.curPage"
        :wp-total-pages="commentLists.wpTotalPages"
        :post-id="postId"
        :comment-exclude="commentExclude"
      />
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import {
  PostCommentBlock,
  PostCommentTotal,
  PostFromComment,
  LoadMoreComment,
} from '@/components/post-detail/comments'

import { AppButton } from '~/components/common'
import { getUrlLogin } from '~/helpers'

export default {
  components: {
    PostCommentBlock,
    PostCommentTotal,
    PostFromComment,
    LoadMoreComment,
    AppButton,
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

  data() {
    return {
      commentExclude: [],
    }
  },

  computed: {
    ...mapGetters({
      isLogin: 'author/isLogin',
    }),

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

    getLinkLogin() {
      return getUrlLogin()
    },
  },

  methods: {
    ...mapActions({
      actFetchPostCommentList: 'comments/actFetchPostNewComment',
    }),

    handleChange({ message, callback }) {
      this.actFetchPostCommentList({
        post: this.postId,
        content: message,
      }).then((res) => {
        callback()
        if (res.ok) {
          this.commentExclude.push(res.comment.id)
        }
      })
    },
  },
}
</script>

<style>
@import url('@/assets/css/comments.css');
</style>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="comments__section">
    <div class="comments__section--avatar">
      <AppButton :href="getLinkUser" class-names="comments__section--link">
        <img :src="getAvatar" :alt="getAuthorName" />
      </AppButton>
    </div>
    <div class="comments__section--content">
      <a href="#" class="comments__section--user">
        {{ getAuthorName }}
      </a>
      <p class="comments__section--time">
        {{ getFormatDay.relative }}
      </p>
      <div class="comments__section--text" v-html="getContent"></div>
      <PostCommentReply
        v-if="isCheckParent"
        :title="getTitleButtonReply"
        @click.native="handleReply"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import PostCommentReply from './PostCommentReply.vue'
import { AppButton } from '@/components/common'
import { formatDay, getUrlUser } from '@/helpers'

export default {
  components: {
    AppButton,
    PostCommentReply,
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

    isFormReply: {
      type: Boolean,
      default: Boolean,
    },
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.author.currentUser,
    }),

    getLinkUser() {
      return getUrlUser(this.commentItem.id)
    },

    getAvatar() {
      const num = (this.currentUser.id % 4) + 1

      return (
        this.commentItem.authorData?.authorAvatar ||
        `/assets/images/avatar${num}.jpg`
      )
    },

    getAuthorName() {
      return this.commentItem.authorData?.nickName
    },

    getFormatDay() {
      const createdDayjs = this.$dayjs(this.commentItem.date)
      return formatDay(createdDayjs)
    },

    getContent() {
      return this.commentItem.content?.rendered
    },

    getTitleButtonReply() {
      const textOpen = 'Mở form bình luận'
      const textClos = 'Đóng from bình luân'

      return this.isFormReply ? textClos : textOpen
    },

    isCheckParent() {
      return this.isParent
    },
  },

  methods: {
    handleReply() {
      return this.$emit('onButtonReply', !this.isFormReply)
    },
  },
}
</script>

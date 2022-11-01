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
      <!-- <i class="ion-reply comments__section--reply"></i> -->
    </div>
  </div>
</template>

<script>
import { AppButton } from '@/components/common'
import { formatDay } from '@/helpers'

export default {
  components: {
    AppButton,
  },

  props: {
    commentItem: {
      type: Object,
      default: Object,
    },
  },

  computed: {
    getLinkUser() {
      return `/user/${this.commentItem.id}`
    },

    getAvatar() {
      return this.commentItem.authorData?.authorAvatar
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
  },
}
</script>

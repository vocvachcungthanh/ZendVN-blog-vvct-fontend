<template>
  <div v-if="Object.keys(postAuthor).length !== 0" class="post-author">
    <div class="post-author__bg-avatar">
      <AppButton :href="getAuthorLink" class-names="post-author__avatar">
        <img :src="getAuthorAvatar" :alt="postAuthor.nickName" />
      </AppButton>
    </div>
    <div class="post-author__nickname">
      <AppButton :href="getAuthorLink" class-names="nick-name">
        {{ postAuthor.nickName }}
      </AppButton>
    </div>
    <p class="post-author__desc">
      {{ postAuthor.description }}
    </p>
  </div>
</template>

<script>
import { AppButton } from '@/components/common'
import { getUrlUser } from '~/helpers'

export default {
  components: {
    AppButton,
  },

  props: {
    postAuthor: {
      type: Object,
      default: Object,
    },
  },

  computed: {
    getAuthorAvatar() {
      return this.postAuthor.authorAvatar
    },

    getAuthorLink() {
      return getUrlUser(this.postAuthor.authorId)
    },
  },
}
</script>

<style>
@import url('@/assets/css/post-author.css');
</style>

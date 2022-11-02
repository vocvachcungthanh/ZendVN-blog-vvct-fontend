<template>
  <article v-if="post" class="article-item" :class="classNames">
    <ArticleItemThumbnail
      :thumbnail="post.images"
      :slug="getSlug"
      :is-image="isImage"
    />
    <div class="article-item__content">
      <ArticleItemCategories
        v-if="post.categories?.length > 0 && isStyleCard && isCategories"
        :categories="post.categories"
      />
      <ArticleItemView v-if="isStyleCard && isView" :view="post.viewCount" />
      <ArticleItemTitle :title="getTitle" :slug="getSlug" />
      <ArticleItemDesc
        v-if="isStyleCard && isDesc"
        :desc="post?.excerpt?.rendered"
      />
      <ArticleItemInfo
        :is-author-avatar="isAuthorAvatar"
        :author-avatar="getAuthorAvatar"
        :post-created="post.date"
        :post-nick-name="getNickName"
      />
    </div>
  </article>
</template>

<script>
import { cutText, getUrlPostDetail } from '~/helpers'

import {
  ArticleItemTitle,
  ArticleItemThumbnail,
  ArticleItemView,
  ArticleItemCategories,
  ArticleItemInfo,
  ArticleItemDesc,
} from '~/components/articles'

export default {
  components: {
    ArticleItemTitle,
    ArticleItemThumbnail,
    ArticleItemInfo,
    ArticleItemCategories,
    ArticleItemView,
    ArticleItemDesc,
  },

  props: {
    isStyleCard: {
      type: Boolean,
      default: false,
    },

    isStyleRow: {
      type: Boolean,
      default: false,
    },

    isAuthorAvatar: {
      type: Boolean,
      default: false,
    },

    isCategories: {
      type: Boolean,
      default: false,
    },

    isView: {
      type: Boolean,
      default: false,
    },

    isDesc: {
      type: Boolean,
      default: false,
    },

    post: {
      type: Object,
      default: Object,
    },

    isImage: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classNames() {
      return {
        'style-card': this.isStyleCard,
        'style-row': this.isStyleRow,
      }
    },

    getSlug() {
      return getUrlPostDetail(this.post.slug)
    },

    getTitle() {
      const endIndex = this.isStyleCard === true ? 44 : 45

      return cutText(this.post.title?.rendered, 0, endIndex)
    },

    getNickName() {
      return this.post.authorData?.nickName
    },

    getAuthorAvatar() {
      return this.post.authorData?.authorAvatar
    },
  },
}
</script>

<style>
@import url('~/assets/css/article-item.css');
</style>

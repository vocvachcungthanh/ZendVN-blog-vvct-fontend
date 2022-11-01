<template>
  <div class="article-item__info">
    <ArticleItemAvatar v-if="isAuthorAvatar" :author-avatar="authorAvatar" />
    <div class="article-item__info-right">
      <div class="article-item__author-name">
        <a href="#"
          ><strong>
            {{ postNickName }}
          </strong></a
        >
      </div>
      <ArticleItemCreated :post-created="postCreated" />
    </div>
  </div>
</template>

<script>
import ArticleItemAvatar from './ArticleItemAvatar'
import ArticleItemCreated from './ArticleItemCreated'

export default {
  components: {
    ArticleItemAvatar,
    ArticleItemCreated,
  },

  props: {
    isAuthorAvatar: {
      type: Boolean,
      default: false,
    },

    authorAvatar: {
      type: String,
      default: '',
    },

    postCreated: {
      type: String,
      default: String,
    },

    postNickName: {
      type: String,
      default: '',
    },
  },
}
</script>

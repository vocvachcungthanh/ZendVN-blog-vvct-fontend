<template>
  <main class="post-detail">
    <div class="spacing"></div>
    <PostDetailHeader :post="postDetail" />
    <div class="spacing"></div>
    <div class="post-detail__fluid">
      <div class="tcl-container">
        <div class="post-detail__wrapper">
          <PostDetailContent :post="postDetail" />
          <PostDetailSidebar
            :post-author="postDetail.authorData"
            :post-id="getPostId"
          />
        </div>
      </div>
    </div>
    <div class="spacing"></div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

import {
  PostDetailHeader,
  PostDetailSidebar,
  PostDetailContent,
} from '~/components/post-detail'

export default {
  components: {
    PostDetailHeader,
    PostDetailSidebar,
    PostDetailContent,
  },

  validate({ params }) {
    if (!params.slug && !params.slug.trim()) {
      return false
    }

    return true
  },

  async asyncData({ store, params }) {
    const slug = params.slug
    const response = await store.dispatch('posts/actFetchArticlesBySlug', {
      slug,
    })

    if (response.ok) {
      const postDetail = response.data
      const authorId = postDetail?.author
      const post = postDetail?.id
      if (post && postDetail) {
        await Promise.all([
          store.dispatch('posts/actFetchRelatedPost', { authorId }),
          store.dispatch('comments/actFetchCommentsList', {
            post,
          }),
        ])
      }
    }
  },

  data() {
    return {
      post: {},
      idTimeOut: null,
    }
  },

  head() {
    return {
      title: this.postDetail.title.rendered,
    }
  },

  computed: {
    ...mapState({
      postDetail: (state) => state.posts.postDetail,
    }),

    getPostId() {
      return this.postDetail.id
    },
  },

  mounted() {
    if (this.getPostId) {
      this.idTimeOut = setTimeout(() => {
        const response = this.$wpApi.post('/post-views-counter/view-post', {
          id: this.getPostId,
        })

        // eslint-disable-next-line no-console
        console.log('[response]', response)
      }, 10000)
    }
  },

  destroyed() {
    if (this.idTimeOut) {
      clearTimeout(this.idTimeOut)
    }
  },
}
</script>

<style>
@import url('@/assets/css/post-detail.css');
</style>

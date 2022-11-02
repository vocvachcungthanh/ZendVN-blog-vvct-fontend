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
            :post-id="postDetail.id"
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
      const authorId = postDetail.author
      const post = postDetail.id

      await Promise.all([
        store.dispatch('posts/actFetchRelatedPost', { authorId }),
        store.dispatch('comments/actFetchCommentsList', {
          post,
        }),
      ])
    }
  },

  data() {
    return {
      post: {},
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
  },
}
</script>

<style>
@import url('@/assets/css/post-detail.css');
</style>

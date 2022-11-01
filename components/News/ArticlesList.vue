<template>
  <div v-if="posts.articles.length > 0" class="articles-list section">
    <div class="tcl-container">
      <MainTitle
        title="Danh sách bài viết"
        :is-view-more="true"
        view-more-link="/"
        view-more-text="Xem têm"
      />

      <div class="tcl-row">
        <div
          v-for="post in posts.articles"
          :key="post.id"
          class="tcl-col-12 tcl-col-md-6"
        >
          <ArticleItem :is-style-card="true" :post="post" />
        </div>
      </div>
      <LoadMore
        v-if="posts.wpTotalPages > posts.curPage"
        :cur-page="posts.curPage"
        :wp-total-pages="posts.wpTotalPages"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { ArticleItem } from '~/components/articles/'
import { MainTitle } from '~/components/News'
import { LoadMore } from '~/components/common'

export default {
  components: {
    MainTitle,
    ArticleItem,
    LoadMore,
  },

  computed: {
    ...mapState({
      posts: (state) => state.posts.articlesPaging,
    }),
  },
}
</script>

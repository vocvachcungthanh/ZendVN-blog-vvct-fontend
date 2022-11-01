<template>
  <div class="articles-list section">
    <div class="tcl-container">
      <MainTitle :main-title-search="true" :title="title" />

      <div
        v-for="post in articles"
        :key="post.id"
        class="tcl-row tcl-jc-center"
      >
        <div class="tcl-col-12 tcl-col-md-8">
          <ArticleItem
            :is-style-card="true"
            :is-categories="true"
            :post="post"
          />
        </div>
      </div>

      <div class="text-center">
        <LoadMore
          v-if="posts.wpTotalPages > posts.curPage"
          :cur-page="posts.curPage"
          :wp-total-pages="posts.wpTotalPages"
          :search="keyWord"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { ArticleItem } from '~/components/articles'
import { MainTitle } from '~/components/News'
import { LoadMore } from '~/components/common'

export default {
  name: 'SearchPage',

  components: {
    ArticleItem,
    MainTitle,
    LoadMore,
  },

  async asyncData({ store, query }) {
    const keyWord = query.q

    await store.dispatch('posts/actFetchArticlesList', {
      search: keyWord,
    })

    return {
      keyWord,
    }
  },

  data() {
    return {
      keyWord: '',
    }
  },

  computed: {
    ...mapState({
      posts: (state) => state.posts.articlesSearch,
    }),

    ...mapGetters({
      articles: 'posts/getArticleSearch',
    }),

    title() {
      return `Khoảng ${this.posts.wpTotal} kết quả tới tử khóa '${this.keyWord}'`
    },
  },

  watchQuery: ['q'],
}
</script>

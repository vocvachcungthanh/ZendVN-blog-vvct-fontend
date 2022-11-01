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
          :categories-id="categories[0].id"
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

  validate({ params }) {
    if (!params.slug && !params.slug.trim()) {
      return false
    }

    return true
  },

  async asyncData({ store, params }) {
    const slug = params.slug

    const response = await store.dispatch(
      'categories/actFetchCategoriesBySlug',
      {
        slug,
      }
    )

    if (response.data.length > 0) {
      const categoriesId = response.data.map((item) => {
        return item.id
      })

      await store.dispatch('posts/actFetchArticlesList', {
        categories: categoriesId[0],
      })

      return {
        categories: response.data,
      }
    }
  },

  data() {
    return {
      keyWord: '',
      categories: null,
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
      return `Khoảng ${this.posts.wpTotal || 0} kết quả danh mục '${
        this.categories[0].name
      }'`
    },
  },
}
</script>

<template>
  <main>
    <NewsLatest />
    <NewsPopular />
    <ArticlesList />
  </main>
</template>

<script>
import { NewsLatest, NewsPopular, ArticlesList } from '~/components/News'

export default {
  name: 'IndexPage',

  components: {
    NewsLatest,
    NewsPopular,
    ArticlesList,
  },

  async asyncData({ store }) {
    await Promise.all([
      store.dispatch('posts/actFetchLatestPost'),
      store.dispatch('posts/actFetchPopularPost'),
      store.dispatch('posts/actFetchArticlesList'),
    ])
  },
}
</script>

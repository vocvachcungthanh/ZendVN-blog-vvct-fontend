<template>
  <div class="latest-news section">
    <div class="tcl-container">
      <MainTitle title="Bài viết mới nhất" />
      <div class="latest-news__list spacing">
        <NewsLatestCard v-for="item in posts" :key="item.id" :post="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { NewsLatestCard, MainTitle } from '~/components/News'

export default {
  components: {
    MainTitle,
    NewsLatestCard,
  },

  computed: {
    ...mapState({
      posts: (state) => state.posts.latestList,
    }),
  },
}
</script>

<style>
@import url('~/assets/css/latest-news-list.css');
</style>

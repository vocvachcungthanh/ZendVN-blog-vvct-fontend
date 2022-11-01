<template>
  <div v-if="posts.length !== 0" class="popular-news section bg-white-blue">
    <div class="tcl-container">
      <MainTitle
        title="Bài viết phổ biến"
        :is-view-more="true"
        view-more-link="/"
        view-more-text="Xem têm"
      />

      <div class="popular-news__list spacing">
        <div class="popular-news__list--left">
          <div class="popular-news__list--row">
            <NewsPopularCard :post="posts[0]" :is-style-card="true" />
            <NewsPopularCard :post="posts[1]" :is-style-card="true" />
          </div>
        </div>
        <div class="popular-news__list--right">
          <div class="popular-news__list--row">
            <NewsPopularCard
              :post="posts[2]"
              :is-style-card="true"
              :is-style-row="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { NewsPopularCard, MainTitle } from '~/components/News'

export default {
  components: {
    MainTitle,
    NewsPopularCard,
  },

  computed: {
    ...mapGetters({
      posts: 'posts/getPopularList',
    }),
  },
}
</script>

<style>
@import url('~/assets/css/popular-news-list.css');
</style>

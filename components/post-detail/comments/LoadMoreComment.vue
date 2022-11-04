<template>
  <div class="text-center">
    <AppButton
      class="btn btn-primary btn-size-large btn-load-more"
      @click.native="handleLoadMore"
    >
      <AppSVG v-if="isLoading" :icon="getIconLoading" />
      Tải thêm bình luận
    </AppButton>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { IconLoading } from '@/assets/images'
import { AppButton, AppSVG } from '@/components/common'

export default {
  name: 'LoadMore',

  components: {
    AppButton,
    AppSVG,
  },

  props: {
    curPage: {
      type: Number,
      default: 1,
    },

    wpTotalPages: {
      type: Number,
      default: Number,
    },

    postId: {
      type: Number,
      default: Number,
    },

    commentExclude: {
      type: Array,
      default: Array,
    },
  },

  data() {
    return {
      isLoading: false,
    }
  },

  computed: {
    getIconLoading() {
      return IconLoading
    },
  },

  methods: {
    ...mapActions({
      actFetchCommentsList: 'comments/actFetchCommentsList',
    }),

    handleLoadMore() {
      if (this.isLoading === false) {
        const curPage = this.curPage + 1

        if (curPage <= this.wpTotalPages) {
          this.isLoading = true

          this.actFetchCommentsList({
            curPage,

            ...(this.postId !== '' &&
              this.postId !== 0 && { post: this.postId }),
            exclude: this.commentExclude,
          }).then(() => {
            this.isLoading = false
          })
        }
      }
    },
  },
}
</script>

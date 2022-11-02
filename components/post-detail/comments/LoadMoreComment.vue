<template>
  <div class="text-center">
    <AppButton
      class="btn btn-primary btn-size-large btn-load-more"
      @click.native="handleLoadMore"
    >
      <svg
        v-if="isLoading"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="currentColor"
          stroke-width="10"
          r="35"
          stroke-dasharray="164.93361431346415 56.97787143782138"
          transform="rotate(120.057 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
      Tải thêm bình luận
    </AppButton>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { AppButton } from '@/components/common'

export default {
  name: 'LoadMore',

  components: {
    AppButton,
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
  },

  data() {
    return {
      isLoading: false,
    }
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
          }).then(() => {
            this.isLoading = false
          })
        }
      }
    },
  },
}
</script>

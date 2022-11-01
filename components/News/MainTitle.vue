<template>
  <div class="main-title spacing" :class="classNames">
    <h2>
      {{ title }}
    </h2>

    <AppButton v-if="isViewMore" :href="viewMoreLink">
      {{ viewMoreText }}
    </AppButton>
  </div>
</template>

<script>
import { AppButton } from '~/components/common'
export default {
  components: {
    AppButton,
  },

  props: {
    title: {
      type: String,
      default: '',
    },

    isViewMore: {
      type: Boolean,
      default: false,
    },

    mainTitleSearch: {
      type: Boolean,
      default: false,
    },

    viewMoreText: {
      type: String,
      default: '',
    },

    viewMoreLink: {
      type: String,
      default: '',
    },
  },

  computed: {
    classNames() {
      return {
        'd-flex': this.isViewMore,
        'tcl-jc-between': this.isViewMore,
        'tcl-ais-center': this.isViewMore,
        'main-title__search': this.mainTitleSearch,
      }
    },
  },
}
</script>

<style>
@import url('~/assets/css/main-title.css');
</style>

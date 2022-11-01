<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="article-item__desc desc-custom" v-html="getDesc"></div>
</template>

<script>
import { cutText } from '~/helpers'

export default {
  props: {
    desc: {
      type: String,
      default: '',
    },
  },

  computed: {
    getDesc() {
      return `${cutText(this.desc, 0, 120)} </p>`
    },
  },
}
</script>

<style>
.desc-custom p {
  margin-bottom: 0;
}
</style>

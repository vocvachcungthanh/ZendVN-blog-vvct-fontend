<template>
  <ul class="article-item__categories">
    <li v-for="cate in categories" :key="cate.id">
      <AppButton :href="getSlug(cate)" class="btn btn-category">{{
        cate.name
      }}</AppButton>
    </li>
  </ul>
</template>

<script>
import { AppButton } from '~/components/common'

export default {
  components: {
    AppButton,
  },

  props: {
    categories: {
      type: Array,
      default: Array,
    },
  },

  methods: {
    getSlug(item) {
      return `/categories/${item.slug}`
    },
  },
}
</script>

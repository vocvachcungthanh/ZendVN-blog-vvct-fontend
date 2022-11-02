<template>
  <div v-if="listTags.length > 0" class="post-detail__tags">
    <h2>Tags</h2>
    <ul>
      <li v-for="item in listTags" :key="item.id" class="item">
        <AppButton :href="getSlug(item)" class="btn-category">
          {{ item.name }}
        </AppButton>
      </li>
    </ul>
  </div>
</template>

<script>
import { AppButton } from '@/components/common'
import { getUrlTags } from '~/helpers'

export default {
  components: {
    AppButton,
  },

  props: {
    tags: {
      type: Array,
      default: Array,
    },
  },

  data() {
    return {
      listTags: [],
    }
  },

  async fetch() {
    if (this.tags.length === 0) {
      return
    }

    const response = await this.$store.dispatch('tags/actFetchListTags', {
      include: this.tags,
    })

    if (response.ok) {
      return (this.listTags = response.data)
    }
  },

  methods: {
    getSlug(item) {
      return getUrlTags(item.slug)
    },
  },
}
</script>

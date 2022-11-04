<!-- eslint-disable vue/no-v-html -->
<template>
  <span :class="getClassNames">
    <InlineSvg :src="icon" :fill="fill" />
  </span>
</template>

<script>
import InlineSvg from 'vue-inline-svg'

export default {
  components: {
    InlineSvg,
  },

  props: {
    icon: {
      type: String,
      default: String,
    },

    classNames: {
      type: String,
      default: String,
    },

    fill: {
      type: String,
      default: 'black',
    },
  },

  computed: {
    getClassNames() {
      return {
        [this.classNames]: this.classNames,
      }
    },
  },
}
</script>

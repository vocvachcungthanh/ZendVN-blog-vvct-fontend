<template>
  <button v-if="!href" :class="className">
    <slot></slot>
  </button>

  <nuxt-link v-else :to="href" :class="className">
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'default',
    },

    classNames: {
      type: String,
      default: String,
    },
  },

  computed: {
    className() {
      if (this.classNames) {
        return {
          [this.classNames]: this.classNames,
        }
      } else {
        return {
          btn: true,
          'btn btn-default': this.type === 'default',
          'btn-category': this.type === 'category',
        }
      }
    },
  },
}
</script>

<style>
@import url('~/assets/css/button.css');
</style>

<template>
  <button v-if="!href" :type="type" :class="className" :title="title">
    <slot></slot>
  </button>

  <nuxt-link v-else :to="href" :class="className" :title="title">
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
      default: 'button',
    },

    classNames: {
      type: String,
      default: String,
    },

    title: {
      type: String,
      default: '',
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

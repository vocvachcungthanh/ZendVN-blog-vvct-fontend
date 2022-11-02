<template>
  <input :type="type" :placeholder="placeholder" :class="getClassName" />
</template>

<script>
export default {
  name: 'FormInput',

  props: {
    type: {
      type: String,
      default: 'text',
    },

    placeholder: {
      type: String,
      default: null,
    },

    classNames: {
      type: String,
      default: null,
    },
  },

  computed: {
    getClassName() {
      if (this.classNames) {
        return this.classNames
      }

      return null
    },
  },
}
</script>

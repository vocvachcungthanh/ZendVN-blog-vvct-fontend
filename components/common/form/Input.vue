<!-- eslint-disable vue/valid-v-bind -->
<template>
  <input
    v-if="!textarea"
    :type="type"
    :placeholder="placeholder"
    :class="getClassName"
    :value="value"
    @input="(e) => handleChange(e)"
  />
  <textarea
    v-else
    type="text"
    :placeholder="placeholder"
    :class="getClassName"
    :value="value"
    @input="(e) => handleChange(e)"
  ></textarea>
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

    textarea: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      default: '',
    },

    value: {
      type: String,
      default: String,
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

  methods: {
    handleChange(e) {
      return this.$emit('onChange', e)
    },
  },
}
</script>

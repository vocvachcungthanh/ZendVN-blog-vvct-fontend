<template>
  <input
    v-if="!textarea"
    :type="type"
    :placeholder="placeholder"
    :class="getClassName"
    :value="value"
    :name="name"
    @input="(e) => handleChange(e)"
  />
  <textarea
    v-else
    type="text"
    :name="name"
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
      default: String,
    },

    classNames: {
      type: String,
      default: String,
    },

    textarea: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      default: String,
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

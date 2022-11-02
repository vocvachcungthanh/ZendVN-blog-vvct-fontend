<template>
  <div class="form-control">
    <label :for="name"
      >{{ labelName }}
      <sup v-if="isCheckRequire" class="text-red">*</sup></label
    >
    <div class="from-group">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormField',

  props: {
    labelName: {
      type: String,
      default: String,
    },

    type: {
      type: String,
      default: 'type',
    },

    forHtml: {
      type: String,
      default: String,
    },

    require: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isCheckRequire() {
      return this.require
    },
  },
}
</script>

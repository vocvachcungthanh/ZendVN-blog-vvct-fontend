<template>
  <ul class="article-item__stats">
    <li>
      <i class="icons ion-ios-eye"></i>
      <span class="text">{{ view }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    view: {
      type: Number,
      default: 0,
    },
  },
}
</script>

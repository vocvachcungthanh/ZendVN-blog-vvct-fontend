<template>
  <ul v-if="menus.length > 0" :class="classRoot">
    <li v-for="menu in menus" :key="menu.ID">
      <nuxt-link
        v-if="!menu.url.startsWith('http')"
        :to="menu.url"
        :title="menu.title"
        >{{ menu.title }}</nuxt-link
      >

      <a v-else :href="menu.url" target="_blank" :title="menu.title">
        {{ menu.title }}
      </a>
      <template v-if="menu.children.length > 0">
        <main-menu :menus="menu.children" />
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MainMenu',

  props: {
    menus: {
      type: Array,
      default: Array,
    },

    isRoot: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classRoot() {
      return {
        'header-nav__lists': this.isRoot,
      }
    },
  },
}
</script>

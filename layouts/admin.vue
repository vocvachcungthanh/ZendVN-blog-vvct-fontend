<template>
  <div class="layout-admin">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        v-model="collapsed"
        :trigger="null"
        collapsible
        class="layout-sidebar"
      >
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="inline"
          :default-selected-keys="defaultSelectedKeys"
        >
          <a-menu-item :key="getLinkProfile">
            <nuxt-link :to="getLinkProfile" class="a-menu-item">
              <a-icon type="user" />
              <span>Hồ sơ của tôi</span>
            </nuxt-link>
          </a-menu-item>
          <a-menu-item :key="getLinkPassword">
            <nuxt-link :to="getLinkPassword" class="a-menu-item">
              <a-icon type="setting" />
              <span>Đổi mật khẩu</span>
            </nuxt-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="layout-header">
          <a-icon
            class="trigger"
            :type="getTypeIcon"
            @click="handleToggleMenu()"
          />
        </a-layout-header>
        <a-layout-content class="layout-content">
          <Nuxt />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import antDesignVue from '~/plugins/ant-design-vue'
import { messages } from '~/constants'
import { getUrlDashboard } from '@/helpers'

export default {
  name: 'LayoutAdmin',

  data() {
    return {
      collapsed: false,
    }
  },

  head() {
    return {
      title: messages.HEAD_TITLE_DASHBOARD,
    }
  },

  computed: {
    getTypeIcon() {
      return this.collapsed ? 'menu-unfold' : 'menu-fold'
    },

    getLinkProfile() {
      return getUrlDashboard()
    },

    getLinkPassword() {
      return getUrlDashboard('password')
    },

    defaultSelectedKeys() {
      return [this.$route.path]
    },
  },

  beforeCreate() {
    antDesignVue()
  },

  methods: {
    handleToggleMenu() {
      this.collapsed = !this.collapsed
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/admin.css');
</style>

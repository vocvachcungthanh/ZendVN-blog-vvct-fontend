<template>
  <form class="comments__form" @submit.prevent="handleSubmit">
    <div class="comments__form--control">
      <div class="comments__section--avatar">
        <AppButton :href="getLinkUser" class-names="link__avatar">
          <img :src="avatarAuthor" :alt="currentUser.name" />
        </AppButton>
      </div>
      <Input
        :textarea="true"
        :placeholder="placeholder"
        :value="message"
        @onChange="handleChange"
      />
    </div>
    <div class="text-right">
      <AppButton type="submit">
        <AppSVG v-if="isLoading" :icon="getIconLoading" /> Gửi
      </AppButton>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import { AppButton, AppSVG } from '@/components/common'
import { getUrlUser } from '~/helpers'
import { Input } from '~/components/common'
import { IconLoading } from '@/assets/images'

export default {
  components: {
    AppButton,
    Input,
    AppSVG,
  },

  props: {
    placeholder: {
      type: String,
      default: 'Đển lại bình luận của bạn ...',
    },
  },

  data() {
    return {
      message: '',
      isLoading: false,
    }
  },

  computed: {
    ...mapGetters({
      avatarAuthor: 'author/avatarAuthor',
    }),

    ...mapState({
      currentUser: (state) => state.author.currentUser,
    }),

    getLinkUser() {
      const authorId = this?.currentUser.id || null

      return getUrlUser(authorId)
    },

    getIconLoading() {
      return IconLoading
    },
  },

  methods: {
    handleSubmit() {
      const data = {
        message: this.message,
        callback: () => {
          this.message = ''
          this.isLoading = false
        },
      }

      this.isLoading = true
      this.$emit('onChange', data)
    },

    handleChange(event) {
      const field = event.target.value

      return (this.message = field)
    },
  },
}
</script>

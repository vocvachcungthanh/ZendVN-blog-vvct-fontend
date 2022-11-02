<template>
  <div class="comments__form">
    <div class="comments__form--control">
      <div class="comments__section--avatar">
        <AppButton :href="getLinkUser" class-names="link__avatar">
          <img :src="avatarAuthor" :alt="currentUser.name" />
        </AppButton>
      </div>
      <textarea name="" :placeholder="placeholder"></textarea>
    </div>
    <div class="text-right">
      <AppButton> Gửi </AppButton>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import { AppButton } from '@/components/common'
import { getUrlUser } from '~/helpers'

export default {
  components: {
    AppButton,
  },

  props: {
    placeholder: {
      type: String,
      default: 'Đển lại bình luận của bạn ...',
    },
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
  },
}
</script>

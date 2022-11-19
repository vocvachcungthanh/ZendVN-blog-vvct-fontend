<template>
  <AFormItem label="Tải lên ảnh đại diện">
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :custom-request="handleCustomRequest"
    >
      <img v-if="getAvatar" class="image-url" :src="getAvatar" alt="avatar" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">Tải ảnh đại diện</div>
      </div>
    </a-upload>
  </AFormItem>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      imageUrl: '',
      fileUpload: {
        file: null,
        base64: '',
      },
    }
  },

  computed: {
    ...mapGetters({
      avatarAuthor: 'author/avatarAuthor',
    }),

    getAvatar() {
      const base64 = this.fileUpload.base64
      const avatarAuthor = this.avatarAuthor

      if (base64) {
        return base64
      }

      if (avatarAuthor) {
        return avatarAuthor
      }

      return ''
    },
  },

  watch: {
    fileUpload() {
      const file = this.fileUpload.file

      if (file !== null) {
        this.$emit('onUpload', file)
      }
    },
  },

  methods: {
    validateImages(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

      if (!isJpgOrPng) {
        this.$message.error('Bạn chỉ được tải file jpg hoặc png!')
        return false
      }

      const isLt5M = file.size / 1024 / 1024 <= 5

      if (!isLt5M) {
        this.$notification.error({
          message: 'Có lỗi xảy ra',
          description: 'Hình ảnh phải nhỏ hơn 5MB!',
        })

        return false
      }

      return true
    },

    handleCustomRequest({ file }) {
      if (this.validateImages(file) === false) {
        return false
      }

      const reader = new FileReader()

      reader.addEventListener('load', () => {
        this.fileUpload = {
          file,
          base64: reader.result,
        }
      })

      reader.readAsDataURL(file)
    },
  },
}
</script>

<style>
@import url('~/assets/css/upload.css');
</style>

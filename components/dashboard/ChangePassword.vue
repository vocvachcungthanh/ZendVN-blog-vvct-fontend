<!-- eslint-disable camelcase -->
<template>
  <ARow :gutter="30">
    <ACol :span="12">
      <AForm :form="form">
        <AFormItem label="Mật khẩu cũ" has-feedback>
          <AInputPassword
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: 'Mật khẩu cũ bắt buộc phải nhập',
                  },
                ],
              },
            ]"
            size="large"
          />
        </AFormItem>
        <AFormItem label="Mật khẩu mới" has-feedback>
          <AInputPassword
            v-decorator="[
              'newPassword',
              {
                rules: [
                  {
                    required: true,
                    message: 'Mật khẩu mới là bắt buộc',
                  },
                  {
                    validator: validateToConfirmPassword,
                  },
                ],
              },
            ]"
            size="large"
          />
        </AFormItem>
        <AFormItem label="Nhập lại mật khẩu" has-feedback>
          <AInputPassword
            v-decorator="[
              'confirmNewPassword',
              {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng xác nhận mật khẩu của bạn',
                  },
                  {
                    validator: compareToNewPassword,
                  },
                ],
              },
            ]"
            size="large"
            @blur="handleConfirmBlur"
          />
        </AFormItem>
        <AFormItem>
          <AButton type="primary submit" @click="handleSubmit">
            <AppSVG
              v-if="isLoading"
              :icon="getIconLoading"
              class-names="loading"
            />
            <span> Đổi mật khẩu </span>
          </AButton>
        </AFormItem>
      </AForm>
    </ACol>
  </ARow>
</template>

<script>
import { mapActions } from 'vuex'

import { IconLoading } from '~/assets/images'
import { AppSVG } from '~/components/common'

export default {
  components: {
    AppSVG,
  },

  data() {
    return {
      isTouchedConfirmValue: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      isLoading: false,
    }
  },

  computed: {
    getIconLoading() {
      return IconLoading
    },
  },

  methods: {
    ...mapActions({
      actFetchChangePassword: 'author/actFetchChangePassword',
      actLogout: 'author/actLogout',
    }),
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.isLoading = true

          this.actFetchChangePassword(values).then((res) => {
            this.isLoading = false

            if (res.ok) {
              this.$notification.success({
                message: 'Thành công:',
                description: 'Thay đổi mật khẩu thành công',
              })

              this.actLogout()
            } else {
              this.$notification.error({
                message: 'Có lỗi:',
                description: res.error,
              })
            }
          })
        }
      })
    },

    handleConfirmBlur(e) {
      const value = e.target.value

      this.isTouchedConfirmValue = this.isTouchedConfirmValue || !!value
    },

    compareToNewPassword(rule, confirmNewPassword, callback) {
      const form = this.form

      if (
        confirmNewPassword &&
        confirmNewPassword !== form.getFieldValue('newPassword')
      ) {
        // eslint-disable-next-line node/no-callback-literal
        callback('Mật khẩu không khớp')
      } else {
        callback()
      }
    },

    validateToConfirmPassword(rule, newPassword, callback) {
      const form = this.form

      if (newPassword && this.isTouchedConfirmValue) {
        form.validateFields(['confirmNewPassword'], { force: true })
      }

      callback()
    },
  },
}
</script>

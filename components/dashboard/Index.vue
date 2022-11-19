<template>
  <AForm :form="form" @submit="handleSubmit">
    <ARow>
      <ACol :span="14" :offset="4">
        <ARow :gutter="30">
          <ACol :span="16">
            <AFormItem label="Email">
              <AInput
                v-decorator="[
                  'email',
                  {
                    initialValue: currentUser.email,
                  },
                ]"
                size="large"
                disabled
              />
            </AFormItem>
            <AFormItem label="UserName">
              <AInput
                v-decorator="[
                  'user_name',
                  {
                    initialValue: currentUser['user_name'],
                  },
                ]"
                size="large"
                disabled
              />
            </AFormItem>
            <AFormItem label="NickName">
              <AInput
                v-decorator="[
                  'nickname',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'nick-name bắt buộc phải nhập!',
                      },
                    ],
                    initialValue: currentUser.nickname,
                  },
                ]"
                size="large"
                placeholder="Nhập NickName ..."
              />
            </AFormItem>
            <AFormItem label="Họ và tên">
              <AInput
                v-decorator="[
                  'fullName',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Họ và tên bắt buộc nhập!',
                      },
                    ],

                    initialValue: getFullName,
                  },
                ]"
                size="large"
                placeholder="Nhập họ và tên ..."
              />
            </AFormItem>

            <AFormItem label="Ghi chú">
              <ATextarea
                v-decorator="[
                  'description',
                  { initialValue: currentUser.description },
                ]"
                :auto-size="{ minRows: 3 }"
                placeholder="Nhập ghi chú ..."
              />
            </AFormItem>
          </ACol>
          <ACol :span="8">
            <UploadDashboard @onUpload="handleUpload" />
          </ACol>
        </ARow>
        <AFormItem :wrapper-col="{ span: 24 }">
          <AButton type="primary" html-type="submit">
            <AppSVG
              v-if="isLoading"
              :icon="getIconLoading"
              class-names="loading"
            />
            Cập nhật thông tin
          </AButton>
        </AFormItem>
      </ACol>
    </ARow>
  </AForm>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import UploadDashboard from './UploadDashboard.vue'
import { AppSVG } from '~/components/common'
import { IconLoading } from '~/assets/images'

export default {
  name: 'IndexDashboardComponent',

  components: {
    UploadDashboard,
    AppSVG,
  },

  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      fileUpload: {
        file: null,
      },

      isLoading: false,
    }
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.author.currentUser,
    }),

    getFullName() {
      return `${this.currentUser.last_name} ${this.currentUser.first_name} `.trim()
    },

    getIconLoading() {
      return IconLoading
    },
  },

  methods: {
    ...mapActions({
      actFetchUploadProfile: 'author/actFetchUploadProfile',
    }),

    splitFullName(fullNameStr) {
      const arrFullName = fullNameStr.split(' ').filter((str) => str !== ' ')
      // eslint-disable-next-line camelcase
      const first_name = arrFullName.pop()
      // eslint-disable-next-line camelcase
      const last_name = arrFullName.join(' ')

      return {
        // eslint-disable-next-line camelcase
        first_name,
        // eslint-disable-next-line camelcase
        last_name,
      }
    },

    handleUpload(file) {
      this.fileUpload.file = file
    },

    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line camelcase
          const { first_name, last_name } = this.splitFullName(values.fullName)

          const data = {
            file: this.fileUpload.file,
            // eslint-disable-next-line camelcase
            first_name,
            // eslint-disable-next-line camelcase
            last_name,
            nickname: values.nickname,
            description: values.description,
          }

          this.isLoading = true

          this.actFetchUploadProfile(data).then((res) => {
            if (res.ok) {
              this.fileUpload = {
                file: null,
              }
              this.$notification.success({
                message: 'Thông báo cấp nhật !',
                description: 'Thành công ',
              })
            } else {
              this.$notification.error({
                message: 'Có lỗi xảy ra',
                description: res.error,
              })
            }
            this.isLoading = false
          })
        }
      })
    },
  },
}
</script>

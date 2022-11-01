<template>
  <div v-if="post" class="post-detail__head">
    <div class="tcl-container">
      <h1 class="post-detail__title">
        {{ post.title.rendered }}
      </h1>
      <ul class="post-detail__info">
        <li class="item author">
          Đăng bởi
          <a href="#"
            ><strong>{{ post.authorData.nickName }}</strong></a
          >
        </li>
        <li class="item date">
          {{ formatDay.format }} - {{ formatDay.relative }}
        </li>
        <li class="item views">
          {{ post.viewCount }} <i class="icons ion-ios-eye"></i>
        </li>
        <li class="item comments">
          {{ post.commentCount }} <i class="icons ion-ios-chatbubble"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: null,
    },
  },

  computed: {
    formatDay() {
      const created = this.post.date
      const createdDayjs = this.$dayjs(created)

      return {
        format: createdDayjs.format('HH:mm:ss DD/MM/YYYY'),
        relative: createdDayjs.fromNow(),
      }
    },
  },
}
</script>

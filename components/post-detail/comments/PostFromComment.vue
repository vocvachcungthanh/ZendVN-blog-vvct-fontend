<template>
  <div class="comments__form">
    <div class="comments__form--control">
      <div class="comments__section--avatar">
        <a href="#">
          <img src="/assets/images/avatar1.jpg" alt="" />
        </a>
      </div>
      <textarea name=""></textarea>
    </div>
    <div class="text-right">
      <AppButton> Gửi </AppButton>
    </div>
  </div>
</template>

<script>
import { AppButton } from '@/components/common'

export default {
  components: {
    AppButton,
  },
}
</script>

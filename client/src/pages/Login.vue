<script setup lang="js">
import LoginBox from '@/components/LoginBox.vue'
import {useRouter} from "vue-router";
import {watch} from "vue";
import {global} from "../global.js";

const router = useRouter()

watch(() => global.authToken, (newValue) => {
  if (newValue) {
    router.push('/')
  }
})
</script>

<template>
  <div class="login-page">
    <div class="heading">
      <h1>Welcome</h1>
    </div>
    <login-box></login-box>
  </div>
</template>

<style scoped lang="scss">
.login-page{
  @include v-flex;
  gap: 3.5rem;
  padding: 6rem 7.75rem;
}
</style>
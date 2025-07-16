<script setup lang="js">
import CoursesContainer from "@/components/CoursesContainer.vue"
import {global} from "../global.js"

async function logout(){
  const res = await fetch('/api/auth/logout', { method: 'POST' })

  if (res.ok) { global.authToken = false; alert('Logged out.') }
  else { console.error('Failed to log out: ' + res.status) }
}
</script>

<template>
<div class="courses-page">
  <header class="header">
    <nav class="navigation">
      <router-link v-if="!global.authToken" to="/login" class="link">Log-in</router-link>
      <a class="link" v-else @click.prevent="logout">Log-out</a>
    </nav>
  </header>
  <div class="heading-container">
    <h1>Courses</h1>
  </div>
  <courses-container></courses-container>
</div>
</template>

<style scoped lang="scss">
.courses-page {
  @include v-flex;
  padding: 4rem 7.75rem 8rem;
  gap: 3.5rem;
}

.header{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  height: 2.5rem;
}

.link{
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:hover{
    transition: text-shadow 0.2s ease-out;
    text-shadow: 0 0 0.05rem $text;
  }
}

.heading-container{
  @include center;
  height: 3.5rem;
  width: 100%;
}
</style>
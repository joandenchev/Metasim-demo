<script setup>
import {renewAccessToken} from "./global.js";
renewAccessToken()
</script>

<template>
  <RouterView/>
</template>

<style lang="scss">
*{
  margin: 0;
  box-sizing: border-box;
  letter-spacing: 0;
}
html{
  font-size: 16px;
}
body{
  color: $text;
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
}
button, input {
  font: inherit;
  color: inherit;
  line-height: inherit;
  border: none;
}
h1,h2,h4{
  color: $text;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
}
h1{
  font-size: 3rem;
}
h2{
  font-size: 1.5rem;
}
</style>

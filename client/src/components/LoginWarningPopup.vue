<script setup lang="js">
defineProps(['message'])
</script>

<template>
  <div class="popup">
    <p>{{message}}</p>
  </div>
</template>

<style scoped lang="scss">
.popup {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: $background;
  padding: 0.75em;
  border-radius: 1em;
  box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.15);
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    transform: translateX(-50%);
    border-width: 0.5em;
    border-style: solid;
    border-color: $background transparent transparent transparent;
  }
}
</style>
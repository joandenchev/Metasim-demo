<script setup lang="js">
import {ref, useAttrs} from "vue";

const image = ref()
const height = ref()
const alt = useAttrs().alt
defineProps(['asset'])

function setHeight(){
  height.value = `${image.value.naturalHeight/16}em`
}
</script>

<template>
  <div class="icon-box">
  <img :src="asset"
       ref="image"
       :alt="alt"
       @load="setHeight"
       class="resizable-vector"
  >
  </div>
</template>

<style lang="scss">
.resizable-vector {
  height: v-bind(height);
  width: auto;
}

.icon-box{
  @include center;
  position: absolute;
  height: 1.5em;
  width: 1.5em;
  right: 1em;

  &.-cursor-pointer{
    cursor: pointer;
  }
}


</style>
<script setup lang="js">
import {ref, watch} from "vue";
import Icon from "@/components/Icon.vue";
import searchIcon from "@/assets/search.svg"

const search = ref('')
const emit = defineEmits(['search'])

function debounce(fn, wait) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), wait)
  }
}

const debouncedSearch = debounce((search) => {
  emit('search', search);
}, 350);

function onSearchValueChange(newValue){
  debouncedSearch(newValue)
}

watch(search, onSearchValueChange)
</script>

<template>
  <div class="input-wrapper">
    <input autocomplete="off"
           placeholder="Search"
           type="text"
           v-model="search"
    />
    <icon :asset="searchIcon" alt="Search"/>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  justify-content: left;
}
</style>
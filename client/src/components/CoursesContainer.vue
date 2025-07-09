<!--suppress JSFileReferences -->
<script setup lang="js">
import Search from "@/components/Search.vue";
import CourseCard from "@/components/CourseCard.vue";
import {global, fetchAuth} from "@/global.js";
import {ref} from "vue";

const courses = ref([null])
loadCourses('')

// id === 0 means currently there is no card that's being edited
const activeCardId = ref(0)

function editStateChange(id) {
  activeCardId.value = id
}

async function submitChange(changes){
  activeCardId.value = 0
  try {
    const res = await fetchAuth('/api/edit', {
      headers: {'Content-Type': 'application/json'},
      method: 'PATCH',
      body: JSON.stringify(changes)
    })

    if (!res.ok){
      throw new Error(res.status)
    }
  } catch (e) {
    console.error(e)
    alert('Something went wrong. Changes haven\'t been saved.')
  }
}

async function loadCourses(search){
  const temp = [null]
  const res = await fetch('/api/courses', {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({search: search})
  })

  if (res.ok){
    temp.push(...(await res.json()))
  } else {
    console.error('Failed to load courses: ' + res.status)
  }
  courses.value = temp
}
</script>

<template>
  <div class="courses-container">
    <div class="search-container">
      <search @search="loadCourses"></search>
    </div>
    <div class="course-list">
      <course-card v-for="n in courses.length-1" :key="courses[n].id"
                   @enter-edit="editStateChange"
                   @submit-edit="submitChange"
                   :course="courses[n]"
                   :editable="!!global.authToken"
                   :any-current-edits="!!activeCardId"
      >
        <!-- cuts the edges oh horizontally oriented images, verticals are rendered with space around (not recommended to use) -->
        <img  v-if="courses[n].image" class="course-image" alt="No luck." :src="'/api/image/' +courses[n].image"/>
      </course-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.courses-container {
  @include v-flex;
  gap: 1.5em;
  width: 70.5em;
}

.search-container{
  background-color: $main;
  border-radius: 1.5em;
  padding: 0.75em 1em;
  height: 100%;
  width: 100%;
}

.course-list {
  padding: 0 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5em;
}

.course-image {
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>

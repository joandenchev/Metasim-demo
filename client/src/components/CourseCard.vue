<script setup lang="js">
import {ref} from "vue";
import Icon from "@/components/Icon.vue";
import edit from "@/assets/edit.svg"
import check from "@/assets/check.svg"

//expecting an object as course: { id, title, description }
const props = defineProps(['course', 'editable', 'anyCurrentEdits'])
const emit = defineEmits(['enter-edit', 'submit-edit'])
const editing = ref(false)
const courseTitle = ref()
const courseDescription = ref()

function enterEditing() {
  emit('enter-edit', props.course.id)
  editing.value = true
}

function submitEdit() {
  const newCourse = {
    id: props.course.id,
    title: courseTitle.value.textContent,
    description: courseDescription.value.textContent,
  }

  if (newCourse.title === props.course.title) {
    delete newCourse.title
  }
  if (newCourse.description === props.course.description) {
    delete newCourse.description
  }

  editing.value = false
  if (Object.keys(newCourse).length < 2){
    return
  }

  emit('submit-edit', newCourse)
}
</script>

<template>
  <div :class="[ 'course-card', { 'editing': editing }]">
    <icon v-if="editable"
          v-show="!anyCurrentEdits"
          @click="enterEditing"
          :asset="edit"
          alt="Edit icon"
          class="edit-icon"
    />
    <icon v-if="editable"
          v-show="editing"
          @click="submitEdit"
          :asset="check"
          alt="Ready changes icon"
          class="edit-icon done-edit-icon"
    />
    <div class="card-title-container">
      <h4 ref="courseTitle" :contenteditable="editing">{{course.title}}</h4>
    </div>
    <div class="card-image-container">
      <slot>
        <div class="default-image-container">
          <img src="@/assets/image.svg" alt="Image unavailable">
        </div>
      </slot>
    </div>
    <div class="card-description-container">
      <p ref="courseDescription" :contenteditable="editing">{{course.description}}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.course-card {
  @include v-flex;
  justify-content: center;
  position: relative;
  width: 20.5em;
  padding: 0.5em 1em 2em;
  gap: 1em;
  border-radius: 1em;
  background-color: $main;
  transition: background-color 0.15s ease;

  .edit-icon{
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s ease;
    cursor: pointer;
    right: 0.625em;
    top: 0.625em;
  }

  &:hover,
  &.editing {
    background-color: $courseHovered;

    .edit-icon{
      visibility: visible;
      opacity: 1;
    }
  }
}

.card-image-container {
  width: 17.5em;
  height: 13em;
  background-color: $imageCard;
  border-radius: 0.5em;
  overflow: hidden;

  &, .default-image-container{
    @include center;
  }
}

.card-title-container, .card-description-container {
  @include center;
  min-height: 3em;
  overflow: hidden;
  width: 100%;

  h4, p {
    text-align: center;
    min-width: 30%;
    outline: none;
  }

  h4 {
    font-size: 1.625em;
  }
}

.card-description-container {
  flex: 1;
}

.default-image-container{
  width: 4em;
  height: 4em;
}

</style>
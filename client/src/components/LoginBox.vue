<script setup lang="js">
import {computed, ref} from "vue";
import LoginWarningPopup from "@/components/LoginWarningPopup.vue";
import ResizableVector from "@/components/Icon.vue";

import drafts from '@/assets/drafts.svg'
import visibility from '@/assets/visibility.svg'
import visibilityOff from '@/assets/visibility_off.svg'
import {global} from "../global.js";

const validationSettings = {
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    warning: 'Please enter a valid email address!'
  },
  password: {
    regex: /\S{6,50}/,
    warning: 'Your password must be between 6 and 50 characters long!'
  }
}

const hidePassword = ref(true)
const email = ref('')
const password = ref('')
const formFocused = ref(false)

//Empty values are also considered valid in this logic. Although they cannot be submitted.
const validEmail = computed(()=>{
  return validationSettings.email.regex.test(email.value)
      || email.value === ''
})
const validPassword = computed(()=>{
  return validationSettings.password.regex.test(password.value)
      || password.value === ''
      || !validEmail.value
})
const loginButtonBackground = computed(()=>{
  return email.value !== '' && password.value !== '' && validEmail.value && validPassword.value ? 'active-login' : 'inactive-login'
})

function togglePasswordVisibility() {
  hidePassword.value = !hidePassword.value
}

function setFormFocused(value) {
  formFocused.value = value
}

function submitLogin() {
  setFormFocused(false)
  if (loginButtonBackground.value === 'active-login'){
    submitLoginRequest()
  }
}

async function submitLoginRequest() {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })

  if (!res.ok) {

    if (res.status === 401) {
      // IMPLEMENT BETTER WARNING
      alert('Wrong email or password.')
      email.value = ''
      password.value = ''
    } else {
      const error = await res.json()
      console.error(res.statusCode + ': error ' + error)
    }

  } else {
    const data = await res.json()
    global.authToken = data.accessToken
  }
}

</script>

<template>
<div class="login-box">
  <div class="heading">
    <h2>Let's get you logged-in</h2>
  </div>
  <form @keydown.enter="submitLogin"
        class="login-form">
    <div class="input-wrapper">
      <login-warning-popup
          v-if="!formFocused && !validEmail"
          :message="validationSettings.email.warning"
      ></login-warning-popup>
      <input autocomplete="on"
             placeholder="Your email"
             type="email"
             v-model="email"
             @focus="() => setFormFocused(true)"
             @blur="() => setFormFocused(false)"
      />
        <resizable-vector :asset="drafts" alt="E-mail icon"/>
    </div>

    <div class="input-wrapper">
      <login-warning-popup
          v-if="!formFocused && !validPassword"
          :message="validationSettings.password.warning"
      ></login-warning-popup>
      <input placeholder="Your password"
             autocomplete="on"
             :type="hidePassword ? 'password' : 'text'"
             v-model="password"
             @focus="() => setFormFocused(true)"
             @blur="() => setFormFocused(false)"
      />
        <resizable-vector alt="Reveal password icon"
                          class="-cursor-pointer"
                          :asset="visibility"
                          @click="togglePasswordVisibility"
                          v-show="hidePassword"/>

        <resizable-vector alt="Hide password icon"
                          class="-cursor-pointer"
                          :asset="visibilityOff"
                          @click="togglePasswordVisibility"
                          v-show="!hidePassword"/>
    </div>
  </form>
  <button :class="['login-button', loginButtonBackground]"
          @click="submitLogin"
  >Log-in</button>
</div>
</template>

<style lang="scss">
@use 'sass:color';

.login-box {
  background-color: $main;
  border-radius: 1.5em;
  padding: 4em;
  gap: 2.5em;

  &, .login-form{
    @include v-flex;
  }

  .heading{
    width: 23.75em;
    text-align: center;

    h2{
      font-size: 1.5em;
    }
  }
}

.login-form{
  gap: 1em;
}

.input-wrapper{
  @include center;
  position: relative;
  width: fit-content;

  input{
    background-color: $background;
    width: 23.75em;
    height: 3em;
    border-radius: 2em;
    padding: 0.5em 3.125em 0.5em 1em;
    color: $sharp;
    outline: none;

    &::placeholder {
      color: $sharp;
    }
  }
}

.login-button{
  border-radius: 2em;
  height: 2.5em;
  width: 7.75em;
}

.active-login{
  background-color: $background;
  &:hover{
    background-color: color.scale(#ffffff, $lightness: -5%);
    cursor: pointer;
  }
  &:active{
    background-color: color.scale(#ffffff, $lightness: -25%);
  }
}

.inactive-login{
  background-color: $loginInactive;
}
</style>
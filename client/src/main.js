import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import Courses from "./pages/Courses.vue";
import Login from "./pages/Login.vue";
import NotFound from "./pages/NotFound.vue";
import {global} from "./global.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Courses, meta: {title: 'Courses'}},
        {path: '/login', component: Login, meta: {title: 'Login'}, beforeEnter: blockLoginForLoggedUsers},
        {path: '/:catchAll(.*)', component: NotFound, meta: {title: 'Error 404'}},
    ]
})

router.beforeEach((to) => {
    document.title = to.meta.title
})

createApp(App).use(router).mount('#app')

function blockLoginForLoggedUsers(to, from, next) {
    if (global.authToken) next('/')
    else next()
}
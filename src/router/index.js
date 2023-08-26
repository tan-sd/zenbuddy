import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import JournalPage from "../pages/JournalPage.vue";

const routes = [
    {
        path: '/',
        name: 'ZenBuddy',
        component: HomePage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/journal',
        name: 'Journal',
        component: JournalPage
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to) => {
    document.title = to.name;
    // if (to.meta.needsAuth) {
    //     if(store.getters.isAuthenticated) {
    //         next();
    //     } else {
    //         next('/login')
    //     }
    // } else {
    //     next();
    // }
});

export default router
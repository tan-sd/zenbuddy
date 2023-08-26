import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import JournalPage from "../pages/JournalPage.vue";

const routes = [
    {
        path: "/",
        name: "ZenBuddy",
        component: HomePage,
    },
    {
        path: "/login",
        name: "Login",
        component: LoginPage,
    },
    {
        path: "/signup",
        name: "Sign Up",
        component: SignUpPage,
    },
    {
        path: "/journal",
        name: "Journal",
        component: JournalPage,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

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

export default router;

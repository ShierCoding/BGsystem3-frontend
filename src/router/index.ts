import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/about",
            name: "about",
            component: () => import("../views/AboutView.vue"),
        },
        {
            path: "/timer",
            name: "timer",
            component: () => import("../views/TimerView.vue"),
        },
        {
            path: "/error",
            name: "error",
            component: () => import("../views/ErrorView.vue"),
        }
    ]
});

export default router;

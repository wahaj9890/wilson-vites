import { createRouter, createWebHistory } from 'vue-router';
import auth from "./modules/auth"
import sideBarRoutes from './modules/sideBarRoutes';
import store from "../store/index"
const routes = [
    {
        // path: '/',
        // name: 'Home',
        // component: Home,
    },
    ...auth,
    ...sideBarRoutes
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('currentUser'))?.contactLogin?.token;
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/');
    } else {
        // Continue with navigation
        next();
    }
});
export default router;
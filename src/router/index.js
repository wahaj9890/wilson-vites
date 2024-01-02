import { createRouter, createWebHistory } from 'vue-router';
import auth from "./modules/auth"
import sideBarRoutes from './modules/sideBarRoutes';
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
    // Check if the route requires authentication and the user is not authenticated
    if (to.meta.requiresAuth && !isAuthenticated) {
        // Redirect to the login page or any other appropriate action
        next('/');
    } else {
        // Continue with navigation
        next();
    }
});
export default router;
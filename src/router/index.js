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

export default router;
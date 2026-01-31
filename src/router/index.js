import { createRouter,createWebHashHistory } from 'vue-router';
import basicRoutes from './routes/basic';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes: [
    ...basicRoutes
  ],
});

export default router;
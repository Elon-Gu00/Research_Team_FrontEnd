/**
 * @Author: Gyl
 * @Date: 2026-02-05 16:25:04
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-06 21:01:54
 * @Description:
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import basicRoutes from './routes/basic';
import adminRoute from './routes/admin';
import userRoutes from './routes/user';

import { AbortRequest } from '@/service/abortRequest';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes: [...basicRoutes, ...adminRoute, ...userRoutes],
});

router.beforeEach((to) => {
  const permissionStore = usePermissionStoreWithOutside();

  const userStore = useUserStoreWithOutside();
  const { isLogin } = storeToRefs(userStore);

  const abortRequest = new AbortRequest();
  abortRequest.removeAllAbort();

  const nextCallback = () => {
    permissionStore.changeActiveMenu(to.meta.activeMenu || to.path);
  };

  if (to.path === '/login') {
    if (isLogin.value) {
      return '/basic/index';
    }

    nextCallback();
  } else {
    if (isLogin.value) {
      nextCallback();
    } else {
      return '/login';
    }
  }
});

export default router;

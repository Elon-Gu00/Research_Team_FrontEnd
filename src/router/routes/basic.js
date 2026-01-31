const basicRoutes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404',
      hideBreadcrumb: true,
      hideTab: true,
    },
    component: () => import(`@views/notFound.vue`),
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hideBreadcrumb: true,
      hideTab: true,
    },
    component: () => import(`@views/login.vue`),
  },
  {
    path: '/basic',
    name: 'Basic',
    component: () => import(`@/layouts/index.vue`),
    redirect: '/basic/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '首页',
        },
        component: () => import(`@views/index.vue`),
      },
    ],
  },
];

export default basicRoutes;

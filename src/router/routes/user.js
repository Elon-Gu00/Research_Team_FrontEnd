/**
 * @Author: Gyl
 * @Date: 2026-02-06 15:27:21
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-24 14:45:57
 * @Description:
 */
const userRoutes = [
  {
    path: '/user',
    name: 'User',
    component: () => import(`@/layouts/index.vue`),
    children: [
      {
        path: 'paper',
        name: 'Paper',
        component: () => import(`@views/front/paper/paper.vue`),
      },
      {
        path: 'report',
        name: 'Report',
        component: () => import(`@views/front/report/report.vue`),
      },
      {
        path: 'send',
        name: 'Send',
        meta: {
          activeMenu: '/user/report',
        },
        component: () => import(`@views/front/report/send.vue`),
      },
      {
        path: 'team',
        name: 'Team',
        component: () => import(`@views/front/team/team.vue`),
      },
      {
        path: 'teamDetail',
        name: 'TeamDetail',
        meta: {
          activeMenu: '/user/team',
        },
        component: () => import(`@views/front/team/teamDetail.vue`),
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import(`@views/front/notice/notice.vue`),
      },
      {
        path: 'mine',
        name: 'Mine',
        component: () => import(`@views/front/mine/mine.vue`),
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import(`@views/front/search.vue`),
      },
      {
        path: 'newsDetail',
        name: 'NewsDetail',
        component: () => import(`@views/front/newsDetail.vue`),
      },
    ],
  },
];

export default userRoutes;

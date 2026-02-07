/**
 * @Author: Gyl
 * @Date: 2026-02-06 15:27:05
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-07 12:27:34
 * @Description:
 */
const adminRoute = [
  {
    path: '/manageSys',
    name: 'ManageSys',
    component: () => import(`@/layouts/index.vue`),
    children: [
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () => import(`@/views/managementSys/user/index.vue`),
      },
      {
        path: 'teamManagement',
        name: 'TeamManagement',
        component: () => import(`@/views/managementSys/team/index.vue`),
      },
      {
        path: 'teamMemberManagement',
        name: 'TeamMemberManagement',
        component: () => import(`@/views/managementSys/teamMember/index.vue`),
      },
      {
        path: 'paperManagement',
        name: 'PaperManagement',
        component: () => import(`@/views/managementSys/paper/index.vue`),
      },
      {
        path: 'newsManagement',
        name: 'NewsManagement',
        component: () => import(`@/views/managementSys/news/index.vue`),
      },
      {
        path: 'noticeManagement',
        name: 'NoticeManagement',
        component: () => import(`@/views/managementSys/notice/index.vue`),
      },
      {
        path: 'reportManagement',
        name: 'ReportManagement',
        component: () => import(`@/views/managementSys/report/index.vue`),
      },
    ],
  },
];

export default adminRoute;

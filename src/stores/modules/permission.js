/**
 * @Author: Gyl
 * @Date: 2026-02-05 21:19:08
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-06 20:00:52
 * @Description:
 */
import store from '..';

export const usePermissionStore = defineStore(
  'permission',
  () => {
    const menuList = ref([]);
    const activeMenu = ref('');
    const isCollapse = ref(false);

    const changeCollapse = (data) => {
      isCollapse.value = data;
    };

    const changeActiveMenu = (data) => {
      activeMenu.value = data;
    };

    const saveMenu = (data) => {
      menuList.value = [
        ...[
          {
            label: 'basic',
            path: '/basic/index',
            name: '首页',
            keepAlive: '0',
            icon: 'icon-appstore-fill',
          },
        ],
        ...data,
      ];
    };
    return {
      menuList,
      activeMenu,
      isCollapse,
      changeCollapse,
      changeActiveMenu,
      saveMenu,
    };
  },
  {
    persist: {
      key: 'pms',
    },
  },
);

export const usePermissionStoreWithOutside = () => usePermissionStore(store);

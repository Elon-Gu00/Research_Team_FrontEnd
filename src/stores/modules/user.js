/**
 * @Author: Gyl
 * @Date: 2026-02-05 16:25:04
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-24 14:36:16
 * @Description: 用户相关store
 */
import store from '..';

export const useUserStore = defineStore(
  'user',
  () => {
    const isLogin = ref(false);
    const loginData = ref({
      token: '',
      username: '',
    });

    const userInfo = ref({
      avatar: '',
      name: '',
      userId: '',
      userType: '',
      msgCount: 1000,
    });

    const getToken = computed(() => loginData.value.token);

    const isTeacher = computed(() => userInfo.value.userType === 'TEACHER');

    const isAdmin = computed(() => userInfo.value.userType === 'ADMIN');

    const saveLoginData = (data) => {
      isLogin.value = true;
      loginData.value = JSON.parse(JSON.stringify(data));
    };

    const setName = (data) => {
      userInfo.value.name = data;
    };

    const saveUserInfo = (data) => {
      Object.assign(userInfo.value, { ...data });
    };

    return {
      isLogin,
      loginData,
      userInfo,
      getToken,
      isTeacher,
      isAdmin,
      setName,
      saveLoginData,
      saveUserInfo,
    };
  },
  {
    persist: {
      key: 'us',
    },
  },
);

export const useUserStoreWithOutside = () => useUserStore(store);

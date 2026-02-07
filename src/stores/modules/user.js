/**
 * @Author: Gyl
 * @Date: 2026-02-05 16:25:04
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-05 21:48:06
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

    const saveLoginData = (data) => {
      isLogin.value = true;
      loginData.value = JSON.parse(JSON.stringify(data));
    };

    const saveUserInfo = (data) => {
      Object.assign(userInfo.value, { ...data });
    };

    return {
      isLogin,
      loginData,
      userInfo,
      getToken,
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

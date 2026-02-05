import store from '..';

export const useUserStore = defineStore(
  'user',
  () => {
    const isLogin = ref(false);
    const loginData = ref({
      access_token: '',
      username: '',
    });

    const userInfo = ref({
      avatar: '',
      name: '',
      userId: '',
      msgCount: 1000,
    });

    const getToken = computed(() => loginData.value.access_token);

    const saveLoginData = (data) => {
      isLogin.value = true;
      loginData.value = JSON.parse(JSON.stringify(data));
    };

    const saveUserInfo = (data) => {};

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
      key: 'user',
    },
  },
);

export const useUserStoreWithOutside = () => useUserStore(store);

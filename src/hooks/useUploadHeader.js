export const useUploadHeaders = (path = '') => {
  const userStore = useUserStoreWithOutside();
  const { loginData } = storeToRefs(userStore);

  const uploadPath = ref(`${import.meta.env.VITE_BASE_SERVICE_URL + path}`);

  const uploadHeaders = ref({
    Authorization: loginData.value.token || '',
  });

  return {
    uploadPath,
    uploadHeaders,
  };
};

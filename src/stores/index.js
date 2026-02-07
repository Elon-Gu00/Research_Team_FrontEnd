/**
 * @Author: Gyl
 * @Date: 2026-02-06 21:31:42
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-07 12:56:36
 * @Description:
 */
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { parse, stringify } from 'zipson';
import { queryDataType } from '@/utils';

const store = createPinia();

store.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state));

  store.$reset = () => {
    store.$patch((state) => {
      for (const key in state) {
        state[key] =
          queryDataType(initialState[key]) === 'Undefined'
            ? null
            : JSON.parse(JSON.stringify(initialState[key]));
      }
    });
  };
});

store.use(
  createPersistedState({
    storage: sessionStorage,
    serializer: {
      deserialize: parse,
      serialize: stringify,
    },
  }),
);

export default store;

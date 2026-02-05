import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { parse, stringify } from 'zipson';

const store = createPinia();

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
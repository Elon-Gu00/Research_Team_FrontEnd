/**
 * @Author: Gyl
 * @Date: 2026-01-07 10:50:11
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-06 20:28:24
 * @Description:
 */

import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import router from './router';

import './assets/style/index.scss';

import App from './App.vue';

import store from './stores';

const app = createApp(App);

app.use(store);

app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(router);

app.mount('#app');

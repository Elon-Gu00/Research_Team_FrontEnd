/**
 * @Author: Gyl
 * @Date: 2026-01-07 10:50:11
 * @LastEditors: Gyl
 * @LastEditTime: 2026-01-07 11:14:47
 * @Description:
 */

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());

app.use(ElementPlus);

app.mount('#app');

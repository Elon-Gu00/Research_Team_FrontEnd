/**
 * @Author: Gyl
 * @Date: 2026-01-07 10:50:11
 * @LastEditors: Gyl
 * @LastEditTime: 2026-01-27 15:48:38
 * @Description:
 */
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const pathResolve = (dir) => fileURLToPath(new URL(dir, import.meta.url));

const createProxy = (data) => {
  const proxyObj = {};

  data.map(({ proxyKey, target, ws }) => {
    proxyObj[proxyKey] = {
      target,
      changeOrigin: true,
      secure: false,
      ws: ws ?? false,
      rewrite: (path) => path.replace(new RegExp(`^${proxyKey}`), ''),
    };
  });

  return proxyObj;
};

export default defineConfig({
  css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/mixin.scss";'
        },
      },
    },
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      dirs: [
        './src/hooks/**',
        './src/service/api/*',
        './src/settings/*',
        './src/stores/modules',
        './src/utils/*',
      ],
      dts: 'auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: 'components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
        '@': pathResolve('./src'),
        '@images': pathResolve('./src/assets/images'),
        '@components': pathResolve('./src/components'),
        '@views': pathResolve('./src/views'),
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: createProxy([
      {
        proxyKey: '/api',
        target: 'http://localhost:8080/',
      },
    ]),
  },
});

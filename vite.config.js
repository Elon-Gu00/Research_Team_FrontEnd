/**
 * @Author: Gyl
 * @Date: 2026-01-07 10:50:11
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-05 20:50:48
 * @Description:
 */
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

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
        additionalData: `@use "@/assets/style/variables.scss" as *;
            @use "@/assets/style/mixin.scss" as *;`,
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
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'auto-imports.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      dts: 'components.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
        IconsResolver({
          prefix: 'icon',
        }),
      ],
    }),
    Icons({
      autoInstall: true,
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
        target: 'http://localhost:8081/api/',
      },
    ]),
  },
});

//import { fileURLToPath, URL } from 'node:url'

//import { defineConfig } from 'vite'
//import vue from '@vitejs/plugin-vue'
//import vueJsx from '@vitejs/plugin-vue-jsx'
//import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
//export default defineConfig({
//  plugins: [
//    vue(),
//    vueJsx(),
//    vueDevTools(),
//  ],
 // resolve: {
//    alias: {
//      '@': fileURLToPath(new URL('./src', import.meta.url))
//    }
//  }
//})

//import { defineConfig } from 'vite'
//import vue from '@vitejs/plugin-vue'

//export default defineConfig({
  //plugins: [vue()],
  //base: '/your-base-url/', 
//})

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 配置别名
    },
  },
});


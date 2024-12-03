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

//import { defineConfig } from 'vite';
//import vue from '@vitejs/plugin-vue';
//import path from 'path';

//export default defineConfig({
  //plugins: [vue()],
  //resolve: {
    //alias: {
      //'@': path.resolve(__dirname, 'src'), // 配置别名
    //},
  //},
//});

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
  server: {
    // 添加代理配置
    proxy: {
      '/api': {  // 这里的 '/api' 是你请求的前缀，可以根据实际需求修改
        target: 'http://localhost:8012', // 目标服务器地址
        changeOrigin: true,  // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径，去掉 '/api' 前缀
      }
    }
  }
});
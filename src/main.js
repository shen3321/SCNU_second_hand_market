import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'
import axios from 'axios';

// 配置 axios 默认值
axios.defaults.baseURL = 'http://localhost:8012';
axios.defaults.timeout = 5000; // 5秒超时
axios.defaults.headers.common['Content-Type'] = 'application/json';

// 请求拦截器
axios.interceptors.request.use(config => {
  console.log('发送请求:', config);
  return config;
});

// 响应拦截器
axios.interceptors.response.use(
  response => {
    console.log('收到响应:', response);
    return response;
  },
  error => {
    console.log('请求错误:', error);
    return Promise.reject(error);
  }
);

const app = createApp(App)

app.use(router)

app.mount('#app')

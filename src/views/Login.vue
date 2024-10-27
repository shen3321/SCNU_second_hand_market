<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" required />
        </div>
  
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
  
        <button type="submit" :disabled="loading">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  // 用于导航页面
  const router = useRouter();
  
  // 变量
  const username = ref('');
  const password = ref('');
  const loading = ref(false);
  const error = ref('');
  
  // 登录处理函数
  const handleLogin = async () => {
    loading.value = true;
    error.value = '';
  
    try {
      // 发送登录请求
      const response = await axios.post('/api/login', {
        username: username.value,
        password: password.value
      });
  
      // 获取token并存储
      const token = response.data.token;
      localStorage.setItem('jwt_token', token);
  
      // 导航到其他页面，如首页
      router.push('/MainPage');
    } catch (err) {
      error.value = 'Login failed. Please check your credentials.';
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ccc;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  
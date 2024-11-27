<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>登录</h2>
      <div class="form-group">
        <input 
          v-model="username" 
          type="text" 
          placeholder="用户名"
          required
        />
      </div>
      <div class="form-group">
        <input 
          v-model="password" 
          type="password" 
          placeholder="密码"
          required
        />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? '登录中...' : '登录' }}
      </button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await axios.post('http://localhost:8012/user/login', {
      username: username.value,
      password: password.value
    });

    console.log('Login response:', response.data);

    const { token } = response.data;
    if (token) {
      // 保存 token
      localStorage.setItem('token', token);
      
      // 解析 token 中的用户信息（JWT的payload部分）
      const payload = JSON.parse(atob(token.split('.')[1]));
      localStorage.setItem('userid', payload.userID);
      localStorage.setItem('username', payload.username);
      
      console.log('Stored user info:', {
        token: localStorage.getItem('token'),
        userid: localStorage.getItem('userid'),
        username: localStorage.getItem('username')
      });

      // 登录成功，跳转到主页
      router.push('/mainpage');
    } else {
      error.value = '登录失败：未收到有效的token';
    }
  } catch (err) {
    console.error('Login error:', err);
    if (err.response?.status === 400) {
      error.value = err.response.data.message || '用户名或密码错误';
    } else if (err.response?.status === 500) {
      error.value = '服务器错误，请稍后重试';
    } else {
      error.value = '登录失败，请稍后重试';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #cccccc;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
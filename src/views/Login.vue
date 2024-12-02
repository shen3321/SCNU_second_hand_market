<template>
  <div class="page">
    <!-- 左侧内容 -->


    <!-- 右侧内容 -->
    <div class="right-section">
      <div class="content-wrapper"></div>
      <!-- 标题文字 -->
      <div class="heading-text">
        <h1>Secondhand Market for SCNU</h1>
      </div>

      <!-- 登录表单 -->
      <form @submit.prevent="handleLogin" class="login-form">
        <input
          v-model="username"
          type="text"
          placeholder="userID"
          required
          class="input"
        />
        <input
          v-model="password"
          type="password"
          placeholder="password"
          required
          class="input"
        />
        <button type="submit" :disabled="loading" class="login-button">
          {{ loading ? '登录中...' : 'Login' }}
        </button>
        <div v-if="error" class="error-message">{{ error }}</div>
      </form>
    </div>
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

    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      localStorage.setItem('userid', payload.userID);
      localStorage.setItem('username', payload.username);
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
.page {
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
}

/* 左侧样式 */
.left-section {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.vue-logo {
  width: 80px;
  height: 80px;
}

.title {
  color: #00dc82;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.subtitle {
  color: #00dc82;
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

.access-text {
  color: #666;
  margin: 1rem 0;
}

.nav-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.link {
  color: #00dc82;
  text-decoration: none;
}

/* 右侧样式 */
.right-section {
  flex: 1;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
}

.heading-text {
  text-align: right;
  margin-bottom: 2rem;
}

.heading-text h1 {
  font-size: 2.5rem; /* 调小字体大小 */
  color: #1e293b;
  margin: 0;
  line-height: 1.2;
  font-weight: bold;
}

.login-form {
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  border-color: #00dc82;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #00dc82;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #00b368;
}

.login-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc2626;
  text-align: center;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .page {
    flex-direction: column;
  }
  
  .right-section {
    align-items: center;
    padding: 2rem;
  }
  
  .heading-text {
    text-align: center;
  }
}
</style>
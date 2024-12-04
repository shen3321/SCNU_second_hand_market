<template>
  <div class="page">
    <!-- 图片和文字层 -->
    <div class="content-layer">
      <div class="flex-col justify-start relative">
        <div class="flex-col justify-start items-end relative group">
          <img
            class="image_2"
            src="https://ide.code.fun/api/image?token=674e990e797f850011f0bb5e&name=9069848f3d9f03f32bcfe26a12c0a769.png"
          />
          <img
            class="image pos"
            src="https://ide.code.fun/api/image?token=674e990e797f850011f0bb5e&name=132b0477f252dd3e870f31fd89308e67.png"
          />
        </div>
        <span class="font text pos_2">
          SCNU
          <br />
        </span>
        <span class="font text_2 pos_3">
          second-hand market trading platform
          <br />
        </span>
        <span class="font text_3 pos_4">trading platform</span>
        <img
          class="image_3 pos_5"
          src="https://ide.code.fun/api/image?token=674e990e797f850011f0bb5e&name=b45be9a6f23996db56bd72c2afec2ec5.png"
        />
      </div>
    </div>

    <!-- 登录表单层 -->
    <div class="form-layer">
      <div class="right-section">
        <div class="heading-text">
          <h1>Secondhand Market for SCNU</h1>
        </div>
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
  width: 100vw;
  height: 100vh;    /* 改为固定100vh */
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  z-index: 1;
  overflow: hidden; /* 改为hidden避免滚动 */
}

.content-layer {
  position: relative;
  z-index: 2;
}

.form-layer {
  position: relative;
  z-index: 3;
}

.image {
  height: 100vh;  /* 使用视口高度 */
  position: absolute;
  right: 0;
  top: 0;
  object-fit: cover; /* 确保图片合适地填充空间 */
}

.group { 
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.image_2 {
 width: 20.06rem;
 height: 6.13rem;
 position: fixed;    /* 改为 fixed */
 right: 0;
 top: 1;
 z-index: 10;       /* 确保在其他元素上层 */

}

.font {
  font-size: 2.25rem;
  font-family: OpenSans;
  line-height: 2.69rem;
  color: #000000;
}

.text {
  position: fixed;
  right: 4%;      /* 距右侧距离 */
  top: 700%;        /* 放在上半部分 */
  font-size: 15rem;
  font-family: OpenSans;
  line-height: 2.69rem;
  color: #000000;
  z-index: 5;
}

.text_2 {
  position: fixed;
  right: 3%;      /* 距右侧距离 */
  top: 1500%;        /* 放在上半部分 */
  font-size: 2.5rem;
  font-family: OpenSans;
  line-height: 2.69rem;
  color: #000000;
  z-index: 5;
}

.image_3 {
 position: fixed;    /* 改为 fixed */
 right: 17%;
 top: 1200%;
 z-index: 10; 
  width: 4.69rem;
  height: 4.5rem;
}

.text_3 {
  margin-top: 41.88rem;
  color: #136dd4;
  font-size: 0.75rem;
  font-family: GFSDidot;
  line-height: 0.88rem;
  width: 12.25rem;
}

/* 登录表单样式 */
.right-section {
  position: fixed;  /* 改用 fixed 定位 */
  bottom: 180px;    /* 设置具体的底部距离 */
  right: 7%;
  transform: none; /* 移除任何 transform */
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  background: white
}

.heading-text h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 500px;    /* 固定宽度 */
}

.input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.login-button {
  padding: 0.8rem;
  background-color: #136dd4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.login-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 0.5rem;
  text-align: center;
}

.pos {
  position: absolute;
}

.pos_2 {
  position: absolute;
}

.pos_3 {
  position: absolute;
}

.pos_4 {
  position: absolute;
}

.pos_5 {
  position: absolute;
}
</style>
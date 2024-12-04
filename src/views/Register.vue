<template>
  <div class="flex-col page">
    <div class="flex-row justify-center items-center group">
      <div class="flex-col justify-start text-wrapper">
        <span class="text">SCNU-Second-hand market trading website</span>
      </div>
      <div class="flex-row group_3">
        <span class="shrink-0 font text_2">Home Page</span>
        <span class="shrink-0 font text_3">User registration interface</span>
        <span class="shrink-0 font text_4">User uploads product interface</span>
        <span class="shrink-0 font text_5">Commodity information interface</span>
      </div>
      <div class="flex-row items-center group_2">
        <div class="flex-row items-center shrink-0 section">
          <img
            class="shrink-0 image_2"
            src="https://ide.code.fun/api/image?token=674e990e797f850011f0bb5e&name=af955cc56be6df299516f20b856c52d8.png"
          />
          <span class="ml-10 font text_6">Search book</span>
        </div>
        <div class="ml-24 flex-col justify-start items-center shrink-0 text-wrapper_2">
          <span class="font text_7">Search</span>
        </div>
        <img
          class="ml-24 shrink-0 image"
          src="https://ide.code.fun/api/image?token=674e990e797f850011f0bb5e&name=46d156bdf4c3ef9e8eb69ea68959da75.png"
        />
      </div>
    </div>
    <div class="flex-col group_4">
      <div class="flex-col items-center self-stretch">
        <img
          class="image_3"
          src="https://ide.code.fun/api/image?token=674e990e797f850011f0bb5e&name=863d43c1fedcf02d2d5c3f61956d9b43.png"
        />
        <img
          class="image_4"
          src="https://ide.code.fun/api/image?token=674e990e797f850011f0bb5e&name=fd6e56d5b6a4975e77971cf3734e9f4b.png"
        />
        <span class="text_8">User Registration</span>
      </div>
      <span class="self-center text_9 mt-13">Welcome to register for SCNU-Second-hand market trading website</span>
    </div>
    <div class="form-container">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="username">Username:</label>
          <input v-model="formData.username" id="username" type="text" required />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="formData.password" id="password" type="password" required />
        </div>

        <div class="form-group">
          <label for="realName">Real Name:</label>
          <input v-model="formData.realName" id="realName" type="text" required />
        </div>

        <div class="form-group">
          <label for="phoneNumber">Phone Number:</label>
          <input v-model="formData.phoneNumber" id="phoneNumber" type="text" required />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="formData.email" id="email" type="email" required />
        </div>

        <button type="submit">Register</button>
      </form>

      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'RegisterForm',
    setup() {
      const formData = ref({
        username: '',
        password: '',
        realName: '',
        phoneNumber: '',
        email: ''
      });
  
      const message = ref('');
  
      const registerUser = async () => {
        try {
          const response = await fetch('http://localhost:8012/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData.value),
          });
  
          const result = await response.json();
  
          if (response.ok) {
            message.value = 'User registered successfully';
          } else {
            message.value = result.message || 'Registration failed';
          }
        } catch (error) {
          message.value = 'An error occurred. Please try again later.';
        }
      };
  
      return {
        formData,
        message,
        registerUser,
      };
    },
  };
  </script>
  
  <style scoped>
  .group {
  padding: 0.44rem 5rem;
}
.page {
  width: 100vw;           /* 铺满整个视口宽度 */
  min-height: 100vh;      /* 铺满整个视口高度 */
  position: fixed;        /* 固定定位 */
  top: 0;
  left: 0;
  background: white;      /* 白色背景 */
  z-index: 999;          /* 确保在最上层 */
  overflow-y: auto;      /* 内容超出时可滚动 */
}
.image {
  width: 100%;
  height: 200px;       /* 固定高度 */
  object-fit: cover;   /* 图片填充 */
}
.group { 
  width: 90%;           /* 内容区域宽度 */
  max-width: 800px;     /* 最大宽度限制 */
  margin: 0 auto;       /* 水平居中 */
  padding: 20px;
}
.text-wrapper {
  padding: 0.25rem 0 0.5rem;
  border-radius: 0.38rem;
  width: 26.63rem;
  height: 2.38rem;
}
.text {
  margin-left: 0.13rem;
  margin-right: 1.13rem;
  color: #1d2129;
  font-size: 1.38rem;
  font-family: Kalam;
  font-weight: 700;
  line-height: 1.63rem;
}
.group_3 {
  margin-left: 3.88rem;
}
.group_2 {
  margin-left: 4.25rem;
}
.section {
  padding: 0.63rem 1rem 0.25rem;
  background-color: #ffffff;
  border-radius: 18.25rem;
  overflow: hidden;
  width: 12.5rem;
  height: 2.5rem;
  border-left: solid 0.063rem #0000000d;
  border-right: solid 0.063rem #0000000d;
  border-top: solid 0.063rem #0000000d;
  border-bottom: solid 0.063rem #0000000d;
}
.image_2 {
  width: 1rem;
  height: 1rem;
}
.font {
  font-size: 1rem;
  font-family: HarmonyOSSansSC;
  line-height: 1.5rem;
  color: #1d2129;
}
.text_5 {
  margin-left: 3.13rem;
  width: 14.5rem;
}
.text_4 {
  margin-left: 2.69rem;
  width: 13.06rem;
}
.text_3 {
  margin-left: 2.13rem;
  width: 11.25rem;
}
.text_2 {
  width: 5.13rem;
}
.image_3 {
  width: 100vw;
  height: 16.6667vw;
}
.image_4 {
  width: 7.31rem;
  height: 8.06rem;
}
.text_6 {
  margin-right: 3.13rem;
  color: #86909c;
  width: 5.63rem;
}
.text-wrapper_2 {
  padding: 0.88rem 0;
  background-color: #0000ff;
  border-radius: 2.5rem;
  width: 6.13rem;
  height: 2.5rem;
}
.text_7 {
  color: #ffffff;
  line-height: 0.77rem;
}
.text_8 {
  margin-top: 0.38rem;
  color: #1d2129;
  font-size: 3rem;
  font-family: HarmonyOSSansSC;
  font-weight: 700;
  line-height: 3.5rem;
  text-align: center;
  word-break: break-all;
}
.image {
  width: 1.31rem;
  height: 1.5rem;
}
.mt-13 {
  margin-top: 0.81rem;
}
.text_9 {
  color: #1d2129;
  font-size: 1.13rem;
  font-family: HarmonyOSSansSC;
  line-height: 1.70rem;
  text-align: center;
  word-break: break-all;
  width: 29.19rem;
}
.form-container {
  width: 90%;
  max-width: 500px;  /* 控制表单最大宽度 */
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;  /* 标签和输入框垂直排列 */
  gap: 8px;  /* 标签和输入框之间的间距 */
}

.form-group label {
  color: #1d2129;
  font-size: 1rem;
  font-family: HarmonyOSSansSC;
}

.form-group input {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
}

button[type="submit"] {
  width: 100%;
  padding: 12px;
  background-color: #0000ff;
  color: white;
  border: none;
  border-radius: 2.5rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
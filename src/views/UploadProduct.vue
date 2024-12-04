<template>
  <div class="flex-col items-center page">
    <img class="image" src="https://ide.code.fun/api/image?token=674db9f7797f850011f0abd4&name=02aed37438504658b73bfd1923869bfe.png" />
    <div class="flex-col group mt-11">
      <span class="self-center text">Upload Product</span>
      <div class="flex-col self-center group_2">
        <span class="self-stretch text_2">Please fill in the information below to show what you are selling</span>
        <img class="self-center image_2" src="https://ide.code.fun/api/image?token=674db9f7797f850011f0abd4&name=9f9d45fc10c50f352d4714bc2d59d9be.png" />
      </div>

      <div class="grid">
        <div class="flex-col grid-item">
          <span class="self-start font text_3">Product-name</span>
          <div class="mt-12 text-wrapper">
            <input v-model="title" type="text" placeholder="Input content..." :disabled="loading" class="font_2 text_4" />
          </div>
        </div>
        <div class="flex-col grid-item">
          <span class="self-start font text_3">Email</span>
          <div class="mt-12 text-wrapper">
            <input v-model="email" type="email" placeholder="Input content..." :disabled="loading" class="font_2 text_4" />
          </div>
        </div>
        <div class="flex-col grid-item">
          <span class="self-start font text_3">Price</span>
          <div class="mt-12 text-wrapper">
            <input v-model="price" type="number" step="0.01" min="0" placeholder="Input content..." :disabled="loading" class="font_2 text_4" />
          </div>
        </div>
        <div class="flex-col grid-item">
          <span class="self-start font text_3">Address</span>
          <div class="mt-12 text-wrapper">
            <input v-model="address" type="text" placeholder="Input content..." :disabled="loading" class="font_2 text_4" />
          </div>
        </div>
      </div>

      <div class="flex-col self-stretch group_3">
        <span class="self-start font_3 text_5">Introduction to your product</span>
        <div class="flex-col items-start self-stretch section mt-7">
          <textarea v-model="description" placeholder="Input content..." :disabled="loading" class="font_2 text_6"></textarea>
        </div>
      </div>

      <div class="flex-col self-stretch group_4">
        <div class="flex-row">
          <div class="flex-col justify-start items-center text-wrapper_2">
            <span class="font_4 text_8">Household stuff</span>
          </div>
          <div class="flex-col justify-start items-center text-wrapper_3 ml-7">
            <span class="font_4 text_9">Digital products</span>
          </div>
          <div class="flex-col justify-start items-center text-wrapper_4 ml-7">
            <span class="font_5">Clothes</span>
          </div>
          <div class="flex-col justify-start items-center text-wrapper_4 ml-7">
            <span class="font_5">Book</span>
          </div>
          <div class="flex-col justify-start items-center text-wrapper_3 ml-7">
            <span class="font_4 text_10">Sport equipmet</span>
          </div>
        </div>
        <div class="mt-8 flex-row">
          <div class="flex-col justify-start items-center text-wrapper_2">
            <span class="font_4 text_11">Kitchen stuff</span>
          </div>
          <div class="flex-col justify-start items-center text-wrapper_2 ml-7">
            <span class="font_4 text_12">Outdoor stuff</span>
          </div>
          <div class="flex-col justify-start items-center text-wrapper_2 ml-7">
            <span class="font_4 text_13">Office supplies</span>
          </div>
          <div class="flex-col justify-start items-center text-wrapper_3 ml-7">
            <span class="font_4 text_14">Pet accessories</span>
          </div>
          <div class="flex-col justify-start items-center text-wrapper_4 ml-7">
            <span class="font_5">Others</span>
          </div>
        </div>
      </div>

      <div class="flex-col justify-start items-center self-stretch text-wrapper_5" 
           @click="handleUpload" 
           :class="{ 'disabled': loading }">
        <span class="text_15">{{ loading ? '上传中...' : 'UPLOAD' }}</span>
      </div>
    </div>

    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="message" class="success-message">{{ message }}</div>

    <input 
      id="image" 
      type="file" 
      @change="handleFileChange" 
      accept="image/*" 
      :disabled="loading"
      style="display: none"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


const title = ref('');
const description = ref('');
const price = ref('');
const image = ref(null);
const loading = ref(false);
const message = ref('');
const error = ref('');
const userid = ref('');
const username = ref('');
const email = ref('');
const address = ref('');

onMounted(() => {
  const storedUserId = localStorage.getItem('userid');
  const storedUsername = localStorage.getItem('username');
  
  if (!storedUserId || !storedUsername) {
    error.value = '请先登录';
    return;
  }
  
  userid.value = storedUserId;
  username.value = storedUsername;
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      error.value = '只支持 JPG, PNG 或 GIF 格式的图片';
      event.target.value = '';
      return;
    }
    
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      error.value = '图片大小不能超过 5MB';
      event.target.value = '';
      return;
    }
    
    image.value = file;
  }
};

const handleUpload = async () => {
  try {
    message.value = '';
    error.value = '';
    
    if (!title.value?.trim()) {
      error.value = '请输入商品标题';
      return;
    }
    if (!description.value?.trim()) {
      error.value = '请输入商品描述';
      return;
    }
    if (!price.value || isNaN(Number(price.value)) || Number(price.value) <= 0) {
      error.value = '请输入有效的价格';
      return;
    }
    if (!image.value) {
      error.value = '请选择商品图片';
      return;
    }
    if (!userid.value || !username.value) {
      error.value = '用户未登录，请先登录';
      return;
    }
    
    loading.value = true;

    const formData = new FormData();
    formData.append('title', title.value.trim());
    formData.append('description', description.value.trim());
    formData.append('price', Number(price.value));
    formData.append('image', image.value);
    formData.append('userid', userid.value);
    formData.append('username', username.value);
    formData.append('email', email.value?.trim() || '');
    formData.append('address', address.value?.trim() || '');
    formData.append('status', 'unsold');

    const response = await axios.post(
      'http://localhost:8012/products/newproduct',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000,
      }
    );

    if (response.data) {
      message.value = '商品上传成功！';
      title.value = '';
      description.value = '';
      price.value = '';
      email.value = '';
      address.value = '';
      image.value = null;
      const fileInput = document.querySelector('#image');
      if (fileInput) fileInput.value = '';
    }
    
  } catch (err) {
    console.error('Upload error:', err);
    
    if (err.response) {
      error.value = `上传失败: ${err.response.data?.message || err.response.statusText || '服务器错误'}`;
    } else if (err.request) {
      error.value = '服务器无响应，请稍后重试';
    } else {
      error.value = '上传出错: ' + err.message;
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.mt-11 { margin-top: 0.69rem; }
.mt-7 { margin-top: 0.44rem; }
.mt-112 { margin-top: 7rem; }
.ml-7 { margin-left: 0.44rem; }
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
.text {
  color: #1d2129;
  font-size: 3rem;
  font-family: HarmonyOSSansSC;
  font-weight: 700;
  line-height: 3.5rem;
  text-align: center;
  width: 22.63rem;
}
.group_2 {
  margin-top: 0.88rem;
  width: 27.31rem;
}
.text_2 {
  color: #1d2129;
  font-size: 1.13rem;
  font-family: HarmonyOSSansSC;
  line-height: 1.75rem;
  text-align: center;
}
.image_2 {
  width: 3.63rem;
  height: 3.88rem;
}
.grid {
  height: 12.57rem;
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-columns: repeat(2, minmax(0, 1fr));
  row-gap: 0;
  column-gap: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* 响应式网格 */
  gap: 1rem;
  width: 100%;
}
.grid-item {
  padding: 0.75rem 0;
  width: 21.88rem;
}
.font {
  font-size: 1rem;
  font-family: HarmonyOSSansSC;
  line-height: 0.77rem;
  color: #1d2129;
}
.text_3 { margin-left: 0.13rem; }
.text-wrapper {
  padding: 0.88rem 0 0.63rem;
  background-color: #ffffff;
  border-radius: 3rem;
  border: solid 0.063rem #0000000d;
}
.font_2 {
  font-size: 1rem;
  font-family: HarmonyOSSansSC;
  line-height: 1.5rem;
  color: #505050;
}
.text_4 { margin-left: 1.38rem; }
.group_3 { margin-top: 0.88rem; }
.font_3 {
  font-size: 1rem;
  font-family: HarmonyOSSansSC;
  line-height: 1.5rem;
  color: #1d2129;
}
.text_5 { width: 11.94rem; }
.section {
  padding-top: 1.38rem;
  background-color: #ffffff;
  border-radius: 0.75rem;
}
.text_6 { margin-left: 1.38rem; }
.text_7 { width: 6.69rem; }
.group_4 { margin-top: 0.38rem; }
.text-wrapper_2 {
  flex: 1 1 8.6rem;
  padding: 0.63rem 0 0.38rem;
  background-color: #ffffff;
  border-radius: 2.25rem;
  overflow: hidden;
  height: 2.25rem;
  border: solid 0.063rem #0000000d;
}
.font_4 {
  font-size: 0.88rem;
  font-family: HarmonyOSSansSC;
  line-height: 1.25rem;
  color: #1d2129;
}
.text_8 {
  text-align: center;
  width: 6.5rem;
}
.text-wrapper_3 {
  flex: 1 1 8.6rem;
  padding: 0.63rem 0 0.25rem;
  background-color: #ffffff;
  border-radius: 2.25rem;
  overflow: hidden;
  height: 2.25rem;
  border: solid 0.063rem #0000000d;
}
.text_9 {
  text-align: center;
  width: 6.38rem;
}
.text-wrapper_4 {
  flex: 1 1 8.6rem;
  padding: 0.63rem 0;
  background-color: #ffffff;
  border-radius: 2.25rem;
  overflow: hidden;
  height: 2.25rem;
  border: solid 0.063rem #0000000d;
}
.font_5 {
  font-size: 0.88rem;
  font-family: HarmonyOSSansSC;
  line-height: 0.68rem;
  color: #1d2129;
}
.text_10 {
  text-align: center;
  width: 6.31rem;
}
.text_11 {
  text-align: center;
  width: 5.19rem;
}
.text_12 {
  text-align: center;
  width: 5.56rem;
}
.text_13 {
  text-align: center;
  width: 5.88rem;
}
.text_14 { text-align: center; }
.text-wrapper_5 {
  margin-top: 2.5rem;
  padding: 1.13rem 0;
  background-color: #007bff;
  border-radius: 3.25rem;
  width: 100%;      /* 按钮宽度自适应 */
  max-width: 800px; /* 限制最大宽度 */
}
.text_15 {
  color: #ffffff;
  font-size: 1.25rem;
  font-family: HarmonyOSSansSC;
  line-height: 0.94rem;
}
</style>
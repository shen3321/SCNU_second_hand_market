<template>
  <div class="flex-col items-center page">
    <div class="header-bg"></div>
    <div class="flex-col group mt-11">
      <span class="self-center text">Upload Product</span>
      <div class="flex-col self-center group_2">
        <span class="self-stretch text_2">Please fill in the information below to show what you are selling</span>
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
        <div class="flex justify-between items-start self-stretch section mt-7">
          <textarea v-model="description" placeholder="Input content..." :disabled="loading" class="font_2 text_6 flex-1 mr-4"></textarea>
          
          <!-- 简化的图片上传部分 -->
          <input 
            type="file" 
            accept="image/*"
            @change="handleImageUpload"
            :disabled="loading"
            class="self-start"
          />
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
            <span class="font_4 text_10">Sport equipment</span>
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
           :class="{ 'opacity-50': loading }">
        <span class="text_15">{{ loading ? 'Uploading...' : 'UPLOAD' }}</span>
      </div>
    </div>

    <div v-if="error" class="error-message mt-4 text-red-500 text-center">{{ error }}</div>
    <div v-if="message" class="success-message mt-4 text-green-500 text-center">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const title = ref('');
const description = ref('');
const price = ref('');
const email = ref('');
const address = ref('');
const loading = ref(false);
const message = ref('');
const error = ref('');
const imageFile = ref(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      error.value = 'Only JPG, PNG or GIF images are allowed';
      event.target.value = '';
      return;
    }
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      error.value = 'Image size cannot exceed 5MB';
      event.target.value = '';
      return;
    }
    
    imageFile.value = file;
  }
};

const handleUpload = async () => {
  try {
    message.value = '';
    error.value = '';
    
    if (!title.value?.trim()) {
      error.value = 'Please enter product name';
      return;
    }
    if (!description.value?.trim()) {
      error.value = 'Please enter product description';
      return;
    }
    if (!price.value || isNaN(Number(price.value)) || Number(price.value) <= 0) {
      error.value = 'Please enter a valid price';
      return;
    }
    if (!imageFile.value) {
      error.value = 'Please select a product image';
      return;
    }

    const storedUserId = localStorage.getItem('userid');
    const storedUsername = localStorage.getItem('username');
    
    if (!storedUserId || !storedUsername) {
      error.value = 'Please login first';
      return;
    }
    
    loading.value = true;

    const formData = new FormData();
    formData.append('title', title.value.trim());
    formData.append('description', description.value.trim());
    formData.append('price', Number(price.value));
    formData.append('image', imageFile.value);
    formData.append('userid', storedUserId);
    formData.append('username', storedUsername);
    formData.append('email', email.value?.trim() || '');
    formData.append('address', address.value?.trim() || '');
    formData.append('status', 'unsold');

    console.log('Sending request...');

    const response = await fetch('http://localhost:8012/products/newproduct', {
      method: 'POST',
      body: formData
    });

    console.log('Response received:', response);

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    message.value = 'Product uploaded successfully!';
    
    // 重置表单
    title.value = '';
    description.value = '';
    price.value = '';
    email.value = '';
    address.value = '';
    imageFile.value = null;
    
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
    
  } catch (err) {
    console.error('Upload error:', err);
    error.value = err.message || 'Failed to upload product';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const storedUserId = localStorage.getItem('userid');
  const storedUsername = localStorage.getItem('username');
  
  if (!storedUserId || !storedUsername) {
    error.value = 'Please login first';
    return;
  }
});
</script>

<style scoped>
.header-bg {
  width: 100%;
  height: 200px;
  background: linear-gradient(to right, #4a90e2, #357abd);
}

.mt-11 { margin-top: 0.69rem; }
.mt-7 { margin-top: 0.44rem; }
.mt-12 { margin-top: 0.75rem; }
.mt-8 { margin-top: 0.5rem; }
.ml-7 { margin-left: 0.44rem; }

.page {
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  z-index: 999;
  overflow-y: auto;
}

.group { 
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
}

.grid-item {
  padding: 0.75rem 0;
}

.font {
  font-size: 1rem;
  font-family: HarmonyOSSansSC;
  line-height: 0.77rem;
  color: #1d2129;
}

.text_3 { 
  margin-left: 0.13rem; 
}

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

.text_4 { 
  margin-left: 1.38rem; 
}

.group_3 { 
  margin-top: 0.88rem; 
}

.font_3 {
  font-size: 1rem;
  font-family: HarmonyOSSansSC;
  line-height: 1.5rem;
  color: #1d2129;
}

.text_5 { 
  width: 11.94rem; 
}

.section {
  padding: 1.38rem;
  background-color: #ffffff;
  border-radius: 0.75rem;
  border: solid 0.063rem #0000000d;
}

.text_6 { 
  margin-left: 1.38rem; 
}

.group_4 { 
  margin-top: 0.38rem; 
}

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

.text_14 { 
  text-align: center; 
}

.text-wrapper_5 {
  margin-top: 2.5rem;
  padding: 1.13rem 0;
  background-color: #007bff;
  border-radius: 3.25rem;
  width: 100%;
  max-width: 800px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.text-wrapper_5:hover {
  background-color: #0056b3;
}

.text_15 {
  color: #ffffff;
  font-size: 1.25rem;
  font-family: HarmonyOSSansSC;
  line-height: 0.94rem;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.items-center {
  align-items: center;
}

.justify-start {
  justify-content: flex-start;
}

.self-center {
  align-self: center;
}

.self-start {
  align-self: flex-start;
}

.self-stretch {
  align-self: stretch;
}

input, textarea {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
}

textarea {
  resize: none;
  min-height: 100px;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}

.success-message {
  color: #28a745;
  margin-top: 1rem;
  text-align: center;
}

/* 图片上传相关样式 */
.image-upload {
  width: 100%;
  max-width: 120px;
  aspect-ratio: 1;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* 响应式布局适配 */
@media (max-width: 768px) {
  .text {
    font-size: 2rem;
    line-height: 2.5rem;
    width: 100%;
  }

  .group_2 {
    width: 100%;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .flex-row {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .text-wrapper_2,
  .text-wrapper_3,
  .text-wrapper_4 {
    flex: 1 1 calc(50% - 0.5rem);
    min-width: 120px;
  }

  .ml-7 {
    margin-left: 0;
  }
}

/* 禁用状态样式 */
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* 输入框焦点状态 */
input:focus,
textarea:focus {
  outline: none;
  background-color: rgba(0, 123, 255, 0.05);
}

/* 按钮悬停效果 */
button:hover:not(:disabled),
.text-wrapper_5:not(.disabled):hover {
  opacity: 0.9;
  transform: translateY(-1px);
  transition: all 0.2s;
}

button:active:not(:disabled),
.text-wrapper_5:not(.disabled):active {
  transform: translateY(0);
}
</style>

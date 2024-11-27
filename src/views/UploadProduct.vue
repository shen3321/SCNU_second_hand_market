<template>
  <div class="upload-container">
    <h2>上传商品</h2>
    <form @submit.prevent="handleUpload" class="upload-form">
      <div class="form-group">
        <label for="title">商品标题：</label>
        <input 
          id="title" 
          v-model="title" 
          type="text" 
          required 
          class="form-input"
          placeholder="请输入商品标题"
        />
      </div>

      <div class="form-group">
        <label for="description">商品描述：</label>
        <textarea 
          id="description" 
          v-model="description" 
          required 
          class="form-input"
          placeholder="请输入商品描述"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="price">商品价格：</label>
        <input 
          id="price" 
          v-model="price" 
          type="number" 
          required 
          class="form-input"
          min="0"
          step="0.01"
          placeholder="请输入商品价格"
        />
      </div>

      <div class="form-group">
        <label for="image">商品图片：</label>
        <input 
          id="image" 
          type="file" 
          @change="handleFileChange" 
          accept="image/*" 
          required 
          class="form-input"
        />
      </div>

      <button type="submit" :disabled="loading" class="submit-button">
        {{ loading ? '上传中...' : '提交' }}
      </button>

      <div v-if="message" class="message success">{{ message }}</div>
      <div v-if="error" class="message error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 响应式变量
const title = ref('');
const description = ref('');
const price = ref('');
const image = ref(null);
const loading = ref(false);
const message = ref('');
const error = ref('');
const userid = ref('');
const username = ref('');

// 组件挂载时获取用户信息
onMounted(() => {
  userid.value = localStorage.getItem('userid');
  username.value = localStorage.getItem('username');
});

// 处理文件选择
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
  }
};

// 处理表单提交
const handleUpload = async () => {
  // 表单验证
  if (!title.value || !description.value || !price.value || !image.value) {
    error.value = '请填写所有必填字段';
    return;
  }

  loading.value = true;
  message.value = '';
  error.value = '';

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('description', description.value);
  formData.append('price', price.value);
  formData.append('image', image.value);
  formData.append('userid', userid.value);
  formData.append('username', username.value);
  formData.append('status', 'unsold');

  const token = localStorage.getItem('token');

  try {
    const response = await axios.post('http://localhost:8012/products/newproduct', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    
    message.value = '商品上传成功！';
    // 清空表单
    title.value = '';
    description.value = '';
    price.value = '';
    image.value = null;
    // 重置文件输入
    const fileInput = document.querySelector('#image');
    if (fileInput) fileInput.value = '';
    
  } catch (err) {
    console.error('Upload error:', err);
    error.value = '上传商品失败：' + (err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.upload-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: 600;
  color: #333;
}

.form-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

textarea.form-input {
  min-height: 100px;
  resize: vertical;
}

.submit-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.message {
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-top: 10px;
}

.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

input[type="file"] {
  padding: 6px;
}

input[type="number"] {
  width: 100%;
}
</style>
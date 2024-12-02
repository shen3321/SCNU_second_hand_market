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
    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      error.value = '只支持 JPG, PNG 或 GIF 格式的图片';
      event.target.value = '';
      return;
    }
    
    // 验证文件大小（最大 5MB）
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
    // 重置消息
    message.value = '';
    error.value = '';
    
    // 表单验证
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

    // Debug: 查看发送的数据
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

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

    console.log('Upload response:', response.data);

    if (response.data) {
      message.value = '商品上传成功！';
      // 重置表单
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
      console.error('Error response:', err.response);
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

<template>
  <div class="upload-container">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="message" class="success-message">{{ message }}</div>
    
    <form @submit.prevent="handleUpload" class="upload-form">
      <div class="form-group">
        <label for="title">商品标题 *</label>
        <input 
          id="title"
          v-model="title"
          type="text"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="description">商品描述 *</label>
        <textarea 
          id="description"
          v-model="description"
          required
          :disabled="loading"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="price">价格 *</label>
        <input 
          id="price"
          v-model="price"
          type="number"
          step="0.01"
          min="0"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="image">商品图片 *</label>
        <input 
          id="image"
          type="file"
          accept="image/*"
          @change="handleFileChange"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="email">联系邮箱</label>
        <input 
          id="email"
          v-model="email"
          type="email"
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="address">地址</label>
        <input 
          id="address"
          v-model="address"
          type="text"
          :disabled="loading"
        />
      </div>

      <button 
        type="submit"
        :disabled="loading"
      >
        {{ loading ? '上传中...' : '上传商品' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.upload-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.error-message {
  color: red;
  margin-bottom: 16px;
  padding: 10px;
  background-color: #ffe6e6;
  border-radius: 4px;
}

.success-message {
  color: green;
  margin-bottom: 16px;
  padding: 10px;
  background-color: #e6ffe6;
  border-radius: 4px;
}

input, textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  min-height: 100px;
}

button {
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

input:disabled, textarea:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
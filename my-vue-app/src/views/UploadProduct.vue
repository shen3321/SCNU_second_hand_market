<template>
    <div class="upload-product-container">
      <h2>Upload Product</h2>
      <form @submit.prevent="handleUpload">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" v-model="title" id="title" required />
        </div>
  
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="description" id="description" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" v-model="price" id="price" required />
        </div>
  
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="file" @change="handleFileChange" id="image" required />
        </div>
  
        <button type="submit" :disabled="loading">Upload</button>
        <p v-if="message">{{ message }}</p>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const title = ref('');
  const description = ref('');
  const price = ref(0);
  const image = ref(null);
  const loading = ref(false);
  const message = ref('');
  const error = ref('');
  
  // 处理文件选择
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      image.value = file;
    }
  };
  
  // 上传商品
  const handleUpload = async () => {
    loading.value = true;
    message.value = '';
    error.value = '';
  
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('description', description.value);
    formData.append('price', price.value);
    formData.append('image', image.value);

  // 从 localStorage 或 cookie 中获取 token 
  const token = localStorage.getItem('token'); // 用户登录时保存的 JWT
  
    try {
      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.value = response.data.message;
    } catch (err) {
      console.error('Upload error:', err);
      error.value = 'Failed to upload product.';
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .upload-product-container {
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  </style>
  
<template>
    <div>
      <h1>我上传的商品</h1>
      
      <div v-if="loading">加载中...</div>
      <div v-if="error">{{ error }}</div>
      
      <div v-if="products.length > 0" class="product-list">
        <div v-for="product in products" :key="product.id" class="product-item">
          <img :src="product.image" alt="Product Image" class="product-image" />
          <div class="product-details">
            <h2>{{ product.title }}</h2>
            <p>{{ product.description }}</p>
            <p>价格: {{ product.price }} 元</p>
          </div>
        </div>
      </div>
      
      <div v-if="products.length === 0 && !loading">
        <p>你还没有上传任何商品。</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  // 状态
  const products = ref([]);
  const loading = ref(false);
  const error = ref('');
  const router = useRouter();
  
  // 检查用户登录状态
  const checkLogin = () => {
    const userId = localStorage.getItem('userId');  // 这里假设 userId 保存在 localStorage 中
    if (!userId) {
      // 如果没有登录，跳转到登录页面
      router.push('/login');
      return null;
    }
    return userId;
  };
  
  // 获取用户上传的商品
  const fetchUserProducts = async () => {
    const userId = checkLogin();  // 检查登录状态
    if (!userId) return;  // 如果未登录，直接返回，不进行查询
  
    loading.value = true;
    try {
      const response = await axios.post('/api/user-products', { userId }); // 发送 userId 查询商品
      products.value = response.data;
    } catch (err) {
      console.error('Error fetching user products:', err);
      error.value = '获取商品信息失败';
    } finally {
      loading.value = false;
    }
  };
  
  // 页面加载时获取商品信息
  onMounted(() => {
    fetchUserProducts();
  });
  </script>
  
  <style scoped>
  .product-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  
  .product-item {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 200px;
    text-align: center;
  }
  
  .product-image {
    width: 100%;
    height: auto;
  }
  
  .product-details {
    margin-top: 10px;
  }
  </style>
  
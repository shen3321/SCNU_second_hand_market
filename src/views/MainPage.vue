<template>
    <div>
      <h1>Find yourself at home</h1>
  
      <!-- 商品列表渲染 -->
      <div v-if="loading">加载中...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="products.length > 0" class="product-list">
        <div v-for="product in products" :key="product.id" class="product-item">
          <img :src="product.image" alt="Product Image" class="product-image" />
          <div class="product-details">
            <h2>{{ product.title }}</h2>
            <p>{{ product.description }}</p>
            <p>价格: {{ product.price }} 元</p>
            <button @click="goToProductDetail(product.id)">我想要</button>
          </div>
        </div>
      </div>
  
      <!-- 登录和注册按钮 -->
      <div class="auth-buttons">
        <RouterLink to="/login" class="btn">Login</RouterLink>
        <RouterLink to="/register" class="btn">Register</RouterLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  // 获取商品信息
  const products = ref([]);
  const loading = ref(false);
  const error = ref('');
  const router = useRouter();
  
  const fetchProducts = async () => {
    loading.value = true;
    try {
      const response = await axios.post('/api/products'); // 获取商品信息
      products.value = response.data;
    } catch (err) {
      console.error('Error fetching products:', err);
      error.value = '获取商品信息失败';
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchProducts();
  });
  
  // 跳转到商品详情页
  const goToProductDetail = (productId) => {
    router.push(`/product/${productId}`);
  };
  </script>
  
  <style scoped>
  .auth-buttons {
    margin-top: 20px;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    margin-right: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  
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
  
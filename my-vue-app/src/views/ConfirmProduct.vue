<template>
    <div>
      <h1>确认交易</h1>
      <div v-if="loading">加载中...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="product">
        <h2>{{ product.title }}</h2>
        <img :src="product.image" alt="Product Image" class="product-image" />
        <p>{{ product.description }}</p>
        <p>价格: {{ product.price }} 元</p>
        <button @click="confirmDesire">确认“我想要”</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const product = ref(null);
  const loading = ref(true);
  const error = ref('');
  
  // 获取商品详情
  const fetchProductDetail = async () => {
    const productId = route.params.id;
    try {
      const response = await axios.get(`/api/products/${productId}`); // 根据后端API调整
      product.value = response.data;
    } catch (err) {
      console.error('获取商品详情失败:', err);
      error.value = '获取商品详情失败';
    } finally {
      loading.value = false;
    }
  };
  
  // 确认“我想要”操作
  const confirmDesire = async () => {
    try {
      const response = await axios.post('/api/confirm-desire', { productId: product.value.id });
      alert('交易确认成功！');
      router.push('/'); // 跳转回主页面或其他页面
    } catch (err) {
      console.error('确认交易失败:', err);
      alert('确认交易失败，请重试。');
    }
  };
  
  onMounted(() => {
    fetchProductDetail();
  });
  </script>
  
  <style scoped>
  .product-image {
    width: 100%;
    max-width: 400px;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  
  button {
    padding: 10px 20px;
    background-color: #ffc107;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #e0a800;
  }
  </style>
  
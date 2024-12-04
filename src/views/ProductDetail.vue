<template>
    <div>
      <h1>{{ product.title }}</h1>
      <img :src="product.image" alt="Product Image" class="product-image" />
      <p>{{ product.description }}</p>
      <p>价格: {{ product.price }} 元</p>
      <button @click="handleDesire">我想要</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const product = ref({});
  const loading = ref(true);
  const error = ref('');
  
  // 获取商品详情
  const fetchProductDetail = async () => {
    const productId = route.params.id;
    try {
      // 修改API请求，将商品ID添加到URL中
      const response = await axios.get(`http://localhost:8012/products/getproduct/${productId}`);
      product.value = response.data;
    } catch (err) {
      console.error('获取商品详情失败:', err);
      error.value = '获取商品详情失败';
    } finally {
      loading.value = false;
    }
  };
  
  // 处理"我想要"按钮点击
  const handleDesire = () => {
    // 确保product.value.id存在
    if (product.value && product.value.id) {
      router.push(``);
    } else {
      console.error('商品ID不存在');
      error.value = '商品信息无效';
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
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  </style>
  
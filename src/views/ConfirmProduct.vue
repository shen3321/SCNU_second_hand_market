<template>
  <div class="page-container">
    <img class="background-image" src="src\images\conf.png" alt="background">
    <div class="content">
      <h1>确认交易</h1>
      <div v-if="loading">加载中...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="product">
        <h2>{{ product.title }}</h2>
        <img :src="product.image" alt="Product Image" class="product-image" />
        <p>{{ product.description }}</p>
        <p>价格: {{ product.price }} 元</p>
        <button @click="confirmDesire">确认"我想要"</button>
      </div>
    </div>
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
      const response = await axios.get(`http://localhost:8012/products/getproduct/${productId}`);
      product.value = response.data;
    } catch (err) {
      console.error('获取商品详情失败:', err);
      error.value = '获取商品详情失败';
    } finally {
      loading.value = false;
    }
  };
  
  // 处理确认交易
  const handleConfirmTrade = async () => {
    try {
      loading.value = true;
      
      // 假设用户ID从localStorage或其他状态管理中获取
      const userId = localStorage.getItem('userId'); // 根据你的实际存储方式修改
      
      const tradeData = {
        userId: userId,
        productId: product.value.id,
        status: 'pending' // 或其他初始状态
      };
  
      // 发送确认交易请求
      const response = await axios.post('http://localhost:8012/order/confirmorders', tradeData);
      
      if (response.data) {
        // 交易成功，跳转到成功页面或其他页面
        router.push('/trade-success');
      }
    } catch (err) {
      console.error('确认交易失败:', err);
      error.value = '确认交易失败，请重试';
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchProductDetail();
  });
  </script>

<style scoped>
.page-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
  padding: 20px;
  color: white; /* 确保文字在背景图上可见 */
}

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
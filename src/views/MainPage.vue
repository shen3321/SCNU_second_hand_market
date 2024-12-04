<template>
  <div class="flex-col page">
    <div class="flex-col justify-start items-start text-wrapper">
      <span class="text">Collect goods all over the world</span>
    </div>
    <div class="flex-col group">
      <div class="flex-row group_2">
        <span class="self-start text_2">Secondhand Market for SCNU</span>
        <div class="flex-row flex-1 self-center group_3">
          <div class="flex-1 section"></div>
          <div class="flex-col justify-start shrink-0 text-wrapper_2">
            <span class="text_3">Search</span>
          </div>
        </div>
        <img
          class="shrink-0 image"
          src="https://ide.code.fun/api/image?token=67505040defdb100110d8b87&name=074eb3ca1ded1a2ee11ff01ebaee71a5.png"
        />
      </div>
      <div class="divider"></div>
    </div>
  </div>
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
    const response = await axios.get('http://localhost:8012/products/getallproducts');
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

// 修改跳转函数
const goToProductDetail = (productId) => {
  router.push(`/product/${productId}`); // 使用路由路径而不是文件路径
};
</script>
  
  <style scoped>
  .auth-buttons {
    margin-top: 20px;
    position: relative;
    z-index: 2;
    top: 400px;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    margin-right: 10px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    z-index: 2;
    top: 400px;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  
  .product-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    position: relative;
    z-index: 2;
    top: 400px;
  }
  
  .product-item {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 200px;
    text-align: center;
    position: relative;
    z-index: 2;
    top: 400px;
  }
  
  .product-image {
    width: 100%;
    height: auto;
  }
  
  .product-details {
    margin-top: 10px;
  }
  .page {
  width: 100vw;           /* 铺满整个视口宽度 */
  min-height: 100vh;      /* 铺满整个视口高度 */
  position: fixed;        /* 固定定位 */
  top: 0;
  left: 0;
  background: white;      /* 白色背景 */
  padding-bottom: 838px;
  background-color: #ffffff;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}

.text-wrapper {
  padding-top: 8px;
  background-color: #2a82e4;
  position: relative;
  z-index: 1000;  /* 高 z-index 确保在顶层 */
}

.text {
  margin-left: 106px;
  color: #ffffff;
  font-size: 31px;
  font-family: SourceHanSansCN;
  line-height: 37px;
  width: 380px;
  position: relative;
  z-index: 1000;
}

.group {
  padding: 33px 29px 0 100px;
  position: relative;
  z-index: 1000;
}

.group_2 {
  margin-left: 6px;
  position: relative;
  z-index: 1000;
}

.text_2 {
  margin-top: 34px;
  color: #000000;
  font-size: 50px;
  font-family: SourceHanSansCN;
  line-height: 47px;
  text-shadow: 0px 2px 4px #00000040;
  width: 493px;
  position: relative;
  z-index: 1000;
  
}

.group_3 {
  margin-left: 64px;
  position: relative;
  z-index: 1000;
}

.section {
  background-color: #ffffff;
  height: 77px;
  border-left: solid 1px #2a82e4;
  border-right: solid 1px #2a82e4;
  border-top: solid 1px #2a82e4;
  border-bottom: solid 1px #2a82e4;
  position: relative;
  z-index: 1000;
}

.text-wrapper_2 {
  padding: 20px 0;
  background-color: #2a82e4;
  height: 76px;
  position: relative;
  z-index: 1000;
}

.text_3 {
  margin-left: 6px;
  color: #ffffff;
  font-size: 45px;
  font-family: SourceHanSansCN;
  line-height: 36.5px;
  position: relative;
  z-index: 1000;
}

.image {
  margin-left: 40px;
  width: 148px;
  height: 160px;
  position: relative;
  z-index: 1000;
}

.divider {
  margin-right: 71px;
  background-color: #a6a6a6;
  height: 2px;
  position: relative;
  z-index: 1000;
}

  </style>
  
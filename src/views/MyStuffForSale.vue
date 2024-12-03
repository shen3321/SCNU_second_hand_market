<template>
  <div class="flex-col page">
    <div class="flex-row justify-between group">
      <div class="flex-col justify-start items-start self-start text-wrapper">
        <span class="text">SCNU-Second-hand goods trading website</span>
      </div>
      <div class="flex-row group_2">
        <div class="flex-row group_3">
          <div class="flex-col justify-start items-center text-wrapper_3">
            <span class="font text_2">Mainpage</span>
          </div>
          <div class="ml-10 flex-col justify-start items-center self-start text-wrapper_4">
            <span class="font">Product-list</span>
          </div>
          <div class="ml-10 flex-col justify-start items-center self-start text-wrapper_5">
            <span class="font">Product-detail</span>
          </div>
        </div>
        <div class="flex-row items-center self-start ml-185">
          <div class="flex-row items-center section">
            <img
              class="image_2"
              src="https://ide.code.fun/api/image?token=674e990e797f850011f0bb5e&name=af955cc56be6df299516f20b856c52d8.png"
            />
            <span class="font ml-11">Search</span>
          </div>
          <div class="ml-24 flex-col justify-start items-center text-wrapper_2">
            <span class="text_3">Upload-product</span>
          </div>
          <img
            class="ml-24 image"
            src="https://ide.code.fun/api/image?token=674e990e797f850011f0bb5e&name=44df687f9083ca8eced4d419ef8b1ac3.png"
          />
        </div>
      </div>
    </div>
    <div class="flex-col justify-start items-center relative">
      <img
        class="image_3"
        src="https://ide.code.fun/api/image?token=674e990e797f850011f0bb5e&name=67274cc1500c659007f3e641371b4c79.png"
      />
      <div class="flex-col items-start section_2 pos">
        <span class="text_4">My list of selling things</span>
        <span class="text_5 mt-51">
          This is a list of used items I am selling. Here you can view the details of the items I sell
        </span>
      </div>
    </div>
 
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
  .ml-185 {
  margin-left: 11.56rem;
}
.ml-11 {
  margin-left: 0.69rem;
}
.mt-51 {
  margin-top: 3.19rem;
}
.page {
  background-color: #ffffff;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  padding: 1rem 6rem 0;
  overflow: hidden;
  height: 4.5rem;
}
.text-wrapper {
  padding: 0.5rem 0;
  border-radius: 0.38rem;
  width: 6rem;
  height: 2.5rem;
}
.text {
  margin-left: -5.75rem;
  color: #1d2129;
  font-size: 1.38rem;
  font-family: Kalam;
  font-weight: 700;
  line-height: 1.63rem;
  width: 24.38rem;
}
.group_2 {
  margin-right: 0.56rem;
}
.group_3 {
  margin-top: 0.19rem;
}
.text-wrapper_3 {
  padding: 0.63rem 0 1.88rem;
  overflow: hidden;
  width: 4.56rem;
  height: 3.5rem;
}
.font {
  font-size: 1rem;
  font-family: HarmonyOSSansSC;
  line-height: 0.77rem;
  color: #1d2129;
}
.text_2 {
  line-height: 0.98rem;
}
.text-wrapper_4 {
  padding: 0.63rem 0;
  overflow: hidden;
  width: 5.44rem;
  height: 2rem;
}
.text-wrapper_5 {
  padding: 0.63rem 0;
  overflow: hidden;
  width: 6.69rem;
  height: 2rem;
}
.section {
  padding: 0.75rem 1rem;
  background-color: #ffffff;
  border-radius: 0.25rem;
  overflow: hidden;
  width: 12.5rem;
  height: 2.5rem;
  border-left: solid 0.063rem #1d2129;
  border-right: solid 0.063rem #1d2129;
  border-top: solid 0.063rem #1d2129;
  border-bottom: solid 0.063rem #1d2129;
}
.image_2 {
  width: 1rem;
  height: 1rem;
}
.text-wrapper_2 {
  padding: 0.88rem 0 0.63rem;
  background-color: #0000ff;
  border-radius: 0.25rem;
  width: 10.44rem;
  height: 2.5rem;
}
.text_3 {
  color: #ffffff;
  font-size: 1rem;
  font-family: HarmonyOSSansSC;
  line-height: 0.99rem;
}
.image {
  width: 1.31rem;
  height: 1.5rem;
}
.image_3 {
  filter: blur(0.13rem);
  width: 100vw;
  height: 52.7778vw;
}
.section_2 {
  padding: 18.75rem 18.13rem 18.38rem;
  background-color: #00000033;
  backdrop-filter: blur(0.31rem);
}
.pos {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.text_4 {
  color: #ffffff;
  font-size: 5rem;
  font-family: HarmonyOSSansSC;
  font-weight: 700;
  line-height: 5.5rem;
  text-align: center;
  width: 46.5rem;
}
.text_5 {
  margin-left: 5.25rem;
  color: #ffffff;
  font-size: 1.13rem;
  font-family: HarmonyOSSansSC;
  line-height: 1.75rem;
  text-align: center;
  width: 35rem;
}
  </style>
  
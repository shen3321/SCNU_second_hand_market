<template>
    <div>
      <h1>修改商品信息</h1>
      
      <div v-if="loading">加载中...</div>
      <div v-if="error">{{ error }}</div>
      
      <div v-if="products.length > 0">
        <div v-for="product in products" :key="product.id" class="product-item">
          <img :src="product.image" alt="Product Image" class="product-image" />
          <div class="product-details">
            <h2>{{ product.title }}</h2>
            <p>{{ product.description }}</p>
            <p>价格: {{ product.price }} 元</p>
            <button @click="editProduct(product)">修改</button>
            <button @click="deleteProduct(product.id)">删除</button> <!-- 删除按钮 -->
          </div>
        </div>
      </div>
  
      <div v-if="selectedProduct">
        <h2>编辑商品信息</h2>
        <input v-model="editedProduct.title" placeholder="商品标题" />
        <input v-model="editedProduct.description" placeholder="商品描述" />
        <input v-model="editedProduct.price" placeholder="商品价格" type="number" />
        <button @click="updateProduct">保存修改</button>
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
  const selectedProduct = ref(null);
  const editedProduct = ref({ title: '', description: '', price: 0 });
  const router = useRouter();
  
  // 获取用户上传的商品信息
  const fetchUserProducts = async () => {
    loading.value = true;
    const userId = localStorage.getItem('userId'); // 假设用户ID保存在localStorage中
    if (!userId) {
      error.value = '用户未登录';
      loading.value = false;
      return;
    }
  
    try {
      const response = await axios.post('/api/user-products', { userId });
      products.value = response.data;
    } catch (err) {
      console.error('Error fetching user products:', err);
      error.value = '获取商品信息失败';
    } finally {
      loading.value = false;
    }
  };
  
  // 编辑商品
  const editProduct = (product) => {
    selectedProduct.value = product;
    editedProduct.value = { ...product }; // 创建一个副本用于编辑
  };
  
  // 更新商品信息
  const updateProduct = async () => {
    try {
      const response = await axios.post('/api/update-product', editedProduct.value);
      alert(response.data.message); // 处理成功消息
      // 刷新商品列表
      await fetchUserProducts();
      selectedProduct.value = null; // 清空选中的商品
    } catch (err) {
      console.error('Error updating product:', err);
      error.value = '更新商品信息失败';
    }
  };
  
  // 删除商品
  const deleteProduct = async (productId) => {
    if (confirm('确定要删除这个商品吗？')) {
      try {
        const response = await axios.delete(`/api/delete-product/${productId}`);
        alert(response.data.message); // 处理成功消息
        // 刷新商品列表
        await fetchUserProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
        error.value = '删除商品失败';
      }
    }
  };
  
  // 页面加载时获取商品信息
  onMounted(() => {
    fetchUserProducts();
  });
  </script>
  
  <style scoped>
  .product-item {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
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
  
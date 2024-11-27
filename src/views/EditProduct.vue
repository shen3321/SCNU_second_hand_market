<template>
  <div class="container">
    <h1>修改商品信息</h1>
    
    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <!-- 商品列表 -->
    <div v-if="products.length > 0" class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.image" alt="Product Image" class="product-image" />
        <div class="product-details">
          <h2>{{ product.title }}</h2>
          <p>{{ product.description }}</p>
          <p class="price">价格: ¥{{ product.price }}</p>
          <div class="button-group">
            <button @click="editProduct(product)" class="edit-btn">修改</button>
            <button @click="deleteProduct(product.id)" class="delete-btn">删除</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 编辑表单 -->
    <div v-if="selectedProduct" class="edit-form">
      <h2>编辑商品信息</h2>
      <form @submit.prevent="updateProduct">
        <div class="form-group">
          <label>商品标题:</label>
          <input v-model="editedProduct.title" required />
        </div>
        
        <div class="form-group">
          <label>商品描述:</label>
          <textarea v-model="editedProduct.description" required></textarea>
        </div>
        
        <div class="form-group">
          <label>商品价格:</label>
          <input v-model="editedProduct.price" type="number" step="0.01" required />
        </div>
        
        <div class="button-group">
          <button type="submit" class="save-btn">保存修改</button>
          <button type="button" @click="cancelEdit" class="cancel-btn">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 声明响应式变量
const products = ref([]);
const loading = ref(false);
const error = ref('');
const selectedProduct = ref(null);
const editedProduct = ref({ title: '', description: '', price: 0 });

const fetchUserProducts = async () => {
  loading.value = true;
  error.value = '';
  
  const userid = localStorage.getItem('userid');
  const token = localStorage.getItem('token');
  
  console.log('Checking credentials:', { userid, token });

  if (!userid || !token) {
    error.value = '用户未登录';
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8012/products/userproducts/${userid}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Response received:', response.data);
    products.value = response.data;
  } catch (err) {
    console.error('Error fetching products:', err);
    error.value = '获取商品信息失败';
  } finally {
    loading.value = false;
  }
};

// 编辑商品
const editProduct = (product) => {
  selectedProduct.value = product;
  editedProduct.value = { 
    ...product,
    userid: localStorage.getItem('userid')
  };
};

// 取消编辑
const cancelEdit = () => {
  selectedProduct.value = null;
  editedProduct.value = { title: '', description: '', price: 0 };
};

// 更新商品信息
const updateProduct = async () => {
  const token = localStorage.getItem('token');
  const userid = localStorage.getItem('userid');

  if (!token || !userid) {
    error.value = '用户信息不完整，请重新登录';
    return;
  }

  try {
    const updateData = {
      ...editedProduct.value,
      userid: userid
    };

    const response = await axios.put(
      `http://localhost:8012/products/updateproduct`,
      updateData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    alert('商品信息更新成功');
    await fetchUserProducts();
    selectedProduct.value = null;
  } catch (err) {
    console.error('Error updating product:', err);
    error.value = '更新商品信息失败';
  }
};

// 删除商品
const deleteProduct = async (productId) => {
  if (confirm('确定要删除这个商品吗？')) {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');

    if (!token || !userid) {
      error.value = '用户信息不完整，请重新登录';
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8012/products/${productId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert('商品删除成功');
      await fetchUserProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      error.value = '删除商品失败';
    }
  }
};

onMounted(() => {
  fetchUserProducts();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
}

.error-message {
  color: red;
  text-align: center;
  padding: 10px;
  margin: 10px 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: white;
  transition: transform 0.2s;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.product-details {
  padding: 10px;
}

.price {
  font-weight: bold;
  color: #e53e3e;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

.edit-btn, .delete-btn, .save-btn, .cancel-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-btn {
  background-color: #4299e1;
  color: white;
}

.delete-btn {
  background-color: #e53e3e;
  color: white;
}

.save-btn {
  background-color: #48bb78;
  color: white;
}

.cancel-btn {
  background-color: #718096;
  color: white;
}

.edit-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}
</style>
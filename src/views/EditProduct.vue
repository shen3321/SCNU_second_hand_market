<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);
const loading = ref(false);
const error = ref('');
const selectedProduct = ref(null);
const editedProduct = ref({
  title: '',
  description: '',
  price: 0,
  status: '',
});

// 获取商品信息
const fetchUserProducts = async () => {
  loading.value = true;
  error.value = '';
  
  const userid = localStorage.getItem('userid');
  
  if (!userid) {
    error.value = '用户未登录';
    loading.value = false;
    return;
  }
  
  try {
    const response = await axios.get(`http://localhost:8012/products/userproducts`, {
      params: {
        userID: userid
      }
    });
    
    console.log('获取到的商品数据:', response.data);
    
    // 直接使用返回的数组
    if (Array.isArray(response.data)) {
      products.value = response.data;
    } else if (response.data) {
      // 如果返回单个对象，将其转换为数组
      products.value = [response.data];
    } else {
      products.value = [];
    }
    
    console.log('处理后的商品数据:', products.value);
  } catch (err) {
    console.error('获取商品失败:', err);
    error.value = err.response?.data?.message || '获取商品信息失败';
  } finally {
    loading.value = false;
  }
};

// 其他方法保持不变...
const editProduct = (product) => {
  selectedProduct.value = product;
  editedProduct.value = { ...product };
};

const cancelEdit = () => {
  selectedProduct.value = null;
  editedProduct.value = {
    title: '',
    description: '',
    price: 0,
    status: ''
  };
};

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
  console.log('组件已挂载');
  fetchUserProducts();
});
</script>

<template>
  <div class="edit-products-container">
    <h2 class="title">管理我的商品</h2>
    
    <!-- 调试信息 -->
    <div class="debug-info" style="margin: 10px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
      <p>商品数量: {{ products.length }}</p>
      <p>加载状态: {{ loading ? '加载中' : '加载完成' }}</p>
      <p>错误信息: {{ error || '无' }}</p>
    </div>
    
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <div v-if="loading" class="loading">加载中...</div>
    
    <div v-else>
      <div v-if="products.length === 0" class="no-products">
        暂无商品信息
      </div>
      
      <div v-else class="products-list">
        <div v-for="product in products" :key="product.id" class="product-item">
          <div class="product-info">
            <img 
              :src="product.imageUrl" 
              :alt="product.title" 
              class="product-image"
              @error="$event.target.src = '/placeholder.png'"
            />
            <div class="product-details">
              <h3>{{ product.title }}</h3>
              <p>{{ product.description }}</p>
              <p class="price">价格: ¥{{ product.price }}</p>
              <p>状态: {{ product.status }}</p>
              <p class="created-time">创建时间: {{ new Date(product.createdAt).toLocaleString() }}</p>
            </div>
          </div>
          
          <div class="product-actions">
            <button @click="editProduct(product)" class="edit-btn">
              编辑
            </button>
            <button @click="deleteProduct(product.id)" class="delete-btn">
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 编辑表单 -->
    <div v-if="selectedProduct" class="edit-form">
      <h3>编辑商品</h3>
      <form @submit.prevent="updateProduct">
        <div class="form-group">
          <label for="title">标题</label>
          <input
            id="title"
            v-model="editedProduct.title"
            type="text"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="description">描述</label>
          <textarea
            id="description"
            v-model="editedProduct.description"
            required
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="price">价格</label>
          <input
            id="price"
            v-model="editedProduct.price"
            type="number"
            step="0.01"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="status">状态</label>
          <select id="status" v-model="editedProduct.status">
            <option value="unsold">未售出</option>
            <option value="sold">已售出</option>
          </select>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="save-btn">保存</button>
          <button type="button" @click="cancelEdit" class="cancel-btn">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.edit-products-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.products-list {
  display: grid;
  gap: 20px;
  padding: 20px 0;
}

.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.product-info {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.product-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.product-details {
  flex: 1;
}

.product-details h3 {
  margin: 0 0 10px;
  color: #2c3e50;
}

.price {
  color: #e53e3e;
  font-weight: bold;
  font-size: 1.2em;
  margin: 10px 0;
}

.created-time {
  color: #666;
  font-size: 0.9em;
}

.product-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.9;
}

.edit-btn {
  background-color: #4299e1;
  color: white;
}

.delete-btn {
  background-color: #e53e3e;
  color: white;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #4a5568;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.error-message {
  color: #e53e3e;
  background-color: #fee2e2;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #4a5568;
}

.no-products {
  text-align: center;
  padding: 40px;
  color: #4a5568;
  background: #f7fafc;
  border-radius: 8px;
}
</style>
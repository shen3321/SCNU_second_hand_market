<template>
    <div class="form-container">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="username">Username:</label>
          <input v-model="formData.username" id="username" type="text" required />
        </div>
  
        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="formData.password" id="password" type="password" required />
        </div>
  
        <div class="form-group">
          <label for="realName">Real Name:</label>
          <input v-model="formData.realName" id="realName" type="text" required />
        </div>
  
        <div class="form-group">
          <label for="phoneNumber">Phone Number:</label>
          <input v-model="formData.phoneNumber" id="phoneNumber" type="text" required />
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="formData.email" id="email" type="email" required />
        </div>
  
        <button type="submit">Register</button>
      </form>
  
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'RegisterForm',
    setup() {
      const formData = ref({
        username: '',
        password: '',
        realName: '',
        phoneNumber: '',
        email: ''
      });
  
      const message = ref('');
  
      const registerUser = async () => {
        try {
          const response = await fetch('http://localhost:8012/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData.value),
          });
  
          const result = await response.json();
  
          if (response.ok) {
            message.value = 'User registered successfully';
          } else {
            message.value = result.message || 'Registration failed';
          }
        } catch (error) {
          message.value = 'An error occurred. Please try again later.';
        }
      };
  
      return {
        formData,
        message,
        registerUser,
      };
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  p {
    text-align: center;
    color: green;
  }
  </style>
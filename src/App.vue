<template>
  <header v-if="showNav">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Welcome to SCNU second hand market" />

      <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/UploadProduct">UploadProduct</RouterLink>
        <RouterLink to="/MainPage">MainPage</RouterLink>
        <RouterLink to="/EditProduct">EditProduct</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { computed } from 'vue'

const route = useRoute()
// 控制导航栏显示的逻辑
const showNav = computed(() => {
  // 在这些路由下不显示导航栏
  const hideNavRoutes = [ '/product/:id', '/EditProduct', '/UploadProduct', '/login', '/Register']
  return !hideNavRoutes.includes(route.path)
})
</script>

<style scoped>
/* 样式保持不变 */
header {
  line-height: 1.5;
  max-height: 100vh;
  position: fixed;
  z-index: 100;
  top: 500px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  position: relative;
  z-index: 100;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  position: relative;
  z-index: 100;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  position: relative;
  z-index: 100;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  position: relative;
  z-index: 100;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    position: relative;
    z-index: 100;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

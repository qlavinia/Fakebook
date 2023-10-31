<script setup>

import TheNavigation from '@/components/TheNavigation.vue'
import SearchBox from './components/SearchBoxAndLogout.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

//const userIsLoggedOut = ref(""); // Initialize a ref to store the emitted data

// function refreshHeader() {
//   console.log('a mers emitul');
//   authStore.clearUser();
//   router.push('/');
//   window.location.reload();
// };


// const userIsLoggedIn = authStore.isAuthenticated;

function performLogout() {
  console.log('a mers emitul');
  authStore.clearUser();
  router.go(0);
  vm.$forceUpdate();
  router.push('/');
}

</script>

<template>
  <header >
    <div class="header">
      <TheNavigation/>
      <SearchBox @logout-user="performLogout"/>
    </div>
    <!-- <div v-if="userIsLoggedIn" class="searchLogout">
      <nav class="nav">
        <router-link to="/friends">Friends</router-link> |
        <router-link to="/wall">Wall</router-link>
      </nav>

      <SearchBox />
      <button @click="performLogout" class="logout-button">Logout</button>
    </div>
    <div v-else>
      <nav class="nav">
        <router-link to="/">All Posts</router-link> |
        <router-link to="/private">Private Section</router-link>
      </nav>
    </div> -->
  </header>
  <div id="layout">
    <router-view />
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.header {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}


</style>
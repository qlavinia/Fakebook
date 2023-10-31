<script setup>

import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();
const userIsLoggedIn = authStore.isAuthenticated;

</script>

<template>
    <div v-if="userIsLoggedIn">
        <nav class="nav">
            <router-link to="/">Public Section</router-link> |
            <router-link to="/friends">Friends</router-link> |
            <router-link to="/wall">Wall</router-link> |
            <router-link to="/posts">Posts</router-link> |
            <router-link to="/createMessage">Add Post</router-link>
        </nav>
    </div>
    <div v-else>
        <nav class="nav">
            <router-link to="/">Public Section</router-link> |
            <router-link to="/private">Private Section</router-link>
        </nav>
    </div>
</template>

<style scoped>

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #fff;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h2 {
  font-size: 20px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline;
}

</style>
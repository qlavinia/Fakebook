<script setup>

import { authService } from '@/services/AuthService'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

async function login() {
  try {
    if (username.value == '' || password.value == '')
    {
      error.value = 'Username and password are required.';
      return;
    }

    const result = await authService.performLogin(
      {
        username: username.value,
        password: password.value
      })

    useAuthStore().setUserDetails(result.data);
    router.push('/friends');
  } 
  catch (exception) 
  {
    error.value = exception.response.data;
    console.log(error.value);
  }
}
</script>

<template>
  <div class="login">

    <router-link to="/register">Go to Register Page</router-link>

    <label for="username">
      Username:
    </label>
    <input v-model="username" type="text" name="username" value>

    <label for="password">
      Password:
    </label>
    <input v-model="password" type="password" value>

    <button @click="login">
      Login
    </button>

  </div>
  <div v-if="error" class="error">{{ error }}</div>
</template>

<style scoped>
.login {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.error {
  color: red;
}

</style>
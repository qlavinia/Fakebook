<script setup>
import { ref } from 'vue'
import { registerService } from '@/services/RegisterService'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router';

const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const password = ref('');
const repeatPassword = ref('');
const error = ref('');

const router = useRouter();
const authStore = useAuthStore();

async function register() {
  try {

    if (firstName.value == '' || lastName.value == '' || userName.value == '' || password.value == '') {
      error.value = 'All fields are required';
      return;
    }

    if (password.value != repeatPassword.value) {
      error.value = 'Passwords do not match!';
      return;
    }

    const result = await registerService.performRegister({
      firstName: firstName.value,
      lastName: lastName.value,
      userName: userName.value,
      password: password.value
    });

    error.value = '';
    console.log(result);
    authStore.setUserDetails(result);
    router.push('/friends');


  } catch (exception) {
    console.log(exception);
    error.value = 'An error occured while trying to connect to the server'
  }
}
</script>

<template>
  <div class="register">
    <form @submit.prevent="register">
      <label for="firstname">First name:</label>
      <input v-model="firstName" type="text" name="firstname">

      <label for="lastName">Last name:</label>
      <input v-model="lastName" type="text" name="lastName">

      <label for="username">Username:</label>
      <input v-model="userName" type="text" name="username">

      <label for="password">Password:</label>
      <input v-model="password" type="password" name="password">

      <label for="repeatPassword">Confirm password:</label>
      <input v-model="repeatPassword" type="password" name="repeatPassword">

      <button type="submit" name="register">Register</button>
    </form>
  </div>
  <div v-if="error" class="error">
    {{ error }}
  </div>
</template>

<style scoped>
.register {
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
<template>
  <div class="register-container">
    <h2>Registrar-se</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Username</label>
        <input v-model="username" id="username" type="text" required />
      </div>

      <div>
        <label for="email">Email</label>
        <input v-model="email" id="email" type="email" required />
      </div>

      <div>
        <label for="password">Senha</label>
        <input v-model="password" id="password" type="password" required />
      </div>

      <button type="submit">Registrar</button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../services/authService';

const username = ref('');
const email = ref('');
const password = ref('');
const error = ref<string | null>(null);

const router = useRouter();

async function registerUser() {
  error.value = null; 
  const result = await register({ name: username.value, username: username.value, email: email.value, password: password.value, role: 'admin' });
  
  if (result instanceof Error) {
    error.value = result.message; 
  } else {
    router.push('/login');
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
}
.error-message {
  color: red;
}
</style>
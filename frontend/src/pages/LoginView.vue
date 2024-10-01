<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="authenticate">
      <div>
        <label for="username">Username</label>
        <input v-model="username" id="username" type="text" required />
      </div>

      <div>
        <label for="password">Senha</label>
        <input v-model="password" id="password" type="password" required />
      </div>

      <button type="submit">Entrar</button>
      <button type="button" @click="goToRegister">Registrar</button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../store/userStore';
import { useRouter } from 'vue-router';
import { api } from '../api'; 

const userStore = useUserStore();
const username = ref('');
const password = ref('');
const router = useRouter();
const error = ref<string | null>(null);

async function authenticate() {
  try {
    error.value = null;
    const response = await api.post('/login', {
      username: username.value,
      password: password.value,
    });

    if (response.status === 200 && response.data.data) {
      const { user, jwt } = response.data.data;
      userStore.authenticaded({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      }, jwt);

      if(user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/projects');
      }
    } else {
      error.value = 'Username ou senha inválidos';
    }
  } catch (err) {
    console.error('Login error:', err);
    error.value = 'Username ou senha inválidos';
  }
}

function goToRegister() {
  router.push('/register');
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
}
.error-message {
  color: red;
}

div {
  margin: 10px;
}
</style>
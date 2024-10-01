<template>
  <div class="add-user-container">
    <h2>Adicionar Usuário</h2>
    <form @submit.prevent="addUser">
      <div>
        <label for="name">Nome</label>
        <input v-model="name" id="name" type="text" required />
      </div>

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

      <div>
        <label for="role">Papel</label>
        <input v-model="role" id="role" type="text" required />
      </div>

      <button type="submit">Adicionar</button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUser } from '../services/userService';

const name = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const role = ref('');
const error = ref<string | null>(null);

const router = useRouter();

async function addUser() {
  const result = await createUser({
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
      role: role.value,
    });

  if(result instanceof Error) {
    error.value = 'Erro ao criar o usuário.';
  } else {
    router.push('/users')
  }
};
</script>

<style scoped>
.add-user-container {
  max-width: 500px;
  margin: 0 auto;
}
.error-message {
  color: red;
}

div {
  margin: 10px;
}
</style>

<template>
  <div class="edit-user-container">
    <h2>Editar Usuário</h2>
    <form @submit.prevent="editUser">

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
        <label for="role">Papel</label>
        <input v-model="role" id="role" type="text" required />
      </div>

      <button type="submit">Salvar</button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { updateUser, getUserById } from '../services/userService';

const name = ref('');
const username = ref('');
const email = ref('');
const role = ref('');
const error = ref<string | null>(null);
const route = useRoute();
const router = useRouter();


async function loadUser() {
  const result = await getUserById(Number(route.params.id));
  if(result instanceof Error) {
    error.value = 'Usuário não encontrado.';
  } else {
    name.value = result.name;
    username.value = result.username;
    email.value = result.email;
    role.value = result.role;
  }
};

async function editUser( ){
  const result = await updateUser(Number(route.params.id), {
      name: name.value,
      username: username.value,
      email: email.value,
    });
    if(result instanceof Error) {
      error.value = 'Erro ao atualizar o usuário.';
    } else {
      router.push('/users');
    }
};

onMounted(loadUser);
</script>

<style scoped>
.edit-user-container {
  max-width: 500px;
  margin: 0 auto;
}
.error-message {
  color: red;
}

div { 
  margin: 10px
}
</style>

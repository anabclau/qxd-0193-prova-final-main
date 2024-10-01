<template>
  <div class="users-container">
    <h2>Lista de Usuários</h2>
    <router-link to="/users/add" class="btn">Adicionar Novo Usuário</router-link>
    <table v-if="!error">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Username</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <router-link :to="`/users/${user.id}`" class="btn">Editar</router-link>
            <button @click="deleteUser(user.id)" class="btn btn-danger">Remover</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { removeUser, getUsers } from '../services/userService';
import { User } from '../types';


const users = ref<User[]>([])
const error = ref<string | null>(null);

async function deleteUser(id: number) {
  const result = await removeUser(id)
  if(result instanceof Error) {
    error.value = 'Erro ao remover o usuário.';
  } else {
    
  }
};

async function loadUsers() {
  const result = await getUsers()
  if(result instanceof Error) {
    error.value = 'Erro ao remover o usuário.';
  } else {
    users.value = result
  }

}

onMounted(loadUsers);
</script>

<style scoped>
.users-container {
  max-width: 800px;
  margin: 0 auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border: 1px solid #ccc;
}
.btn {
  margin-right: 10px;
}
.btn-danger {
  color: white;
  background-color: red;
}
</style>

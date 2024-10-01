<template>
  <div class="add-project-container">
    <h2>Adicionar Projeto</h2>
    <form @submit.prevent="submitProject">
      <div>
        <label for="name">Nome do Projeto</label>
        <input v-model="project.name" id="name" type="text" required />
      </div>

      <div>
        <label for="description">Descrição</label>
        <textarea v-model="project.description" id="description" required></textarea>
      </div>

      <button type="submit">Adicionar</button>
      <RouterLink to="/projects" >Voltar para a lista de projetos</RouterLink>
      
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from '../api';

const project = ref({
  name: '',
  description: '',
  progress: 0,
  userId: localStorage.getItem('id')
});

const errorMessage = ref('');
const successMessage = ref('');

const submitProject = async () => {
  try {
    errorMessage.value = '';
    successMessage.value = '';

    const response = await api.post('/projects', project.value);

    successMessage.value = 'Projeto adicionado com sucesso!';

    project.value = {
      name: '',
      description: '',
      progress: 0,
      userId: 1
    };
  } catch (error) {
    errorMessage.value = error.response?.data?.errors?.[0] || 'Erro ao adicionar projeto.';
  }
};
</script>

<style scoped>
.add-project-container {
  max-width: 500px;
  margin: 0 auto;
}
.error-message {
  color: red;
}
.success-message {
  color: green;
}
div {
  margin: 10px;
}
</style>
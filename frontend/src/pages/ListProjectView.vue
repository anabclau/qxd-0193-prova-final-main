<template>
  <div class="user-projects-container">
    <RouterLink to="/projects/add">Novo projeto</RouterLink>
    <h2>Projetos de {{ username }}</h2>
    <button class="btn btn-danger" @click="handleLogout">Logout</button>
    <ul v-if="!error">
      <li v-for="project in projects" :key="project.id">
        {{ project.name }} - {{ project.progress }}% concluído
        <button class="btn btn-danger" @click="handleRemoveProject(project.id)">Remover</button>
      </li>
    </ul>
    <div v-else>
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getProjectById, removeProject, getProjects } from '../services/projectService'; 
import { logout as logoutService } from '../services/authService';
import type { Project, User } from '../types';

const projects = ref<Project[]>([]);
const user = ref<User>({} as User);
const error = ref<string | null>(null);
const username = localStorage.getItem('username');

async function loadUserProjects() {
  const userId = localStorage.getItem('id');
  
  try {
    let projectsResult;
    if(localStorage.getItem('role') === 'admin') {
      projectsResult = await getProjects();
    } else {
      projectsResult = await getProjectById(userId);
    }
    if (projectsResult instanceof Error) {
      throw projectsResult;
    }
    if (projectsResult.length === 0) {
      error.value = 'Nenhum projeto encontrado.';
    } else {
      projects.value = projectsResult;
    }
  } catch (err) {
    error.value = 'Erro ao recuperar os projetos.';
  }
}

async function handleRemoveProject(projectId: number) {
  const confirmation = confirm('Você tem certeza que deseja remover este projeto?');
  if (!confirmation) return; 

  const result = await removeProject(projectId); 
  if (result instanceof Error) {
      error.value = 'Erro ao remover o projeto'; 
  } else {
      await loadUserProjects();
  }
}

async function handleLogout() {

  const result = await logoutService(); 
  if (result instanceof Error) {
    error.value = 'Erro ao sair, tente novamente.'; 
  } else {
    window.location.href = '/login'; 
  }
}

onMounted(loadUserProjects);
</script>


<style scoped>
.user-projects-container {
  max-width: 800px;
  margin: 0 auto;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
.btn-danger {
  color: white;
  background-color: red;
  margin-left: 10px;
  cursor: pointer;
}
</style>
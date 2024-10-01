<template>
  <div class="not-found-container">
    <h2>Página Não Encontrada</h2>
    <p>Desculpe, a página que você está procurando não existe.</p>
    <router-link to="/">Voltar para a página inicial</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.not-found-container {
  text-align: center;
  margin-top: 100px;
}
</style>

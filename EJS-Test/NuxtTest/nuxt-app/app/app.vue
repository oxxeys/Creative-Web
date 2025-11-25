<template>
  <div>
    <h1>Nuxt + Nitro Backend Example!</h1>

    <p v-if="pending">Loading...</p>
    <p v-else-if="error">Error: {{ error.message }}</p>
    <p v-else>Message from backend: {{ data.message }}</p>
  </div>
</template>

<script setup>
const { data, pending, error } = await useFetch('/api/hello')
// call backend
</script>

<style>
body {
  padding: 20px;
}
</style>
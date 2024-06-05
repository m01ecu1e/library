<template>

  <UContainer class="min-w-full max-w-full grid justify-items-center bg-white dark:bg-gray-900 shadow-lg">

    <Header/>
  </UContainer>

  <UNotifications />

  <UContainer class="px-0">
    <NuxtPage />
  </UContainer>

</template>

<script setup>

console.log("APP VUE")
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()

onBeforeMount( () => {
  authStore.initAuth()
})

</script>

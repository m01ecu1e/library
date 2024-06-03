<template>

  <UContainer class="min-w-full max-w-full grid justify-items-center bg-white dark:bg-gray-900 shadow-lg">
    <!-- <Header :user="user"></Header> -->
    <Header/>
  </UContainer>

  <UNotifications />

  <UContainer class=" min-w-full">
    
    <NuxtPage />
  </UContainer>

</template>

<script setup>
// const { useAuthUser, initAuth, useAuthLoading } = useAuth()
// const isAuthLoading = useAuthLoading()
// const user = useState('auth_user')
// onBeforeMount(() => {
//   initAuth()
// })

console.log("APP VUE")
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()

onBeforeMount( () => {
  authStore.initAuth()
})

</script>

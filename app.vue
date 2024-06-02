<template>

  <UContainer class="min-w-full max-w-full grid justify-items-center bg-white dark:bg-gray-900 shadow-lg">
    <Header :user="user"></Header>
  </UContainer>

  <UNotifications />

  <UContainer :user="user" class=" min-w-full">
    
    <NuxtPage />
  </UContainer>

</template>

<script setup>


const { useAuthUser, initAuth, useAuthLoading } = useAuth()
// const isAuthLoading = useAuthLoading()
const user = useState('auth_user')


onBeforeMount(() => {
  initAuth()
})

</script>

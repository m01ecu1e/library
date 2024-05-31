<template>

  <UContainer class="min-w-full max-w-full grid justify-items-center">
    <Header :user="user"></Header>
  </UContainer>
  
  <UNotifications />

  <UContainer :user="user" class="bg-gray-200 min-w-full">
    <NuxtPage/>
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

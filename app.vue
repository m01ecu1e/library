<template class="bg-gray-100">
  <UContainer class="max-w-full">
    <Header :user="user"></Header>
  </UContainer>
  <UNotifications />
  <UContainer :user="user" class="bg-gray-200 max-w-full h-full">
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

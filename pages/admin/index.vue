<template>
  <div>
    <h1 class="text-xl font-medium mb-4">Admin page</h1>
  </div>
  <UContainer v-if="user && user.admin" class="grid grid-cols-3 max-w-full space-y-5">
    <AdminAddAuthor />
    <AdminAddPublisher />
    <AdminAddBook />
    <AdminAddLibraryBook/>
    <AdminGiveBook/>
    <div v-if="user && user.admin">
    <button @click="handleLogout"
      class=" text-white text-md font-semibold bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2 mt-3 mb-2 ">
      Выйти из учётной записи
    </button>
  </div>
  </UContainer>
  
</template>

<script setup>
const { useAuthUser, initAuth, useAuthLoading } = useAuth()


const user = useAuthUser()

onBeforeMount(() => {
  initAuth()
})

async function handleLogout() {
  const { logout } = useAuth()

  try {
    await logout({

    })
  } catch (error) {
    console.log(error)
  }
  navigateTo('/')
}


</script>
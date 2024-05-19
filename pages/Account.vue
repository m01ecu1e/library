<template>
  <div>
    {{user}}
  </div>

  <div>
      <button @click="handleLogout"
        class=" text-white text-md font-semibold bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2 mt-3 mb-2 ">
        Выйти из учётной записи
      </button>
    </div>
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

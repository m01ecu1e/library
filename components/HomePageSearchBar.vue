<template>
  <div class="flex flex-row justify-center bg-gray-100">
    <div class="basis-6/12 shadow-lg px-5 rounded-lg bg-white my-5">
      <form @submit="handleSearch" class="flex flex-row justify-center h-8 mx-5 my-10">
        <input v-model="search"
          class="border px-4 basis-8/12 rounded-md h-full text-md  focus:border-sky-500  outline-none"
          placeholder="Название, автор, тема, издательство" />
        <button type="submit" @click="handleSearch"
          class="basis-1/12 text-white text-md font-semibold bg-sky-500 hover:bg-sky-600 rounded-lg px-5 ml-4">
          Найти
        </button>
        <div class="content-center basis-1/12 text-sky-600 hover:text-sky-700 font-semibold text-md ml-3">Избранное
        </div>
        <NuxtLink v-if="user" to="Account" class="content-center basis-3/12 text-sky-600 hover:text-sky-700 font-semibold text-md ml-5">Личный кабинет
        </NuxtLink>
        <NuxtLink v-else to="AuthPage" class="content-center basis-3/12 text-sky-600 hover:text-sky-700 font-semibold text-md ml-5">Личный кабинет
        </NuxtLink>
      </form>
    </div>
  </div>
</template>

<script setup>
const search = ref('')

async function handleSearch(e) {
  e.preventDefault()
  useRouter().push({
    path: '/search',
    query: {
      q: search.value
    }
  })
}

const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const isAuthLoading = useAuthLoading()
const user = useAuthUser()

onBeforeMount(() => {
  initAuth()
})

</script>
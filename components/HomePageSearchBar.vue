<template>
  <div class="flex flex-row justify-center bg-gray-200">
    <div class="basis-6/12 shadow-lg px-5 rounded-lg bg-white my-5">
      <form @submit="handleSearch" class="flex flex-row justify-center h-8 mx-5 my-10">
        <UInput v-model="search" :loading="loading"
          class=" basis-8/12 rounded-md h-full text-md"
          placeholder="Название, автор, тема, издательство" />
        <UButton type="submit" onSubmit="handleSearch"
          class="basis-1/12 text-white text-md px-5 ml-4">
          Найти
        </UButton>
        <div class="content-center basis-1/12 text-sky-600 hover:text-sky-700 font-semibold text-md ml-3">Избранное
        </div>
        <NuxtLink v-if="props.user" to="Account" class="content-center basis-3/12 text-sky-600 hover:text-sky-700 font-semibold text-md ml-5">Личный кабинет
        </NuxtLink>
        <NuxtLink v-else to="AuthPage" class="content-center basis-3/12 text-sky-600 hover:text-sky-700 font-semibold text-md ml-5">Личный кабинет
        </NuxtLink>
      </form>
    </div>
  </div>
</template>

<script setup>
const search = ref('')
const loading = ref(false)

async function handleSearch(e) {
  e.preventDefault()

  useRouter().push({
    path: '/search',
    query: {
      q: search.value
    }
  })

}

const props = defineProps({
  user: {
    type: Object,
    required: false
  }
})


</script>
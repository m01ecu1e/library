<template>
  <div class="lg:grid lg:grid-cols-12 lg:p-5 lg:w-full shadow-lg rounded-lg mt-3 mb-3 bg-white dark:bg-gray-900">
    <form @submit="handleSearch" class="justify-center grid grid-cols-12 lg:col-span-9 lg:grid lg:grid-cols-12 ">
      <UInput v-model="search" :loading="loading" class="col-span-10 lg:col-span-10 pl-4 py-4" size="lg"
        placeholder="Название, автор, тема, издательство" required />
      <UButton type="submit" @submit="handleSearch" lg:label="Найти"
        class="col-span-2 lg:col-span-2 my-4 ml-1 mr-4 content-center justify-center">
        <template #trailing>
          <UIcon name="i-heroicons-magnifying-glass-solid" class="w-6 h-6" />
        </template>
      </UButton>
    </form>
    <div class="grid grid-cols-2 pb-4 pt-2 mx-2 lg:m-0 lg:p-0 justify-items-center md:justify-items-center content-center lg:col-span-3 rounded-lg ">
      <div class="text-sky-600 hover:text-sky-700 font-semibold text-md flex content-center text-sm lg:text-md ">
        <UIcon name="i-heroicons-heart" class="w-5 h-5 lg:w-6 lg:h-6 mr-1 shrink-0" /> 
        <div class="content-center ">
          Избранное
        </div>
      </div>
      <NuxtLink v-if="authStore.authUser" to="Account" class=" text-sky-600 hover:text-sky-700 font-semibold flex content-center text-sm lg:text-md mr-2 lg:mr-0">
        <UIcon name="i-heroicons-user-circle" class="w-5 h-5 lg:w-6 lg:h-6 mr-1 shrink-0" /> 
        <div class="content-center">Личный кабинет</div>
      </NuxtLink>
      <NuxtLink v-else to="AuthPage" class="text-sky-600 hover:text-sky-700 font-semibold flex content-center text-sm lg:text-md mr-2 lg:mr-0">
        <UIcon name="i-heroicons-user-circle" class="w-5 h-5 lg:w-6 lg:h-6 mr-1 shrink-0" /> 
        <div class="content-center">Личный кабинет</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>

// import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

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

// const props = defineProps({
//   user: {
//     type: Object,
//     required: false
//   }
// })


</script>
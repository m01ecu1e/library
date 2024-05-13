<template>
  <form
    @submit="handleSearch"
    class="flex flex-row justify-center h-8 mx-5 my-10"
  >
    <input
      v-model="search"
      class="border px-4 basis-8/12 rounded-full h-full text-md  focus:border-sky-500  outline-none"
      placeholder="Название, автор, тема, издательство"
    />
    <button
      type="submit"
      @click="handleSearch"
      class="basis-1/12 text-white text-md font-semibold bg-sky-500 hover:bg-sky-600 rounded-full px-5 ml-4"
    >
      Найти
    </button>
    <div class="content-center basis-1/12 text-sky-600 hover:text-sky-700 font-semibold text-md ml-3">Избранное</div>
    <div class="content-center basis-3/12 text-sky-600 hover:text-sky-700 font-semibold text-md ml-5">Личный кабинет
    </div>
  </form>
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
</script>
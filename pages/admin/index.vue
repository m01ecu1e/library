<template>
  <div>
    <h1 class="text-xl font-medium mb-4"></h1>
  </div>
  <UContainer class="w-3/4">
    <UAccordion :items="items" class="w-full">
      <template #AddLibraryBook>
        <AdminAddLibraryBook/>
      </template>
      <template #AddBook>
        <AdminAddBook />
      </template>
      <template #AddAuthor>
        <AdminAddAuthor />
      </template>
      <template #AddPublisher>
        <AdminAddPublisher />
      </template>
      <template #GetLibraryBooks>
        <AdminGetLibraryBooks />
      </template>
      <template #GiveBook>
        <AdminGiveBook />
      </template>
    
    </UAccordion>
  </UContainer>
  <div v-if="authStore.authUser && authStore.authUser.admin">
    <button @click="handleLogout"
      class=" text-white text-md font-semibold bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2 mt-3 mb-2 ">
      Выйти из учётной записи
    </button>
  </div>
</template>

<script setup>
const items = [
  {
    label:'Добавить книгу в библиотеку',
    defaultOpen: false,
    slot: 'AddLibraryBook'
  },
  {
    label: 'Добавить книгу',
    defaultOpen: false,
    slot: 'AddBook'
  },
  {
    label: 'Добавить автора',
    defaultOpen: false,
    slot: 'AddAuthor'
  },
  {
    label: 'Добавить издателя',
    defaultOpen: false,
    slot: 'AddPublisher'
  },
  {
    label: 'Учёт',
    defaultOpen: false,
    slot: 'GetLibraryBooks'
  },
  {
    label: 'Обработать заказ',
    defaultOpen: false,
    slot: 'GiveBook'
  }
]

const authStore = useAuthStore()

async function handleLogout() {

try {
  await authStore.logout({

  })
} catch (error) {
  console.log(error)
}
navigateTo('/')
}


</script>
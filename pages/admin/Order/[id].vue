<template>
  <UContainer v-if="authStore.authUser && authStore.authUser.admin" class=" rounded-lg w-2/3 py-5">
    <UCard v-if="order" class="px-20 shadow-lg">
      <template #header>
        <div class="font-semibold text-xl">
          {{ order.orderCode }}
        </div>
      </template>
      <div class="flex">
        <div class="w-60 content-center border border-gray-400 shadow-xl">
          <img :src="order.libraryBook.book.coverImage" alt="Обложка">
        </div>
        
        <div class=" w-full pl-5  content-center">
          <div class="flex mb-5">
            Получатель: <p class="ml-2 font-semibold"> {{ order.user.firstName }} {{ order.user.lastName }}</p>
          </div>
          <div class="flex">
            Библиотека: <p class="ml-2 font-semibold"> {{ order.libraryBook.library.name }}</p>
          </div>
          <div class="flex">
            Автор: <p class="ml-2 font-semibold"> {{ order.libraryBook.book.author.name }}</p>
          </div>
          <div class="flex">
            Издательство: <p class="ml-2 font-semibold"> {{ order.libraryBook.book.publisher.name }}</p>
          </div>
          
          <div class="flex">
            ISBN: <p class="ml-2 font-semibold"> {{ order.libraryBook.book.ISBN }}</p>
          </div>
          <div class="flex">
            Количество всего: <p class="ml-2 font-semibold"> {{ order.libraryBook.amount }}</p>
          </div>
          <div class="flex">
            Есть в наличии: <p class="ml-2 font-semibold"> {{  order.libraryBook.amountAvailable + 1 }}</p>
          </div>
          
        </div>
      </div>
      <template #footer>
          <UButton @click="handleGiveOrder" size="xl" class="my-2" :loading="loading" :disabled="order.received">
            Выдать
          </UButton>
          <UButton @click="handleTakeOrder" size="xl" class="my-2 mx-5" :loading="loading" :disabled="!order.received">
            Принять
          </UButton>
        <!-- </div> -->
      </template>
    </UCard>
  </UContainer>
</template>

<script setup>

const authStore = useAuthStore()

const loading = ref(false)

const { getOrderById, giveOrder, putLibraryBook, takeOrder} = useBooks()

const route = useRoute([])

const orderId = computed(() => route.params.id)

const order = ref([])

const toast = useToast()



async function getOrder() {
  loading.value = true
  // console.log(orderId)
  try {
    const response = await getOrderById(orderId.value)
    order.value = response.order
    console.log("order:", order.value)
  } catch (error) {
    console.log(error)
  }

  loading.value = false
  // return bookedBooks.value
}

await getOrder()

async function handleGiveOrder() {
  loading.value = true
  try {
    await giveOrder({
      orderId: order.value.id
    })
    toast.add({
            title: 'Успешно выдан заказ:',
            description: order.value.orderCode,
            icon: 'i-heroicons-check-circle',
            color: 'green'
        })
  } catch (error) {
    console.log(error)
    toast.add({
            title: 'Ошибка:',
            description: error,
            icon: 'i-heroicons-x-mark',
            color: 'red'
        })
  } finally {
    loading.value = false
    useRouter().push({
    path: '/Admin',
    })
  }
}

async function handleTakeOrder() {
  loading.value = true
  try {
    await putLibraryBook({
      libraryBookId: order.value.libraryBookId,
      value:1
    })
    await takeOrder({
      orderId: order.value.id
    })
    toast.add({
            title: 'Успешно принят заказ:',
            description: order.value.orderCode,
            icon: 'i-heroicons-check-circle',
            color: 'green'
        })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
    useRouter().push({
    path: '/Admin',
    })
  }
}
</script>

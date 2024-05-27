<template>
  <UContainer v-if="user && user.admin" class=" rounded-lg w-2/3 py-5">
    <UCard v-if="order" class="px-20 shadow-lg">
      <template #header>
        <div class="font-semibold text-xl">
          {{ order[0].orderCode }}
        </div>
      </template>
      <div class="flex">
        <div class="h-50 w-1/6 content-center border border-gray-400 shadow-xl">
          <img :src="order[0].libraryBook.book.coverImage" alt="Обложка">
        </div>
        <div class=" w-full pl-5  content-center">
          <div class="flex">
            Автор: <p class="ml-2 font-semibold"> {{ order[0].libraryBook.book.author.name }}</p>
          </div>
          <div class="flex">
            Издательство: <p class="ml-2 font-semibold"> {{ order[0].libraryBook.book.publisher.name }}</p>
          </div>
          <div class="flex">
            ISBN: <p class="ml-2 font-semibold"> {{ order[0].libraryBook.book.ISBN }}</p>
          </div>
          <div class="flex">
            Количество всего: <p class="ml-2 font-semibold"> {{ order[0].libraryBook.amount }}</p>
          </div>
          <div class="flex">
            Количество доступных для выдачи: <p class="ml-2 font-semibold"> {{ order[0].libraryBook.amountAvailable + 1 }}</p>
          </div>
        </div>
      </div>
      <template #footer>
        <!-- <USelectMenu v-model="selectedLib" :options="libraryBooks" placeholder="Для бронирования выберите библиотеку"
          value-attribute="id" option-attribute="libraryName" class="mb-2" size="xl" />
        <div v-if="user"> -->
          <UButton @click="handleGiveOrder" size="xl" class="my-2">
            Выдать
          </UButton>
        <!-- </div> -->
      </template>
    </UCard>
  </UContainer>
</template>

<script setup>


const { useAuthUser, initAuth, useAuthLoading } = useAuth()
// onBeforeMount(() => {
//   initAuth()
// })
const user = useState('auth_user')
const loading = ref(false)

const { getOrderByCode, giveOrder} = useBooks()

const route = useRoute([])

const orderCode = computed(() => route.params.id)

const order = ref([])

// console.log("orderCode:", orderCode.value)

async function getOrder() {
  loading.value = true
  try {
    const response = await getOrderByCode(orderCode.value)
    order.value = response.orders
    // console.log(order.value)
  } catch (error) {
    console.log(error)
  }

  loading.value = false
  // return bookedBooks.value
}

async function handleGiveOrder() {
  loading.value = true
  try {
    await giveOrder({
      orderId: order.value[0].id
    })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false

  }
  console.log("order:", order.value[0].orderCode)
}

await getOrder()

</script>

<template>
  <UCard class="max-w-80">
    <h3 class="mb-4">Выдать книгу</h3>
    <form class="flex flex-col">
      <UInputMenu 
        v-model="selectedOrder" 
        :search="getBookedBooks" 
        :options="bookedBooks" 
        :loading="loading" 
        size="xl"
        class="w-96 max-w-full mb-2" 
        placeholder="Номер заказа" 
        option-attribute="orderCode" 
        trailing by="orderCode"
      >
        <template #option="{ option: orderCode }">
          <div class="flex-1 font-semibold">
            {{ orderCode.orderCode }}
          </div>
        </template>
      </UInputMenu>
      <UButton :loading="loading" :disabled="loading" @click="handleGiveOrder" size="xl" class="justify-center mb-5">
        Выдать
      </UButton>

      <h3 class="mb-4">Принять книгу</h3>
      <UInputMenu 
        v-model="selectedTakeOrder" 
        :search="getBookedBooks" 
        :options="bookedBooks" 
        :loading="loading" 
        size="xl"
        class="w-96 max-w-full mb-2" 
        placeholder="Номер заказа" 
        option-attribute="orderCode" 
        trailing by="orderCode"
      >
        <template #option="{ option: orderCode }">
          <div class="flex-1 font-semibold">
            {{ orderCode.orderCode }}
          </div>
        </template>
      </UInputMenu>
      <UButton :loading="loading" @click="handleTakeOrder" :disabled="loading" size="xl" class="justify-center">
        Принять
      </UButton>
    </form>
  </UCard>
</template>

<script setup>

const loading = ref(false)

const selectedOrder = ref()
const selectedTakeOrder = ref()

const { fetchBookedBooks, giveOrder, takeOrder, putLibraryBook } = useBooks()
const bookedBooks = ref([])

const getBookedBooks = async (selectedOrder) => {
  if (selectedOrder === '') return []

  loading.value = true

  const response = await fetchBookedBooks({
    query: selectedOrder
  })
  
  bookedBooks.value = response.bookedBooks
  console.log(bookedBooks.value)
  loading.value = false
  return bookedBooks.value
}

async function handleGiveOrder() {
  loading.value = true
  try {
    await giveOrder({
      orderId: selectedOrder.value.id
    })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false

  }
  console.log("order:", selectedOrder.value.id)
}

async function handleTakeOrder() {
  loading.value = true
  try {
    await putLibraryBook({
      libraryBookId: selectedTakeOrder.value.libraryBookId,
      value:1
    })
    await takeOrder({
      orderId: selectedTakeOrder.value.id
    })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false

  }
  console.log("order:", selectedOrder.value.id)
}

</script>

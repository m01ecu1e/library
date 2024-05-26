<template>
  <UContainer v-if="user" class="grid grid-cols-4 px-40 py-5 space-x-10">
    <UContainer class="grid col-span-1 justify-start w-full bg-white content-start rounded-lg shadow-lg ">
      <div>
        <h1 class="font-semibold text-xl mb-5 mt-5">Личный кабинет</h1>
      </div>
      <div class="grid justify-start space-y-2">
        <p>{{ user.firstName }} {{ user.lastName }}</p>
        <p>Email: {{ user.email }}</p>
      </div>
      <div>
        <button @click="handleLogout"
          class=" text-white text-md font-semibold bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2 mt-3 mb-5 ">
          Выйти из учётной записи
        </button>
      </div>
    </UContainer>
    <UContainer v-if="user" class="grid col-span-3 justify-start w-full bg-white rounded-lg shadow-lg ">
      <div>
        <h1 class="font-semibold text-xl mb-5 mt-5">Ваши книги:</h1>
      </div>
      <div>
        <div v-if="bookedBooks" v-for="bookedBook in bookedBooks">
          <div class="cursor-pointer" @click="openModal(bookedBook.orderCode)">
            <p>
              {{ bookedBook.libraryBook.book.title }},
              {{ bookedBook.libraryBook.book.author.name }},
              {{ bookedBook.libraryBook.book.publisher.name }}
              </p>
              <p class="flex" >
            Номер заказа: <p class="font-semibold mx-2">{{ bookedBook.orderCode }}</p> Никому его не сообщайте
          </p>
          <p v-if="bookedBook.received == false" class="text-sky-600 font-semibold"> Забронирована</p>
          <p v-else class="text-green-600 font-semibold">Выдана</p>
          </div>
        </div>
      </div>
      <UModal v-model="isModalOpen">
        <div class="p-4">
          <canvas ref="qrcodeCanvas"></canvas>
          <!-- <p>https://libpnz.netlify.app/Admin/{{ selectedOrderCode }} ({{ selectedOrderCode }})</p> -->
        </div>
      </UModal>
    </UContainer>
  </UContainer>


</template>

<script setup>
import QRCode from 'qrcode'

const loading = ref(false)

const { fetchBookedBooks } = useBooks()
const bookedBooks = ref([])

const isModalOpen = ref(false)
const selectedOrderCode = ref('')
const qrcodeCanvas = ref(null)

function openModal(orderCode) {
  selectedOrderCode.value = orderCode
  isModalOpen.value = true
}

watch(isModalOpen, async (newValue) => {
  if (newValue) {
    await nextTick()
    QRCode.toCanvas(qrcodeCanvas.value, `https://libpnz.netlify.app/Admin/${selectedOrderCode.value}`, (error) => {
      if (error) console.error(error)
    })
  }
})


// const { useAuthUser, initAuth, useAuthLoading } = useAuth()

const user = useState('auth_user')

const getBookedBooks = async (userId) => {
  if (userId === '') return []

  loading.value = true

  const response = await fetchBookedBooks({
    query: userId
  })
  
  bookedBooks.value = response.bookedBooks
  console.log(bookedBooks.value)
  loading.value = false
  return bookedBooks.value
}

onBeforeMount(() => {
  console.log("onBeforeMount")
  // initAuth()
})

watch(() => user._object?.$sauth_user?.id, async (newUserId) => {
  if (newUserId) {
    console.log("User initialized, fetching booked books")
    await getBookedBooks(newUserId)
  }
}, { immediate: true })


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

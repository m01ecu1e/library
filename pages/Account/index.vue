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
        <UCard v-if="bookedBooks" v-for="bookedBook in bookedBooks" class="">
          <template #header>
            <div class="font-semibold content-center">
              Заказ номер {{ bookedBook.orderCode }}
            </div>
          </template>


          <div class="flex cursor-pointer"@click="openModal(bookedBook.orderCode)">
            <div class="w-40 ">
              <img :src="bookedBook.libraryBook.book.coverImage" alt="Обложка книги">
            </div>

            <div class="w-full cursor-pointer mb-5 pl-5">
              <p>
                {{ bookedBook.libraryBook.book.title }},
                {{ bookedBook.libraryBook.book.author.name }},
                {{ bookedBook.libraryBook.book.publisher.name }}
              </p>
              <p class="flex">
                Библиотека:
              <p class="font-semibold mx-2">{{ bookedBook.libraryBook.library.name }}</p>
              </p>
              <p>
                Адрес: {{ bookedBook.libraryBook.library.Address }}
              </p>
              <p>
                {{ bookedBook.libraryBook.library.info }}
              </p>
              <div v-if="!bookedBook.received" class="text-sky-600 mt-2 font-semibold">
                Забронирована
                <p>
                  Заберите до:
                </p>
                <p class="text-black font-light">
                  {{ formatDate(bookedBook.booked_due_date) }}
                </p>
              </div>
              <div v-if="bookedBook.received">
                <p class="text-green-600 mt-2 font-semibold">
                  Выдана:
                <p class="text-black font-light">
                  {{ formatDate(bookedBook.received_at) }}
                </p>
                Вернуть до:
                <p class="text-black font-light">
                  {{ formatDate(bookedBook.due_date) }}
                </p>
                </p>
              </div>
            </div>
          </div>


          <template #footer>
            <div v-if="bookedBook.received">
              <p v-if="isNotOverdue(bookedBook.due_date)" class="text-green-600 font-semibold">
                Не просрочена
              </p>
              <p v-else class="text-red-600">
                Просрочена
              </p>
            </div>
          </template>


        </UCard>
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
import { format, parseISO, isAfter } from 'date-fns'
import { toZonedTime, toDate } from 'date-fns-tz'
const timeZone = 'Europe/Moscow'

const formatDate = (date) => {
  const zonedDate = toZonedTime(date, timeZone)
  // return format(zonedDate, 'yyyy-MM-dd HH:mm', { timeZone })
  // return format(zonedDate, 'yyyy-MM-dd HH:mm', { timeZone })
  return format(zonedDate, 'dd-MM-yyyy HH:mm', { timeZone })
}

const isNotOverdue = (dueDate) => {
  const now = new Date()
  const parsedDueDate = parseISO(dueDate)
  return isAfter(parsedDueDate, now)
}

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
    QRCode.toCanvas(qrcodeCanvas.value, `https://libpnz.netlify.app/Admin/Order/${selectedOrderCode.value}`, (error) => {
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
  // console.log(bookedBooks.value)
  loading.value = false
  // console.log(now > bookedBooks.value.due_date)
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

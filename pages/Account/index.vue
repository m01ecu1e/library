<template>
  <UContainer v-if="user" class=" lg:px-40 py-5 px-0">
    <UContainer
      class=" justify-start w-full bg-white content-start rounded-lg shadow-lg">
      <div class="font-semibold text-xl mb-5 mt-5">
        Личный кабинет
      </div>
      <div class="grid justify-start space-y-2 mb-5">
        <p>{{ user.firstName }} {{ user.lastName }}</p>
        <p>Email: {{ user.email }}</p>
        <UButton @click="handleLogout" class="" size="lg">
          Выйти из учётной записи
        </UButton>
      </div>

    </UContainer>
    <UContainer v-if="user" class=" justify-start bg-white rounded-lg shadow-lg ">

      <div>
        <h1 class="font-semibold text-xl mb-5 mt-5 pt-5">Ваши книги:</h1>
      </div>
      <div>
        <UCard v-if="bookedBooks" v-for="bookedBook in bookedBooks" class="mt-2">
          <template #header>
            <div class="font-semibold content-center text-lg">
              Заказ #{{ bookedBook.orderCode }}
            </div>
            <div>
              Нажмите на заказ, чтобы показать QR-код или назовите номер заказа библиотекарю
            </div>
          </template>

          <div class="flex text-md lg:text-lg content-center mb-2">
            <div class="w-32">
              <img :src="bookedBook.libraryBook.book.coverImage" alt="Обложка книги">
            </div>
            <div class="content-center ml-2">
              {{ bookedBook.libraryBook.book.title }},
              {{ bookedBook.libraryBook.book.author.name }},
              {{ bookedBook.libraryBook.book.publisher.name }}
            </div>
          </div>

          <UAccordion :items="items">
            <template #orderCard>
              <div class="flex cursor-pointer" @click="openModal(bookedBook.orderCode)">
                <div class="w-full cursor-pointer ">
                  <p class="">
                    Библиотека:
                  <p class="font-semibold">{{ bookedBook.libraryBook.library.name }}</p>
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
            </template>

          </UAccordion>

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
const items = [{
  label: 'Развернуть',
  defaultOpen: false,
  slot: 'orderCard'
}]
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

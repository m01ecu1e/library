<template>
  <UContainer class=" lg:px-40 py-5 px-0">
    <UContainer class=" justify-start w-full bg-white dark:bg-gray-900 content-start rounded-lg shadow-lg">
      <div class="font-semibold text-xl mb-5 mt-5">
        Личный кабинет
      </div>
      <div class="grid justify-start space-y-2 mb-5">
        <p>{{ authStore.authUser.firstName }} {{ authStore.authUser.lastName }}</p>
        <p>Email: {{ authStore.authUser.email }}</p>
        <div class="flex space-x-2">
          <UButton @click="handleLogout" class="" size="lg">
            Выйти из учётной записи
          </UButton>
          <UButton @click="" class="" size="lg">
            Сменить пароль
          </UButton>

        </div>
      </div>

    </UContainer>
    <UContainer class=" justify-start bg-white dark:bg-gray-900 rounded-lg shadow-lg pb-5">

      <div>
        <h1 class="font-semibold text-xl mb-5 mt-5 pt-5">Ваши книги:</h1>
      </div>
      <div>
        <USkeleton v-if="loading" class="h-80 w-full rounded-lg" />
        <UCard v-if="bookedBooks" v-for="bookedBook in bookedBooks" class="mt-2">
          <template #header>
            <div class="font-semibold content-center text-lg">
              Заказ #{{ bookedBook.orderCode }}
            </div>
            <div>
              Нажмите на заказ, чтобы показать QR-код или назовите номер заказа библиотекарю
            </div>
          </template>

          <div class="flex text-md lg:text-lg content-center mb-2 cursor-pointer"
            @click="openModal(bookedBook.id)">
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
              <div class="w-full ml-1">

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
                  <p class=" font-light">
                    {{ formatDate(bookedBook.booked_due_date) }}
                  </p>
                </div>
                <div v-if="bookedBook.received">
                  <p class="text-green-600 mt-2 font-semibold">
                    Выдана:
                  <p class="text-black dark:text-gray-300 ">
                    {{ formatDate(bookedBook.received_at) }}
                  </p>
                  Вернуть до:
                  <p class="text-black dark:text-gray-300 ">
                    {{ formatDate(bookedBook.due_date) }}
                  </p>
                  </p>
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
      <UModal v-model="isModalOpen" >
        <div class="flex justify-center">
          <canvas ref="qrcodeCanvas"></canvas>
          <!-- <p>({{ selectedOrderCode }})</p> -->
        </div>
      </UModal>
    </UContainer>
  </UContainer>


</template>

<script setup>
import QRCode from 'qrcode'
import { format, parseISO, isAfter } from 'date-fns'
import { toZonedTime, toDate } from 'date-fns-tz'

const authStore = useAuthStore()

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

const { fetchBookedBooks, loading } = useBooks()
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
    QRCode.toCanvas(qrcodeCanvas.value, selectedOrderCode.value, {
      width: 300, // Увеличение размера QR-кода
      errorCorrectionLevel: 'H' // Увеличение качества QR-кода
    }, (error) => {
      if (error) console.error(error)
    })
  }
})

const getBookedBooks = async (userId) => {
  if (userId === '') return []
  console.log("getBookedBooks:", userId)

  // loading.value = true

  const response = await fetchBookedBooks({
    query: userId
  })

  bookedBooks.value = response.bookedBooks
  // loading.value = false
  return bookedBooks.value
}

getBookedBooks(authStore.authUser.id)

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

<template>
  <div>

    <UDivider class="my-1"></UDivider>
    <div class=" w-full content-start lg:content-center">
      <div class="font-semibold">
        {{ props.book.title }}
      </div>
      <div class="flex ">
        {{ props.book.author }}
      </div>
      <div class="flex">
        Издательство: <p class="ml-2 font-semibold"> {{ props.book.publisher }}</p>
      </div>
      <div class="flex">
        Всего: <p class="ml-2 font-semibold"> {{ props.book.amount }} экз.</p>
      </div>
      <div class="flex">
        В библиотеке: <p class="ml-2 font-semibold"> {{ props.book.amountAvailable }} экз.</p>
      </div>
      <div>
        <UAccordion :items="items">
          <template #booking>
            <div v-for="(bookedBook, index) in props.book.bookedBooks" :key="index" class="mb-2">
              <p class="font-semibold">{{ bookedBook.user.firstName }} {{ bookedBook.user.lastName }} ({{ bookedBook.user.email }})</p>
              <div v-if="!bookedBook.received">
                <p class="text-blue-500 font-semibold">Забронирована</p>
                <p>До: {{ formatDate(bookedBook.bookedDueDate) }}</p>
              </div>
              <div v-if="bookedBook.received">
                <p class="text-green-500 font-semibold">Получена</p>
                <p>До: {{ formatDate(bookedBook.dueDate) }} </p>
              </div>
              <div v-if="bookedBook.received">
              <p v-if="isNotOverdue(bookedBook.dueDate)" class="text-green-600 font-semibold">
                Не просрочена
              </p>
              <p v-else class="text-red-600">
                Просрочена
              </p>
            </div>
            </div>
          </template>
        </UAccordion>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const users = props.book.bookedBooks

const items = [{
    label: 'Забронировали:',
    defaultOpen: false,
    slot: 'booking'
}]

console.log("users:", users)
</script>

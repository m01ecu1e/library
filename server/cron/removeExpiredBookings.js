import cron from 'node-cron'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Функция для удаления просроченных бронирований и обновления количества книг
const removeExpiredBookings = async () => {
  const now = new Date()

  // Найти все просроченные бронирования
  const expiredBookings = await prisma.bookedBooks.findMany({
    where: {
      booked_due_date: {
        lt: now,
      },
      received: false,
    },
  })

  // Обновить количество книг и удалить бронирования
  for (const booking of expiredBookings) {
    await prisma.$transaction([
      prisma.libraryBook.update({
        where: { id: booking.libraryBookId },
        data: { amount: { increment: 1 } },
      }),
      prisma.bookedBooks.delete({
        where: { id: booking.id },
      }),
    ])
  }
}

// Планировщик задач для регулярного удаления просроченных бронирований
const scheduleCronJobs = () => {
  // Каждый день в полночь (00:00)
  // cron.schedule('0 0 * * *', () => {
  //   removeExpiredBookings()
  //     .then(() => {
  //       console.log('Expired bookings removed')
  //     })
  //     .catch((error) => {
  //       console.error('Error removing expired bookings:', error)
  //     })
  // })

  // Для тестирования каждые 10 секунд (раскомментировать для тестирования)
  cron.schedule('*/10 * * * * *', () => {
    removeExpiredBookings()
      .then(() => {
        console.log('Expired bookings removed')
      })
      .catch((error) => {
        console.error('Error removing expired bookings:', error)
      })
  })
}

export { scheduleCronJobs }
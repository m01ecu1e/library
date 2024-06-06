import { scheduleCronJobs } from './removeExpiredBookings'

export const initCronJobs = () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Scheduling cron jobs')
    scheduleCronJobs()
  }
}
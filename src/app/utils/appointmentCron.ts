// import cron from 'node-cron';
// import { cancelExpiredAppointment } from './cancelExpiredAppointment';

// cron.schedule('* * * * *', async() => {
//   console.log('running a task every minute');
//   try {
//     await cancelExpiredAppointment()
//   } catch (error) {
//     console.error(`Error cancelling expired appointments:${error}`);
//   }
// });
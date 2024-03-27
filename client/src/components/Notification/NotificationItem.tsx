import { RxCross2 } from 'react-icons/rx';
import { displayNotification, NotificationType } from '@/types/Notification';

interface NotificationsProps {
  notifications: displayNotification[];
}

const Notifications = ({ notifications,}: NotificationsProps) => {

  console.log(notifications)

  // const removeNotification = (notifaction: NotificationType) => {
  //   try {
  //     await ()
  //   } catch (error) {
  //     console.error('error deleting notifaction')
  //   }
  // }
 
  // const lastFive = notifications.filter((notification, index) => {
  //   return index < 5;
  // });

  return (
    <div className='flex flex-col bg-gradient-to-b from-tapePink to-tapeYellow rounded-3xl overflow-hidden text-tapeWhite w-full'>
      {notifications.map((notification) => (
        <>
         <h2 key={notification.channelName}>{notification.channelName}</h2>
        {notification.notifications.map((not: NotificationType) => (
          <p>{not.message}</p>
        ))}</>
       
      ))}
    </div>
  );
}
export default Notifications;

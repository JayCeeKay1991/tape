import { NotificationType } from '@/types/Notification';
import { RxCross2 } from 'react-icons/rx';


interface NotifactionsProps {
  notifications: NotificationType[];
}

const Notifactions = ({ notifications }: NotifactionsProps) => {

  // const removeNotification = (notifaction: NotificationType) => {
  //   try {
  //     await ()
  //   } catch (error) {
  //     console.error('error deleting notifaction')
  //   }
  // }
 
  const lastFive = notifications.filter((notification, index) => {
    return index < 5;
  });


  return (
    <div>
      {notifications.map((notification) => (
        <p key={notification._id}>{notification.message}</p>
      ))}
    </div>
  );
}
export default Notifactions;

import { displayNotification } from '@/routes/Dash/Dash';
import { ChannelType } from '@/types/Channel';
import { NotificationType } from '@/types/Notification';
import { RxCross2 } from 'react-icons/rx';


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
    <div>
      {notifications.map((notification) => (
        <h2 key={notification.channelName}>{notification.channelName}</h2>
        
      ))}
    </div>
  );
}
export default Notifications;

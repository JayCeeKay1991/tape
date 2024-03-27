import { displayNotification } from '@/types/Notification';
import { deleteNotification } from '@/services/NotificationClientService';
import { useMainContext } from '../Context/Context';

interface NotificationsProps {
  notifications: displayNotification[];
}

const Notifications = ({ notifications }: NotificationsProps) => {
  const { user } = useMainContext();

  console.log(notifications)

  return (
    <div id="notifications-wrapper" className='flex flex-row text-tapeWhite w-full'>
      <div id="latest-oldest-wrapper">
        <div id="latest"></div>
        <div id="oldest"></div>
      </div>
      <div id="last-five"></div>
    </div>
  );
};

export default Notifications;

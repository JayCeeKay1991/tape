import React from 'react'; // Making sure React is imported
import { displayNotification } from '@/types/Notification';
import { User } from '@/types/User';
import { deleteNotification } from '@/services/NotificationClientService';

interface NotificationsProps {
  notifications: displayNotification[];
  user: User;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, user }) => {
  return (
    <div className='flex flex-row text-tapeWhite w-full'>
      {notifications.map((notification) => (
        <React.Fragment key={notification.channelName}>
          {notification.notifications.map((not) => (
            not.unNotifiedUsers.includes(user._id) && (
              <button 
                className='w-[200px] h-[200px] mr-[50px] p-[10px] text-2xl bg-gradient-to-b from-tapePink to-tapeYellow rounded-3xl overflow-hidden'
                key={not._id}
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    await deleteNotification(not, user._id);
                  } catch (error) {
                    console.error('error deleting notification');
                  }
                }}
              >
                {not.message}
              </button>
            )
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Notifications;

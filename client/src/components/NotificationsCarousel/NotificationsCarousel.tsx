import { useState, useEffect } from "react";
import { NotificationType } from "@/types/Notification";

interface NotificationsCarouselProps {
    notifications: NotificationType[];
}

const NotificationsCarousel = ({ notifications }: NotificationsCarouselProps) => {
    const [currentNotification, setCurrentNotification] = useState<NotificationType>(notifications[0]);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            if (index === notifications.length - 1) {
                setCurrentNotification(notifications[0]);
                setIndex(0);
            } else {
                const newIndex = index + 1;
                setCurrentNotification(notifications[newIndex]);
                setIndex(newIndex);
            }
        }, 10000);
        return () => clearInterval(timerId); 
    }, [index, notifications]); 

    console.log(notifications)

    return (
        <div className="carousel-wrapper bg-gradient-to-b from-tapePink to-tapeYellow rounded-3xl w-full h-[250px] p-[30px]">
            <h1 className="text-tapeWhite text-7xl">What's new</h1>
            <div id="carousel-item" className="flex justify-center">
                <p className="text-2xl">{currentNotification.message}</p>
                <h1></h1>
            </div>
        </div>
    );
};

export default NotificationsCarousel;

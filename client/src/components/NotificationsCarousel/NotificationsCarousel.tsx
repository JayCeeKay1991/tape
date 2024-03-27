import { useEffect, useState } from "react";
import { NotificationType } from "@/types/Notification"

interface NotificationsCarouselProps {
    notifications: NotificationType[];
}

const NotificationsCarousel = ({ notifications }: NotificationsCarouselProps) => {
    const [currentNotification, setCurrentNotification] = useState<NotificationType>(notifications[0])
    const [index, setIndex] = useState<number>(0)

    useEffect(() => {
        updateCarousel()
    }, [])

    const updateCarousel = () => {
        const timerId = setInterval(() => {
               if (index === notifications.length-1) {
                setCurrentNotification(notifications[0]);
                setIndex(0)
               }
            const newIndex = index + 1;
            setCurrentNotification(notifications[newIndex]);
            setIndex(newIndex)
        }, 8000);
        return () => clearInterval(timerId);
    }

    console.log(currentNotification)
    return (
        <div className="carousel-wrapper bg-gradient-to-b from-tapePink to-tapeYellow rounded-3xl w-full h-[200px] flex justify-center">
            <div id="carousel-item">
                <p>{currentNotification!.message}</p>
            </div>

        </div>
    )
}

export default NotificationsCarousel
import { toast } from "react-hot-toast";
import Notification, {
  NotificationTypes,
} from "../components/atoms/notification";

const useNotification = () => {
  let notificationQueue: {
    title: string;
    message: string;
    type: NotificationTypes;
  }[] = [];

  let isDisplaying = false; // Track if a notification is currently being shown

  const showNextNotification = () => {
    if (notificationQueue.length === 0) {
      isDisplaying = false; // Stop if the queue is empty
      return;
    }

    isDisplaying = true; // Mark as displaying
    const { title, message, type } = notificationQueue.shift()!;

    const toastId = toast.custom(
      (t) => (
        <Notification toast={t} type={type} title={title} message={message} />
      ),
      {
        position: "top-right",
        duration: 1000,
      },
    );

    // Use setTimeout to trigger the next notification after the current one closes
    setTimeout(() => {
      toast.dismiss(toastId); // Ensure the toast is dismissed
      isDisplaying = false; // Reset displaying flag
      showNextNotification(); // Trigger the next notification
    }, 1000); // Matches the duration of the toast
  };

  return (title: string, message: string, type: NotificationTypes) => {
    notificationQueue.push({ title, message, type }); // Add notification to the queue

    if (!isDisplaying) {
      showNextNotification(); // Start showing the notifications if not already displaying
    }
  };
};

export default useNotification;

import React from "react";
import { HiOutlineX } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const Notifications = ({ notificationsData, onNotificationClick, onClose }) => {
  // Framer Motion Variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { duration: 0.5, type: "spring", stiffness: 50 } },
    exit: { y: "100vh", opacity: 0, transition: { duration: 0.5 } },
  };

  const notificationItemVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const handleNotificationClick = (notification) => {
    // Only trigger on comment or like notifications
    if (notification.type === "comment" || notification.type === "like") {
      onNotificationClick(notification?.recipeId);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white max-h-[600px] lg:max-h-[400px] w-[320px] lg:w-[700px] relative rounded-lg shadow-lg"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute right-1 text-base font-medium top-1 text-black z-30"
        >
          <RxCross2 className="text-xl" />
        </motion.button>
        {/* Notifications Title */}
        <h3 className="font-bold text-lg rounded-tr-lg rounded-tl-lg sticky text-hotPink top-0 w-full p-4 bg-white z-20 border-b flex gap-x-1 items-center">
          <IoIosNotifications />
          Notifications
        </h3>
        {/* Notifications Content */}
        <div className="p-4 h-[500px] lg:h-[300px] overflow-y-auto">
          <div className="flex flex-col gap-y-4">
            {notificationsData?.length === 0 ? (
              <p className="text-center text-lg text-gray-500">
                No notifications to show
              </p>
            ) : (
              notificationsData?.map((notification, index) => (
                <motion.div
                  key={notification._id || index}
                  className="flex items-start cursor-pointer w-full py-3 px-3 rounded-lg shadow-md"
                  onClick={() => handleNotificationClick(notification)}
                  variants={notificationItemVariants}
                  whileHover="hover"
                >
                  <div className="avatar mt-1">
                    <div className="lg:w-10 w-8 rounded-full">
                      <img
                        src={`data:image/jpeg;base64,${notification?.image}`}
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div className="ml-3 relative w-full">
                    <p className="text-sm lg:text-base mb-1">
                      <span className="font-medium text-base lg:text-lg">
                        {notification?.name}
                      </span>{" "}
                      {notification.type === "comment"
                        ? "commented on your recipe post."
                        : notification.type === "like"
                        ? "liked your recipe post."
                        : "has started following you."}
                    </p>
                    <p className="text-xs">{notification?.createdAt}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Notifications;

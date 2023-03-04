import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Notification.scss";

const availableTime = 10000;

const notifications = [
  {
    id: 0,
    title: "Patient general update (2023-03-04 10:00)",
    message: "Patient X received a bath.",
  },
  {
    id: 1,
    title: "Patient general update (2023-03-04 11:00)",
    message: "Patient X were examined by Doctor H.",
  },
  {
    id: 2,
    title: "Patient transfer (2023-03-04 15:00)",
    message:
      "Patient X were transferred to the ER following breathing problems.",
  },
];

export const Notification = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [remainingNotifications, setRemainingNotifications] =
    useState(notifications);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft) {
        setTimeLeft(timeLeft - 1);
      } else if (timeLeft === 0) {
        closeModal(selectedNotification);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const openModal = (notification) => {
    setSelectedNotification(notification);
    setTimeLeft(availableTime);
  };

  const closeModal = (notification) => {
    setRemainingNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== notification.id)
    );
    setSelectedNotification(null);
    setTimeLeft(null);
  };

  return (
    <div className='notification'>
      <div className='notification__header'>You have now a new update:</div>
      <div className='notification__list'>
        {remainingNotifications.map((notification) => (
          <div
            key={notification.id}
            className='notification__list-item'
            onClick={() => openModal(notification)}
          >
            <h2>{notification.title}</h2>
          </div>
        ))}
      </div>
      <Modal
        isOpen={!!selectedNotification}
        onRequestClose={() => closeModal(selectedNotification)}
        contentLabel='Notification Details'
        className='notification__modal'
        overlayClassName='notification__overlay'
      >
        {selectedNotification && (
          <>
            <h2 className='notification__modal__header'>
              {selectedNotification.title}
            </h2>
            <p className='notification__modal__description'>
              {selectedNotification.message}
            </p>
            <p className='notification__modal__time'>Time left: {timeLeft}s</p>
            <button
              className='notification__modal__button'
              onClick={() => closeModal(selectedNotification)}
            >
              OK
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

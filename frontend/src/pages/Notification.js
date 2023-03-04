import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const notifications = [
    {title: 'Patient general update (2023-03-04 10:00)', message: 'Patient X received a bath.'},
    {title: 'Patient general update (2023-03-04 11:00)', message: 'Patient X were examined by Doctor H.'},
    {
        title: 'Patient transfer (2023-03-04 15:00)',
        message: 'Patient X were transferred to the ER following breathing problems.'
    }
];

export const Notification = () => {

    const [selectedNotification, setSelectedNotification] = useState(null);
    const [remainingNotifications, setRemainingNotifications] = useState(notifications);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                closeModal(selectedNotification);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const openModal = (notification) => {
        setSelectedNotification(notification);
        setTimeLeft(30);
    };

    const closeModal = (notification) => {
        setRemainingNotifications((prevNotifications) =>
            prevNotifications.filter((n) => n.id !== notification.id)
        );
        setSelectedNotification(null);
        setTimeLeft(30);
    };

    return (
        <div className="notification-list">
            {remainingNotifications.map((notification) => (
                <div key={notification.id} className="notification" onClick={() => openModal(notification)}>
                    <h2>{notification.title}</h2>
                </div>
            ))}
            <Modal
                isOpen={!!selectedNotification}
                onRequestClose={() => closeModal(selectedNotification)}
                contentLabel="Notification Details"
                className="modal"
                overlayClassName="overlay"
            >
                {selectedNotification && (
                    <div>
                        <h2>{selectedNotification.title}</h2>
                        <p>{selectedNotification.message}</p>
                        <p>Time left: {timeLeft}s</p>
                        <button className="close-button" onClick={() => closeModal(selectedNotification)}>
                            OK
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}